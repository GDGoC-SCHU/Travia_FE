import CardSection from '@/components/CardSection';
import Title from '@/components/Title';
import { Button, buttonVariants } from '@/components/ui/button';
import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import { CircleArrowLeft, CircleArrowRight, Coffee, CakeSlice, Pizza, Pyramid, FishSymbol, CircleEllipsis, FlameKindling, Leaf, Snowflake, Footprints, Armchair, Activity } from 'lucide-react';
import { useRef } from 'react';
import { titleInfo } from './__root';

const getST = createServerFn({
  method: "GET",
})
.validator((data: {
  schedule: string,
  budget: string,
  transport: "public_transport" | "car"
}) => data)
.handler(async (ctx) => {
  setCookie("schedule", ctx.data.schedule);
  setCookie("transport", ctx.data.transport);
  setCookie("budget", ctx.data.budget);

  titleInfo.setState((state) => {
    return {
      ...state,
      type: "h1",
      text: "Lastly, what is your favorite environment?"
    }
  });

  const name = getCookie("name");
  const travelWith = getCookie("travelWith");
  const actType = getCookie("actType");

  if (!name) {
    throw redirect({ to: "/"});
  } else if (!travelWith) {
    throw redirect({ to: "/step2", search: { name: name }});
  } else if (!actType) {
    throw redirect({ to: "/step3", search: { travelWith: travelWith }});
  } else if (!ctx.data.schedule || !ctx.data.transport) {
    throw redirect({ to: "/step4", search: { act: actType }});
  } else {
    return {
      name: name,
      travelWith: travelWith,
      actType: actType,
      schedule: ctx.data.schedule,
      transport: ctx.data.transport
    }
  }
});

export const Route = createFileRoute('/step5')({
  component: RouteComponent,
  validateSearch: (search) =>
    search as {
      schedule: string,
      budget: string,
      transport: "public_transport" | "car"
    },
  loaderDeps: ({ search: { schedule, budget, transport } }) => ({
    schedule, budget, transport
  }),
  loader: ({ deps: { schedule, budget, transport } }) => (
    getST({ data: {
      schedule: schedule,
      budget: budget,
      transport: transport }
    })
  )
})

function RouteComponent() {
  const data = Route.useLoaderData();
  const router = useRouter();
  
  const asia = useRef<HTMLLabelElement>(null);
  const europe = useRef<HTMLLabelElement>(null);
  const america = useRef<HTMLLabelElement>(null);
  const africa = useRef<HTMLLabelElement>(null);
  const oceania = useRef<HTMLLabelElement>(null);
  const cont_others = useRef<HTMLLabelElement>(null);
  const warm = useRef<HTMLLabelElement>(null);
  const fresh = useRef<HTMLLabelElement>(null);
  const snowy = useRef<HTMLLabelElement>(null);
  const relaxed = useRef<HTMLLabelElement>(null);
  const moderate = useRef<HTMLLabelElement>(null);
  const active = useRef<HTMLLabelElement>(null);

  return (
    <CardSection>
      <form className="flex flex-col gap-4 w-full lg:w-max" onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const continent = formData.get("continent");
        const environment = formData.get("environment");
        const pace = formData.get("pace");

        if (continent && environment && pace) {
          router.navigate({
            viewTransition: true,
            href: `/result?cont=${continent}&env=${environment}&pace=${pace}`
          })
        }
      }}>
        <p className="text-2xl border-b-2 border-cyan-600 w-fit">Continent</p>
        <div className="w-full max-w-(--scrollable-max-width) flex gap-2 overflow-scroll rounded-md">
          <label htmlFor="asia" className={`hover:bg-sky-50 text-xl flex-col h-32 w-32 !whitespace-normal text-center ${ buttonVariants({ variant: "secondary" })}`} ref={asia}>
            <Coffee size={48} className="grow min-w-8" strokeWidth={1} />
            Asia
          </label>
          <input name="continent" id="asia" value="asia" type="radio" className="hidden" onChange={async (e) => {
            if(e.target.checked) {
              asia.current?.classList.remove("bg-secondary");
              asia.current?.classList.add("bg-sky-100");
            
              europe.current?.classList.remove("bg-sky-100");
              europe.current?.classList.add("bg-secondary");
              america.current?.classList.remove("bg-sky-100");
              america.current?.classList.add("bg-secondary");
              africa.current?.classList.remove("bg-sky-100");
              africa.current?.classList.add("bg-secondary");
              cont_others.current?.classList.remove("bg-sky-100");
              cont_others.current?.classList.add("bg-secondary");
            }
          }}/>

          <label htmlFor="europe" className={`hover:bg-sky-50 text-xl flex-col h-32 w-32 !whitespace-normal text-center ${ buttonVariants({ variant: "secondary" })}`} ref={europe}>
            <CakeSlice size={48} className="grow min-w-8" strokeWidth={1} />
            Europe
          </label>
          <input name="continent" id="europe" value="europe" type="radio" className="hidden" onChange={async (e) => {
            if(e.target.checked) {
              europe.current?.classList.remove("bg-secondary");
              europe.current?.classList.add("bg-sky-100");

              asia.current?.classList.remove("bg-sky-100");
              asia.current?.classList.add("bg-secondary");
              america.current?.classList.remove("bg-sky-100");
              america.current?.classList.add("bg-secondary");
              africa.current?.classList.remove("bg-sky-100");
              africa.current?.classList.add("bg-secondary");
              oceania.current?.classList.remove("bg-sky-100");
              oceania.current?.classList.add("bg-secondary");
              cont_others.current?.classList.remove("bg-sky-100");
              cont_others.current?.classList.add("bg-secondary");
            }
          }}/>

          <label htmlFor="america" className={`hover:bg-sky-50 text-xl flex-col h-32 w-32 !whitespace-normal text-center ${ buttonVariants({ variant: "secondary" })}`} ref={america}>
            <Pizza size={48} className="grow min-w-8" strokeWidth={1} />
            America
          </label>
          <input name="continent" id="america" value="america" type="radio" className="hidden" onChange={async (e) => {
            if(e.target.checked) {
              america.current?.classList.remove("bg-secondary");
              america.current?.classList.add("bg-sky-100");

              asia.current?.classList.remove("bg-sky-100");
              asia.current?.classList.add("bg-secondary");
              europe.current?.classList.remove("bg-sky-100");
              europe.current?.classList.add("bg-secondary");
              africa.current?.classList.remove("bg-sky-100");
              africa.current?.classList.add("bg-secondary");
              oceania.current?.classList.remove("bg-sky-100");
              oceania.current?.classList.add("bg-secondary");
              cont_others.current?.classList.remove("bg-sky-100");
              cont_others.current?.classList.add("bg-secondary");
            }
          }}/>

          <label htmlFor="africa" className={`hover:bg-sky-50 text-xl flex-col h-32 w-32 !whitespace-normal text-center ${ buttonVariants({ variant: "secondary" })}`} ref={africa}>
            <Pyramid size={48} className="grow min-w-8" strokeWidth={1} />
            Africa
          </label>
          <input name="continent" id="africa" value="africa" type="radio" className="hidden" onChange={async (e) => {
            if(e.target.checked) {
              africa.current?.classList.remove("bg-secondary");
              africa.current?.classList.add("bg-sky-100");

              asia.current?.classList.remove("bg-sky-100");
              asia.current?.classList.add("bg-secondary");
              europe.current?.classList.remove("bg-sky-100");
              europe.current?.classList.add("bg-secondary");
              america.current?.classList.remove("bg-sky-100");
              america.current?.classList.add("bg-secondary");
              oceania.current?.classList.remove("bg-sky-100");
              oceania.current?.classList.add("bg-secondary");
              cont_others.current?.classList.remove("bg-sky-100");
              cont_others.current?.classList.add("bg-secondary");
            }
          }}/>

          <label htmlFor="oceania" className={`hover:bg-sky-50 text-xl flex-col h-32 w-32 !whitespace-normal text-center ${ buttonVariants({ variant: "secondary" })}`} ref={oceania}>
            <FishSymbol size={48} className="grow min-w-8" strokeWidth={1} />
            Oceania
          </label>
          <input name="continent" id="oceania" value="oceania" type="radio" className="hidden" onChange={async (e) => {
            if(e.target.checked) {
              oceania.current?.classList.remove("bg-secondary");
              oceania.current?.classList.add("bg-sky-100");

              asia.current?.classList.remove("bg-sky-100");
              asia.current?.classList.add("bg-secondary");
              europe.current?.classList.remove("bg-sky-100");
              europe.current?.classList.add("bg-secondary");
              america.current?.classList.remove("bg-sky-100");
              america.current?.classList.add("bg-secondary");
              africa.current?.classList.remove("bg-sky-100");
              africa.current?.classList.add("bg-secondary");
              cont_others.current?.classList.remove("bg-sky-100");
              cont_others.current?.classList.add("bg-secondary");
            }
          }}/>

          <label htmlFor="others" className={`hover:bg-sky-50 text-xl flex-col h-32 w-32 !whitespace-normal text-center ${ buttonVariants({ variant: "secondary" })}`} ref={cont_others}>
            <CircleEllipsis size={48} className="grow min-w-8" strokeWidth={1} />
            Anywhere
          </label>
          <input name="continent" id="others" value="anywhere" type="radio" className="hidden" onChange={async (e) => {
            if(e.target.checked) {
              cont_others.current?.classList.remove("bg-secondary");
              cont_others.current?.classList.add("bg-sky-100");

              asia.current?.classList.remove("bg-sky-100");
              asia.current?.classList.add("bg-secondary");
              europe.current?.classList.remove("bg-sky-100");
              europe.current?.classList.add("bg-secondary");
              america.current?.classList.remove("bg-sky-100");
              america.current?.classList.add("bg-secondary");
              africa.current?.classList.remove("bg-sky-100");
              africa.current?.classList.add("bg-secondary");
              oceania.current?.classList.remove("bg-sky-100");
              oceania.current?.classList.add("bg-secondary");
            }
          }}/>
        </div>

        <p className="text-2xl border-b-2 border-cyan-600 w-fit">Air Temporature</p>
        <div className="w-full max-w-(--scrollable-max-width) flex gap-2 overflow-scroll rounded-md">
          <label htmlFor="warm" className={`hover:bg-sky-50 text-xl flex-col h-32 w-32 !whitespace-normal text-center ${buttonVariants({ variant: "secondary" })}`} ref={warm}>
            <FlameKindling size={48} className="grow min-w-8" strokeWidth={1} />
            Warm
          </label>
          <input name="environment" id="warm" value="warm" type="radio" className="hidden" onChange={async (e) => {
            if (e.target.checked) {
              warm.current?.classList.remove("bg-secondary");
              warm.current?.classList.add("bg-sky-100");

              fresh.current?.classList.remove("bg-sky-100");
              fresh.current?.classList.add("bg-secondary");
              snowy.current?.classList.remove("bg-sky-100");
              snowy.current?.classList.add("bg-secondary");
            }
          }}/>

          <label htmlFor="fresh" className={`hover:bg-sky-50 text-xl flex-col h-32 w-32 !whitespace-normal text-center ${buttonVariants({ variant: "secondary" })}`} ref={fresh}>
            <Leaf size={48} className="grow min-w-8" strokeWidth={1} />
            Fresh
          </label>
          <input name="environment" id="fresh" value="fresh" type="radio" className="hidden" onChange={async (e) => {
            if (e.target.checked) {
              fresh.current?.classList.remove("bg-secondary");
              fresh.current?.classList.add("bg-sky-100");

              warm.current?.classList.remove("bg-sky-100");
              warm.current?.classList.add("bg-secondary");
              snowy.current?.classList.remove("bg-sky-100");
              snowy.current?.classList.add("bg-secondary");
            }
          }}/>

          <label htmlFor="snowy" className={`hover:bg-sky-50 text-xl flex-col h-32 w-32 !whitespace-normal text-center ${buttonVariants({ variant: "secondary" })}`} ref={snowy}>
            <Snowflake size={48} className="grow min-w-8" strokeWidth={1} />
            Snowy and Cold
          </label>
          <input name="environment" id="snowy" value="snowy" type="radio" className="hidden" onChange={async (e) => {
            if (e.target.checked) {
              snowy.current?.classList.remove("bg-secondary");
              snowy.current?.classList.add("bg-sky-100");

              warm.current?.classList.remove("bg-sky-100");
              warm.current?.classList.add("bg-secondary");
              fresh.current?.classList.remove("bg-sky-100");
              fresh.current?.classList.add("bg-secondary");
            }
          }}/>
        </div>

        <p className="text-2xl border-b-2 border-cyan-600 w-fit">Travel...</p>
        <div className="w-full max-w-(--scrollable-max-width) flex gap-2 overflow-scroll rounded-md">
          <label htmlFor="relaxed" className={`hover:bg-sky-50 text-xl flex-col h-32 w-32 !whitespace-normal text-center ${buttonVariants({ variant: "secondary" })}`} ref={relaxed}>
            <Armchair size={48} className="grow min-w-8" strokeWidth={1} />
            at your leisure
          </label>
          <input name="pace" id="relaxed" value="relaxed" type="radio" className="hidden" onChange={async (e) => {
            if (e.target.checked) {
              relaxed.current?.classList.remove("bg-secondary");
              relaxed.current?.classList.add("bg-sky-100");

              moderate.current?.classList.remove("bg-sky-100");
              moderate.current?.classList.add("bg-secondary");
              active.current?.classList.remove("bg-sky-100");
              active.current?.classList.add("bg-secondary");
            }
          }}/>

          <label htmlFor="moderate" className={`hover:bg-sky-50 text-xl flex-col h-32 w-32 !whitespace-normal text-center ${buttonVariants({ variant: "secondary" })}`} ref={moderate}>
            <Footprints size={48} className="grow min-w-8" strokeWidth={1} />
            in<br />moderation
          </label>
          <input name="pace" id="moderate" value="moderate" type="radio" className="hidden" onChange={async (e) => {
            if (e.target.checked) {
              moderate.current?.classList.remove("bg-secondary");
              moderate.current?.classList.add("bg-sky-100");

              relaxed.current?.classList.remove("bg-sky-100");
              relaxed.current?.classList.add("bg-secondary");
              active.current?.classList.remove("bg-sky-100");
              active.current?.classList.add("bg-secondary");
            }
          }}/>

          <label htmlFor="active" className={`hover:bg-sky-50 text-xl flex-col h-32 w-32 !whitespace-normal text-center ${buttonVariants({ variant: "secondary" })}`} ref={active}>
            <Activity size={48} className="grow min-w-8" strokeWidth={1} />
            Actively<br />or busy
          </label>
          <input name="pace" id="active" value="active" type="radio" className="hidden" onChange={async (e) => {
            if (e.target.checked) {
              active.current?.classList.remove("bg-secondary");
              active.current?.classList.add("bg-sky-100");

              relaxed.current?.classList.remove("bg-sky-100");
              relaxed.current?.classList.add("bg-secondary");
              moderate.current?.classList.remove("bg-sky-100");
              moderate.current?.classList.add("bg-secondary");
            }
          }}/>
        </div>
        {/* <p className="text-xl">보내고 올래요.</p> */}

        <div className="flex justify-between">
          <Link to={`/step4`} search={{ act: data.actType.toString() }} className={ buttonVariants() }>
            <CircleArrowLeft />
            Back
          </Link>
          <Button type="submit">
            Get our recommendation
            <CircleArrowRight />
          </Button>
        </div>
      </form>
    </CardSection>
  )
}
