// app/routes/index.tsx
import * as fs from 'node:fs'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CircleArrowRight } from 'lucide-react'

const filePath = 'count.txt'

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  )
}

const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount()
    await fs.promises.writeFile(filePath, `${count + data}`)
  })

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getCount(),
})

function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()

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
      <div className="w-fit flex gap-2">
      <Input type="text" id="name" placeholder="이름" className="text-lg" />
      <Link to="/" className={`${buttonVariants({ variant: "default"})} text-xl items-center`}>
        다음
        <CircleArrowRight />
      </Link>
      </div>
    </Card>
    </>
  )
}