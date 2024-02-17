import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Appointment from './Pages/Appointment/Appointment';
import Login from './Pages/Login/Login';
import SingUp from './Pages/SingUp/SingUp';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import Dashboard from './Pages/Dashboard/Dashboard';
import MyAppointment from './Pages/Dashboard/MyAppointment';
import MyReviews from './Pages/Dashboard/MyReviews';
import Users from './Pages/Dashboard/AllUsers/Users';
import RequireAdmin from './PrivateRoute/RequireAdmin';
import Review from './Review/Review';
import About from './About/About';
import ContactUs from './ContactUs/ContactUs';
import AddDoctor from './Pages/Dashboard/AddDoctor/AddDoctor';
import ManageDoctor from './Pages/Dashboard/ManageDoctor/ManageDoctor';
import Payment from './Pages/Payment/Payment';

const queryClient = new QueryClient()



const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/reviews',
        element: <Review></Review>
      },
      {
        path: '/about',
        element: <About></About>
      },
      {
        path: '/contact',
        element: <ContactUs></ContactUs>
      },
      {
        path: '/appointment',
        element: <PrivateRoute><Appointment></Appointment></PrivateRoute>
      },
    ]
  },

  {
    path: 'payment/:id',
    element: <Payment></Payment>
  },

  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/singup',
    element: <SingUp></SingUp>
  },


  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: '/dashboard',
        element: <MyAppointment></MyAppointment>
      },
      {
        path: '/dashboard/reviews',
        element: <MyReviews></MyReviews>
      },
      {
        path: '/dashboard/users',
        element: <RequireAdmin><Users></Users></RequireAdmin>
      },
      {
        path: '/dashboard/add-doctors',
        element: <RequireAdmin><AddDoctor></AddDoctor></RequireAdmin>
      },
      {
        path: '/dashboard/manage-doctor',
        element: <RequireAdmin><ManageDoctor></ManageDoctor></RequireAdmin>
      },
    ]
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
