import { createBrowserRouter } from "react-router-dom"
import Main from "../pages/Main/Main"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />
    },
    {
        path: "/history/:id",
        element: <History />
    }
])