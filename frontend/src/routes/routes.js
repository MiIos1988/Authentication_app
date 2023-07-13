import App from "../App";
import LoginPageComponent from "../pages/LoginPageComponent";
import RegisterPageComponent from "../pages/RegisterPageComponent";
import HomePage from './../pages/HomePage';

const router = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <HomePage/>
            },
            {
                path: 'login',
                element: <LoginPageComponent/>
            },
            {
                path: 'register',
                element: <RegisterPageComponent/>
            }

        ]
    }
]

export default router;