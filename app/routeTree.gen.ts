/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as Step5Import } from './routes/step5'
import { Route as Step4Import } from './routes/step4'
import { Route as Step3Import } from './routes/step3'
import { Route as Step2Import } from './routes/step2'
import { Route as SignupImport } from './routes/signup'
import { Route as ResultImport } from './routes/result'
import { Route as LoginImport } from './routes/login'
import { Route as HistoryImport } from './routes/history'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const Step5Route = Step5Import.update({
  id: '/step5',
  path: '/step5',
  getParentRoute: () => rootRoute,
} as any)

const Step4Route = Step4Import.update({
  id: '/step4',
  path: '/step4',
  getParentRoute: () => rootRoute,
} as any)

const Step3Route = Step3Import.update({
  id: '/step3',
  path: '/step3',
  getParentRoute: () => rootRoute,
} as any)

const Step2Route = Step2Import.update({
  id: '/step2',
  path: '/step2',
  getParentRoute: () => rootRoute,
} as any)

const SignupRoute = SignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const ResultRoute = ResultImport.update({
  id: '/result',
  path: '/result',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const HistoryRoute = HistoryImport.update({
  id: '/history',
  path: '/history',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/history': {
      id: '/history'
      path: '/history'
      fullPath: '/history'
      preLoaderRoute: typeof HistoryImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/result': {
      id: '/result'
      path: '/result'
      fullPath: '/result'
      preLoaderRoute: typeof ResultImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
    '/step2': {
      id: '/step2'
      path: '/step2'
      fullPath: '/step2'
      preLoaderRoute: typeof Step2Import
      parentRoute: typeof rootRoute
    }
    '/step3': {
      id: '/step3'
      path: '/step3'
      fullPath: '/step3'
      preLoaderRoute: typeof Step3Import
      parentRoute: typeof rootRoute
    }
    '/step4': {
      id: '/step4'
      path: '/step4'
      fullPath: '/step4'
      preLoaderRoute: typeof Step4Import
      parentRoute: typeof rootRoute
    }
    '/step5': {
      id: '/step5'
      path: '/step5'
      fullPath: '/step5'
      preLoaderRoute: typeof Step5Import
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/history': typeof HistoryRoute
  '/login': typeof LoginRoute
  '/result': typeof ResultRoute
  '/signup': typeof SignupRoute
  '/step2': typeof Step2Route
  '/step3': typeof Step3Route
  '/step4': typeof Step4Route
  '/step5': typeof Step5Route
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/history': typeof HistoryRoute
  '/login': typeof LoginRoute
  '/result': typeof ResultRoute
  '/signup': typeof SignupRoute
  '/step2': typeof Step2Route
  '/step3': typeof Step3Route
  '/step4': typeof Step4Route
  '/step5': typeof Step5Route
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/history': typeof HistoryRoute
  '/login': typeof LoginRoute
  '/result': typeof ResultRoute
  '/signup': typeof SignupRoute
  '/step2': typeof Step2Route
  '/step3': typeof Step3Route
  '/step4': typeof Step4Route
  '/step5': typeof Step5Route
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/history'
    | '/login'
    | '/result'
    | '/signup'
    | '/step2'
    | '/step3'
    | '/step4'
    | '/step5'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/history'
    | '/login'
    | '/result'
    | '/signup'
    | '/step2'
    | '/step3'
    | '/step4'
    | '/step5'
  id:
    | '__root__'
    | '/'
    | '/history'
    | '/login'
    | '/result'
    | '/signup'
    | '/step2'
    | '/step3'
    | '/step4'
    | '/step5'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  HistoryRoute: typeof HistoryRoute
  LoginRoute: typeof LoginRoute
  ResultRoute: typeof ResultRoute
  SignupRoute: typeof SignupRoute
  Step2Route: typeof Step2Route
  Step3Route: typeof Step3Route
  Step4Route: typeof Step4Route
  Step5Route: typeof Step5Route
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  HistoryRoute: HistoryRoute,
  LoginRoute: LoginRoute,
  ResultRoute: ResultRoute,
  SignupRoute: SignupRoute,
  Step2Route: Step2Route,
  Step3Route: Step3Route,
  Step4Route: Step4Route,
  Step5Route: Step5Route,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/history",
        "/login",
        "/result",
        "/signup",
        "/step2",
        "/step3",
        "/step4",
        "/step5"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/history": {
      "filePath": "history.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/result": {
      "filePath": "result.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
    },
    "/step2": {
      "filePath": "step2.tsx"
    },
    "/step3": {
      "filePath": "step3.tsx"
    },
    "/step4": {
      "filePath": "step4.tsx"
    },
    "/step5": {
      "filePath": "step5.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
