import CardSection from '@/components/CardSection';
import Title from '@/components/Title';
import { Accordion, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AccordionContent } from '@radix-ui/react-accordion';
import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import { CircleArrowLeft, CircleArrowRight, Coffee, CakeSlice, Pizza, Pyramid, FishSymbol, CircleEllipsis, FlameKindling, Leaf, Snowflake, Footprints, Armchair, Activity, TriangleAlert, ArrowLeftCircle, ArrowRightCircle, Home } from 'lucide-react';
import { useRef, useState } from 'react';

type Continent = "asia" | "europe" | "america" | "oceania" | "africa" | "others";
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

  console.log(data);

  return (
    <>
    <Title type="h1" text="알려주신 내용을 바탕으로 추천드려요." name={data.name} />
    <CardSection>
    {data.error || !data.result.data ? (
      <div className="text-center flex flex-col justify-center items-center">
      <h2 className="text-2xl">
        <TriangleAlert size={48} className="grow min-w-12" strokeWidth={1} />
        서버에 문제가 발생했어요.
      </h2>
      <p>
        나중에 다시 시도해주세요. 계속해서 문제가 발생한다면,
        <a href="https://github.com/GDGoC-SCHU/Travia_FE/issues">이슈트래커</a>에 제보할 수 있어요.
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
      <div className="flex max-w-(--scrollable-max-width)">
        <div className="pt-4 pe-4">
          <h2 className="text-2xl">
            <span className="text-base block">
              {data.result.data[index].country}
            </span>
            {data.result.data[index].city}
          </h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="reason">
              <AccordionTrigger className="text-xl">📝 추천하는 이유!</AccordionTrigger>
              <AccordionContent className="grow-0">
                <p className="text-balance">{data.result.data[index].reason}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="max-w-(--scrollable-max-width) overflow-x-scroll flex gap-2 py-8 px-4 rounded-2xl">
          {Object.keys(data.result.data[index].schedule).map((day) => (
            <Card className="shadow-xl p-4 shrink-0 w-6/7 lg:w-72">
              <h3 className="text-xl">{day.split("_")[1]}일차</h3>
              {data.result.data[index].schedule[day].map((ev) => (
                <p>
                  <span className="text-lg block">⌚ {ev.time}</span>
                  <span>{ev.activity}</span>
                </p>
              ))}
            </Card>
          ))}
          </div>
        </div>
        <div className="hidden lg:block py-4">
          <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${data.result.data[index].country}+${data.result.data[index].city}&zoom=12&size=500x500&key=${import.meta.env.VITE_GOOGLE_API_KEY}`} alt={`${data.result.data[index].city} 지도`} className="rounded-xl" />
        </div>
      </div>
      </>
    )}
    <div className="flex justify-between lg:justify-start gap-4 items-center">
      <Link to={`/step5`} className={ buttonVariants() }
        search={{ schedule: data.schedule, budget: data.budget, transport: data.transport }}>
        <CircleArrowLeft />
        이전 단계로
      </Link>
      <Link to={`/`} className={ buttonVariants() }>
        <Home />
        처음으로
      </Link>
    </div>
    </CardSection>
    </>
  )
}
