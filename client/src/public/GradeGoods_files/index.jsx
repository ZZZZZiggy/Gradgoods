import __vite__cjsImport0_react_jsxDevRuntime from "/@fs/Users/xiangyuguan/Documents/projects/weblab2025/GG/skeleton-main/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=32d33b8b"; const _jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/@fs/Users/xiangyuguan/Documents/projects/weblab2025/GG/skeleton-main/node_modules/.vite/deps/react.js?v=32d33b8b"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react;
import "/@fs/Users/xiangyuguan/Documents/projects/weblab2025/GG/skeleton-main/node_modules/bootstrap/dist/css/bootstrap.min.css";
import __vite__cjsImport3_reactDom_client from "/@fs/Users/xiangyuguan/Documents/projects/weblab2025/GG/skeleton-main/node_modules/.vite/deps/react-dom_client.js?v=32d33b8b"; const ReactDOM = __vite__cjsImport3_reactDom_client.__esModule ? __vite__cjsImport3_reactDom_client.default : __vite__cjsImport3_reactDom_client;
import App from "/src/components/App.jsx?t=1737771058231";
import Skeleton from "/src/components/pages/Skeleton.jsx?t=1737860016838";
import NotFound from "/src/components/pages/NotFound.jsx";
// import Market from "./components/pages/Market";
// import User from "./components/pages/User";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "/@fs/Users/xiangyuguan/Documents/projects/weblab2025/GG/skeleton-main/node_modules/.vite/deps/react-router-dom.js?v=32d33b8b";
import { GoogleOAuthProvider } from "/@fs/Users/xiangyuguan/Documents/projects/weblab2025/GG/skeleton-main/node_modules/.vite/deps/@react-oauth_google.js?v=32d33b8b";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "588092905346-2h7e1ig7imalt3s32u42jbc9tlqmg73f.apps.googleusercontent.com";
const router = createBrowserRouter(createRoutesFromElements(/*#__PURE__*/ _jsxDEV(Route, {
    errorElement: /*#__PURE__*/ _jsxDEV(NotFound, {}, void 0, false, {
        fileName: "/Users/xiangyuguan/Documents/projects/weblab2025/GG/skeleton-main/client/src/index.jsx",
        lineNumber: 24,
        columnNumber: 26
    }, void 0),
    element: /*#__PURE__*/ _jsxDEV(App, {}, void 0, false, {
        fileName: "/Users/xiangyuguan/Documents/projects/weblab2025/GG/skeleton-main/client/src/index.jsx",
        lineNumber: 24,
        columnNumber: 49
    }, void 0),
    children: /*#__PURE__*/ _jsxDEV(Route, {
        path: "/",
        element: /*#__PURE__*/ _jsxDEV(Skeleton, {}, void 0, false, {
            fileName: "/Users/xiangyuguan/Documents/projects/weblab2025/GG/skeleton-main/client/src/index.jsx",
            lineNumber: 25,
            columnNumber: 32
        }, void 0)
    }, void 0, false, {
        fileName: "/Users/xiangyuguan/Documents/projects/weblab2025/GG/skeleton-main/client/src/index.jsx",
        lineNumber: 25,
        columnNumber: 7
    }, this)
}, void 0, false, {
    fileName: "/Users/xiangyuguan/Documents/projects/weblab2025/GG/skeleton-main/client/src/index.jsx",
    lineNumber: 24,
    columnNumber: 5
}, this)));
// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/ _jsxDEV(GoogleOAuthProvider, {
    clientId: GOOGLE_CLIENT_ID,
    children: /*#__PURE__*/ _jsxDEV(RouterProvider, {
        router: router
    }, void 0, false, {
        fileName: "/Users/xiangyuguan/Documents/projects/weblab2025/GG/skeleton-main/client/src/index.jsx",
        lineNumber: 36,
        columnNumber: 5
    }, this)
}, void 0, false, {
    fileName: "/Users/xiangyuguan/Documents/projects/weblab2025/GG/skeleton-main/client/src/index.jsx",
    lineNumber: 35,
    columnNumber: 3
}, this));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgXCJib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLm1pbi5jc3NcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tL2NsaWVudFwiO1xuaW1wb3J0IEFwcCBmcm9tIFwiLi9jb21wb25lbnRzL0FwcFwiO1xuaW1wb3J0IFNrZWxldG9uIGZyb20gXCIuL2NvbXBvbmVudHMvcGFnZXMvU2tlbGV0b25cIjtcbmltcG9ydCBOb3RGb3VuZCBmcm9tIFwiLi9jb21wb25lbnRzL3BhZ2VzL05vdEZvdW5kXCI7XG4vLyBpbXBvcnQgTWFya2V0IGZyb20gXCIuL2NvbXBvbmVudHMvcGFnZXMvTWFya2V0XCI7XG4vLyBpbXBvcnQgVXNlciBmcm9tIFwiLi9jb21wb25lbnRzL3BhZ2VzL1VzZXJcIjtcblxuaW1wb3J0IHtcbiAgY3JlYXRlQnJvd3NlclJvdXRlcixcbiAgY3JlYXRlUm91dGVzRnJvbUVsZW1lbnRzLFxuICBSb3V0ZSxcbiAgUm91dGVyUHJvdmlkZXIsXG59IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5cbmltcG9ydCB7IEdvb2dsZU9BdXRoUHJvdmlkZXIgfSBmcm9tIFwiQHJlYWN0LW9hdXRoL2dvb2dsZVwiO1xuXG4vL1RPRE86IFJFUExBQ0UgV0lUSCBZT1VSIE9XTiBDTElFTlRfSURcbmNvbnN0IEdPT0dMRV9DTElFTlRfSUQgPSBcIjU4ODA5MjkwNTM0Ni0yaDdlMWlnN2ltYWx0M3MzMnU0MmpiYzl0bHFtZzczZi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwiO1xuXG5jb25zdCByb3V0ZXIgPSBjcmVhdGVCcm93c2VyUm91dGVyKFxuICBjcmVhdGVSb3V0ZXNGcm9tRWxlbWVudHMoXG4gICAgPFJvdXRlIGVycm9yRWxlbWVudD17PE5vdEZvdW5kIC8+fSBlbGVtZW50PXs8QXBwIC8+fT5cbiAgICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGVsZW1lbnQ9ezxTa2VsZXRvbiAvPn0gLz5cbiAgICAgIHsvKiByZW1vdmUgdGhlIGNvbW1lbnQgd2hlbiB1c2VyIGRvbmUgKi99XG4gICAgICB7LyogPFJvdXRlIHBhdGg9XCIvdXNlci86aWRcIiBlbGVtZW50PXs8VXNlciAvPn0gLz4gKi99XG4gICAgICB7LyogPFJvdXRlIHBhdGg9XCIvbWFya2V0XCIgZWxlbWVudD17PE1hcmtldCAvPn0gLz4gKi99XG4gICAgPC9Sb3V0ZT5cbiAgKVxuKTtcblxuLy8gcmVuZGVycyBSZWFjdCBDb21wb25lbnQgXCJSb290XCIgaW50byB0aGUgRE9NIGVsZW1lbnQgd2l0aCBJRCBcInJvb3RcIlxuUmVhY3RET00uY3JlYXRlUm9vdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikpLnJlbmRlcihcbiAgPEdvb2dsZU9BdXRoUHJvdmlkZXIgY2xpZW50SWQ9e0dPT0dMRV9DTElFTlRfSUR9PlxuICAgIDxSb3V0ZXJQcm92aWRlciByb3V0ZXI9e3JvdXRlcn0gLz5cbiAgPC9Hb29nbGVPQXV0aFByb3ZpZGVyPlxuKTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsIlJlYWN0RE9NIiwiQXBwIiwiU2tlbGV0b24iLCJOb3RGb3VuZCIsImNyZWF0ZUJyb3dzZXJSb3V0ZXIiLCJjcmVhdGVSb3V0ZXNGcm9tRWxlbWVudHMiLCJSb3V0ZSIsIlJvdXRlclByb3ZpZGVyIiwiR29vZ2xlT0F1dGhQcm92aWRlciIsIkdPT0dMRV9DTElFTlRfSUQiLCJyb3V0ZXIiLCJlcnJvckVsZW1lbnQiLCJlbGVtZW50IiwicGF0aCIsImNyZWF0ZVJvb3QiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVuZGVyIiwiY2xpZW50SWQiXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPQSxXQUFXLFFBQVE7QUFDMUIsT0FBTyx1Q0FBdUM7QUFDOUMsT0FBT0MsY0FBYyxtQkFBbUI7QUFDeEMsT0FBT0MsU0FBUyxtQkFBbUI7QUFDbkMsT0FBT0MsY0FBYyw4QkFBOEI7QUFDbkQsT0FBT0MsY0FBYyw4QkFBOEI7QUFDbkQsa0RBQWtEO0FBQ2xELDhDQUE4QztBQUU5QyxTQUNFQyxtQkFBbUIsRUFDbkJDLHdCQUF3QixFQUN4QkMsS0FBSyxFQUNMQyxjQUFjLFFBQ1QsbUJBQW1CO0FBRTFCLFNBQVNDLG1CQUFtQixRQUFRLHNCQUFzQjtBQUUxRCx1Q0FBdUM7QUFDdkMsTUFBTUMsbUJBQW1CO0FBRXpCLE1BQU1DLFNBQVNOLG9CQUNiQyx1Q0FDRSxRQUFDQztJQUFNSyw0QkFBYyxRQUFDUjs7Ozs7SUFBYVMsdUJBQVMsUUFBQ1g7Ozs7O2NBQzNDLGNBQUEsUUFBQ0s7UUFBTU8sTUFBSztRQUFJRCx1QkFBUyxRQUFDVjs7Ozs7Ozs7Ozs7Ozs7O0FBUWhDLHFFQUFxRTtBQUNyRUYsU0FBU2MsVUFBVSxDQUFDQyxTQUFTQyxjQUFjLENBQUMsU0FBU0MsTUFBTSxlQUN6RCxRQUFDVDtJQUFvQlUsVUFBVVQ7Y0FDN0IsY0FBQSxRQUFDRjtRQUFlRyxRQUFRQSJ9