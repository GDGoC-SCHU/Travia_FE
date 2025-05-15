// app/routes/__root.tsx
import { type ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'

import { Store } from "@tanstack/react-store";

import appCss from "@/styles/app.css?url";
import Header from '@/components/Header';
import Title from '@/components/Title';

export const titleInfo = new Store<{
  type: "h1" | "p",
  text: string,
  name: undefined | string
}>({
  type: "p",
  text: "Let's plan your travel!",
  name: undefined
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Travia',
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
  ssr: true
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        <main className="p-4 flex gap-4 flex-wrap lg:flex-nowrap">
          <Title info={titleInfo} />
          {children}
        </main>
        <Scripts />
      </body>
    </html>
  )
}