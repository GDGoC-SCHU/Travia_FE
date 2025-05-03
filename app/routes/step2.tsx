import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';

const getName = createServerFn({
  method: "GET",
})
.validator((data: string) => data)
.handler(async (ctx) => {
  return {
    name: ctx.data
  }
})

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

  return <p>안녕하세요, {data.name}님!</p>
}
