import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router';
import CardSection from '@/components/CardSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleArrowRight } from 'lucide-react';
import { useState } from 'react';
import { session, titleInfo } from './__root';
import { createServerFn } from '@tanstack/react-start';
import { useStore } from '@tanstack/react-store';

const getReturnUrl = createServerFn({
  method: "GET"
}).validator((data: string) => data)
.handler((ctx) => ctx.data);

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  validateSearch: (search) => 
    search as {
      re_uri: string
    },
  loaderDeps: ({ search: { re_uri }}) => ({
    re_uri
  }),
  loader: ({ deps: { re_uri } }) => {
    titleInfo.setState((state) => {
      return {
        ...state,
        type: "h1",
        text: "Login here."
      }
    });

    if (session.state.user_id && session.state.nickname) {
      throw redirect({ to: re_uri });        
    } else {
      return getReturnUrl({ data: re_uri });
    }
  }
});

function RouteComponent() {
  const router = useRouter();
  const data = Route.useLoaderData();

  const [loginFailed, setLoginFail] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = new FormData(e.currentTarget);
    const nickname = credentials.get("nickname");
    const password = credentials.get("password");

    const res = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname, password }),
    });

    if (res.ok) {
      const result = await res.json();

      session.setState((state) => {
        return {
          ...state,
          user_id: result.user_id,
          nickname: result.nickname
        }
      });

      titleInfo.setState((state) => {
        return {
          ...state,
          name: result.nickname
        }
      });

      router.navigate({ href: data });
    } else {
      setLoginFail(true);
    }
  };

  return (
    <>
      <CardSection>
        <form className="w-fit" onSubmit={handleLogin}>
          <Label>Nickname</Label>
          <Input name="nickname" required className="mb-2" />
          <Label>Password</Label>
          <Input type="password" name="password" required className="mb-4" />
          {loginFailed ? (
            <p className="text-red-400 m-0.5">Check your nickname or password.</p>
          ):""}
          <Button type="submit">
            Login 
            <CircleArrowRight />
          </Button>
        </form>
        <Link to="/signup" search={{ re_uri: data }} className="block text-cyan-600">Does not have an account? Create here.</Link>
      </CardSection>
    </>
  );
}
