import CardSection from '@/components/CardSection';
import Title from '@/components/Title';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import { CircleArrowLeft, Palette, MessageCircleHeart, Milestone, UtensilsCrossed, CircleArrowRight, CircleEllipsis } from 'lucide-react';
import { useRef } from 'react';
import { animate } from "motion";
import { titleInfo } from './__root';

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

// export const travelWithType = (companion: string) => {
//   switch(companion) {
//     case "혼자":
//       return "혼자서"
//     case "친구":
//       return "친구와"
//     case "연인":
//       return "연인과"
//     case "가족":
//       return "가족과"
//   }
// }

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
  
  const heartful = useRef<HTMLLabelElement>(null);
  const activities = useRef<HTMLLabelElement>(null);
  const food = useRef<HTMLLabelElement>(null);
  const culture = useRef<HTMLLabelElement>(null);

  const others = useRef<HTMLButtonElement>(null);
  const othersForm = useRef<HTMLDivElement>(null);
  const othersInput = useRef<HTMLInputElement>(null);

  titleInfo.setState((state) => {
    return {
      ...state,
      type: "h1",
      text: "What is your favorite trip style?"
    }
  })

  return (
    <CardSection>
      <form className="flex flex-col gap-4 w-full lg:w-max" onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let types = formData.getAll("type").join(",");
        const others = formData.get("others")

        if (others) {
          if (types) {
            types = types.concat(`,${others}`);
          } else {
            types = others.toString();
          }
        }

        router.navigate({
          viewTransition: true,
          href: `/step4?act=${types}`
        })
      }}>
        <p className="text-xl">{data.travelWith === "single" ? "": `With ${data.travelWith},`} </p>
        <div className="w-full grid grid-cols-2 lg:flex gap-2 lg:flex-nowrap! flex-wrap grow">
          <label htmlFor="heartful" className={`text-xl flex-col h-32 lg:w-32 !whitespace-normal text-center ${ buttonVariants({ variant: "secondary" })}`} ref={heartful}>
            <MessageCircleHeart size={48} className="grow min-w-8" strokeWidth={1} />
            Heartful Stories
          </label>
          <input name="type" id="heartful" value="heartful" type="checkbox" className="hidden" onChange={async (e) => {
            if(e.target.checked && heartful.current) {
              heartful.current.classList.remove("bg-secondary");
              heartful.current.classList.remove("hover:bg-secondary/80");
              heartful.current.classList.add("bg-sky-100");
              heartful.current.classList.add("hover:bg-sky-50");
            } else if(heartful.current) {
              animate(heartful.current, { borderWidth: 0 }, { duration: 0.3 });
              heartful.current.classList.remove("bg-sky-100");
              heartful.current.classList.remove("hover:bg-sky-50");
              heartful.current.classList.add("bg-secondary");
              heartful.current.classList.add("hover:bg-secondary/80");
            }
          }}/>

          <label htmlFor="activity" className={`text-xl flex-col h-32 lg:w-32 !whitespace-normal text-center ${ buttonVariants({ variant: "secondary" })}`} ref={activities}>
            <Milestone size={48} className="grow min-w-8" strokeWidth={1} />
            Lots of activities
          </label>
          <input name="type" id="activity" value="activity" type="checkbox" className="hidden" onChange={async (e) => {
            if(e.target.checked && activities.current) {
              activities.current.classList.remove("bg-secondary");
              activities.current.classList.remove("hover:bg-secondary/80");
              activities.current.classList.add("bg-sky-100");
              activities.current.classList.add("hover:bg-sky-50");
            } else if(activities.current) {
              animate(activities.current, { borderWidth: 0 }, { duration: 0.3 });
              activities.current.classList.remove("bg-sky-100");
              activities.current.classList.remove("hover:bg-sky-50");
              activities.current.classList.add("bg-secondary");
              activities.current.classList.add("hover:bg-secondary/80");
            }
          }}/>

          <label htmlFor="food" className={`text-xl flex-col h-32 lg:w-32 !whitespace-normal text-center ${ buttonVariants({ variant: "secondary" })}`} ref={food}>
            <UtensilsCrossed size={48} className="grow min-w-8" strokeWidth={1} />
            Experience various foods
          </label>
          <input name="type" id="food" value="food" type="checkbox" className="hidden" onChange={async (e) => {
            if(e.target.checked && food.current) {
              food.current.classList.remove("bg-secondary");
              food.current.classList.remove("hover:bg-secondary/80");
              food.current.classList.add("bg-sky-100");
              food.current.classList.add("hover:bg-sky-50");
            } else if(food.current) {
              animate(food.current, { borderWidth: 0 }, { duration: 0.3 });
              food.current.classList.remove("bg-sky-100");
              food.current.classList.remove("hover:bg-sky-50");
              food.current.classList.add("bg-secondary");
              food.current.classList.add("hover:bg-secondary/80");
            }
          }}/>

          <label htmlFor="culture" className={`text-xl flex-col h-32 lg:w-32 !whitespace-normal text-center ${ buttonVariants({ variant: "secondary" })}`} ref={culture}>
            <Palette size={48} className="grow min-w-8" strokeWidth={1} />
            Cultural experiences
          </label>
          <input name="type" id="culture" value="culture" type="checkbox" className="hidden" onChange={async (e) => {
            if(e.target.checked && culture.current) {
              culture.current.classList.remove("bg-secondary");
              culture.current.classList.remove("hover:bg-secondary/80");
              culture.current.classList.add("bg-sky-100");
              culture.current.classList.add("hover:bg-sky-50");
            } else if(culture.current) {
              animate(culture.current, { borderWidth: 0 }, { duration: 0.3 });
              culture.current.classList.remove("bg-sky-100");
              culture.current.classList.remove("hover:bg-sky-50");
              culture.current.classList.add("bg-secondary");
              culture.current.classList.add("hover:bg-secondary/80");
            }
          }} />

          <Button variant={"secondary"} className="text-xl flex-col h-32 lg:w-32 !whitespace-normal text-center" ref={others} onClick={async (e) => {
            if (others.current && othersForm.current) {
              await animate(others.current, { opacity: 0 }, { duration: 0.3 });
              await animate(othersForm.current, { opacity: 1 }, { duration: 0.3 });
              others.current.hidden = true;
              othersForm.current.hidden = false;
            }
          }} type="button">
            <CircleEllipsis size={48} className="grow min-w-8" strokeWidth={1} />
            Others
          </Button>

          <div ref={othersForm} hidden className="h-32 flex flex-col justify-center border bg-sky-50 rounded-md p-2">
            <div className="flex justify-between">
              <label htmlFor="others" className="flex gap-1">
                <CircleEllipsis strokeWidth={1} />
                Others
              </label>
              <button type="button" onClick={async (e) => {
                if (others.current &&
                  othersForm.current &&
                  othersInput.current) {
                  await animate(othersForm.current, { opacity: 0 }, { duration: 0.3 });
                  await animate(others.current, { opacity: 1 }, { duration: 0.3 });
                  othersForm.current.hidden = true;
                  others.current.hidden = false;
                  othersInput.current.value = "";
                }
              }} className="hover:bg-sky-100 rounded-md p-1">Cancel</button>
            </div>
            <p className="text-sm">Explain various styles using ','</p>
            <Input name="others" className="mt-2" ref={othersInput} />
          </div>
        </div>
        {/* <p className="text-xl">중심의 여행을 하고 싶어요.</p> */}
        <div className="flex justify-between">
          <Link to={`/step2`} search={{ name: data.name }} className={ buttonVariants() }>
            <CircleArrowLeft />
            Back
          </Link>
          <Button type="submit">
            Well done!
            <CircleArrowRight />
          </Button>
        </div>
      </form>
    </CardSection>
  )
}
