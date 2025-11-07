import ProjectSection from '@/components/sections/project'
import { Wrapper } from '@/components/wrapper'

export default function Page({ params }: { params: { locale: string } }) {
  return (
    <Wrapper>
      <ProjectSection params={params} />
    </Wrapper>
  )
}
