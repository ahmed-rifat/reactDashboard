import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import Faq from './pages/Form/Faq';
import FormLayout from './pages/Form/FormLayout';
import ServiceType from './pages/ServiceType';
import Settings from './pages/Settings';
import Service from './pages/Service';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
// import DefaultLayout from './layout/DefaultLayout';

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
            <>
              <PageTitle title="Dashboard" />
              <ECommerce />
            </>
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
          <>
            <PageTitle title="ServiceType" />
            <ServiceType />
          </>
        }
      />
      <Route
        path="/forms/faq"
        element={
          <>
            <PageTitle title="Faq Section" />
            <Faq />
          </>
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
          <>
            <PageTitle title="Service" />
            <Service />
          </>
        }
      />
      <Route
        path="/settings"
        element={
          <>
            <PageTitle title="Settings" />
            <Settings />
          </>
        }
      />
      <Route
        path="/chart"
        element={
          <>
            <PageTitle title="Basic Chart" />
            <Chart />
          </>
        }
      />
      <Route
        path="/ui/alerts"
        element={
          <>
            <PageTitle title="Alerts" />
            <Alerts />
          </>
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
