import CardSection from '@/components/CardSection';
import Title from '@/components/Title';
import { Accordion, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AccordionContent } from '@radix-ui/react-accordion';
import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import { CircleArrowLeft, CircleArrowRight, Coffee, CakeSlice, Pizza, Pyramid, FishSymbol, CircleEllipsis, FlameKindling, Leaf, Snowflake, Footprints, Armchair, Activity, TriangleAlert, ArrowLeftCircle, ArrowRightCircle, Home, LoaderCircle } from 'lucide-react';
import { animate } from 'motion';
import { Suspense, useRef, useState } from 'react';
import * as motion from "motion/react-client"
import { AnimatePresence } from "motion/react"

type Continent = "asia" | "europe" | "america" | "oceania" | "africa" | "anywhere";
type Environment = "warm" | "fresh" | "snowy";
type Pace = "relaxed" | "moderate" | "active";

const getResult = createServerFn({
  method: "GET",
})
.validator((data: {
  cont: Continent,
  env: Environment,
  pace: Pace
}) => {
  const name = getCookie("name");
  const travelWith = getCookie("travelWith");
  const actType = getCookie("actType");
  const budget = getCookie("budget");
  const schedule = getCookie("schedule");
  const transport = getCookie("transport") as "public_transport" | "car";

  if (!name) {
    throw redirect({ to: "/"});
  } else if (!travelWith) {
    throw redirect({ to: "/step2", search: { name: name }});
  } else if (!actType) {
    throw redirect({ to: "/step3", search: { travelWith: travelWith }});
  } else if (!schedule || !transport || !budget) {
    throw redirect({ to: "/step4", search: { act: actType }});
  } else if (!data) {
    throw redirect({ to: "/step5", search: { schedule: schedule, budget: budget, transport: transport }})
  } else {
    return {
      name: name,
      travelWith: travelWith,
      actType: actType,
      budget: budget,
      schedule: schedule,
      transport: transport,
      cont: data.cont,
      env: data.env,
      pace: data.pace
    }
  }
})
.handler(async (ctx) => {
  const resultResponse = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/api/v1/survey/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify({
      "username": ctx.data.name,
      "preferences": {
        "companion": ctx.data.travelWith,
        "style": ctx.data.actType,
        "duration": ctx.data.schedule,
        "budget": ctx.data.budget,
        "climate": ctx.data.env,
        "continent": ctx.data.cont,
        "density": ctx.data.pace,
        "driving": ctx.data.transport
      }
    })
  });

  if (resultResponse.ok) {
    return {
      name: ctx.data.name,
      schedule: ctx.data.schedule,
      budget: ctx.data.budget,
      transport: ctx.data.transport,
      result: await resultResponse.json()
    }
  } else {
    //throw new Error(resultResponse.status.toString());
    return {
      name: ctx.data.name,
      schedule: ctx.data.schedule,
      budget: ctx.data.budget,
      transport: ctx.data.transport,
      error: resultResponse.status
    }
  }
});

export const Route = createFileRoute('/result')({
  component: RouteComponent,
  validateSearch: (search) =>
    search as {
      cont: Continent,
      env: Environment,
      pace: Pace
    },
  loaderDeps: ({ search: { cont, env, pace } }) => ({
    cont, env, pace
  }),
  loader: async ({ deps: { cont, env, pace } }) => (
    await getResult({ data: {
      cont: cont,
      env: env,
      pace: pace }
    })
  )
})

async function RouteComponent() {
  const data = Route.useLoaderData();
  const [index, setIndex] = useState<number>(0);

  return (
    <>
    <Title type="h1" text="Recommends these cities based on your information." name={data.name} />
    <CardSection>
    {data.error || !data.result.data ? (
      <div className="text-center flex flex-col justify-center items-center">
      <h2 className="text-2xl">
        <TriangleAlert size={48} className="grow min-w-12" strokeWidth={1} />
        Server Error occured
      </h2>
      <p>
        Try again later. If you encounter this error frequently,
        <a href="https://github.com/GDGoC-SCHU/Travia_FE/issues">file a bug to the issue tracker</a>.
      </p>
      </div>
    ): (
      <>
      <div className="flex justify-between lg:justify-start gap-4 items-center">
        <Button
          disabled={index === 0}
          onClick={(e) => setIndex(index - 1)}>
          <ArrowLeftCircle size={48} />
        </Button>
        <span className="text-xl">{index + 1} / {data.result.data.length}</span>
        <Button
          disabled={index === data.result.data.length - 1}
          onClick={(e) => setIndex(index + 1)}>
          <ArrowRightCircle size={48} />
        </Button>
      </div>
      <div className="flex">
        <div className="pt-4 grow shrink min-w-0">
          <h2 className="text-2xl">
            <span className="text-base block">
              {data.result.data[index].country}
            </span>
            {data.result.data[index].city}
          </h2>
          <Accordion type="single" collapsible className="lg:me-4">
            <AccordionItem value="reason">
              <AccordionTrigger className="my-2 text-xl hover:bg-gray-50 px-4 hover:no-underline">📝 Reasons to recommend!</AccordionTrigger>
              <AccordionContent>
                <motion.p className="p-4 bg-blue-50 rounded-md"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  {data.result.data[index].reason}
                </motion.p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="max-w-(--scrollable-max-width) overflow-x-scroll flex gap-2 py-8 px-4 rounded-2xl">
          {Object.keys(data.result.data[index].schedule).map((day, idx) => (
            <Card className="shadow-xl p-4 shrink-0 w-6/7 lg:w-72" key={idx}>
              <h3 className="text-xl">Day {day.split("_")[1]}</h3>
              {data.result.data[index].schedule[day].map((ev : { time: string, activity: string }, idx: number) => (
                <p key={idx}>
                  <span className="text-lg block">⌚ {ev.time}</span>
                  <span>{ev.activity}</span>
                </p>
              ))}
            </Card>
          ))}
          </div>
        </div>
        <div className="hidden lg:block py-4 shrink-0">
          <motion.img initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${data.result.data[index].country}+${data.result.data[index].city}&zoom=12&size=250x250&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
            alt={`${data.result.data[index].city} 지도`} className="rounded-xl aspect-square" />
        </div>
      </div>
      </>
    )}
    <div className="flex justify-between lg:justify-start gap-4 items-center">
      <Link to={`/step5`} className={ buttonVariants() }
        search={{ schedule: data.schedule, budget: data.budget, transport: data.transport }}>
        <CircleArrowLeft />
        Back
      </Link>
      <Link to={`/`} className={ buttonVariants() }>
        <Home />
        Go to the first page
      </Link>
    </div>
    </CardSection>
    </>
  )
}
