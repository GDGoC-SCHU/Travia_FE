import { Suspense, type ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'

import appCss from "@/styles/app.css?url";
import Header from '@/components/Header';
import { LoaderCircle } from 'lucide-react';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Travia' },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
    ],
  }),
  component: RootComponent,
  ssr: true
})

function RootComponent() {
  return (
    <RootDocument>
      <Header />
      <Suspense fallback={
        <section className="w-screen h-full z-30 backdrop-blur-md flex justify-center items-center p-10">
          <LoaderCircle className="animate-spin text-cyan-600" size={48} />
          <span className="ml-2">We're making recommendations for you...</span>
        </section>
      }>
        <main className="p-4 flex gap-4 flex-wrap lg:flex-nowrap">
          <Outlet />
        </main>
      </Suspense>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
