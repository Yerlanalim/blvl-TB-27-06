    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 3004ms
calculateUnifiedProgress error PrismaClientKnownRequestError: 
Invalid `prisma.$queryRaw()` invocation:


Raw query failed. Code: `42P01`. Message: `relation "user_level_progress" does not exist`
    at Zn.handleRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7459)
    at Zn.handleAndLogRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6784)
    at Zn.request (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6491)
    at async l (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9778)
    at async eval (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:53:35)
    at async GET (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:139:30)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 1851ms
calculateUnifiedProgress error PrismaClientKnownRequestError: 
Invalid `prisma.$queryRaw()` invocation:


Raw query failed. Code: `42P01`. Message: `relation "user_level_progress" does not exist`
    at Zn.handleRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7459)
    at Zn.handleAndLogRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6784)
    at Zn.request (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6491)
    at async l (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9778)
    at async eval (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:53:35)
    at async GET (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:139:30)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 1529ms
 GET /favicon.ico 200 in 35ms
calculateUnifiedProgress error PrismaClientKnownRequestError: 
Invalid `prisma.$queryRaw()` invocation:


Raw query failed. Code: `42P01`. Message: `relation "user_level_progress" does not exist`
    at Zn.handleRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7459)
    at Zn.handleAndLogRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6784)
    at Zn.request (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6491)
    at async l (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9778)
    at async eval (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:53:35)
    at async GET (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:139:30)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 1665ms
 GET /favicon.ico 200 in 28ms
calculateUnifiedProgress error PrismaClientKnownRequestError: 
Invalid `prisma.$queryRaw()` invocation:


Raw query failed. Code: `42P01`. Message: `relation "user_level_progress" does not exist`
    at Zn.handleRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7459)
    at Zn.handleAndLogRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6784)
    at Zn.request (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6491)
    at async l (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9778)
    at async eval (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:53:35)
    at async GET (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:139:30)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 1477ms
 GET /favicon.ico 200 in 33ms
calculateUnifiedProgress error PrismaClientKnownRequestError: 
Invalid `prisma.$queryRaw()` invocation:


Raw query failed. Code: `42P01`. Message: `relation "user_level_progress" does not exist`
    at Zn.handleRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7459)
    at Zn.handleAndLogRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6784)
    at Zn.request (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6491)
    at async l (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9778)
    at async eval (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:53:35)
    at async GET (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:139:30)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 1581ms
calculateUnifiedProgress error PrismaClientKnownRequestError: 
Invalid `prisma.$queryRaw()` invocation:


Raw query failed. Code: `42P01`. Message: `relation "user_level_progress" does not exist`
    at Zn.handleRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7459)
    at Zn.handleAndLogRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6784)
    at Zn.request (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6491)
    at async l (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9778)
    at async eval (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:53:35)
    at async GET (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:139:30)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 1116ms
calculateUnifiedProgress error PrismaClientKnownRequestError: 
Invalid `prisma.$queryRaw()` invocation:


Raw query failed. Code: `42P01`. Message: `relation "user_level_progress" does not exist`
    at Zn.handleRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7459)
    at Zn.handleAndLogRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6784)
    at Zn.request (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6491)
    at async l (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9778)
    at async eval (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:53:35)
    at async GET (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:139:30)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 1055ms
calculateUnifiedProgress error PrismaClientKnownRequestError: 
Invalid `prisma.$queryRaw()` invocation:


Raw query failed. Code: `42P01`. Message: `relation "user_level_progress" does not exist`
    at Zn.handleRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7459)
    at Zn.handleAndLogRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6784)
    at Zn.request (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6491)
    at async l (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9778)
    at async eval (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:53:35)
    at async GET (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:139:30)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 1106ms
calculateUnifiedProgress error PrismaClientKnownRequestError: 
Invalid `prisma.$queryRaw()` invocation:


Raw query failed. Code: `42P01`. Message: `relation "user_level_progress" does not exist`
    at Zn.handleRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7459)
    at Zn.handleAndLogRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6784)
    at Zn.request (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6491)
    at async l (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9778)
    at async eval (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:53:35)
    at async GET (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:139:30)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 1560ms
 GET /favicon.ico 200 in 25ms
 GET /favicon.ico 200 in 24ms
calculateUnifiedProgress error PrismaClientKnownRequestError: 
Invalid `prisma.$queryRaw()` invocation:


Raw query failed. Code: `42P01`. Message: `relation "user_level_progress" does not exist`
    at Zn.handleRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7459)
    at Zn.handleAndLogRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6784)
    at Zn.request (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6491)
    at async l (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9778)
    at async eval (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:53:35)
    at async GET (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:139:30)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 2419ms
 GET /favicon.ico 200 in 33ms
calculateUnifiedProgress error PrismaClientKnownRequestError: 
Invalid `prisma.$queryRaw()` invocation:


Raw query failed. Code: `42P01`. Message: `relation "user_level_progress" does not exist`
    at Zn.handleRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7459)
    at Zn.handleAndLogRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6784)
    at Zn.request (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6491)
    at async l (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9778)
    at async eval (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:53:35)
    at async GET (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:139:30)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 1267ms
 GET /question/welcome-to-business 200 in 4114ms
 GET /favicon.ico 200 in 20ms
 GET /favicon.ico 200 in 30ms
 GET /favicon.ico 200 in 37ms
 GET /favicon.ico 200 in 26ms
answerQuestion called with: {
  questionUid: 'business-models-test-1',
  answerUid: 'cmcn6zzkq0009bobsj17qhfcr',
  timeTaken: 0,
  allPassed: undefined,
  studyPathSlug: undefined
}
User ID: 02047f67-6814-4d9a-8102-79f53fa47a92
Question type: MULTIPLE_CHOICE
Answer is correct: false
Finding existing answer for user 02047f67-6814-4d9a-8102-79f53fa47a92 and question business-models-test-1
No existing answer found for this user and question
Answer status: {
  isNewAnswer: true,
  isNewCorrectAnswer: false,
  existingAnswerId: undefined
}
Streak continued: false
Saving answer to database...
Updating or creating answer: {
  existingAnswer: undefined,
  userUid: '02047f67-6814-4d9a-8102-79f53fa47a92',
  questionUid: 'business-models-test-1',
  answerUid: 'cmcn6zzkq0009bobsj17qhfcr',
  correctAnswer: false,
  timeTaken: 0,
  environment: 'development'
}
Creating new answer for question: business-models-test-1
New answer created: cmcogrngf0006bouz5u89tyf9
Answer saved successfully: cmcogrngf0006bouz5u89tyf9
User XP updated
Daily missions updated
Cache tags revalidated
 POST /question/business-models-test-1 200 in 6333ms
 GET /favicon.ico 200 in 31ms
 GET /favicon.ico 200 in 31ms
answerQuestion called with: {
  questionUid: 'smart-goals-test',
  answerUid: 'cmcn70a8e000jbobsnnqvrl0e',
  timeTaken: 0,
  allPassed: undefined,
  studyPathSlug: undefined
}
User ID: 02047f67-6814-4d9a-8102-79f53fa47a92
Question type: MULTIPLE_CHOICE
Answer is correct: false
Finding existing answer for user 02047f67-6814-4d9a-8102-79f53fa47a92 and question smart-goals-test
No existing answer found for this user and question
Answer status: {
  isNewAnswer: true,
  isNewCorrectAnswer: false,
  existingAnswerId: undefined
}
Streak continued: false
Saving answer to database...
Updating or creating answer: {
  existingAnswer: undefined,
  userUid: '02047f67-6814-4d9a-8102-79f53fa47a92',
  questionUid: 'smart-goals-test',
  answerUid: 'cmcn70a8e000jbobsnnqvrl0e',
  correctAnswer: false,
  timeTaken: 0,
  environment: 'development'
}
Creating new answer for question: smart-goals-test
New answer created: cmcogwjeh0007bouz4gbtokp8
Answer saved successfully: cmcogwjeh0007bouz4gbtokp8
User XP updated
Daily missions updated
Cache tags revalidated
 POST /question/smart-goals-test 200 in 9411ms
 GET /favicon.ico 200 in 28ms
 GET /favicon.ico 200 in 32ms
answerQuestion called with: {
  questionUid: 'level-1-final-test',
  answerUid: 'cmcn70k9c000rbobsezi9gvzp',
  timeTaken: 0,
  allPassed: undefined,
  studyPathSlug: undefined
}
User ID: 02047f67-6814-4d9a-8102-79f53fa47a92
Question type: MULTIPLE_CHOICE
Answer is correct: false
Finding existing answer for user 02047f67-6814-4d9a-8102-79f53fa47a92 and question level-1-final-test
No existing answer found for this user and question
Answer status: {
  isNewAnswer: true,
  isNewCorrectAnswer: false,
  existingAnswerId: undefined
}
Streak continued: false
Saving answer to database...
Updating or creating answer: {
  existingAnswer: undefined,
  userUid: '02047f67-6814-4d9a-8102-79f53fa47a92',
  questionUid: 'level-1-final-test',
  answerUid: 'cmcn70k9c000rbobsezi9gvzp',
  correctAnswer: false,
  timeTaken: 0,
  environment: 'development'
}
Creating new answer for question: level-1-final-test
New answer created: cmcogxx1l0008bouzlcj6hczs
Answer saved successfully: cmcogxx1l0008bouzlcj6hczs
User XP updated
Daily missions updated
Cache tags revalidated
 POST /question/level-1-final-test 200 in 5401ms
 GET /api/progress/unified 401 in 15ms
 GET /favicon.ico 200 in 20ms
 GET /api/progress/unified 401 in 22ms
 GET /api/progress/unified 401 in 17ms
calculateUnifiedProgress error PrismaClientKnownRequestError: 
Invalid `prisma.$queryRaw()` invocation:


Raw query failed. Code: `42P01`. Message: `relation "user_level_progress" does not exist`
    at Zn.handleRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7459)
    at Zn.handleAndLogRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6784)
    at Zn.request (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6491)
    at async l (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9778)
    at async eval (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:53:35)
    at async GET (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:139:30)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 1783ms
 POST /roadmaps 200 in 3262ms
 POST /roadmaps 200 in 2389ms
calculateUnifiedProgress error PrismaClientKnownRequestError: 
Invalid `prisma.$queryRaw()` invocation:


Raw query failed. Code: `42P01`. Message: `relation "user_level_progress" does not exist`
    at Zn.handleRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7459)
    at Zn.handleAndLogRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6784)
    at Zn.request (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6491)
    at async l (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9778)
    at async eval (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:53:35)
    at async GET (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:139:30)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 2120ms
calculateUnifiedProgress error PrismaClientKnownRequestError: 
Invalid `prisma.$queryRaw()` invocation:


Raw query failed. Code: `42P01`. Message: `relation "user_level_progress" does not exist`
    at Zn.handleRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7459)
    at Zn.handleAndLogRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6784)
    at Zn.request (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6491)
    at async l (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9778)
    at async eval (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:53:35)
    at async GET (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:139:30)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 2129ms
 ○ Compiling /leo-chat ...
 ✓ Compiled /leo-chat in 1784ms (10721 modules)
calculateUnifiedProgress error PrismaClientKnownRequestError: 
Invalid `prisma.$queryRaw()` invocation:


Raw query failed. Code: `42P01`. Message: `relation "user_level_progress" does not exist`
    at Zn.handleRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7459)
    at Zn.handleAndLogRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6784)
    at Zn.request (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6491)
    at async l (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9778)
    at async eval (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:53:35)
    at async GET (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:139:30)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 2861ms
 ✓ Compiled /favicon.ico in 439ms (5776 modules)
 GET /favicon.ico 200 in 521ms
calculateUnifiedProgress error PrismaClientKnownRequestError: 
Invalid `prisma.$queryRaw()` invocation:


Raw query failed. Code: `42P01`. Message: `relation "user_level_progress" does not exist`
    at Zn.handleRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7459)
    at Zn.handleAndLogRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6784)
    at Zn.request (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6491)
    at async l (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9778)
    at async eval (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:53:35)
    at async GET (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:139:30)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 3128ms
calculateUnifiedProgress error PrismaClientKnownRequestError: 
Invalid `prisma.$queryRaw()` invocation:


Raw query failed. Code: `42P01`. Message: `relation "user_level_progress" does not exist`
    at Zn.handleRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:7459)
    at Zn.handleAndLogRequestError (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6784)
    at Zn.request (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:121:6491)
    at async l (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/@prisma/client/runtime/library.js:130:9778)
    at async eval (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:53:35)
    at async GET (webpack-internal:///(rsc)/./src/app/api/progress/unified/route.ts:139:30)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/base-server.js:818:17)
    at async /Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:179:21)
    at async handleRequest (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:359:24)
    at async requestHandlerImpl (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/router-server.js:383:13)
    at async Server.requestListener (/Users/Erlan/Desktop/Blvl-TechBlitz/node_modules/next/dist/server/lib/start-server.js:141:13) {
  code: 'P2010',
  meta: {
    code: '42P01',
    message: 'relation "user_level_progress" does not exist'
  },
  clientVersion: '6.10.1'
}
 GET /api/progress/unified 401 in 1234ms
 ○ Compiling /upgrade ...
 ✓ Compiled /upgrade in 3.1s (10759 modules)
 GET /favicon.ico 200 in 37ms
