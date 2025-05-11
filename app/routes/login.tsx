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
    <Title type="h1" text="Login here." />
    <CardSection>
      <form className="w-fit">
        <Label htmlFor="name">Nickname</Label>
        <Input type="text" id="name" className="text-lg mt-0.5 mb-2" required />
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" className="text-lg mt-0.5 mb-4" required />
        <Button type="submit" className="text-xl items-center">
          Login
          <CircleArrowRight />
        </Button>
      </form>
    </CardSection>
    </>
  )
}
