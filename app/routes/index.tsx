// app/routes/index.tsx
import { createFileRoute, Link, useNavigate, useRouter } from '@tanstack/react-router'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CircleArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'

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
    <section className="rounded-tl-lg rounded-br-lg bg-white w-fit p-4 border-slate-400 border-2">
      <p>
        <span className="text-xl block">당신의 여행 플래너,</span>
        <span className="text-2xl flex align-bottom gap-0.5">
          <span className="text-cyan-600 text-3xl">Travia</span>
          <span className="leading-10.5">입니다.</span>
        </span>
      </p>
      <p>지금부터 함께 여행 계획을 세워볼게요.</p>
    </section>
    <Card className="rounded-lg bg-white border-slate-400 border-1 my-2 p-4 grow">
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
      <Link to="/" className="block text-cyan-600">이미 계정이 있나요? 지금 바로 로그인하세요.</Link>
    </Card>
    </>
  )
}