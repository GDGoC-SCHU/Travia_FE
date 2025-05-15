// app/routes/index.tsx
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CircleArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'
import CardSection from '@/components/CardSection'
import { titleInfo } from './__root'

export const Route = createFileRoute('/')({
  component: Home,
});

function Validation(name: string) {
  if (name.trim() === "" || !name) {
    return false;
  } else {
    return true;
  }
}

function Home() {
  const router = useRouter();
  const [warn, setWarn] = useState<boolean>(false);
  const name = useRef<HTMLInputElement|null>(null);

  titleInfo.setState((state) => {
    return {
      ...state,
      type: "p",
      text: "Let's plan your travel!"
    }
  });

  return (
    <CardSection>
      <h1 className="text-2xl">
        To begin signing up,
        <Label htmlFor="name" className="text-2xl">please enter your name.</Label>
      </h1>
      {/* <p>To save the result, use unique nicknames before go to the next step.</p> */}
      <form onSubmit={async (e) => {
        e.preventDefault();
        if (name.current && Validation(name.current.value)) {
          router.navigate({
            viewTransition: true,
            href: `/step2?name=${name.current.value}`
          })
        }
      }} className="w-fit">
        <div className="flex gap-2">
          <Input type="text" id="name" placeholder="Name" className="text-lg" ref={name} onChange={(e) => setWarn(!Validation(e.target.value))} />
          <Button type="submit" className="text-xl items-center">
            Next
            <CircleArrowRight />
          </Button>
        </div>
        {warn ? <p className="text-red-400 m-0.5">Please enter your name.</p> :null}
      </form>
      <Link to="/login" className="block text-cyan-600">Already have an account? Click here to login.</Link>
    </CardSection>
  )
}