<p align="center">
  <img
    width="223"
    height="233"
    alt="image"
    src="https://github.com/user-attachments/assets/7e026217-1611-42ed-bf7a-a0e4022693e6"
  />
</p>


> *O primeiro simulador de miopia extrema focado em proporcionar uma experiência autêntica, imersiva e desnecessariamente inconveniente.*

---

## Nossa visão: Claude Brothers

Somos a **Claude Brothers**, um grupo comprometido com a criação de soluções tecnológicas para problemas que ninguém pediu para resolver.

Nossa empresa é focada na **UU — User Unexperienced**: a DESexperiência do Usuário. Uma nova definição de design que traz o conceito de **acessibilidade reversa**.

---

## Visão do produto

Apresentamos o **MyOpia**: nossa plataforma aplica um avançado sistema de degradação visual em tempo real, tornando toda a área de trabalho propositalmente desfocada. Para recuperar a visão, o usuário deve manipular um par de óculos virtual pela tela, reproduzindo fielmente os desafios do cotidiano de quem depende de correção visual.

Mas não paramos por aí. Os óculos exigem manutenção constante: podem embaçar, acumular gotas de chuva, sujar e até quebrar caso sejam derrubados de uma altura excessiva. Dessa forma, oferecemos uma experiência completa de gerenciamento de visão, responsabilidade óptica e sofrimento digital.

Nossa missão é simples: **transformar uma tarefa fácil em algo memoravelmente pior.**

Se você não vê potencial na nossa ideia… você está no caminho certo.

---

## Funcionalidades

### Simulação Visual
- **Blur dinâmico** fora das lentes dos óculos — quanto mais longe dos óculos, mais turvo
- **Sujeira progressiva** nas lentes ao longo do tempo, com acúmulo realista de poeira
- **Pano de limpeza interativo** — arraste para limpar as lentes manualmente
- **Simulação de chuva** com gotas nas lentes e limpador de parabrisa automático
- **Sons ambiente** sincronizados com a chuva e o limpador

### Óculos Físicos
- **Física completa**: gravidade, fricção, quique e momento de arrasto
- **Quebra por impacto**: óculos caem e quebram se jogados com velocidade excessiva
- **Arrastar e soltar** com velocidade de lançamento calculada pelo histórico de posição

### Doenças Oculares (Plano Pro)
Simulação com grau ajustável de:
- Astigmatismo
- Hipermetropia
- Glaucoma
- Catarata

### Ambientes Simulados
Todos os ambientes rodam com o overlay de miopia ativo:
| Ambiente | Descrição |
|---|---|
| **Windows** | Simulador de Windows 11 no navegador |
| **Myoopia** | Clone do Google |
| **MyoTube** | Clone do YouTube |
| **reCAPTCHA** | Desafio de imagens do Google — com miopia |

### Planos
| | Free | Pro | Enterprise |
|---|---|---|---|
| Blur | Leve | Personalizável | Personalizável |
| Doenças oculares | — | ✓ | ✓ |
| Skin de armação | — | ✓ | ✓ |
| Lente de contato | — | — | ✓ |
| Conserto dos óculos | 4 horas | Instantâneo | Sem quebra |
| Preço | Grátis | R$ 9,90/mês | R$ 500/mês |

### Lente de Contato (Enterprise)
Usuários Enterprise podem ativar a lente de contato diretamente na Ótica: visão completamente normal, sem blur, sem chuva.

### Ótica MyOpia
Loja de armações com:
- Preview em tempo real antes de comprar
- Múltiplas formas: Redondo, Quadrado, Retangular, Olho de Gato, Coleção Especial
- Sistema de compra via PIX (manual)

### Missões
Sistema de conquistas desbloqueadas conforme o usuário explora os ambientes.

---

## Stack Técnica

| Camada | Tecnologia |
|---|---|
| Framework | React 19 |
| Linguagem | TypeScript 6 |
| Build | Vite 8 |
| Estilo | Tailwind CSS v4 |
| Roteamento | React Router v7 | 
| Estado global | Zustand + Context API |
| Animações | Framer Motion |
| Áudio | Howler.js |

### Arquitetura

```
src/
├── pages/
│   ├── Home/          # Tela inicial com seleção de plano e ambientes
│   ├── Browser/       # Clone do Google (busca + resultados)
│   ├── Youtube/       # Clone do YouTube (listagem + watch)
│   ├── Windows/       # Simulador de desktop Windows 11
│   ├── captcha/       # Desafio reCAPTCHA
│   ├── Otica/         # Loja de armações e configurações visuais
│   └── Missoes/       # Sistema de conquistas
├── components/
│   ├── SimulatedLayout   # Wrapper que injeta todos os overlays de miopia
│   ├── BlurOverlay       # Blur SVG com máscara nas lentes
│   ├── Glasses           # Óculos arrastável com física
│   ├── CleaningCloth     # Pano de limpeza interativo
│   ├── RainCanvas        # Canvas de gotas de chuva
│   ├── WiperAnimation    # Limpador de parabrisa
│   ├── ConditionOverlay  # Overlay de doenças oculares
│   └── ConfigPanel       # Painel de controle (canto inferior direito)
├── contexts/
│   ├── PlanContext       # Plano ativo + lente de contato
│   ├── SkinContext       # Armação equipada / em prévia
│   └── ConditionContext  # Estado das doenças oculares
├── hooks/
│   ├── useGlassesPhysics # Loop RAF com gravidade, bounce e quebra
│   ├── useLensCondition  # Acúmulo de sujeira e limpeza por pano
│   ├── useRain           # Ciclos de chuva aleatórios
│   └── useRainSounds     # Áudio sincronizado com chuva/limpador
└── data/
    ├── plans.ts          # Definição dos planos e features
    ├── skins.ts          # Catálogo de armações
    └── conditions.ts     # Doenças oculares disponíveis
```

### Destaques de implementação

**Blur por máscara SVG** — O `BlurOverlay` usa `<mask>` SVG para aplicar `backdrop-filter: blur()` fora das lentes e sujeira dentro, seguindo a posição e rotação dos óculos em tempo real via `transform`.

**Física dos óculos** — `useGlassesPhysics` roda um loop `requestAnimationFrame` com gravidade, fricção e bounce nas paredes. A velocidade de lançamento é calculada pelo histórico dos últimos 80ms de posição do mouse. Queda com velocidade vertical acima de 18px/frame quebra os óculos.

**Chuva desacoplada** — `useRain` agenda ciclos aleatórios (20–40s de chuva, 30–60s de seca) independentes da renderização. Aceita um flag `disabled` para ser inativado instantaneamente pela lente de contato sem cancelar timers do lado do consumidor.

**Lente de contato** — Quando ativa, o `SimulatedLayout` suprime a renderização de todos os overlays (`BlurOverlay`, `Glasses`, `RainCanvas`, etc.) sem desmontar os hooks subjacentes, preservando o estado da física e da sujeira.

---

## Passos para instalação

Necessário ter NodeJS instalado

```bash
npm install
npm run dev
```

```bash
# Checar tipos + build de produção
npm run build
```
Se você tentar rodar 73 vezes e não funcionar, desista de ser dev. Obs.: o Atacação está contratando

Pegou a visão?!

---

*Claude Brothers · CodeCon 2026*
