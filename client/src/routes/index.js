import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuth } from '../provider/authProvider'

import Dashboard from '../pages/Dashboard'
import Payment from '../pages/Payment'
import ChangePassword from '../pages/ChangePassword'
import History from '../pages/History'
import Login from '../pages/Login'
import Home from '../pages/Home'
import ErrorPage from '../pages/error-page'
import PaymentSuccess from '../pages/PaymentSuccess'
import PaymentFailure from '../pages/PaymentFailure'
import TokenExpired from '../pages/TokenExpired'

const Routes = () => {
    const { token } = useAuth()

    // Define public routes accessible to all users
    const routesForPublic = [
        {
            path: '/payment_success',
            element: <PaymentSuccess />
        },
        {
            path: '/payment_failure',
            element: <PaymentFailure />
        }
    ]

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: '/',
            element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                    children: [
                        {
                            path: '/',
                            element: <Dashboard />
                        },
                        {
                            path: '/payment',
                            element: <Payment />
                        },
                        {
                            path: '/history',
                            element: <History />
                        },
                        {
                            path: '/change_pass',
                            element: <ChangePassword />
                        }
                    ]
                },
            ]
        }
    ]

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        {
            path: '/login',
            element: <Login />
        }, 
        {
            path: '/token-expired',
            element: <TokenExpired />
        }
    ]

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly
    ])

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />
}

export default Routes
