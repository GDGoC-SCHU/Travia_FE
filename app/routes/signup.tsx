import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import CardSection from '@/components/CardSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleArrowRight } from 'lucide-react';
import { session, titleInfo } from './__root';
import { useState } from 'react';

export const Route = createFileRoute('/signup')({
  component: SignupPage,
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
        text: "To save the result, use unique nicknames."
      }
    });
  
    if (session.state.user_id && session.state.nickname) {
      throw redirect({ to: re_uri });        
    } else {
      return re_uri;
    }
  }
});

function SignupPage() {
  const router = useRouter();
  const uri = Route.useLoaderData();

  const [error, setError] = useState<string|undefined>(undefined);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nickname = data.get("nickname");
    const password = data.get("password");    

    const res = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nickname, nickname, password }),
    });

    if (res.ok) {
        const result = await res.json();
        
        // session.setState((state) => {
        //   return {
        //     ...state,
        //     user_id: result.user_id,
        //     nickname: result.nickname
        //   }
        // });

        // titleInfo.setState((state) => {
        //   return {
        //     ...state,
        //     name: result.nickname
        //   }
        // });

        router.navigate({ to: "/login", search: { re_uri: uri } });
    } else {
        const error = await res.text();
        setError(error);
    }
  };

  return (
    <>
      <CardSection>
        <form className="w-fit" onSubmit={handleSignup}>
          <Label htmlFor="nickname">Nickname</Label>
          <Input name="nickname" required className="mb-2" />
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" required className="mb-4" />
          {error ? (
            <p className="text-red-400 m-0.5">Sign up failed due to these reasons: {error}</p>
          ) :""}
          <Button type="submit">
            Signup
            <CircleArrowRight />
          </Button>
        </form>
      </CardSection>
    </>
  );
}
