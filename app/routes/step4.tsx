import CardSection from '@/components/CardSection';
import Title from '@/components/Title';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import { CircleArrowLeft, CircleArrowRight, Car, TramFront } from 'lucide-react';
import { useRef } from 'react';
import { animate, number } from "motion";

const getAct = createServerFn({
  method: "GET",
})
.validator((data: string) => data)
.handler(async (ctx) => {
  setCookie("actType", ctx.data);
  const name = getCookie("name");
  const travelWith = getCookie("travelWith");

  if (name && travelWith) {
    return {
      name: name,
      travelWith: travelWith,
      actType: ctx.data.split(",")
    }
  } else {
    throw redirect({ to: "/"})
  }
});

function numberHelper(e: React.ChangeEvent<HTMLInputElement>) {
  const original = e.target.value.split(",").join("");
  const numberArray = original.split("")

  for (let i = original.length - 3; i > 0; i -= 3) {
    numberArray.splice(i, 0, ",");
  }

  e.target.value = numberArray.join("");  
}

function RouteComponent() {
  const data = Route.useLoaderData();
  const router = useRouter();
  
  const public_transport = useRef<HTMLLabelElement>(null);
  const car = useRef<HTMLLabelElement>(null);

  return (
    <>
    <Title type="h1" text="Could you tell me about more details?" name={data.name} />
    <CardSection>
      <form className="flex flex-col gap-4 w-full lg:w-max" onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const day = formData.get("day");
        const night = formData.get("night");
        const budget = formData.get("amount");
        const transport = formData.get("transport");

        if (day && night && transport) {
          const schedule = `${night}night ${day}days`;
          
          router.navigate({
            viewTransition: true,
            href: `/step5?schedule=${schedule}&transport=${transport}&budget=${budget}KRW`
          })
        }
      }}>
        <p className="text-2xl border-b-2 border-cyan-600 w-fit">My budget and period is</p>
        <p className="flex text-2xl gap-1">
          <Input name="night" maxLength={2} className="w-12 text-2xl" required />
          <label htmlFor="night">Night(s)</label>
          <Input name="day" maxLength={2} className="w-12 text-2xl" required />
          <label htmlFor="day">Day(s)</label>
        </p>
        <p className="flex text-2xl flex-wrap">
          with
          <Input name="amount" inputMode="numeric" className="text-2xl max-w-40 mx-1" onChange={(e) => numberHelper(e)} />
          <label htmlFor="amount">Won(KRW)</label>
          <span className="block break-keep"></span>
        </p>

        <p className="text-2xl border-b-2 border-cyan-600 w-fit">While moving</p>
        <div className="w-full grid grid-cols-2 lg:flex gap-2 lg:flex-nowrap! flex-wrap grow">
          <label htmlFor="public_transport" className={`text-xl flex-col h-32 lg:w-32 ${ buttonVariants({ variant: "secondary" })}`} ref={public_transport}>
            <TramFront size={48} className="grow min-w-8" strokeWidth={1} />
            Take Public<br/>Transportation
          </label>
          <input name="transport" id="public_transport" value="public_transport" type="radio" className="hidden" onChange={async (e) => {
            if(e.target.checked && public_transport.current && car.current) {
              public_transport.current.classList.remove("bg-secondary");
              public_transport.current.classList.remove("hover:bg-secondary/80");
              public_transport.current.classList.add("bg-sky-100");
              public_transport.current.classList.add("hover:bg-sky-50");
            
              animate(car.current, { borderWidth: 0 }, { duration: 0.3 });
              car.current.classList.remove("bg-sky-100");
              car.current.classList.remove("hover:bg-sky-50");
              car.current.classList.add("bg-secondary");
              car.current.classList.add("hover:bg-secondary/80");
            }
          }}/>

          <label htmlFor="car" className={`text-xl flex-col h-32 lg:w-32 ${ buttonVariants({ variant: "secondary" })}`} ref={car}>
            <Car size={48} className="grow min-w-8" strokeWidth={1} />
            Drive<br />a car
          </label>
          <input name="transport" id="car" value="car" type="radio" className="hidden" onChange={async (e) => {
            if(e.target.checked && car.current && public_transport.current) {
              car.current.classList.remove("bg-secondary");
              car.current.classList.remove("hover:bg-secondary/80");
              car.current.classList.add("bg-sky-100");
              car.current.classList.add("hover:bg-sky-50");

              animate(public_transport.current, { borderWidth: 0 }, { duration: 0.3 });
              public_transport.current.classList.remove("bg-sky-100");
              public_transport.current.classList.remove("hover:bg-sky-50");
              public_transport.current.classList.add("bg-secondary");
              public_transport.current.classList.add("hover:bg-secondary/80");
            }
          }}/>
        </div>
        <div className="flex justify-between">
          <Link to={`/step3`} search={{ travelWith: data.travelWith }} className={ buttonVariants() }>
            <CircleArrowLeft />
            Back
          </Link>
          <Button type="submit">
            Last Step
            <CircleArrowRight />
          </Button>
        </div>
      </form>
    </CardSection>
    </>
  )
}

export const Route = createFileRoute('/step4')({
  component: RouteComponent,
  validateSearch: (search) =>
    search as {
      act: string
    },
  loaderDeps: ({ search: { act } }) => ({
    act,
  }),
  loader: ({ deps: { act } }) => (
    getAct({ data: act })
  )
})

