import CardSection from '@/components/CardSection';
import { buttonVariants } from '@/components/ui/button';
import { createFileRoute, Link, redirect, Await } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import { getCookie } from '@tanstack/react-start/server';
import { CircleArrowLeft, TriangleAlert, Home } from 'lucide-react';
import * as motion from "motion/react-client"
import { titleInfo } from './__root';
import LoadingIcon from '@/components/LoadingIcon';
import { ResultData } from '@/components/ResultData';

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
.handler((ctx) => {
  return ctx.data;
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
  loader: async ({ deps: { cont, env, pace } }) => {
    const data = await getResult({ data: {
      cont: cont,
      env: env,
      pace: pace }
    });

    titleInfo.setState((state) => {
      return {
      ...state,
      name: data.name,
      type: "h1",
      text: "Recommends these cities based on your information.",
    }});
    
    const resultResponse = fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/api/v1/survey/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        "username": data.name,
        "preferences": {
          "companion": data.travelWith,
          "style": Array.isArray(data.actType) ? data.actType : [data.actType],
          "duration": data.schedule,
          "budget": data.budget,
          "climate": data.env,
          "continent": data.cont,
          "density": data.pace,
          "driving": data.transport
        }
      })
    }).then(async (data) => await data.json());

    return {
      data, resultResponse
    }
  },
  errorComponent: ({ error }) => {
    return (
      <div className="text-center flex flex-col justify-center items-center">
      <h2 className="text-2xl">
        <TriangleAlert size={48} className="grow min-w-12" strokeWidth={1} />
        Server Error occured
      </h2>
      <p>
        Try again later. If you encounter this error frequently,
        <a href="https://github.com/GDGoC-SCHU/Travia_FE/issues">file a bug to the issue tracker</a>.
      </p>
      <p>{error.message}</p>
      </div>
    )
  }
})

async function RouteComponent() {
  const { data, resultResponse } = Route.useLoaderData();
  const LoadingComp = motion.create(LoadingIcon);

  return (
    <Await promise={resultResponse} fallback={
      <section className="grow h-full z-30 backdrop-blur-md rounded-lg bg-white border-slate-400 border-1 my-2 p-4 flex items-center justify-center gap-2">
        <LoadingComp animate={{ rotate: 360 }} transition={{ duration: 10, repeat: 3 }} />
        <p className="text-xl">We're making recommendations for you...</p>
      </section>
    }>
      {(result) => (
        <CardSection>
        {result.data ? (
          <ResultData data={result.data} />
        ): (
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
      )}
    </Await>
  )
}
