import BackButton from '../../components/BackButton'

export default function Windows() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <iframe src="https://win11.blueedge.me/" width="100%" height="100%"></iframe>
      <BackButton />
    </div>
  )
}