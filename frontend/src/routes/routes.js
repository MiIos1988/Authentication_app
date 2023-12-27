import App from "../App";
import AccessUserComponent from "../components/AccessUserComponent";
import AccessUserGuardComponent from "../guard/AccessUserGuardComponent";
import AuthGuardComponent from "../guard/AuthGuardComponent";
import LoginPageComponent from "../pages/LoginPageComponent";
import NewPasswordComponent from "../pages/NewPasswordComponent";
import RegisterPageComponent from "../pages/RegisterPageComponent";
import ResetPasswordComponent from "../pages/ResetPasswordComponent";
import HomePage from "../pages/HomePage";

const router = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: (
          <AuthGuardComponent>
            <LoginPageComponent />
          </AuthGuardComponent>
        ),
      },
      {
        path: "register",
        element: (
          <AuthGuardComponent>
            <RegisterPageComponent />
          </AuthGuardComponent>
        ),
      },
      {
        path: "new-password/:token",
        element: (
          <AuthGuardComponent>
            <NewPasswordComponent/>
          </AuthGuardComponent>
        ),
      },
      {
        path: "reset-password",
        element: (
          <AuthGuardComponent>
            <ResetPasswordComponent/>
          </AuthGuardComponent>
        ),
      },
      {
        path: "access-users",
        element: (
          <AccessUserGuardComponent>
            <AccessUserComponent/>
          </AccessUserGuardComponent>
        ),
      },
    ],
  },
];

export default router;
