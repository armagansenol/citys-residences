import { AspectCover } from '@/components/aspect-cover'
import { Wrapper } from '@/components/wrapper'

export default function TestPage() {
  return (
    <Wrapper>
      <div className='flex h-screen w-screen items-center justify-center'>
        <div className='aspect-[9/3] w-[500px]'>
          <AspectCover ratio={16 / 9}>
            <div className='text-black'>Hello</div>
          </AspectCover>
        </div>
      </div>
    </Wrapper>
  )
}
