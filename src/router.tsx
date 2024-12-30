import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./routes/layout/Home";
import Coords from "./routes/layout/Coords";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: '/coords',
                    element: <Coords />
                }
            ]
        }
    ]
)

export default router;