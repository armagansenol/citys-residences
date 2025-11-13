import { Img } from '@/components/utility/img'

export function PreloaderServer() {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <div
      id='server-preloader'
      className='pointer-events-none fixed left-0 top-0 z-[var(--z-preloader)] flex h-full w-full items-center justify-center overflow-hidden bg-bricky-brick'
    >
      <div className='size-32'>
        <Img
          src='/gif/citys-logo-animation.gif'
          alt="City's Residences Logo Animation"
          width={256}
          height={256}
          priority={true}
        />
      </div>
    </div>
  )
}
