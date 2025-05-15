import { createFileRoute, useRouter } from '@tanstack/react-router';
import CardSection from '@/components/CardSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleArrowRight } from 'lucide-react';
import { useState } from 'react';
import { titleInfo } from './__root';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname, password }),
    });

    if (res.ok) {
      router.navigate({ to: '/step2', search: { name: nickname } });
    } else {
      alert('Login failed');
    }
  };

  titleInfo.setState((state) => {
    return {
      ...state,
      type: "h1",
      text: "Login here."
    }
  });

  return (
    <>
      <CardSection>
        <form className="w-fit" onSubmit={handleLogin}>
          <Label>Nickname</Label>
          <Input value={nickname} onChange={(e) => setNickname(e.target.value)} required className="mb-2" />
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mb-4" />
          <Button type="submit">
            Login & Start
            <CircleArrowRight />
          </Button>
        </form>
      </CardSection>
    </>
  );
}
