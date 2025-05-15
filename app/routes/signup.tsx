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
      const data = await res.json();
      if (data.token) {
        const expiresAt = new Date().getTime() + 2 * 60 * 60 * 1000;
        localStorage.setItem("token", data.token);
        localStorage.setItem("tokenExpiresAt", expiresAt.toString());
        localStorage.setItem("nickname", nickname);

        alert("회원가입이 완료되었습니다!");
        router.navigate({ to: '/step2', search: { name: nickname } });
      } else {
        alert("회원가입은 성공했지만 토큰이 없습니다.");
      }
    } else {
      // .json() 대신 .text()로 안전하게 추출
      const errorText = await res.text();
      try {
        const error = JSON.parse(errorText);
        alert(`Signup failed: ${error.detail || "Unknown error"}`);
      } catch {
        alert("Signup failed: " + errorText);
      }
    }
  };


  return (
    <>
      <Title type="h1" text="To save the result, use unique nicknames." />
      <CardSection>
        <form className="w-fit" onSubmit={handleSignup}>
          <Label>Nickname</Label>
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            className="mb-2"
          />
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-4"
          />
          <Button type="submit">
            Signup & Start
            <CircleArrowRight />
          </Button>
        </form>
      </CardSection>
    </>
  );
}
