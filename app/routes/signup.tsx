import { createFileRoute, useRouter, useSearch } from '@tanstack/react-router';
import CardSection from '@/components/CardSection';
import Title from '@/components/Title';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleArrowRight } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/signup')({
  component: SignupPage,
  validateSearch: (search) => search as { name: string },
});

function SignupPage() {
  const router = useRouter();
  const { name } = Route.useSearch();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, nickname, password }),
    });

    if (res.ok) {
        router.navigate({ to: '/step2', search: { name: nickname} });  // 🔁 name을 전달해야 하므로 search에 반드시 포함!
    } else {
        const error = await res.json();
        alert(`Signup failed: ${error.detail}`);  // ✅ 실패 사유 출력
    }
  };

  return (
    <>
      <Title type="h1" text="To save the result, use unique nicknames." />      {/* Sign up here! */}
      <CardSection>
        <form className="w-fit" onSubmit={handleSignup}>
          <Label>Name</Label>
          <Input value={name} readOnly className="mb-2" />
          <Label>Nickname</Label>
          <Input value={nickname} onChange={(e) => setNickname(e.target.value)} required className="mb-2" />
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mb-4" />
          <Button type="submit">
            Signup & Start
            <CircleArrowRight />
          </Button>
        </form>
      </CardSection>
    </>
  );
}
