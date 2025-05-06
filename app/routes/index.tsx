// app/routes/index.tsx
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CircleArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'
import Title from '@/components/Title'
import CardSection from '@/components/CardSection'

export const Route = createFileRoute('/')({
  component: Home,
});

function Validation(name: string) {
  if (name.trim() === "" || !name) {
    return false;
  } else {
    return true;
  }
}

function Home() {
  const router = useRouter();
  const [warn, setWarn] = useState<boolean>(false);
  const name = useRef<HTMLInputElement|null>(null);

  return (
    <>
    <Title type="p" text="지금부터 함께 여행 계획을 세워볼게요."/>
    <CardSection>
      <h1 className="text-2xl">
        먼저,
        <Label htmlFor="name" className="text-2xl">이름을 알려주세요.</Label>
      </h1>
      <form onSubmit={async (e) => {
        e.preventDefault();
        if (name.current && Validation(name.current.value)) {
          router.navigate({
            viewTransition: true,
            href: `/step2?name=${name.current.value}`
          })
        }
      }} className="w-fit">
        <div className="flex gap-2">
          <Input type="text" id="name" placeholder="이름" className="text-lg" ref={name} onChange={(e) => setWarn(!Validation(e.target.value))} />
          <Button type="submit" className="text-xl items-center">
            다음
            <CircleArrowRight />
          </Button>
        </div>
        {warn ? <p className="text-red-400 m-0.5">성함은 빈 칸으로 둘 수 없어요.</p> :null}
      </form>
      <Link to="/login" className="block text-cyan-600">이미 계정이 있나요? 지금 바로 로그인하세요.</Link>
    </CardSection>
    </>
  )
}