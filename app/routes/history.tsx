import { createFileRoute, redirect } from '@tanstack/react-router'
import { session, titleInfo } from './__root';
import { TriangleAlert } from 'lucide-react';
import CardSection from '@/components/CardSection';
import HistoryList from '@/components/HistoryList';

export const Route = createFileRoute('/history')({
  component: RouteComponent,
  loader: async () => {
    if (session.state.nickname && session.state.user_id) {
      titleInfo.setState((state) => {
        return {
          ...state,
          name: session.state.nickname,
          type: "h1",
          text: "Find your recent results for planning a travel."
        }
      });

      const surveyList = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/api/v1/survey/history/${session.state.nickname}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json"
        }
      }).then(async (data) => await data.json());
      return surveyList
    } else {
      throw redirect({ to: "/login", search: { re_uri: "/history" } });
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

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <CardSection>
        <h2 className="text-2xl border-b-2 border-cyan-600 w-fit">Recent Surveys</h2>
        <HistoryList survey={data} />
    </CardSection>
  );
}
