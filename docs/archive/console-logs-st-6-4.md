react-dom.development.js:38560 Download the React DevTools for a better development experience: https://reactjs.org/link/react-devtools
app-index.js:33 [PostHog.js] PostHog was initialized without a token. This likely indicates a misconfiguration. Please check the first argument passed to posthog.init()
window.console.error @ app-index.js:33
app-index.js:33 Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

Check the render method of `SidebarAnimatedIcon`.
    at ChatBot (webpack-internal:///(app-pages-browser)/./src/components/ui/icons/chat-bot.tsx:10:11)
    at eval (webpack-internal:///(app-pages-browser)/./src/components/app/navigation/sidebar.tsx:46:17)
    at a
    at LinkComponent (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/link.js:121:19)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/@radix-ui+react-slot@1.2.3_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-slot/dist/index.mjs:44:13)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/@radix-ui+react-slot@1.2.3_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-slot/dist/index.mjs:20:13)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/@radix-ui+react-slot@1.2.3_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-slot/dist/index.mjs:44:13)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/@radix-ui+react-slot@1.2.3_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-slot/dist/index.mjs:20:13)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/@radix-ui+react-primitive@2.1.3_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react@18_ujcax4x2btumxxy334cxx2hjfq/node_modules/@radix-ui/react-primitive/dist/index.mjs:38:13)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/@radix-ui+react-slot@1.2.3_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-slot/dist/index.mjs:44:13)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/@radix-ui+react-slot@1.2.3_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-slot/dist/index.mjs:20:13)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/@radix-ui+react-primitive@2.1.3_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react@18_ujcax4x2btumxxy334cxx2hjfq/node_modules/@radix-ui/react-primitive/dist/index.mjs:38:13)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/@radix-ui+react-popper@1.2.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react@18.3._wwc252xynq3agan6q2g4prz53u/node_modules/@radix-ui/react-popper/dist/index.mjs:69:13)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/@radix-ui+react-tooltip@1.2.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react@18.3_tm7uupgurjbqnzur6xs7sjtora/node_modules/@radix-ui/react-tooltip/dist/index.mjs:205:13)
    at Provider (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/@radix-ui+react-context@1.1.2_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-context/dist/index.mjs:34:15)
    at Provider (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/@radix-ui+react-context@1.1.2_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-context/dist/index.mjs:34:15)
    at Popper (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/@radix-ui+react-popper@1.2.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react@18.3._wwc252xynq3agan6q2g4prz53u/node_modules/@radix-ui/react-popper/dist/index.mjs:54:13)
    at Tooltip (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/@radix-ui+react-tooltip@1.2.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react@18.3_tm7uupgurjbqnzur6xs7sjtora/node_modules/@radix-ui/react-tooltip/dist/index.mjs:95:13)
    at eval (webpack-internal:///(app-pages-browser)/./src/components/ui/sidebar.tsx:548:11)
    at div
    at li
    at _c30 (webpack-internal:///(app-pages-browser)/./src/components/ui/sidebar.tsx:516:11)
    at ul
    at _c28 (webpack-internal:///(app-pages-browser)/./src/components/ui/sidebar.tsx:501:11)
    at div
    at _c26 (webpack-internal:///(app-pages-browser)/./src/components/ui/sidebar.tsx:486:11)
    at div
    at _c20 (webpack-internal:///(app-pages-browser)/./src/components/ui/sidebar.tsx:438:11)
    at div
    at _c18 (webpack-internal:///(app-pages-browser)/./src/components/ui/sidebar.tsx:423:11)
    at div
    at div
    at div
    at eval (webpack-internal:///(app-pages-browser)/./src/components/ui/sidebar.tsx:175:11)
    at AppSidebar (webpack-internal:///(app-pages-browser)/./src/components/app/navigation/sidebar.tsx:69:11)
    at div
    at Provider (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/@radix-ui+react-context@1.1.2_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-context/dist/index.mjs:34:15)
    at TooltipProvider (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/@radix-ui+react-tooltip@1.2.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react@18.3_tm7uupgurjbqnzur6xs7sjtora/node_modules/@radi
window.console.error @ app-index.js:33
app-index.js:33 Warning: Extra attributes from the server: class
    at body
    at html
    at RootLayout (Server)
    at InnerLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/layout-router.js:243:11)
    at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/redirect-boundary.js:74:9)
    at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/redirect-boundary.js:82:11)
    at NotFoundErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/not-found-boundary.js:76:9)
    at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/not-found-boundary.js:84:11)
    at LoadingBoundary (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/layout-router.js:349:11)
    at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/error-boundary.js:160:11)
    at InnerScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/layout-router.js:153:9)
    at ScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/layout-router.js:228:11)
    at RenderFromTemplateContext (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/render-from-template-context.js:16:44)
    at OuterLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/layout-router.js:370:11)
    at body
    at html
    at QueryClientProvider (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/@tanstack+react-query@5.81.2_react@18.3.1/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js:27:11)
    at ReactQueryClientProvider (webpack-internal:///(app-pages-browser)/./src/components/shared/react-query-client-provider.tsx:15:11)
    at RootLayout (Server)
    at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/redirect-boundary.js:74:9)
    at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/redirect-boundary.js:82:11)
    at NotFoundErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/not-found-boundary.js:76:9)
    at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/not-found-boundary.js:84:11)
    at DevRootNotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/dev-root-not-found-boundary.js:33:11)
    at ReactDevOverlay (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/react-dev-overlay/app/ReactDevOverlay.js:87:9)
    at HotReload (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/react-dev-overlay/app/hot-reloader-client.js:321:11)
    at Router (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/app-router.js:207:11)
    at ErrorBoundaryHandler (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/error-boundary.js:113:9)
    at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/error-boundary.js:160:11)
    at AppRouter (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/app-router.js:585:13)
    at ServerRoot (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/app-index.js:112:27)
    at Root (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next@14.2.30_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/app-index.js:117:11)
window.console.error @ app-index.js:33
sidebar.tsx:85 suggestion updated Object
use-performance.ts:45 [Performance] PerformanceOptimizer: Object
sidebar.tsx:85 suggestion updated Object
use-performance.ts:45 [Performance] PerformanceOptimizer: Object
performance-optimizer.tsx:95 [Performance] App metrics: Object
sidebar.tsx:336 Uncaught TypeError: ref.current.startAnimation is not a function
    at handleItemHover (sidebar.tsx:336:21)
    at onMouseEnter (sidebar.tsx:424:33)
    at HTMLUnknownElement.callCallback (react-dom.development.js:20565:14)
    at Object.invokeGuardedCallbackImpl (react-dom.development.js:20614:16)
    at invokeGuardedCallback (react-dom.development.js:20689:29)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:20703:25)
    at executeDispatch (react-dom.development.js:32128:3)
    at processDispatchQueueItemsInOrder (react-dom.development.js:32160:7)
    at processDispatchQueue (react-dom.development.js:32173:5)
    at dispatchEventsForPlugins (react-dom.development.js:32184:3)
    at eval (react-dom.development.js:32374:12)
    at batchedUpdates$1 (react-dom.development.js:24953:12)
    at batchedUpdates (react-dom.development.js:28844:12)
    at dispatchEventForPluginEventSystem (react-dom.development.js:32373:3)
    at dispatchEvent (react-dom.development.js:30141:5)
    at dispatchContinuousEvent (react-dom.development.js:30126:5)
react-dom.development.js:20724 Uncaught TypeError: ref.current.startAnimation is not a function
    at handleItemHover (sidebar.tsx:336:21)
    at onMouseEnter (sidebar.tsx:424:33)
    at HTMLUnknownElement.callCallback (react-dom.development.js:20565:14)
    at Object.invokeGuardedCallbackImpl (react-dom.development.js:20614:16)
    at invokeGuardedCallback (react-dom.development.js:20689:29)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:20703:25)
    at executeDispatch (react-dom.development.js:32128:3)
    at processDispatchQueueItemsInOrder (react-dom.development.js:32160:7)
    at processDispatchQueue (react-dom.development.js:32173:5)
    at dispatchEventsForPlugins (react-dom.development.js:32184:3)
    at eval (react-dom.development.js:32374:12)
    at batchedUpdates$1 (react-dom.development.js:24953:12)
    at batchedUpdates (react-dom.development.js:28844:12)
    at dispatchEventForPluginEventSystem (react-dom.development.js:32373:3)
    at dispatchEvent (react-dom.development.js:30141:5)
    at dispatchContinuousEvent (react-dom.development.js:30126:5)
sidebar.tsx:338 Uncaught TypeError: ref.current.stopAnimation is not a function
    at handleItemHover (sidebar.tsx:338:21)
    at onMouseLeave (sidebar.tsx:425:33)
    at HTMLUnknownElement.callCallback (react-dom.development.js:20565:14)
    at Object.invokeGuardedCallbackImpl (react-dom.development.js:20614:16)
    at invokeGuardedCallback (react-dom.development.js:20689:29)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:20703:25)
    at executeDispatch (react-dom.development.js:32128:3)
    at processDispatchQueueItemsInOrder (react-dom.development.js:32160:7)
    at processDispatchQueue (react-dom.development.js:32173:5)
    at dispatchEventsForPlugins (react-dom.development.js:32184:3)
    at eval (react-dom.development.js:32374:12)
    at batchedUpdates$1 (react-dom.development.js:24953:12)
    at batchedUpdates (react-dom.development.js:28844:12)
    at dispatchEventForPluginEventSystem (react-dom.development.js:32373:3)
    at dispatchEvent (react-dom.development.js:30141:5)
    at dispatchContinuousEvent (react-dom.development.js:30126:5)
react-dom.development.js:20724 Uncaught TypeError: ref.current.stopAnimation is not a function
    at handleItemHover (sidebar.tsx:338:21)
    at onMouseLeave (sidebar.tsx:425:33)
    at HTMLUnknownElement.callCallback (react-dom.development.js:20565:14)
    at Object.invokeGuardedCallbackImpl (react-dom.development.js:20614:16)
    at invokeGuardedCallback (react-dom.development.js:20689:29)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:20703:25)
    at executeDispatch (react-dom.development.js:32128:3)
    at processDispatchQueueItemsInOrder (react-dom.development.js:32160:7)
    at processDispatchQueue (react-dom.development.js:32173:5)
    at dispatchEventsForPlugins (react-dom.development.js:32184:3)
    at eval (react-dom.development.js:32374:12)
    at batchedUpdates$1 (react-dom.development.js:24953:12)
    at batchedUpdates (react-dom.development.js:28844:12)
    at dispatchEventForPluginEventSystem (react-dom.development.js:32373:3)
    at dispatchEvent (react-dom.development.js:30141:5)
    at dispatchContinuousEvent (react-dom.development.js:30126:5)
hot-reloader-client.js:187 [Fast Refresh] rebuilding
sidebar.tsx:336 Uncaught TypeError: ref.current.startAnimation is not a function
    at handleItemHover (sidebar.tsx:336:21)
    at onMouseEnter (sidebar.tsx:424:33)
    at HTMLUnknownElement.callCallback (react-dom.development.js:20565:14)
    at Object.invokeGuardedCallbackImpl (react-dom.development.js:20614:16)
    at invokeGuardedCallback (react-dom.development.js:20689:29)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:20703:25)
    at executeDispatch (react-dom.development.js:32128:3)
    at processDispatchQueueItemsInOrder (react-dom.development.js:32160:7)
    at processDispatchQueue (react-dom.development.js:32173:5)
    at dispatchEventsForPlugins (react-dom.development.js:32184:3)
    at eval (react-dom.development.js:32374:12)
    at batchedUpdates$1 (react-dom.development.js:24953:12)
    at batchedUpdates (react-dom.development.js:28844:12)
    at dispatchEventForPluginEventSystem (react-dom.development.js:32373:3)
    at dispatchEvent (react-dom.development.js:30141:5)
    at dispatchContinuousEvent (react-dom.development.js:30126:5)
react-dom.development.js:20724 Uncaught TypeError: ref.current.startAnimation is not a function
    at handleItemHover (sidebar.tsx:336:21)
    at onMouseEnter (sidebar.tsx:424:33)
    at HTMLUnknownElement.callCallback (react-dom.development.js:20565:14)
    at Object.invokeGuardedCallbackImpl (react-dom.development.js:20614:16)
    at invokeGuardedCallback (react-dom.development.js:20689:29)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:20703:25)
    at executeDispatch (react-dom.development.js:32128:3)
    at processDispatchQueueItemsInOrder (react-dom.development.js:32160:7)
    at processDispatchQueue (react-dom.development.js:32173:5)
    at dispatchEventsForPlugins (react-dom.development.js:32184:3)
    at eval (react-dom.development.js:32374:12)
    at batchedUpdates$1 (react-dom.development.js:24953:12)
    at batchedUpdates (react-dom.development.js:28844:12)
    at dispatchEventForPluginEventSystem (react-dom.development.js:32373:3)
    at dispatchEvent (react-dom.development.js:30141:5)
    at dispatchContinuousEvent (react-dom.development.js:30126:5)
sidebar.tsx:338 Uncaught TypeError: ref.current.stopAnimation is not a function
    at handleItemHover (sidebar.tsx:338:21)
    at onMouseLeave (sidebar.tsx:425:33)
    at HTMLUnknownElement.callCallback (react-dom.development.js:20565:14)
    at Object.invokeGuardedCallbackImpl (react-dom.development.js:20614:16)
    at invokeGuardedCallback (react-dom.development.js:20689:29)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:20703:25)
    at executeDispatch (react-dom.development.js:32128:3)
    at processDispatchQueueItemsInOrder (react-dom.development.js:32160:7)
    at processDispatchQueue (react-dom.development.js:32173:5)
    at dispatchEventsForPlugins (react-dom.development.js:32184:3)
    at eval (react-dom.development.js:32374:12)
    at batchedUpdates$1 (react-dom.development.js:24953:12)
    at batchedUpdates (react-dom.development.js:28844:12)
    at dispatchEventForPluginEventSystem (react-dom.development.js:32373:3)
    at dispatchEvent (react-dom.development.js:30141:5)
    at dispatchContinuousEvent (react-dom.development.js:30126:5)
react-dom.development.js:20724 Uncaught TypeError: ref.current.stopAnimation is not a function
    at handleItemHover (sidebar.tsx:338:21)
    at onMouseLeave (sidebar.tsx:425:33)
    at HTMLUnknownElement.callCallback (react-dom.development.js:20565:14)
    at Object.invokeGuardedCallbackImpl (react-dom.development.js:20614:16)
    at invokeGuardedCallback (react-dom.development.js:20689:29)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:20703:25)
    at executeDispatch (react-dom.development.js:32128:3)
    at processDispatchQueueItemsInOrder (react-dom.development.js:32160:7)
    at processDispatchQueue (react-dom.development.js:32173:5)
    at dispatchEventsForPlugins (react-dom.development.js:32184:3)
    at eval (react-dom.development.js:32374:12)
    at batchedUpdates$1 (react-dom.development.js:24953:12)
    at batchedUpdates (react-dom.development.js:28844:12)
    at dispatchEventForPluginEventSystem (react-dom.development.js:32373:3)
    at dispatchEvent (react-dom.development.js:30141:5)
    at dispatchContinuousEvent (react-dom.development.js:30126:5)
hot-reloader-client.js:44 [Fast Refresh] done in 1143ms
sidebar.tsx:336 Uncaught TypeError: ref.current.startAnimation is not a function
    at handleItemHover (sidebar.tsx:336:21)
    at onMouseEnter (sidebar.tsx:424:33)
    at HTMLUnknownElement.callCallback (react-dom.development.js:20565:14)
    at Object.invokeGuardedCallbackImpl (react-dom.development.js:20614:16)
    at invokeGuardedCallback (react-dom.development.js:20689:29)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:20703:25)
    at executeDispatch (react-dom.development.js:32128:3)
    at processDispatchQueueItemsInOrder (react-dom.development.js:32160:7)
    at processDispatchQueue (react-dom.development.js:32173:5)
    at dispatchEventsForPlugins (react-dom.development.js:32184:3)
    at eval (react-dom.development.js:32374:12)
    at batchedUpdates$1 (react-dom.development.js:24953:12)
    at batchedUpdates (react-dom.development.js:28844:12)
    at dispatchEventForPluginEventSystem (react-dom.development.js:32373:3)
    at dispatchEvent (react-dom.development.js:30141:5)
    at dispatchContinuousEvent (react-dom.development.js:30126:5)
react-dom.development.js:20724 Uncaught TypeError: ref.current.startAnimation is not a function
    at handleItemHover (sidebar.tsx:336:21)
    at onMouseEnter (sidebar.tsx:424:33)
    at HTMLUnknownElement.callCallback (react-dom.development.js:20565:14)
    at Object.invokeGuardedCallbackImpl (react-dom.development.js:20614:16)
    at invokeGuardedCallback (react-dom.development.js:20689:29)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:20703:25)
    at executeDispatch (react-dom.development.js:32128:3)
    at processDispatchQueueItemsInOrder (react-dom.development.js:32160:7)
    at processDispatchQueue (react-dom.development.js:32173:5)
    at dispatchEventsForPlugins (react-dom.development.js:32184:3)
    at eval (react-dom.development.js:32374:12)
    at batchedUpdates$1 (react-dom.development.js:24953:12)
    at batchedUpdates (react-dom.development.js:28844:12)
    at dispatchEventForPluginEventSystem (react-dom.development.js:32373:3)
    at dispatchEvent (react-dom.development.js:30141:5)
    at dispatchContinuousEvent (react-dom.development.js:30126:5)
sidebar.tsx:338 Uncaught TypeError: ref.current.stopAnimation is not a function
    at handleItemHover (sidebar.tsx:338:21)
    at onMouseLeave (sidebar.tsx:425:33)
    at HTMLUnknownElement.callCallback (react-dom.development.js:20565:14)
    at Object.invokeGuardedCallbackImpl (react-dom.development.js:20614:16)
    at invokeGuardedCallback (react-dom.development.js:20689:29)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:20703:25)
    at executeDispatch (react-dom.development.js:32128:3)
    at processDispatchQueueItemsInOrder (react-dom.development.js:32160:7)
    at processDispatchQueue (react-dom.development.js:32173:5)
    at dispatchEventsForPlugins (react-dom.development.js:32184:3)
    at eval (react-dom.development.js:32374:12)
    at batchedUpdates$1 (react-dom.development.js:24953:12)
    at batchedUpdates (react-dom.development.js:28844:12)
    at dispatchEventForPluginEventSystem (react-dom.development.js:32373:3)
    at dispatchEvent (react-dom.development.js:30141:5)
    at dispatchContinuousEvent (react-dom.development.js:30126:5)
react-dom.development.js:20724 Uncaught TypeError: ref.current.stopAnimation is not a function
    at handleItemHover (sidebar.tsx:338:21)
    at onMouseLeave (sidebar.tsx:425:33)
    at HTMLUnknownElement.callCallback (react-dom.development.js:20565:14)
    at Object.invokeGuardedCallbackImpl (react-dom.development.js:20614:16)
    at invokeGuardedCallback (react-dom.development.js:20689:29)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:20703:25)
    at executeDispatch (react-dom.development.js:32128:3)
    at processDispatchQueueItemsInOrder (react-dom.development.js:32160:7)
    at processDispatchQueue (react-dom.development.js:32173:5)
    at dispatchEventsForPlugins (react-dom.development.js:32184:3)
    at eval (react-dom.development.js:32374:12)
    at batchedUpdates$1 (react-dom.development.js:24953:12)
    at batchedUpdates (react-dom.development.js:28844:12)
    at dispatchEventForPluginEventSystem (react-dom.development.js:32373:3)
    at dispatchEvent (react-dom.development.js:30141:5)
    at dispatchContinuousEvent (react-dom.development.js:30126:5)
sidebar.tsx:336 Uncaught TypeError: ref.current.startAnimation is not a function
    at handleItemHover (sidebar.tsx:336:21)
    at onMouseEnter (sidebar.tsx:424:33)
    at HTMLUnknownElement.callCallback (react-dom.development.js:20565:14)
    at Object.invokeGuardedCallbackImpl (react-dom.development.js:20614:16)
    at invokeGuardedCallback (react-dom.development.js:20689:29)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:20703:25)
    at executeDispatch (react-dom.development.js:32128:3)
    at processDispatchQueueItemsInOrder (react-dom.development.js:32160:7)
    at processDispatchQueue (react-dom.development.js:32173:5)
    at dispatchEventsForPlugins (react-dom.development.js:32184:3)
    at eval (react-dom.development.js:32374:12)
    at batchedUpdates$1 (react-dom.development.js:24953:12)
    at batchedUpdates (react-dom.development.js:28844:12)
    at dispatchEventForPluginEventSystem (react-dom.development.js:32373:3)
    at dispatchEvent (react-dom.development.js:30141:5)
    at dispatchContinuousEvent (react-dom.development.js:30126:5)
react-dom.development.js:20724 Uncaught TypeError: ref.current.startAnimation is not a function
    at handleItemHover (sidebar.tsx:336:21)
    at onMouseEnter (sidebar.tsx:424:33)
    at HTMLUnknownElement.callCallback (react-dom.development.js:20565:14)
    at Object.invokeGuardedCallbackImpl (react-dom.development.js:20614:16)
    at invokeGuardedCallback (react-dom.development.js:20689:29)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:20703:25)
    at executeDispatch (react-dom.development.js:32128:3)
    at processDispatchQueueItemsInOrder (react-dom.development.js:32160:7)
    at processDispatchQueue (react-dom.development.js:32173:5)
    at dispatchEventsForPlugins (react-dom.development.js:32184:3)
    at eval (react-dom.development.js:32374:12)
    at batchedUpdates$1 (react-dom.development.js:24953:12)
    at batchedUpdates (react-dom.development.js:28844:12)
    at dispatchEventForPluginEventSystem (react-dom.development.js:32373:3)
    at dispatchEvent (react-dom.development.js:30141:5)
    at dispatchContinuousEvent (react-dom.development.js:30126:5)
sidebar.tsx:338 Uncaught TypeError: ref.current.stopAnimation is not a function
    at handleItemHover (sidebar.tsx:338:21)
    at onMouseLeave (sidebar.tsx:425:33)
    at HTMLUnknownElement.callCallback (react-dom.development.js:20565:14)
    at Object.invokeGuardedCallbackImpl (react-dom.development.js:20614:16)
    at invokeGuardedCallback (react-dom.development.js:20689:29)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:20703:25)
    at executeDispatch (react-dom.development.js:32128:3)
    at processDispatchQueueItemsInOrder (react-dom.development.js:32160:7)
    at processDispatchQueue (react-dom.development.js:32173:5)
    at dispatchEventsForPlugins (react-dom.development.js:32184:3)
    at eval (react-dom.development.js:32374:12)
    at batchedUpdates$1 (react-dom.development.js:24953:12)
    at batchedUpdates (react-dom.development.js:28844:12)
    at dispatchEventForPluginEventSystem (react-dom.development.js:32373:3)
    at dispatchEvent (react-dom.development.js:30141:5)
    at dispatchContinuousEvent (react-dom.development.js:30126:5)
react-dom.development.js:20724 Uncaught TypeError: ref.current.stopAnimation is not a function
    at handleItemHover (sidebar.tsx:338:21)
    at onMouseLeave (sidebar.tsx:425:33)
    at HTMLUnknownElement.callCallback (react-dom.development.js:20565:14)
    at Object.invokeGuardedCallbackImpl (react-dom.development.js:20614:16)
    at invokeGuardedCallback (react-dom.development.js:20689:29)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:20703:25)
    at executeDispatch (react-dom.development.js:32128:3)
    at processDispatchQueueItemsInOrder (react-dom.development.js:32160:7)
    at processDispatchQueue (react-dom.development.js:32173:5)
    at dispatchEventsForPlugins (react-dom.development.js:32184:3)
    at eval (react-dom.development.js:32374:12)
    at batchedUpdates$1 (react-dom.development.js:24953:12)
    at batchedUpdates (react-dom.development.js:28844:12)
    at dispatchEventForPluginEventSystem (react-dom.development.js:32373:3)
    at dispatchEvent (react-dom.development.js:30141:5)
    at dispatchContinuousEvent (react-dom.development.js:30126:5)
hot-reloader-client.js:187 [Fast Refresh] rebuilding
 [Fast Refresh] done in 261ms
