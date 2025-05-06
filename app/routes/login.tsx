import CardSection from '@/components/CardSection'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createFileRoute } from '@tanstack/react-router'
import { CircleArrowRight } from 'lucide-react'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
    <Title type="h1" text="여기에서 로그인하세요." />
    <CardSection>
      <form className="w-fit">
        <Label htmlFor="name">이름</Label>
        <Input type="text" id="name" className="text-lg mt-0.5 mb-2" />
        <Label htmlFor="password">비밀번호</Label>
        <Input type="password" id="password" className="text-lg mt-0.5 mb-4" />
        <Button type="submit" className="text-xl items-center">
          로그인
          <CircleArrowRight />
        </Button>
      </form>
    </CardSection>
    </>
  )
}
