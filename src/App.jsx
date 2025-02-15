import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import Faq from './pages/Form/Faq';
import ServiceType from './pages/ServiceType';
import Settings from './pages/Settings';
import Service from './pages/Service';
import Alerts from './pages/UiElements/Alerts';
import Role from './pages/Admin/Role';
import Menu from './pages/Admin/Menu';
import PrivateRoute from './utils/PrivateRoute';
import Blog from './pages/Blog';
import UserRole from './pages/Admin/UserRole';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    // <DefaultLayout>
    <Routes>
      <Route
        index
        element={
          <>
            <PageTitle title="Next Level IT Solution" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <PageTitle title="Dashboard" />
            <ECommerce />
          </PrivateRoute>
        }
      />
      {/* <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        /> */}
      <Route
        path="/ServiceType"
        element={
          <PrivateRoute>
            <PageTitle title="ServiceType" />
            <ServiceType />
          </PrivateRoute>
        }
      />
      <Route
        path="admin/role"
        element={
          <PrivateRoute>
            <PageTitle title="UserRole" />
            <Role />
          </PrivateRoute>
        }
      />
      <Route
        path="admin/menu"
        element={
          <PrivateRoute>
            <PageTitle title="Menu" />
            <Menu />
          </PrivateRoute>
        }
      />
      <Route
        path="admin/user-role"
        element={
          <PrivateRoute>
            <PageTitle title="User Role" />
            <UserRole />
          </PrivateRoute>
        }
      />

      <Route
        path="/faq"
        element={
          <PrivateRoute>
            <PageTitle title="Faq Section" />
            <Faq />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/forms/form-layout"
        element={
          <>
            <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <FormLayout />
          </>
        }
      /> */}
      <Route
        path="/Service"
        element={
          <PrivateRoute>
            <PageTitle title="Service" />
            <Service />
          </PrivateRoute>
        }
      />
      <Route 
        path="/Blog"
        element={
          <PrivateRoute>
            <PageTitle title="Blog" />
            <Blog />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <PageTitle title="Settings" />
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <PageTitle title="Settings" />
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="/chart"
        element={
          <PrivateRoute>
            <PageTitle title="Basic Chart" />
            <Chart />
          </PrivateRoute>
        }
      />
      <Route
        path="/ui/alerts"
        element={
          <PrivateRoute>
            <PageTitle title="Alerts" />
            <Alerts />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/ui/buttons"
        element={
          <>
            <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Buttons />
          </>
        }
      /> */}
      <Route
        path="/auth/signin"
        element={
          <>
            <PageTitle title="Signin" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <>
            <PageTitle title="Signup" />
            <SignUp />
          </>
        }
      />
    </Routes>
    // </DefaultLayout>
  );
}

export default App;
