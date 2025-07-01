react-dom.development.js:38560 Download the React DevTools for a better development experience: https://reactjs.org/link/react-devtools
app-index.js:33 Warning: Extra attributes from the server: class
    at body
    at html
    at RootLayout (Server)
    at InnerLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:243:11)
    at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:74:9)
    at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:82:11)
    at NotFoundErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:76:9)
    at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:84:11)
    at LoadingBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:349:11)
    at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:160:11)
    at InnerScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:153:9)
    at ScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:228:11)
    at RenderFromTemplateContext (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/render-from-template-context.js:16:44)
    at OuterLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:370:11)
    at body
    at html
    at QueryClientProvider (webpack-internal:///(app-pages-browser)/./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js:27:11)
    at ReactQueryClientProvider (webpack-internal:///(app-pages-browser)/./src/components/shared/react-query-client-provider.tsx:15:11)
    at RootLayout (Server)
    at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:74:9)
    at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:82:11)
    at NotFoundErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:76:9)
    at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:84:11)
    at DevRootNotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/dev-root-not-found-boundary.js:33:11)
    at ReactDevOverlay (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/react-dev-overlay/app/ReactDevOverlay.js:87:9)
    at HotReload (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/react-dev-overlay/app/hot-reloader-client.js:321:11)
    at Router (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/app-router.js:207:11)
    at ErrorBoundaryHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:113:9)
    at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:160:11)
    at AppRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/app-router.js:585:13)
    at ServerRoot (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/app-index.js:112:27)
    at Root (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/app-index.js:117:11)
window.console.error @ app-index.js:33
sidebar.tsx:85 suggestion updated Object
use-performance.ts:45 [Performance] PerformanceOptimizer: Object
sidebar.tsx:85 suggestion updated Object
use-performance.ts:45 [Performance] PerformanceOptimizer: Object
performance-optimizer.tsx:95 [Performance] App metrics: Object
hot-reloader-client.js:187 [Fast Refresh] rebuilding
hot-reloader-client.js:44 [Fast Refresh] done in 2980ms
hot-reloader-client.js:187 [Fast Refresh] rebuilding
hot-reloader-client.js:44 [Fast Refresh] done in 747ms
hot-reloader-client.js:187 [Fast Refresh] rebuilding
hot-reloader-client.js:44 [Fast Refresh] done in 2205ms
sidebar.tsx:85 suggestion updated {uid: 'target-audience-video', question: 'Узнайте, как найти и понять свою целевую аудиторию', createdAt: Sat Jun 28 2025 15:58:21 GMT+0500 (GMT+05:00), updatedAt: Sat Jun 28 2025 20:47:25 GMT+0500 (GMT+05:00), questionDate: '2025-06-28', …}
hot-reloader-client.js:187 [Fast Refresh] rebuilding
hot-reloader-client.js:44 [Fast Refresh] done in 6986ms
react-server-dom-webpack-client.browser.development.js:1849 Uncaught Error: 
Invalid `prisma.questions.findUnique()` invocation:

{
  where: {
    slug: "welcome-to-business"
  },
  include: {
    answers: true,
    tags: {
      include: {
        tag: true
      }
    },
    QuestionResources: true,
    bookmarks: true,
    ~~~~~~~~~
?   userAnswers?: true
  }
}

Unknown field `bookmarks` for include statement on model `Questions`. Available options are marked with ?.
    at Pn (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:29:1363)
    at Un.handleRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7090)
    at Un.handleAndLogRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6771)
    at Un.request (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6478)
    at async l (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9644)
    at async eval (webpack-internal:///(rsc)/./src/utils/data/questions/get.ts:23:15)
resolveErrorDev @ react-server-dom-webpack-client.browser.development.js:1849
processFullRow @ react-server-dom-webpack-client.browser.development.js:1922
processBinaryChunk @ react-server-dom-webpack-client.browser.development.js:2072
progress @ react-server-dom-webpack-client.browser.development.js:2153
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
startReadingFromStream @ react-server-dom-webpack-client.browser.development.js:2161
eval @ react-server-dom-webpack-client.browser.development.js:2173
Promise.then
createFromFetch @ react-server-dom-webpack-client.browser.development.js:2172
fetchServerResponse @ fetch-server-response.js:80
await in fetchServerResponse
InnerLayoutRouter @ layout-router.js:305
renderWithHooks @ react-dom.development.js:11121
mountIndeterminateComponent @ react-dom.development.js:16869
beginWork$1 @ react-dom.development.js:18458
beginWork @ react-dom.development.js:26927
performUnitOfWork @ react-dom.development.js:25748
workLoopSync @ react-dom.development.js:25464
renderRootSync @ react-dom.development.js:25419
performConcurrentWorkOnRoot @ react-dom.development.js:24504
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
redirect-boundary.js:57 Uncaught Error: 
Invalid `prisma.questions.findUnique()` invocation:

{
  where: {
    slug: "welcome-to-business"
  },
  include: {
    answers: true,
    tags: {
      include: {
        tag: true
      }
    },
    QuestionResources: true,
    bookmarks: true,
    ~~~~~~~~~
?   userAnswers?: true
  }
}

Unknown field `bookmarks` for include statement on model `Questions`. Available options are marked with ?.
    at Pn (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:29:1363)
    at Un.handleRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7090)
    at Un.handleAndLogRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6771)
    at Un.request (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6478)
    at async l (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9644)
    at async eval (webpack-internal:///(rsc)/./src/utils/data/questions/get.ts:23:15)
resolveErrorDev @ react-server-dom-webpack-client.browser.development.js:1849
processFullRow @ react-server-dom-webpack-client.browser.development.js:1922
processBinaryChunk @ react-server-dom-webpack-client.browser.development.js:2072
progress @ react-server-dom-webpack-client.browser.development.js:2153
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
startReadingFromStream @ react-server-dom-webpack-client.browser.development.js:2161
eval @ react-server-dom-webpack-client.browser.development.js:2173
Promise.then
createFromFetch @ react-server-dom-webpack-client.browser.development.js:2172
fetchServerResponse @ fetch-server-response.js:80
await in fetchServerResponse
InnerLayoutRouter @ layout-router.js:305
renderWithHooks @ react-dom.development.js:11121
mountIndeterminateComponent @ react-dom.development.js:16869
beginWork$1 @ react-dom.development.js:18458
beginWork @ react-dom.development.js:26927
performUnitOfWork @ react-dom.development.js:25748
workLoopSync @ react-dom.development.js:25464
renderRootSync @ react-dom.development.js:25419
performConcurrentWorkOnRoot @ react-dom.development.js:24504
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
redirect-boundary.js:57 Uncaught Error: 
Invalid `prisma.questions.findUnique()` invocation:

{
  where: {
    slug: "welcome-to-business"
  },
  include: {
    answers: true,
    tags: {
      include: {
        tag: true
      }
    },
    QuestionResources: true,
    bookmarks: true,
    ~~~~~~~~~
?   userAnswers?: true
  }
}

Unknown field `bookmarks` for include statement on model `Questions`. Available options are marked with ?.
    at Pn (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:29:1363)
    at Un.handleRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7090)
    at Un.handleAndLogRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6771)
    at Un.request (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6478)
    at async l (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9644)
    at async eval (webpack-internal:///(rsc)/./src/utils/data/questions/get.ts:23:15)
resolveErrorDev @ react-server-dom-webpack-client.browser.development.js:1849
processFullRow @ react-server-dom-webpack-client.browser.development.js:1922
processBinaryChunk @ react-server-dom-webpack-client.browser.development.js:2072
progress @ react-server-dom-webpack-client.browser.development.js:2153
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
startReadingFromStream @ react-server-dom-webpack-client.browser.development.js:2161
eval @ react-server-dom-webpack-client.browser.development.js:2173
Promise.then
createFromFetch @ react-server-dom-webpack-client.browser.development.js:2172
fetchServerResponse @ fetch-server-response.js:80
await in fetchServerResponse
InnerLayoutRouter @ layout-router.js:305
renderWithHooks @ react-dom.development.js:11121
mountIndeterminateComponent @ react-dom.development.js:16869
beginWork$1 @ react-dom.development.js:18458
beginWork @ react-dom.development.js:26927
performUnitOfWork @ react-dom.development.js:25748
workLoopSync @ react-dom.development.js:25464
renderRootSync @ react-dom.development.js:25419
performConcurrentWorkOnRoot @ react-dom.development.js:24504
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
redirect-boundary.js:57 Uncaught Error: 
Invalid `prisma.questions.findUnique()` invocation:

{
  where: {
    slug: "welcome-to-business"
  },
  include: {
    answers: true,
    tags: {
      include: {
        tag: true
      }
    },
    QuestionResources: true,
    bookmarks: true,
    ~~~~~~~~~
?   userAnswers?: true
  }
}

Unknown field `bookmarks` for include statement on model `Questions`. Available options are marked with ?.
    at Pn (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:29:1363)
    at Un.handleRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7090)
    at Un.handleAndLogRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6771)
    at Un.request (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6478)
    at async l (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9644)
    at async eval (webpack-internal:///(rsc)/./src/utils/data/questions/get.ts:23:15)
resolveErrorDev @ react-server-dom-webpack-client.browser.development.js:1849
processFullRow @ react-server-dom-webpack-client.browser.development.js:1922
processBinaryChunk @ react-server-dom-webpack-client.browser.development.js:2072
progress @ react-server-dom-webpack-client.browser.development.js:2153
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
startReadingFromStream @ react-server-dom-webpack-client.browser.development.js:2161
eval @ react-server-dom-webpack-client.browser.development.js:2173
Promise.then
createFromFetch @ react-server-dom-webpack-client.browser.development.js:2172
fetchServerResponse @ fetch-server-response.js:80
await in fetchServerResponse
InnerLayoutRouter @ layout-router.js:305
renderWithHooks @ react-dom.development.js:11121
mountIndeterminateComponent @ react-dom.development.js:16869
beginWork$1 @ react-dom.development.js:18458
beginWork @ react-dom.development.js:26927
performUnitOfWork @ react-dom.development.js:25748
workLoopSync @ react-dom.development.js:25464
renderRootSync @ react-dom.development.js:25419
performConcurrentWorkOnRoot @ react-dom.development.js:24504
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
not-found-boundary.js:37 Uncaught Error: 
Invalid `prisma.questions.findUnique()` invocation:

{
  where: {
    slug: "welcome-to-business"
  },
  include: {
    answers: true,
    tags: {
      include: {
        tag: true
      }
    },
    QuestionResources: true,
    bookmarks: true,
    ~~~~~~~~~
?   userAnswers?: true
  }
}

Unknown field `bookmarks` for include statement on model `Questions`. Available options are marked with ?.
    at Pn (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:29:1363)
    at Un.handleRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7090)
    at Un.handleAndLogRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6771)
    at Un.request (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6478)
    at async l (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9644)
    at async eval (webpack-internal:///(rsc)/./src/utils/data/questions/get.ts:23:15)
resolveErrorDev @ react-server-dom-webpack-client.browser.development.js:1849
processFullRow @ react-server-dom-webpack-client.browser.development.js:1922
processBinaryChunk @ react-server-dom-webpack-client.browser.development.js:2072
progress @ react-server-dom-webpack-client.browser.development.js:2153
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
startReadingFromStream @ react-server-dom-webpack-client.browser.development.js:2161
eval @ react-server-dom-webpack-client.browser.development.js:2173
Promise.then
createFromFetch @ react-server-dom-webpack-client.browser.development.js:2172
fetchServerResponse @ fetch-server-response.js:80
await in fetchServerResponse
InnerLayoutRouter @ layout-router.js:305
renderWithHooks @ react-dom.development.js:11121
mountIndeterminateComponent @ react-dom.development.js:16869
beginWork$1 @ react-dom.development.js:18458
beginWork @ react-dom.development.js:26927
performUnitOfWork @ react-dom.development.js:25748
workLoopSync @ react-dom.development.js:25464
renderRootSync @ react-dom.development.js:25419
performConcurrentWorkOnRoot @ react-dom.development.js:24504
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
redirect-boundary.js:57 Uncaught Error: 
Invalid `prisma.questions.findUnique()` invocation:

{
  where: {
    slug: "welcome-to-business"
  },
  include: {
    answers: true,
    tags: {
      include: {
        tag: true
      }
    },
    QuestionResources: true,
    bookmarks: true,
    ~~~~~~~~~
?   userAnswers?: true
  }
}

Unknown field `bookmarks` for include statement on model `Questions`. Available options are marked with ?.
    at Pn (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:29:1363)
    at Un.handleRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7090)
    at Un.handleAndLogRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6771)
    at Un.request (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6478)
    at async l (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9644)
    at async eval (webpack-internal:///(rsc)/./src/utils/data/questions/get.ts:23:15)
resolveErrorDev @ react-server-dom-webpack-client.browser.development.js:1849
processFullRow @ react-server-dom-webpack-client.browser.development.js:1922
processBinaryChunk @ react-server-dom-webpack-client.browser.development.js:2072
progress @ react-server-dom-webpack-client.browser.development.js:2153
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
startReadingFromStream @ react-server-dom-webpack-client.browser.development.js:2161
eval @ react-server-dom-webpack-client.browser.development.js:2173
Promise.then
createFromFetch @ react-server-dom-webpack-client.browser.development.js:2172
fetchServerResponse @ fetch-server-response.js:80
await in fetchServerResponse
InnerLayoutRouter @ layout-router.js:305
renderWithHooks @ react-dom.development.js:11121
mountIndeterminateComponent @ react-dom.development.js:16869
beginWork$1 @ react-dom.development.js:18458
beginWork @ react-dom.development.js:26927
performUnitOfWork @ react-dom.development.js:25748
workLoopSync @ react-dom.development.js:25464
renderRootSync @ react-dom.development.js:25419
performConcurrentWorkOnRoot @ react-dom.development.js:24504
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
not-found-boundary.js:37 Uncaught Error: 
Invalid `prisma.questions.findUnique()` invocation:

{
  where: {
    slug: "welcome-to-business"
  },
  include: {
    answers: true,
    tags: {
      include: {
        tag: true
      }
    },
    QuestionResources: true,
    bookmarks: true,
    ~~~~~~~~~
?   userAnswers?: true
  }
}

Unknown field `bookmarks` for include statement on model `Questions`. Available options are marked with ?.
    at Pn (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:29:1363)
    at Un.handleRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7090)
    at Un.handleAndLogRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6771)
    at Un.request (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6478)
    at async l (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9644)
    at async eval (webpack-internal:///(rsc)/./src/utils/data/questions/get.ts:23:15)
resolveErrorDev @ react-server-dom-webpack-client.browser.development.js:1849
processFullRow @ react-server-dom-webpack-client.browser.development.js:1922
processBinaryChunk @ react-server-dom-webpack-client.browser.development.js:2072
progress @ react-server-dom-webpack-client.browser.development.js:2153
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
startReadingFromStream @ react-server-dom-webpack-client.browser.development.js:2161
eval @ react-server-dom-webpack-client.browser.development.js:2173
Promise.then
createFromFetch @ react-server-dom-webpack-client.browser.development.js:2172
fetchServerResponse @ fetch-server-response.js:80
await in fetchServerResponse
InnerLayoutRouter @ layout-router.js:305
renderWithHooks @ react-dom.development.js:11121
mountIndeterminateComponent @ react-dom.development.js:16869
beginWork$1 @ react-dom.development.js:18458
beginWork @ react-dom.development.js:26927
performUnitOfWork @ react-dom.development.js:25748
workLoopSync @ react-dom.development.js:25464
renderRootSync @ react-dom.development.js:25419
performConcurrentWorkOnRoot @ react-dom.development.js:24504
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
react-server-dom-webpack-client.browser.development.js:1849 Uncaught Error: 
Invalid `prisma.questions.findUnique()` invocation:

{
  where: {
    slug: "welcome-to-business"
  },
  include: {
    answers: true,
    tags: {
      include: {
        tag: true
      }
    },
    QuestionResources: true,
    bookmarks: true,
    ~~~~~~~~~
?   userAnswers?: true
  }
}

Unknown field `bookmarks` for include statement on model `Questions`. Available options are marked with ?.
    at Pn (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:29:1363)
    at Un.handleRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7090)
    at Un.handleAndLogRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6771)
    at Un.request (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6478)
    at async l (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9644)
    at async eval (webpack-internal:///(rsc)/./src/utils/data/questions/get.ts:23:15)
resolveErrorDev @ react-server-dom-webpack-client.browser.development.js:1849
processFullRow @ react-server-dom-webpack-client.browser.development.js:1922
processBinaryChunk @ react-server-dom-webpack-client.browser.development.js:2072
progress @ react-server-dom-webpack-client.browser.development.js:2153
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
startReadingFromStream @ react-server-dom-webpack-client.browser.development.js:2161
eval @ react-server-dom-webpack-client.browser.development.js:2173
Promise.then
createFromFetch @ react-server-dom-webpack-client.browser.development.js:2172
fetchServerResponse @ fetch-server-response.js:80
await in fetchServerResponse
InnerLayoutRouter @ layout-router.js:305
renderWithHooks @ react-dom.development.js:11121
mountIndeterminateComponent @ react-dom.development.js:16869
beginWork$1 @ react-dom.development.js:18458
beginWork @ react-dom.development.js:26927
performUnitOfWork @ react-dom.development.js:25748
workLoopSync @ react-dom.development.js:25464
renderRootSync @ react-dom.development.js:25419
performConcurrentWorkOnRoot @ react-dom.development.js:24504
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
redirect-boundary.js:57 Uncaught Error: 
Invalid `prisma.questions.findUnique()` invocation:

{
  where: {
    slug: "welcome-to-business"
  },
  include: {
    answers: true,
    tags: {
      include: {
        tag: true
      }
    },
    QuestionResources: true,
    bookmarks: true,
    ~~~~~~~~~
?   userAnswers?: true
  }
}

Unknown field `bookmarks` for include statement on model `Questions`. Available options are marked with ?.
    at Pn (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:29:1363)
    at Un.handleRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7090)
    at Un.handleAndLogRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6771)
    at Un.request (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6478)
    at async l (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9644)
    at async eval (webpack-internal:///(rsc)/./src/utils/data/questions/get.ts:23:15)
resolveErrorDev @ react-server-dom-webpack-client.browser.development.js:1849
processFullRow @ react-server-dom-webpack-client.browser.development.js:1922
processBinaryChunk @ react-server-dom-webpack-client.browser.development.js:2072
progress @ react-server-dom-webpack-client.browser.development.js:2153
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
startReadingFromStream @ react-server-dom-webpack-client.browser.development.js:2161
eval @ react-server-dom-webpack-client.browser.development.js:2173
Promise.then
createFromFetch @ react-server-dom-webpack-client.browser.development.js:2172
fetchServerResponse @ fetch-server-response.js:80
await in fetchServerResponse
InnerLayoutRouter @ layout-router.js:305
renderWithHooks @ react-dom.development.js:11121
mountIndeterminateComponent @ react-dom.development.js:16869
beginWork$1 @ react-dom.development.js:18458
beginWork @ react-dom.development.js:26927
performUnitOfWork @ react-dom.development.js:25748
workLoopSync @ react-dom.development.js:25464
renderRootSync @ react-dom.development.js:25419
performConcurrentWorkOnRoot @ react-dom.development.js:24504
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
redirect-boundary.js:57 Uncaught Error: 
Invalid `prisma.questions.findUnique()` invocation:

{
  where: {
    slug: "welcome-to-business"
  },
  include: {
    answers: true,
    tags: {
      include: {
        tag: true
      }
    },
    QuestionResources: true,
    bookmarks: true,
    ~~~~~~~~~
?   userAnswers?: true
  }
}

Unknown field `bookmarks` for include statement on model `Questions`. Available options are marked with ?.
    at Pn (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:29:1363)
    at Un.handleRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7090)
    at Un.handleAndLogRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6771)
    at Un.request (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6478)
    at async l (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9644)
    at async eval (webpack-internal:///(rsc)/./src/utils/data/questions/get.ts:23:15)
resolveErrorDev @ react-server-dom-webpack-client.browser.development.js:1849
processFullRow @ react-server-dom-webpack-client.browser.development.js:1922
processBinaryChunk @ react-server-dom-webpack-client.browser.development.js:2072
progress @ react-server-dom-webpack-client.browser.development.js:2153
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
startReadingFromStream @ react-server-dom-webpack-client.browser.development.js:2161
eval @ react-server-dom-webpack-client.browser.development.js:2173
Promise.then
createFromFetch @ react-server-dom-webpack-client.browser.development.js:2172
fetchServerResponse @ fetch-server-response.js:80
await in fetchServerResponse
InnerLayoutRouter @ layout-router.js:305
renderWithHooks @ react-dom.development.js:11121
mountIndeterminateComponent @ react-dom.development.js:16869
beginWork$1 @ react-dom.development.js:18458
beginWork @ react-dom.development.js:26927
performUnitOfWork @ react-dom.development.js:25748
workLoopSync @ react-dom.development.js:25464
renderRootSync @ react-dom.development.js:25419
performConcurrentWorkOnRoot @ react-dom.development.js:24504
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
redirect-boundary.js:57 Uncaught Error: 
Invalid `prisma.questions.findUnique()` invocation:

{
  where: {
    slug: "welcome-to-business"
  },
  include: {
    answers: true,
    tags: {
      include: {
        tag: true
      }
    },
    QuestionResources: true,
    bookmarks: true,
    ~~~~~~~~~
?   userAnswers?: true
  }
}

Unknown field `bookmarks` for include statement on model `Questions`. Available options are marked with ?.
    at Pn (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:29:1363)
    at Un.handleRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7090)
    at Un.handleAndLogRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6771)
    at Un.request (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6478)
    at async l (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9644)
    at async eval (webpack-internal:///(rsc)/./src/utils/data/questions/get.ts:23:15)
resolveErrorDev @ react-server-dom-webpack-client.browser.development.js:1849
processFullRow @ react-server-dom-webpack-client.browser.development.js:1922
processBinaryChunk @ react-server-dom-webpack-client.browser.development.js:2072
progress @ react-server-dom-webpack-client.browser.development.js:2153
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
startReadingFromStream @ react-server-dom-webpack-client.browser.development.js:2161
eval @ react-server-dom-webpack-client.browser.development.js:2173
Promise.then
createFromFetch @ react-server-dom-webpack-client.browser.development.js:2172
fetchServerResponse @ fetch-server-response.js:80
await in fetchServerResponse
InnerLayoutRouter @ layout-router.js:305
renderWithHooks @ react-dom.development.js:11121
mountIndeterminateComponent @ react-dom.development.js:16869
beginWork$1 @ react-dom.development.js:18458
beginWork @ react-dom.development.js:26927
performUnitOfWork @ react-dom.development.js:25748
workLoopSync @ react-dom.development.js:25464
renderRootSync @ react-dom.development.js:25419
performConcurrentWorkOnRoot @ react-dom.development.js:24504
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
not-found-boundary.js:37 Uncaught Error: 
Invalid `prisma.questions.findUnique()` invocation:

{
  where: {
    slug: "welcome-to-business"
  },
  include: {
    answers: true,
    tags: {
      include: {
        tag: true
      }
    },
    QuestionResources: true,
    bookmarks: true,
    ~~~~~~~~~
?   userAnswers?: true
  }
}

Unknown field `bookmarks` for include statement on model `Questions`. Available options are marked with ?.
    at Pn (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:29:1363)
    at Un.handleRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7090)
    at Un.handleAndLogRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6771)
    at Un.request (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6478)
    at async l (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9644)
    at async eval (webpack-internal:///(rsc)/./src/utils/data/questions/get.ts:23:15)
resolveErrorDev @ react-server-dom-webpack-client.browser.development.js:1849
processFullRow @ react-server-dom-webpack-client.browser.development.js:1922
processBinaryChunk @ react-server-dom-webpack-client.browser.development.js:2072
progress @ react-server-dom-webpack-client.browser.development.js:2153
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
startReadingFromStream @ react-server-dom-webpack-client.browser.development.js:2161
eval @ react-server-dom-webpack-client.browser.development.js:2173
Promise.then
createFromFetch @ react-server-dom-webpack-client.browser.development.js:2172
fetchServerResponse @ fetch-server-response.js:80
await in fetchServerResponse
InnerLayoutRouter @ layout-router.js:305
renderWithHooks @ react-dom.development.js:11121
mountIndeterminateComponent @ react-dom.development.js:16869
beginWork$1 @ react-dom.development.js:18458
beginWork @ react-dom.development.js:26927
performUnitOfWork @ react-dom.development.js:25748
workLoopSync @ react-dom.development.js:25464
renderRootSync @ react-dom.development.js:25419
performConcurrentWorkOnRoot @ react-dom.development.js:24504
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
redirect-boundary.js:57 Uncaught Error: 
Invalid `prisma.questions.findUnique()` invocation:

{
  where: {
    slug: "welcome-to-business"
  },
  include: {
    answers: true,
    tags: {
      include: {
        tag: true
      }
    },
    QuestionResources: true,
    bookmarks: true,
    ~~~~~~~~~
?   userAnswers?: true
  }
}

Unknown field `bookmarks` for include statement on model `Questions`. Available options are marked with ?.
    at Pn (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:29:1363)
    at Un.handleRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7090)
    at Un.handleAndLogRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6771)
    at Un.request (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6478)
    at async l (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9644)
    at async eval (webpack-internal:///(rsc)/./src/utils/data/questions/get.ts:23:15)
resolveErrorDev @ react-server-dom-webpack-client.browser.development.js:1849
processFullRow @ react-server-dom-webpack-client.browser.development.js:1922
processBinaryChunk @ react-server-dom-webpack-client.browser.development.js:2072
progress @ react-server-dom-webpack-client.browser.development.js:2153
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
startReadingFromStream @ react-server-dom-webpack-client.browser.development.js:2161
eval @ react-server-dom-webpack-client.browser.development.js:2173
Promise.then
createFromFetch @ react-server-dom-webpack-client.browser.development.js:2172
fetchServerResponse @ fetch-server-response.js:80
await in fetchServerResponse
InnerLayoutRouter @ layout-router.js:305
renderWithHooks @ react-dom.development.js:11121
mountIndeterminateComponent @ react-dom.development.js:16869
beginWork$1 @ react-dom.development.js:18458
beginWork @ react-dom.development.js:26927
performUnitOfWork @ react-dom.development.js:25748
workLoopSync @ react-dom.development.js:25464
renderRootSync @ react-dom.development.js:25419
performConcurrentWorkOnRoot @ react-dom.development.js:24504
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
not-found-boundary.js:37 Uncaught Error: 
Invalid `prisma.questions.findUnique()` invocation:

{
  where: {
    slug: "welcome-to-business"
  },
  include: {
    answers: true,
    tags: {
      include: {
        tag: true
      }
    },
    QuestionResources: true,
    bookmarks: true,
    ~~~~~~~~~
?   userAnswers?: true
  }
}

Unknown field `bookmarks` for include statement on model `Questions`. Available options are marked with ?.
    at Pn (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:29:1363)
    at Un.handleRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7090)
    at Un.handleAndLogRequestError (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6771)
    at Un.request (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6478)
    at async l (Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9644)
    at async eval (webpack-internal:///(rsc)/./src/utils/data/questions/get.ts:23:15)
resolveErrorDev @ react-server-dom-webpack-client.browser.development.js:1849
processFullRow @ react-server-dom-webpack-client.browser.development.js:1922
processBinaryChunk @ react-server-dom-webpack-client.browser.development.js:2072
progress @ react-server-dom-webpack-client.browser.development.js:2153
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
progress @ react-server-dom-webpack-client.browser.development.js:2154
Promise.then
startReadingFromStream @ react-server-dom-webpack-client.browser.development.js:2161
eval @ react-server-dom-webpack-client.browser.development.js:2173
Promise.then
createFromFetch @ react-server-dom-webpack-client.browser.development.js:2172
fetchServerResponse @ fetch-server-response.js:80
await in fetchServerResponse
InnerLayoutRouter @ layout-router.js:305
renderWithHooks @ react-dom.development.js:11121
mountIndeterminateComponent @ react-dom.development.js:16869
beginWork$1 @ react-dom.development.js:18458
beginWork @ react-dom.development.js:26927
performUnitOfWork @ react-dom.development.js:25748
workLoopSync @ react-dom.development.js:25464
renderRootSync @ react-dom.development.js:25419
performConcurrentWorkOnRoot @ react-dom.development.js:24504
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
app-index.js:33 The above error occurred in the <NotFoundErrorBoundary> component:

    at InnerLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:243:11)
    at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:74:9)
    at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:82:11)
    at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:84:11)
    at LoadingBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:349:11)
    at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:160:11)
    at InnerScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:153:9)
    at ScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:228:11)
    at RenderFromTemplateContext (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/render-from-template-context.js:16:44)
    at OuterLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:370:11)
    at InnerLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:243:11)
    at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:74:9)
    at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:82:11)
    at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:84:11)
    at LoadingBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:349:11)
    at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:160:11)
    at InnerScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:153:9)
    at ScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:228:11)
    at RenderFromTemplateContext (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/render-from-template-context.js:16:44)
    at OuterLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:370:11)
    at InnerLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:243:11)
    at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:74:9)
    at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:82:11)
    at NotFoundErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:76:9)
    at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:84:11)
    at LoadingBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:349:11)
    at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:160:11)
    at InnerScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:153:9)
    at ScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:228:11)
    at RenderFromTemplateContext (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/render-from-template-context.js:16:44)
    at OuterLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:370:11)
    at body
    at html
    at QueryClientProvider (webpack-internal:///(app-pages-browser)/./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js:27:11)
    at ReactQueryClientProvider (webpack-internal:///(app-pages-browser)/./src/components/shared/react-query-client-provider.tsx:15:11)
    at RootLayout (Server)
    at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:74:9)
    at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:82:11)
    at NotFoundErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:76:9)
    at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:84:11)
    at DevRootNotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/dev-root-not-found-boundary.js:33:11)
    at ReactDevOverlay (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/react-dev-overlay/app/ReactDevOverlay.js:87:9)
    at HotReload (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/react-dev-overlay/app/hot-reloader-client.js:321:11)
    at Router (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/app-router.js:207:11)
    at ErrorBoundaryHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:113:9)
    at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:160:11)
    at AppRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/app-router.js:585:13)
    at ServerRoot (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/app-index.js:112:27)
    at Root (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/app-index.js:117:11)

React will try to recreate this component tree from scratch using the error boundary you provided, ReactDevOverlay.
window.console.error @ app-index.js:33
console.error @ hydration-error-info.js:63
console.error @ suppress-nextjs-warning.mjs:13
logCapturedError @ react-dom.development.js:15295
callback @ react-dom.development.js:15357
callCallback @ react-dom.development.js:8696
commitCallbacks @ react-dom.development.js:8743
commitClassCallbacks @ react-dom.development.js:21323
commitLayoutEffectOnFiber @ react-dom.development.js:21425
recursivelyTraverseLayoutEffects @ react-dom.development.js:22926
commitLayoutEffectOnFiber @ react-dom.development.js:21407
recursivelyTraverseLayoutEffects @ react-dom.development.js:22926
commitLayoutEffectOnFiber @ react-dom.development.js:21577
recursivelyTraverseLayoutEffects @ react-dom.development.js:22926
commitLayoutEffectOnFiber @ react-dom.development.js:21577
recursivelyTraverseLayoutEffects @ react-dom.development.js:22926
commitLayoutEffectOnFiber @ react-dom.development.js:21577
recursivelyTraverseLayoutEffects @ react-dom.development.js:22926
commitLayoutEffectOnFiber @ react-dom.development.js:21577
recursivelyTraverseLayoutEffects @ react-dom.development.js:22926
commitLayoutEffectOnFiber @ react-dom.development.js:21577
recursivelyTraverseLayoutEffects @ react-dom.development.js:22926
commitLayoutEffectOnFiber @ react-dom.development.js:21577
recursivelyTraverseLayoutEffects @ react-dom.development.js:22926
commitLayoutEffectOnFiber @ react-dom.development.js:21407
recursivelyTraverseLayoutEffects @ react-dom.development.js:22926
commitLayoutEffectOnFiber @ react-dom.development.js:21418
recursivelyTraverseLayoutEffects @ react-dom.development.js:22926
commitLayoutEffectOnFiber @ react-dom.development.js:21407
recursivelyTraverseLayoutEffects @ react-dom.development.js:22926
commitLayoutEffectOnFiber @ react-dom.development.js:21407
recursivelyTraverseLayoutEffects @ react-dom.development.js:22926
commitLayoutEffectOnFiber @ react-dom.development.js:21407
recursivelyTraverseLayoutEffects @ react-dom.development.js:22926
commitLayoutEffectOnFiber @ react-dom.development.js:21407
recursivelyTraverseLayoutEffects @ react-dom.development.js:22926
commitLayoutEffectOnFiber @ react-dom.development.js:21577
recursivelyTraverseLayoutEffects @ react-dom.development.js:22926
commitLayoutEffectOnFiber @ react-dom.development.js:21577
recursivelyTraverseLayoutEffects @ react-dom.development.js:22926
commitLayoutEffectOnFiber @ react-dom.development.js:21577
recursivelyTraverseLayoutEffects @ react-dom.development.js:22926
commitLayoutEffectOnFiber @ react-dom.development.js:21437
commitLayoutEffects @ react-dom.development.js:22912
commitRootImpl @ react-dom.development.js:26226
commitRoot @ react-dom.development.js:26077
commitRootWhenReady @ react-dom.development.js:24749
finishConcurrentRender @ react-dom.development.js:24714
performConcurrentWorkOnRoot @ react-dom.development.js:24559
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
stack-frame.js:35 
            
            
           GET http://localhost:3001/__nextjs_original-stack-frame?isServer=false&isEdgeServer=false&isAppDirectory=true&errorMessage=Error%3A+%0AInvalid+%60prisma.questions.findUnique%28%29%60+invocation%3A%0A%0A%7B%0A++where%3A+%7B%0A++++slug%3A+%22welcome-to-business%22%0A++%7D%2C%0A++include%3A+%7B%0A++++answers%3A+true%2C%0A++++tags%3A+%7B%0A++++++include%3A+%7B%0A++++++++tag%3A+true%0A++++++%7D%0A++++%7D%2C%0A++++QuestionResources%3A+true%2C%0A++++bookmarks%3A+true%2C%0A++++%7E%7E%7E%7E%7E%7E%7E%7E%7E%0A%3F+++userAnswers%3F%3A+true%0A++%7D%0A%7D%0A%0AUnknown+field+%60bookmarks%60+for+include+statement+on+model+%60Questions%60.+Available+options+are+marked+with+%3F.&file=%2FUsers%2FErlan%2FDesktop%2FBlvl-TechBlitz%2Fnode_modules%2F%40prisma%2Fclient%2Fruntime%2Flibrary.js&methodName=Pn&arguments=&lineNumber=29&column=1363 400 (Bad Request)
_getOriginalStackFrame @ stack-frame.js:35
getOriginalStackFrame @ stack-frame.js:68
eval @ stack-frame.js:83
getOriginalStackFrames @ stack-frame.js:83
getErrorByType @ getErrorByType.js:24
eval @ Errors.js:108
commitHookEffectListMount @ react-dom.development.js:21102
commitHookPassiveMountEffects @ react-dom.development.js:23154
commitPassiveMountOnFiber @ react-dom.development.js:23259
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23267
commitPassiveMountEffects @ react-dom.development.js:23225
flushPassiveEffectsImpl @ react-dom.development.js:26497
flushPassiveEffects @ react-dom.development.js:26438
commitRootImpl @ react-dom.development.js:26337
commitRoot @ react-dom.development.js:26077
performSyncWorkOnRoot @ react-dom.development.js:24925
flushSyncWorkAcrossRoots_impl @ react-dom.development.js:7758
flushSyncWorkOnAllRoots @ react-dom.development.js:7718
commitRootImpl @ react-dom.development.js:26369
commitRoot @ react-dom.development.js:26077
commitRootWhenReady @ react-dom.development.js:24749
finishConcurrentRender @ react-dom.development.js:24714
performConcurrentWorkOnRoot @ react-dom.development.js:24559
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
stack-frame.js:35 
            
            
           GET http://localhost:3001/__nextjs_original-stack-frame?isServer=false&isEdgeServer=false&isAppDirectory=true&errorMessage=Error%3A+%0AInvalid+%60prisma.questions.findUnique%28%29%60+invocation%3A%0A%0A%7B%0A++where%3A+%7B%0A++++slug%3A+%22welcome-to-business%22%0A++%7D%2C%0A++include%3A+%7B%0A++++answers%3A+true%2C%0A++++tags%3A+%7B%0A++++++include%3A+%7B%0A++++++++tag%3A+true%0A++++++%7D%0A++++%7D%2C%0A++++QuestionResources%3A+true%2C%0A++++bookmarks%3A+true%2C%0A++++%7E%7E%7E%7E%7E%7E%7E%7E%7E%0A%3F+++userAnswers%3F%3A+true%0A++%7D%0A%7D%0A%0AUnknown+field+%60bookmarks%60+for+include+statement+on+model+%60Questions%60.+Available+options+are+marked+with+%3F.&file=%2FUsers%2FErlan%2FDesktop%2FBlvl-TechBlitz%2Fnode_modules%2F%40prisma%2Fclient%2Fruntime%2Flibrary.js&methodName=Un.handleRequestError&arguments=&lineNumber=121&column=7090 400 (Bad Request)
_getOriginalStackFrame @ stack-frame.js:35
getOriginalStackFrame @ stack-frame.js:68
eval @ stack-frame.js:83
getOriginalStackFrames @ stack-frame.js:83
getErrorByType @ getErrorByType.js:24
eval @ Errors.js:108
commitHookEffectListMount @ react-dom.development.js:21102
commitHookPassiveMountEffects @ react-dom.development.js:23154
commitPassiveMountOnFiber @ react-dom.development.js:23259
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23267
commitPassiveMountEffects @ react-dom.development.js:23225
flushPassiveEffectsImpl @ react-dom.development.js:26497
flushPassiveEffects @ react-dom.development.js:26438
commitRootImpl @ react-dom.development.js:26337
commitRoot @ react-dom.development.js:26077
performSyncWorkOnRoot @ react-dom.development.js:24925
flushSyncWorkAcrossRoots_impl @ react-dom.development.js:7758
flushSyncWorkOnAllRoots @ react-dom.development.js:7718
commitRootImpl @ react-dom.development.js:26369
commitRoot @ react-dom.development.js:26077
commitRootWhenReady @ react-dom.development.js:24749
finishConcurrentRender @ react-dom.development.js:24714
performConcurrentWorkOnRoot @ react-dom.development.js:24559
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
stack-frame.js:35 
            
            
           GET http://localhost:3001/__nextjs_original-stack-frame?isServer=false&isEdgeServer=false&isAppDirectory=true&errorMessage=Error%3A+%0AInvalid+%60prisma.questions.findUnique%28%29%60+invocation%3A%0A%0A%7B%0A++where%3A+%7B%0A++++slug%3A+%22welcome-to-business%22%0A++%7D%2C%0A++include%3A+%7B%0A++++answers%3A+true%2C%0A++++tags%3A+%7B%0A++++++include%3A+%7B%0A++++++++tag%3A+true%0A++++++%7D%0A++++%7D%2C%0A++++QuestionResources%3A+true%2C%0A++++bookmarks%3A+true%2C%0A++++%7E%7E%7E%7E%7E%7E%7E%7E%7E%0A%3F+++userAnswers%3F%3A+true%0A++%7D%0A%7D%0A%0AUnknown+field+%60bookmarks%60+for+include+statement+on+model+%60Questions%60.+Available+options+are+marked+with+%3F.&file=%2FUsers%2FErlan%2FDesktop%2FBlvl-TechBlitz%2Fnode_modules%2F%40prisma%2Fclient%2Fruntime%2Flibrary.js&methodName=Pn&arguments=&lineNumber=29&column=1363 400 (Bad Request)
_getOriginalStackFrame @ stack-frame.js:35
getOriginalStackFrame @ stack-frame.js:68
eval @ stack-frame.js:83
getOriginalStackFrames @ stack-frame.js:83
getErrorByType @ getErrorByType.js:24
eval @ Errors.js:108
commitHookEffectListMount @ react-dom.development.js:21102
invokePassiveEffectMountInDEV @ react-dom.development.js:23980
invokeEffectsInDev @ react-dom.development.js:26852
legacyCommitDoubleInvokeEffectsInDEV @ react-dom.development.js:26835
commitDoubleInvokeEffectsInDEV @ react-dom.development.js:26816
flushPassiveEffectsImpl @ react-dom.development.js:26514
flushPassiveEffects @ react-dom.development.js:26438
commitRootImpl @ react-dom.development.js:26337
commitRoot @ react-dom.development.js:26077
performSyncWorkOnRoot @ react-dom.development.js:24925
flushSyncWorkAcrossRoots_impl @ react-dom.development.js:7758
flushSyncWorkOnAllRoots @ react-dom.development.js:7718
commitRootImpl @ react-dom.development.js:26369
commitRoot @ react-dom.development.js:26077
commitRootWhenReady @ react-dom.development.js:24749
finishConcurrentRender @ react-dom.development.js:24714
performConcurrentWorkOnRoot @ react-dom.development.js:24559
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
stack-frame.js:35 
            
            
           GET http://localhost:3001/__nextjs_original-stack-frame?isServer=false&isEdgeServer=false&isAppDirectory=true&errorMessage=Error%3A+%0AInvalid+%60prisma.questions.findUnique%28%29%60+invocation%3A%0A%0A%7B%0A++where%3A+%7B%0A++++slug%3A+%22welcome-to-business%22%0A++%7D%2C%0A++include%3A+%7B%0A++++answers%3A+true%2C%0A++++tags%3A+%7B%0A++++++include%3A+%7B%0A++++++++tag%3A+true%0A++++++%7D%0A++++%7D%2C%0A++++QuestionResources%3A+true%2C%0A++++bookmarks%3A+true%2C%0A++++%7E%7E%7E%7E%7E%7E%7E%7E%7E%0A%3F+++userAnswers%3F%3A+true%0A++%7D%0A%7D%0A%0AUnknown+field+%60bookmarks%60+for+include+statement+on+model+%60Questions%60.+Available+options+are+marked+with+%3F.&file=%2FUsers%2FErlan%2FDesktop%2FBlvl-TechBlitz%2Fnode_modules%2F%40prisma%2Fclient%2Fruntime%2Flibrary.js&methodName=Un.handleAndLogRequestError&arguments=&lineNumber=121&column=6771 400 (Bad Request)
_getOriginalStackFrame @ stack-frame.js:35
getOriginalStackFrame @ stack-frame.js:68
eval @ stack-frame.js:83
getOriginalStackFrames @ stack-frame.js:83
getErrorByType @ getErrorByType.js:24
eval @ Errors.js:108
commitHookEffectListMount @ react-dom.development.js:21102
commitHookPassiveMountEffects @ react-dom.development.js:23154
commitPassiveMountOnFiber @ react-dom.development.js:23259
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23267
commitPassiveMountEffects @ react-dom.development.js:23225
flushPassiveEffectsImpl @ react-dom.development.js:26497
flushPassiveEffects @ react-dom.development.js:26438
commitRootImpl @ react-dom.development.js:26337
commitRoot @ react-dom.development.js:26077
performSyncWorkOnRoot @ react-dom.development.js:24925
flushSyncWorkAcrossRoots_impl @ react-dom.development.js:7758
flushSyncWorkOnAllRoots @ react-dom.development.js:7718
commitRootImpl @ react-dom.development.js:26369
commitRoot @ react-dom.development.js:26077
commitRootWhenReady @ react-dom.development.js:24749
finishConcurrentRender @ react-dom.development.js:24714
performConcurrentWorkOnRoot @ react-dom.development.js:24559
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
stack-frame.js:35 
            
            
           GET http://localhost:3001/__nextjs_original-stack-frame?isServer=false&isEdgeServer=false&isAppDirectory=true&errorMessage=Error%3A+%0AInvalid+%60prisma.questions.findUnique%28%29%60+invocation%3A%0A%0A%7B%0A++where%3A+%7B%0A++++slug%3A+%22welcome-to-business%22%0A++%7D%2C%0A++include%3A+%7B%0A++++answers%3A+true%2C%0A++++tags%3A+%7B%0A++++++include%3A+%7B%0A++++++++tag%3A+true%0A++++++%7D%0A++++%7D%2C%0A++++QuestionResources%3A+true%2C%0A++++bookmarks%3A+true%2C%0A++++%7E%7E%7E%7E%7E%7E%7E%7E%7E%0A%3F+++userAnswers%3F%3A+true%0A++%7D%0A%7D%0A%0AUnknown+field+%60bookmarks%60+for+include+statement+on+model+%60Questions%60.+Available+options+are+marked+with+%3F.&file=%2FUsers%2FErlan%2FDesktop%2FBlvl-TechBlitz%2Fnode_modules%2F%40prisma%2Fclient%2Fruntime%2Flibrary.js&methodName=Un.handleRequestError&arguments=&lineNumber=121&column=7090 400 (Bad Request)
_getOriginalStackFrame @ stack-frame.js:35
getOriginalStackFrame @ stack-frame.js:68
eval @ stack-frame.js:83
getOriginalStackFrames @ stack-frame.js:83
getErrorByType @ getErrorByType.js:24
eval @ Errors.js:108
commitHookEffectListMount @ react-dom.development.js:21102
invokePassiveEffectMountInDEV @ react-dom.development.js:23980
invokeEffectsInDev @ react-dom.development.js:26852
legacyCommitDoubleInvokeEffectsInDEV @ react-dom.development.js:26835
commitDoubleInvokeEffectsInDEV @ react-dom.development.js:26816
flushPassiveEffectsImpl @ react-dom.development.js:26514
flushPassiveEffects @ react-dom.development.js:26438
commitRootImpl @ react-dom.development.js:26337
commitRoot @ react-dom.development.js:26077
performSyncWorkOnRoot @ react-dom.development.js:24925
flushSyncWorkAcrossRoots_impl @ react-dom.development.js:7758
flushSyncWorkOnAllRoots @ react-dom.development.js:7718
commitRootImpl @ react-dom.development.js:26369
commitRoot @ react-dom.development.js:26077
commitRootWhenReady @ react-dom.development.js:24749
finishConcurrentRender @ react-dom.development.js:24714
performConcurrentWorkOnRoot @ react-dom.development.js:24559
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
stack-frame.js:35 
            
            
           GET http://localhost:3001/__nextjs_original-stack-frame?isServer=false&isEdgeServer=false&isAppDirectory=true&errorMessage=Error%3A+%0AInvalid+%60prisma.questions.findUnique%28%29%60+invocation%3A%0A%0A%7B%0A++where%3A+%7B%0A++++slug%3A+%22welcome-to-business%22%0A++%7D%2C%0A++include%3A+%7B%0A++++answers%3A+true%2C%0A++++tags%3A+%7B%0A++++++include%3A+%7B%0A++++++++tag%3A+true%0A++++++%7D%0A++++%7D%2C%0A++++QuestionResources%3A+true%2C%0A++++bookmarks%3A+true%2C%0A++++%7E%7E%7E%7E%7E%7E%7E%7E%7E%0A%3F+++userAnswers%3F%3A+true%0A++%7D%0A%7D%0A%0AUnknown+field+%60bookmarks%60+for+include+statement+on+model+%60Questions%60.+Available+options+are+marked+with+%3F.&file=%2FUsers%2FErlan%2FDesktop%2FBlvl-TechBlitz%2Fnode_modules%2F%40prisma%2Fclient%2Fruntime%2Flibrary.js&methodName=Un.request&arguments=&lineNumber=121&column=6478 400 (Bad Request)
_getOriginalStackFrame @ stack-frame.js:35
getOriginalStackFrame @ stack-frame.js:68
eval @ stack-frame.js:83
getOriginalStackFrames @ stack-frame.js:83
getErrorByType @ getErrorByType.js:24
eval @ Errors.js:108
commitHookEffectListMount @ react-dom.development.js:21102
commitHookPassiveMountEffects @ react-dom.development.js:23154
commitPassiveMountOnFiber @ react-dom.development.js:23259
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23267
commitPassiveMountEffects @ react-dom.development.js:23225
flushPassiveEffectsImpl @ react-dom.development.js:26497
flushPassiveEffects @ react-dom.development.js:26438
commitRootImpl @ react-dom.development.js:26337
commitRoot @ react-dom.development.js:26077
performSyncWorkOnRoot @ react-dom.development.js:24925
flushSyncWorkAcrossRoots_impl @ react-dom.development.js:7758
flushSyncWorkOnAllRoots @ react-dom.development.js:7718
commitRootImpl @ react-dom.development.js:26369
commitRoot @ react-dom.development.js:26077
commitRootWhenReady @ react-dom.development.js:24749
finishConcurrentRender @ react-dom.development.js:24714
performConcurrentWorkOnRoot @ react-dom.development.js:24559
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
stack-frame.js:35 
            
            
           GET http://localhost:3001/__nextjs_original-stack-frame?isServer=false&isEdgeServer=false&isAppDirectory=true&errorMessage=Error%3A+%0AInvalid+%60prisma.questions.findUnique%28%29%60+invocation%3A%0A%0A%7B%0A++where%3A+%7B%0A++++slug%3A+%22welcome-to-business%22%0A++%7D%2C%0A++include%3A+%7B%0A++++answers%3A+true%2C%0A++++tags%3A+%7B%0A++++++include%3A+%7B%0A++++++++tag%3A+true%0A++++++%7D%0A++++%7D%2C%0A++++QuestionResources%3A+true%2C%0A++++bookmarks%3A+true%2C%0A++++%7E%7E%7E%7E%7E%7E%7E%7E%7E%0A%3F+++userAnswers%3F%3A+true%0A++%7D%0A%7D%0A%0AUnknown+field+%60bookmarks%60+for+include+statement+on+model+%60Questions%60.+Available+options+are+marked+with+%3F.&file=%2FUsers%2FErlan%2FDesktop%2FBlvl-TechBlitz%2Fnode_modules%2F%40prisma%2Fclient%2Fruntime%2Flibrary.js&methodName=Un.handleAndLogRequestError&arguments=&lineNumber=121&column=6771 400 (Bad Request)
_getOriginalStackFrame @ stack-frame.js:35
getOriginalStackFrame @ stack-frame.js:68
eval @ stack-frame.js:83
getOriginalStackFrames @ stack-frame.js:83
getErrorByType @ getErrorByType.js:24
eval @ Errors.js:108
commitHookEffectListMount @ react-dom.development.js:21102
invokePassiveEffectMountInDEV @ react-dom.development.js:23980
invokeEffectsInDev @ react-dom.development.js:26852
legacyCommitDoubleInvokeEffectsInDEV @ react-dom.development.js:26835
commitDoubleInvokeEffectsInDEV @ react-dom.development.js:26816
flushPassiveEffectsImpl @ react-dom.development.js:26514
flushPassiveEffects @ react-dom.development.js:26438
commitRootImpl @ react-dom.development.js:26337
commitRoot @ react-dom.development.js:26077
performSyncWorkOnRoot @ react-dom.development.js:24925
flushSyncWorkAcrossRoots_impl @ react-dom.development.js:7758
flushSyncWorkOnAllRoots @ react-dom.development.js:7718
commitRootImpl @ react-dom.development.js:26369
commitRoot @ react-dom.development.js:26077
commitRootWhenReady @ react-dom.development.js:24749
finishConcurrentRender @ react-dom.development.js:24714
performConcurrentWorkOnRoot @ react-dom.development.js:24559
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
stack-frame.js:35 
            
            
           GET http://localhost:3001/__nextjs_original-stack-frame?isServer=false&isEdgeServer=false&isAppDirectory=true&errorMessage=Error%3A+%0AInvalid+%60prisma.questions.findUnique%28%29%60+invocation%3A%0A%0A%7B%0A++where%3A+%7B%0A++++slug%3A+%22welcome-to-business%22%0A++%7D%2C%0A++include%3A+%7B%0A++++answers%3A+true%2C%0A++++tags%3A+%7B%0A++++++include%3A+%7B%0A++++++++tag%3A+true%0A++++++%7D%0A++++%7D%2C%0A++++QuestionResources%3A+true%2C%0A++++bookmarks%3A+true%2C%0A++++%7E%7E%7E%7E%7E%7E%7E%7E%7E%0A%3F+++userAnswers%3F%3A+true%0A++%7D%0A%7D%0A%0AUnknown+field+%60bookmarks%60+for+include+statement+on+model+%60Questions%60.+Available+options+are+marked+with+%3F.&file=%2FUsers%2FErlan%2FDesktop%2FBlvl-TechBlitz%2Fnode_modules%2F%40prisma%2Fclient%2Fruntime%2Flibrary.js&methodName=async+l&arguments=&lineNumber=130&column=9644 400 (Bad Request)
_getOriginalStackFrame @ stack-frame.js:35
getOriginalStackFrame @ stack-frame.js:68
eval @ stack-frame.js:83
getOriginalStackFrames @ stack-frame.js:83
getErrorByType @ getErrorByType.js:24
eval @ Errors.js:108
commitHookEffectListMount @ react-dom.development.js:21102
commitHookPassiveMountEffects @ react-dom.development.js:23154
commitPassiveMountOnFiber @ react-dom.development.js:23259
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23256
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23370
recursivelyTraversePassiveMountEffects @ react-dom.development.js:23237
commitPassiveMountOnFiber @ react-dom.development.js:23267
commitPassiveMountEffects @ react-dom.development.js:23225
flushPassiveEffectsImpl @ react-dom.development.js:26497
flushPassiveEffects @ react-dom.development.js:26438
commitRootImpl @ react-dom.development.js:26337
commitRoot @ react-dom.development.js:26077
performSyncWorkOnRoot @ react-dom.development.js:24925
flushSyncWorkAcrossRoots_impl @ react-dom.development.js:7758
flushSyncWorkOnAllRoots @ react-dom.development.js:7718
commitRootImpl @ react-dom.development.js:26369
commitRoot @ react-dom.development.js:26077
commitRootWhenReady @ react-dom.development.js:24749
finishConcurrentRender @ react-dom.development.js:24714
performConcurrentWorkOnRoot @ react-dom.development.js:24559
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
stack-frame.js:35 
            
            
           GET http://localhost:3001/__nextjs_original-stack-frame?isServer=false&isEdgeServer=false&isAppDirectory=true&errorMessage=Error%3A+%0AInvalid+%60prisma.questions.findUnique%28%29%60+invocation%3A%0A%0A%7B%0A++where%3A+%7B%0A++++slug%3A+%22welcome-to-business%22%0A++%7D%2C%0A++include%3A+%7B%0A++++answers%3A+true%2C%0A++++tags%3A+%7B%0A++++++include%3A+%7B%0A++++++++tag%3A+true%0A++++++%7D%0A++++%7D%2C%0A++++QuestionResources%3A+true%2C%0A++++bookmarks%3A+true%2C%0A++++%7E%7E%7E%7E%7E%7E%7E%7E%7E%0A%3F+++userAnswers%3F%3A+true%0A++%7D%0A%7D%0A%0AUnknown+field+%60bookmarks%60+for+include+statement+on+model+%60Questions%60.+Available+options+are+marked+with+%3F.&file=%2FUsers%2FErlan%2FDesktop%2FBlvl-TechBlitz%2Fnode_modules%2F%40prisma%2Fclient%2Fruntime%2Flibrary.js&methodName=Un.request&arguments=&lineNumber=121&column=6478 400 (Bad Request)
_getOriginalStackFrame @ stack-frame.js:35
getOriginalStackFrame @ stack-frame.js:68
eval @ stack-frame.js:83
getOriginalStackFrames @ stack-frame.js:83
getErrorByType @ getErrorByType.js:24
eval @ Errors.js:108
commitHookEffectListMount @ react-dom.development.js:21102
invokePassiveEffectMountInDEV @ react-dom.development.js:23980
invokeEffectsInDev @ react-dom.development.js:26852
legacyCommitDoubleInvokeEffectsInDEV @ react-dom.development.js:26835
commitDoubleInvokeEffectsInDEV @ react-dom.development.js:26816
flushPassiveEffectsImpl @ react-dom.development.js:26514
flushPassiveEffects @ react-dom.development.js:26438
commitRootImpl @ react-dom.development.js:26337
commitRoot @ react-dom.development.js:26077
performSyncWorkOnRoot @ react-dom.development.js:24925
flushSyncWorkAcrossRoots_impl @ react-dom.development.js:7758
flushSyncWorkOnAllRoots @ react-dom.development.js:7718
commitRootImpl @ react-dom.development.js:26369
commitRoot @ react-dom.development.js:26077
commitRootWhenReady @ react-dom.development.js:24749
finishConcurrentRender @ react-dom.development.js:24714
performConcurrentWorkOnRoot @ react-dom.development.js:24559
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
stack-frame.js:35 
            
            
           GET http://localhost:3001/__nextjs_original-stack-frame?isServer=false&isEdgeServer=false&isAppDirectory=true&errorMessage=Error%3A+%0AInvalid+%60prisma.questions.findUnique%28%29%60+invocation%3A%0A%0A%7B%0A++where%3A+%7B%0A++++slug%3A+%22welcome-to-business%22%0A++%7D%2C%0A++include%3A+%7B%0A++++answers%3A+true%2C%0A++++tags%3A+%7B%0A++++++include%3A+%7B%0A++++++++tag%3A+true%0A++++++%7D%0A++++%7D%2C%0A++++QuestionResources%3A+true%2C%0A++++bookmarks%3A+true%2C%0A++++%7E%7E%7E%7E%7E%7E%7E%7E%7E%0A%3F+++userAnswers%3F%3A+true%0A++%7D%0A%7D%0A%0AUnknown+field+%60bookmarks%60+for+include+statement+on+model+%60Questions%60.+Available+options+are+marked+with+%3F.&file=%2FUsers%2FErlan%2FDesktop%2FBlvl-TechBlitz%2Fnode_modules%2F%40prisma%2Fclient%2Fruntime%2Flibrary.js&methodName=async+l&arguments=&lineNumber=130&column=9644 400 (Bad Request)
_getOriginalStackFrame @ stack-frame.js:35
getOriginalStackFrame @ stack-frame.js:68
eval @ stack-frame.js:83
getOriginalStackFrames @ stack-frame.js:83
getErrorByType @ getErrorByType.js:24
eval @ Errors.js:108
commitHookEffectListMount @ react-dom.development.js:21102
invokePassiveEffectMountInDEV @ react-dom.development.js:23980
invokeEffectsInDev @ react-dom.development.js:26852
legacyCommitDoubleInvokeEffectsInDEV @ react-dom.development.js:26835
commitDoubleInvokeEffectsInDEV @ react-dom.development.js:26816
flushPassiveEffectsImpl @ react-dom.development.js:26514
flushPassiveEffects @ react-dom.development.js:26438
commitRootImpl @ react-dom.development.js:26337
commitRoot @ react-dom.development.js:26077
performSyncWorkOnRoot @ react-dom.development.js:24925
flushSyncWorkAcrossRoots_impl @ react-dom.development.js:7758
flushSyncWorkOnAllRoots @ react-dom.development.js:7718
commitRootImpl @ react-dom.development.js:26369
commitRoot @ react-dom.development.js:26077
commitRootWhenReady @ react-dom.development.js:24749
finishConcurrentRender @ react-dom.development.js:24714
performConcurrentWorkOnRoot @ react-dom.development.js:24559
workLoop @ scheduler.development.js:256
flushWork @ scheduler.development.js:225
performWorkUntilDeadline @ scheduler.development.js:534
