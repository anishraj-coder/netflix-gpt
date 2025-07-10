import {createBrowserRouter} from "react-router-dom";
// import Login from "../pages/Login.tsx";
// import Browse from "../pages/Browse.tsx";
// import Body from "../pages/Body.tsx";
// import ErrorPage from "../pages/ErrorPage.tsx";
// import GPTSearch from "../pages/GPTSearch.tsx";
// import MovieDetails from "../pages/MovieDetails.tsx";
import { lazy ,Suspense} from 'react';


const Login = lazy(() => import("../pages/Login"));
const Browse = lazy(() => import("../pages/Browse"));
const GPTSearch = lazy(() => import("../pages/GPTSearch"));
const MovieDetails = lazy(() => import("../pages/MovieDetails"));
const Body = lazy(() => import("../pages/Body"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));

export const Fallback=({page}:{page:string})=>{
    return(
        <div className={` w-full h-screen text-6xl flex items-center font-bold font-[poppins] bg-black justify-center text-white `}>
            <h1>Loading {page}.........</h1>
        </div>
    )
}
export const AppRoute = createBrowserRouter([
    {
        path: '/',
        element: (
            <Suspense fallback={<Fallback page="Home" />}>
                <Body />
            </Suspense>
        ),
        errorElement: (
            <Suspense fallback={<Fallback page="Error Page" />}>
                <ErrorPage />
            </Suspense>
        ),
        children: [
            {
                path: '/login',
                element: (
                    <Suspense fallback={<Fallback page="Login" />}>
                        <Login />
                    </Suspense>
                )
            },
            {
                path: '/browse',
                element: (
                    <Suspense fallback={<Fallback page="Browse" />}>
                        <Browse />
                    </Suspense>
                )
            },
            {
                path: '/search',
                element: (
                    <Suspense fallback={<Fallback page="Search" />}>
                        <GPTSearch />
                    </Suspense>
                )
            },
            {
                path: '/movie/:movieId',
                element: (
                    <Suspense fallback={<Fallback page="Movie Details" />}>
                        <MovieDetails />
                    </Suspense>
                )
            }
        ]
    },
    {
        path: '/error',
        element: (
            <Suspense fallback={<Fallback page="Error Page" />}>
                <ErrorPage />
            </Suspense>
        )
    }
]);