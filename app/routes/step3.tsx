import CardSection from '@/components/CardSection';
import Title from '@/components/Title';
import { Button, buttonVariants } from '@/components/ui/button';
import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import { CircleArrowLeft, Palette, MessageCircleHeart, Milestone, UtensilsCrossed } from 'lucide-react';

const getName = createServerFn({
  method: "GET",
})
.validator((data: string) => data)
.handler(async (ctx) => {
  setCookie("travelWith", ctx.data);
  const name = getCookie("name");

  if (name) {
    return {
      name: name,
      travelWith: ctx.data
    }
  } else {
    throw redirect({ to: "/"})
  }
});

const selectType = (type: string) => {
  localStorage.setItem("actType", type);
}

const travelWithType = (companion: string) => {
  switch(companion) {
    case "single":
      return "혼자서"
    case "friend":
      return "친구와"
    case "sweetheart":
      return "연인과"
    case "family":
      return "가족과"
  }
}

export const Route = createFileRoute('/step3')({
  component: RouteComponent,
  validateSearch: (search) =>
    search as {
      travelWith: string
    },
  loaderDeps: ({ search: { travelWith } }) => ({
    travelWith,
  }),
  loader: ({ deps: { travelWith } }) => (
    getName({ data: travelWith })
  )
})

function RouteComponent() {
  const data = Route.useLoaderData();
  const router = useRouter();

  return (
    <>
    <Title type="h1" text="어떤 여행이 좋으신가요?" name={data.name} />
    <CardSection>
      <p className="text-xl">{travelWithType(data.travelWith)} {data.travelWith === "single" ? "":"함께"}</p>
      <form className="w-full lg:w-64 grid grid-cols-2 lg:flex gap-2 lg:flex-nowrap! flex-wrap" onSubmit={async (e) => {
        e.preventDefault();
        const type = localStorage.getItem("actType");

        if (type) {
          localStorage.clear();
          router.navigate({
            viewTransition: true,
            href: `/step3?act=${type}`
          });
        }
      }}>
        <Button type="submit" variant={"secondary"} className="text-xl flex-col h-32 lg:w-32" onClick={(e) => selectType("heartful")}>
          <MessageCircleHeart size={48} className="grow min-w-8" strokeWidth={1} />
          감성
        </Button>
        <Button type="submit" variant={"secondary"} className="text-xl flex-col h-32 lg:w-32" onClick={(e) => selectType("activity")}>
          <Milestone size={48} className="grow min-w-8" strokeWidth={1} />
          액티비티
        </Button>
        <Button type="submit" variant={"secondary"} className="text-xl flex-col h-32 lg:w-32" onClick={(e) => selectType("food")}>
          <UtensilsCrossed size={48} className="grow min-w-8" strokeWidth={1} />
          먹방
        </Button>
        <Button type="submit" variant={"secondary"} className="text-xl flex-col h-32 lg:w-32" onClick={(e) => selectType("culture")}>
          <Palette size={48} className="grow min-w-8" strokeWidth={1} />
          문화체험
        </Button>
      </form>
      <p className="text-xl">중심의 여행을 하고 싶어요.</p>
      <div className="w-fit">
        <Link to={`/step2`} search={{ name: data.name }} className={ buttonVariants() }>
          <CircleArrowLeft />
          이전 단계로
        </Link>
      </div>
    </CardSection>
    </>
  )
}
