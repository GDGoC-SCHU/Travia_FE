import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import * as r from 'node:fs';
import { useRouter, createFileRoute, Link, lazyRouteComponent } from '@tanstack/react-router';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as p$1 from '@radix-ui/react-label';
import { CircleArrowRight } from 'lucide-react';
import { createServerFn } from '@tanstack/start-client-core';
import { o } from './index-ujMS-7Qz.mjs';
import 'tiny-invariant';

function s(...e) {
  return twMerge(clsx(e));
}
const S = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", { variants: { variant: { default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90", destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60", outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50", secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80", ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50", link: "text-primary underline-offset-4 hover:underline" }, size: { default: "h-9 px-4 py-2 has-[>svg]:px-3", sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5", lg: "h-10 rounded-md px-6 has-[>svg]:px-4", icon: "size-9" } }, defaultVariants: { variant: "default", size: "default" } });
function k({ className: e, ...t }) {
  return jsx("div", { "data-slot": "card", className: s("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", e), ...t });
}
function F({ className: e, type: t, ...m }) {
  return jsx("input", { type: t, "data-slot": "input", className: s("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-md file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-md", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", e), ...m });
}
function N({ className: e, ...t }) {
  return jsx(p$1.Root, { "data-slot": "label", className: s("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", e), ...t });
}
const $ = () => Promise.resolve().then(() => O), d = "count.txt";
async function l() {
  return parseInt(await r.promises.readFile(d, "utf-8").catch(() => "0"));
}
const z = o("app_routes_index_tsx--getCount_createServerFn_handler", "/_server", (e, t) => c.__executeServer(e, t)), c = createServerFn({ method: "GET" }).handler(z, () => l()), P = o("app_routes_index_tsx--updateCount_createServerFn_handler", "/_server", (e, t) => R.__executeServer(e, t)), R = createServerFn({ method: "POST" }).validator((e) => e).handler(P, async ({ data: e }) => {
  const t = await l();
  await r.promises.writeFile(d, `${t + e}`);
}), u = createFileRoute("/")({ component: lazyRouteComponent($, "component", () => u.ssr), loader: async () => await c() }), p = "count.txt";
async function j() {
  return parseInt(await r.promises.readFile(p, "utf-8").catch(() => "0"));
}
const T = o("app_routes_index_tsx--updateCount_createServerFn_handler", "/_server", (e, t) => I.__executeServer(e, t)), I = createServerFn({ method: "POST" }).validator((e) => e).handler(T, async ({ data: e }) => {
  const t = await j();
  await r.promises.writeFile(p, `${t + e}`);
}), L = function() {
  return useRouter(), u.useLoaderData(), jsxs(Fragment, { children: [jsxs("section", { className: "rounded-tl-lg rounded-br-lg bg-white w-fit p-4 border-slate-400 border-2", children: [jsxs("p", { children: [jsx("span", { className: "text-xl block", children: "\uB2F9\uC2E0\uC758 \uC5EC\uD589 \uD50C\uB798\uB108," }), jsxs("span", { className: "text-2xl flex align-bottom gap-0.5", children: [jsx("span", { className: "text-cyan-600 text-3xl", children: "Travia" }), jsx("span", { className: "leading-10.5", children: "\uC785\uB2C8\uB2E4." })] })] }), jsx("p", { children: "\uC9C0\uAE08\uBD80\uD130 \uD568\uAED8 \uC5EC\uD589 \uACC4\uD68D\uC744 \uC138\uC6CC\uBCFC\uAC8C\uC694." })] }), jsxs(k, { className: "rounded-lg bg-white border-slate-400 border-1 my-2 p-4 grow", children: [jsxs("h1", { className: "text-2xl", children: ["\uBA3C\uC800,", jsx(N, { htmlFor: "name", className: "text-2xl", children: "\uC774\uB984\uC744 \uC54C\uB824\uC8FC\uC138\uC694." })] }), jsxs("div", { className: "w-fit flex gap-2", children: [jsx(F, { type: "text", id: "name", placeholder: "\uC774\uB984", className: "text-lg" }), jsxs(Link, { to: "/", className: `${S({ variant: "default" })} text-xl items-center`, children: ["\uB2E4\uC74C", jsx(CircleArrowRight, {})] })] })] })] });
}, O = Object.freeze(Object.defineProperty({ __proto__: null, component: L }, Symbol.toStringTag, { value: "Module" }));

export { L as component };
//# sourceMappingURL=index-CZ2IBP_q.mjs.map
