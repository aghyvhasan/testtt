import { Suspense, useEffect } from "react";

// Motion
import { motion } from 'framer-motion';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../redux/customise/customiseActions";

// Router
import {
    BrowserRouter,
    Route,
    Switch,
    useLocation,
} from "react-router-dom";

// Routes
import { Routes } from "./routes";

// Layouts
import VerticalLayout from "../layout/VerticalLayout";
import FullLayout from "../layout/FullLayout";

// Components
import Analytics from "../view/main/dashboard/analytics";
import Error404 from "../view/pages/errors/404";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useCheckUser } from "../hooks/useCheckUser";

export default function Router() {
    // Redux
    const customise = useSelector(state => state.customise)
    const dispatch = useDispatch()
    
    const location = useLocation()
    // route replace ='/'
    const router=useHistory()

    let themeLocal
    useEffect(() => {
        if (localStorage) {
            themeLocal = localStorage.getItem("theme")
        }

        if (themeLocal === "light" || themeLocal === "dark") {
            document.querySelector("body").classList.add(themeLocal)
            dispatch(theme(themeLocal))
        } else {
            document.querySelector("body").classList.add(customise.theme)
            dispatch(theme(customise.theme))
        }
    }, [])


    // RTL
    useEffect(() => {
        if (customise.direction == "ltr") {
            document.querySelector("html").setAttribute("dir", "ltr");
        } else if (customise.direction == "rtl") {
            document.querySelector("html").setAttribute("dir", "rtl");
        }
    }, [])

    // console.log(location)

    useEffect(() => {
        // Theme
        if (location.search == "?theme=dark") {
            localStorage.setItem("theme", "dark")
            themeLocal = "dark"
        } else if (location.search == "?theme=light") {
            localStorage.setItem("theme", "light")
            themeLocal = "light"
        }

        // Direction
        if (location.search == "?direction=ltr") {
            document.querySelector("html").setAttribute("dir", "ltr");
        } else if (location.search == "?direction=rtl") {
            document.querySelector("html").setAttribute("dir", "rtl");
        }
    }, [])

  useCheckUser(router)
   

    // Default Layout
    const DefaultLayout = customise.layout; // FullLayout or VerticalLayout

    // All of the available layouts
    const Layouts = { VerticalLayout, FullLayout };

    // Return Filtered Array of Routes & Paths
    const LayoutRoutesAndPaths = (layout) => {
        const LayoutRoutes = [];
        const LayoutPaths = [];
        if (Routes) {
            // Checks if Route layout or Default layout matches current layout
            Routes.filter(route => (route.layout === layout) && (
                LayoutRoutes.push(route),
                LayoutPaths.push(route.path)
            ));
        }

        return { LayoutRoutes, LayoutPaths };
    };

    // Return Route to Render
    const ResolveRoutes = () => {
        return Object.keys(Layouts).map((layout, index) => {
            const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout);

            let LayoutTag;
            if (DefaultLayout == "HorizontalLayout") {
                if (layout == "VerticalLayout") {
                    LayoutTag = Layouts["HorizontalLayout"];
                } else {
                    LayoutTag = Layouts[layout];
                }
            } else {
                LayoutTag = Layouts[layout];
            }

            return (
                <Route path={LayoutPaths} key={index}>
                    <LayoutTag>
                        <Switch>
                            {LayoutRoutes.map((route) => {
                                return (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        exact={route.exact === true}
                                        render={(props) => {
                                            console.log(route);
                                            return (
                                                <Suspense fallback={null}>
                                                    {
                                                        route.layout === 'FullLayout' ? (
                                                            <route.component {...props} />
                                                        ) : (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 50 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ type: "spring", duration: 0.5, delay: 0.5 }}
                                                            >
                                                                <route.component {...props} />
                                                            </motion.div>
                                                        )
                                                    }
                                                </Suspense>
                                            );
                                        }}
                                    />
                                );
                            })}
                        </Switch>
                    </LayoutTag>
                </Route >
            );
        });
    };

    return (
            <Switch>
                {ResolveRoutes()}

                {/* Home Page */}
                <Route
                    exact
                    path={'/'}
                    render={() => {
                        return (
                            DefaultLayout == "HorizontalLayout" ? (
                                <Layouts.HorizontalLayout>
                                    <Analytics />
                                </Layouts.HorizontalLayout>
                            ) : (
                                <Layouts.VerticalLayout>
                                    <Analytics />
                                </Layouts.VerticalLayout>
                            )
                        )
                    }}
                />

                {/* NotFound */}
                <Route path='*'>
                    <Error404 />
                </Route>
            </Switch>
    );
};