import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./routes/layout/Home";
import Coords from "./routes/layout/Coords";
import Enemies from "./routes/layout/Enemies";
import ProfileSettings from "./routes/layout/ProfileSettings";
import EnemyRoute from "./routes/layout/Enemy";
import AvailableCoords from "./routes/layout/AvailableCoords";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: '/coords',
                    element: <Coords />,
                },
                {
                    path: '/summary',
                    element: <Enemies />,
                },
                {
                    path: '/available',
                    element: <AvailableCoords />
                },
                {
                    path: '/me',
                    element: <ProfileSettings />,
                },
                {
                    path: '/add_coords',
                    element: <EnemyRoute />,
                }
            ]
        }
    ]
)

export default router;