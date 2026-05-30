# MyOpia — README Técnico

> Simulador de miopia extrema. Absolutamente inútil. Tecnicamente impressionante.

---

## Sumário

- [Arquitetura de Camadas](#arquitetura-de-camadas)
- [Revelação da Área das Lentes](#revelação-da-área-das-lentes)
- [Interatividade por Baixo do Blur](#interatividade-por-baixo-do-blur)
- [Física do Óculos](#física-do-óculos)
- [Sistema de Degradação das Lentes](#sistema-de-degradação-das-lentes)
- [Stack & Setup](#stack--setup)

---

## Arquitetura de Camadas

O MyOpia opera com três camadas empilhadas via `position: fixed` e `z-index`:

```
┌──────────────────────────────────────────┐  z-index: 30
│  Óculos (componente arrastável)           │  → captura drag, renderiza lentes
├──────────────────────────────────────────┤  z-index: 20
│  Máscara de Blur (pointer-events: none)   │  → aplica blur visual, sem bloquear cliques
├──────────────────────────────────────────┤  z-index: 10
│  Conteúdo real (Win11 iframe / clones)    │  → totalmente clicável e interativo
└──────────────────────────────────────────┘
```

A camada de blur nunca intercepta eventos de mouse — isso é garantido por `pointer-events: none` nela e `pointer-events: all` nos elementos de conteúdo. O óculos fica acima de tudo e **captura apenas os eventos de drag**.

---

## Revelação da Área das Lentes

### Técnica: CSS `mask` dinâmico

A camada de blur (`BlurOverlay`) cobre 100% da tela com `backdrop-filter: blur(NNpx)`. A "janela" transparente das lentes é criada subtraindo a área do óculos via **CSS mask** calculado em tempo real conforme o óculos se move.

```tsx
// BlurOverlay.tsx
const BlurOverlay = ({ glassesPos, lensRadius, blurAmount }) => {
  const { x, y } = glassesPos;

  // Duas lentes circulares simétricas
  const leftLens  = `circle(${lensRadius}px at ${x - 36}px ${y + 20}px)`;
  const rightLens = `circle(${lensRadius}px at ${x + 36}px ${y + 20}px)`;

  // O mask exclui as lentes: tudo é borrado EXCETO esses dois círculos
  const maskValue = `
    radial-gradient(circle ${lensRadius}px at ${x - 36}px ${y + 20}px, transparent 100%, black 100%),
    radial-gradient(circle ${lensRadius}px at ${x + 36}px ${y + 20}px, transparent 100%, black 100%),
    linear-gradient(black, black)
  `;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20,
        backdropFilter: `blur(${blurAmount}px)`,
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
        maskImage: maskValue,
        WebkitMaskImage: maskValue,
        maskComposite: 'exclude',          // Firefox
        WebkitMaskComposite: 'destination-out', // Chrome/Safari
        pointerEvents: 'none',             // ← nunca bloqueia cliques
      }}
    />
  );
};
```

> **Por que `mask` e não `clip-path`?**  
> `clip-path` removeria o elemento inteiro fora da área — o blur sumiria. O `mask` mantém o elemento completo mas torna regiões transparentes, revelando o conteúdo nítido embaixo apenas nas lentes.

---

## Interatividade por Baixo do Blur

Como a camada de blur tem `pointer-events: none`, todos os eventos de mouse passam direto para o conteúdo abaixo. Isso inclui:

- Cliques e digitação no **clone do Google**
- Navegação no **clone do YouTube**
- Interações com o **Win11 via iframe**

```tsx
// ContentLayer.tsx
<div style={{ position: 'fixed', inset: 0, zIndex: 10, pointerEvents: 'all' }}>
  <iframe
    src="https://win11.blueedge.me"
    style={{ width: '100%', height: '100%', border: 'none' }}
    title="Windows 11 simulado"
  />
</div>
```

O óculos em si (`z-index: 30`) usa `pointer-events: all` apenas na área do handle de arraste — o resto do componente também tem `pointer-events: none` para não bloquear a camada de conteúdo nas bordas.

---

## Física do Óculos

### Drag com inércia

O óculos é controlado por um hook `useGlassesPhysics` que simula velocidade, atrito e queda com `requestAnimationFrame`:

```ts
// useGlassesPhysics.ts
interface GlassesState {
  x: number;
  y: number;
  vx: number;       // velocidade horizontal
  vy: number;       // velocidade vertical
  isFalling: boolean;
  isBroken: boolean;
  rotation: number;
}

const GRAVITY     = 0.6;   // px/frame²
const FRICTION    = 0.88;  // atrito ao arrastar
const BOUNCE      = 0.3;   // coeficiente de quique no chão

function physicsLoop(state: GlassesState, dispatch): void {
  if (!state.isFalling) return;

  const nextVy = state.vy + GRAVITY;
  const nextY  = state.y + nextVy;

  // Colisão com o chão
  if (nextY >= FLOOR_Y) {
    const impactForce = Math.abs(nextVy);

    if (impactForce > BREAK_THRESHOLD) {
      dispatch({ type: 'BREAK' });   // quebra se cair de altura > ~300px
    } else {
      dispatch({ type: 'BOUNCE', vy: -nextVy * BOUNCE });
    }
    return;
  }

  dispatch({ type: 'TICK', x: state.x + state.vx, y: nextY, vy: nextVy });
  requestAnimationFrame(() => physicsLoop(state, dispatch));
}
```

### Queda ao soltar

Ao `onMouseUp`, se o óculos estiver acima de um limiar de altura, a velocidade atual do drag vira velocidade inicial da queda:

```ts
const handleDrop = (dragVelocity: { vx: number; vy: number }) => {
  const dropHeight = FLOOR_Y - glassesState.y;

  startFalling({
    vx: dragVelocity.vx * 0.4,
    vy: dragVelocity.vy,
    fromHeight: dropHeight,
  });
};
```

### Limiar de quebra

```ts
const BREAK_THRESHOLD = 18; // px/frame de velocidade vertical no impacto
// ≈ queda de ~240px de altura sem segurar
```

---

## Sistema de Degradação das Lentes

As lentes têm um estado composto gerenciado por `useLensCondition`:

```ts
interface LensCondition {
  dirt: number;       // 0–1, acumula com o tempo
  fog: number;        // 0–1, spike aleatório periódico
  rainDrops: Drop[];  // array de gotas com posição e opacidade
  isBroken: boolean;
  sentForRepair: boolean;
}
```

### Sujeira acumulando

```ts
useEffect(() => {
  const interval = setInterval(() => {
    setCondition(c => ({
      ...c,
      dirt: Math.min(c.dirt + 0.003, 1), // ~5min para saturar
    }));
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

### Embaçamento aleatório

```ts
useEffect(() => {
  const schedule = () => {
    const delay = 8000 + Math.random() * 20000; // entre 8s e 28s
    setTimeout(() => {
      setCondition(c => ({ ...c, fog: 0.7 + Math.random() * 0.3 }));
      setTimeout(() => {
        setCondition(c => ({ ...c, fog: 0 }));
        schedule();
      }, 4000);
    }, delay);
  };
  schedule();
}, []);
```

### Limpeza com animação de limpador de parabrisa

A limpeza é disparada por duplo-clique no óculos. Uma animação CSS de arco sweeping percorre as lentes, enquanto um áudio de borracha molhada toca:

```tsx
const WiperAnimation = ({ active }) => (
  <svg viewBox="0 0 100 60" className={`wiper ${active ? 'wiper--active' : ''}`}>
    <path
      d="M 10 50 A 45 45 0 0 1 90 50"
      stroke="rgba(255,255,255,0.6)"
      strokeWidth="3"
      fill="none"
      className="wiper-blade"
    />
  </svg>
);

// CSS
// .wiper-blade {
//   transform-origin: 50% 100%;
//   animation: none;
// }
// .wiper--active .wiper-blade {
//   animation: sweep 0.6s ease-in-out 3;
// }
// @keyframes sweep {
//   0%   { transform: rotate(-40deg); }
//   50%  { transform: rotate(40deg);  }
//   100% { transform: rotate(-40deg); }
// }
```

```ts
const playWiperSound = () => {
  const audio = new Audio('/sounds/wiper.mp3');
  audio.volume = 0.5;
  audio.play();
};
```

### Quebra e envio para conserto

Ao quebrar, o óculos exibe uma animação de rachaduras (SVG animado) e bloqueia o uso. Um botão "Enviar para conserto" aparece — com um timer de espera fictício de 10 segundos:

```tsx
const sendForRepair = () => {
  setCondition(c => ({ ...c, sentForRepair: true }));

  setTimeout(() => {
    setCondition({
      dirt: 0,
      fog: 0,
      rainDrops: [],
      isBroken: false,
      sentForRepair: false,
    });
  }, 10_000); // 10s de "conserto"
};
```

---

## Stack & Setup

### Requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
git clone https://github.com/claude-brothers/myopia
cd myopia
npm install
```

### Rodar localmente

```bash
npm run dev
# http://localhost:5173
```

### Build de produção

```bash
npm run build
npm run preview
```

### Estrutura de arquivos relevante

```
src/
├── components/
│   ├── BlurOverlay.tsx        # Camada de blur com mask dinâmico
│   ├── Glasses.tsx            # Componente arrastável do óculos
│   ├── WiperAnimation.tsx     # Animação de limpador
│   └── CrackOverlay.tsx       # Sobreposição de rachaduras
├── hooks/
│   ├── useGlassesPhysics.ts   # Física de queda e inércia
│   └── useLensCondition.ts    # Estado de sujeira/embaçamento
├── scenes/
│   ├── Win11Scene.tsx         # iframe do Win11
│   ├── GoogleClone.tsx        # Clone do Google com busca funcional
│   └── YouTubeClone.tsx       # Clone do YouTube com navegação
└── sounds/
    └── wiper.mp3
```

---

> *"Nossa missão é simples: transformar uma tarefa fácil em algo memoravelmente pior."*  
> — Claude Brothers, Codecon Universe Hackathon de Ideias Inúteis