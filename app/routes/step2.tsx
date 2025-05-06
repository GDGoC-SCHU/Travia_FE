import CardSection from '@/components/CardSection';
import Title from '@/components/Title';
import { Button, buttonVariants } from '@/components/ui/button';
import { createFileRoute, Link, redirect, useNavigate, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import { setCookie } from '@tanstack/react-start/server';
import { Blend, CircleArrowLeft, Handshake, Heart, User } from 'lucide-react';

const getName = createServerFn({
  method: "GET",
})
.validator((data: string) => data)
.handler(async (ctx) => {
  setCookie("name", ctx.data);

  return {
    name: ctx.data
  }
});

const selectType = (type: string) => {
  localStorage.setItem("with", type);
}


export const Route = createFileRoute('/step2')({
  component: SecondStep,
  validateSearch: (search) =>
    search as {
      name: string
    },
  loaderDeps: ({ search: { name } }) => ({
    name,
  }),
  loader: ({ deps: { name } }) => (
    getName({ data: name })
  )
});

function SecondStep() {
  const data = Route.useLoaderData();
  const router = useRouter();

  return (
    <>
    <Title type="h1" text="누구와 함께 하실 계획이신가요?" name={data.name} />
    <CardSection>
      <form className="w-full lg:w-64 grid grid-cols-2 lg:flex gap-2 lg:flex-nowrap! flex-wrap" onSubmit={async (e) => {
        e.preventDefault();
        const type = localStorage.getItem("with");

        if (type) {
          localStorage.clear();
          router.navigate({
            viewTransition: true,
            href: `/step3?type=${type}`
          });
        }
      }}>
        <Button type="submit" variant={"secondary"} className="text-xl flex-col h-32 lg:w-32" onClick={(e) => selectType("single")}>
          <User size={48} className="grow min-w-8" strokeWidth={1} />
          혼자
        </Button>
        <Button type="submit" variant={"secondary"} className="text-xl flex-col h-32 lg:w-32" onClick={(e) => selectType("friend")}>
          <Handshake size={48} className="grow min-w-8" strokeWidth={1} />
          친구와
        </Button>
        <Button type="submit" variant={"secondary"} className="text-xl flex-col h-32 lg:w-32" onClick={(e) => selectType("sweetheart")}>
          <Heart size={48} className="grow min-w-8" strokeWidth={1} />
          연인과
        </Button>
        <Button type="submit" variant={"secondary"} className="text-xl flex-col h-32 lg:w-32" onClick={(e) => selectType("family")}>
          <Blend size={48} className="grow min-w-8" strokeWidth={1} />
          가족과
        </Button>
      </form>
      <div className="w-fit">
        <Link to="/" className={ buttonVariants() }>
          <CircleArrowLeft />
          이전
        </Link>
      </div>
    </CardSection>
    </>
  )
}
