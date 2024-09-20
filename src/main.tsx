import '@/styles/font-size.css';
import '@/styles/main.css';
import '@/styles/tiptap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './layout';
import { store } from './lib/redux/store';
import ClassDetailPage from './pages/class-detail';
import { CreateClassPage } from './pages/class/create-class';

import { CreateNextClassPage } from './pages/class/create-next-class';
import { CreateNextViewClassPage } from './pages/class/create-next-view-class';
import ClassPage from './pages/class/list-of-class';
import DesignSystem from './pages/design-system';
import ErrorPage from './pages/error-page';

import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './hooks/withProtected';
import { TrainingCalendarView } from './pages/calendar';
import HomePage from './pages/home';
import LearningMaterialPage from './pages/learning-material';
// import { LearningMaterialDetails } from './pages/learning-material/components/learning-material-details';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile/page';
import UpdateProfilePage from './pages/profile/UpdateProfilePage';
// import Register from "./pages/register/page";
import SyllabusPage from './pages/syllabus';
import CreateSyllabusPage from './pages/syllabus/create-syllabus';
import SyllabusDetailPage from './pages/syllabus/syllabus-detail';
import UpdateSyllabus from './pages/syllabus/update-syllabus';
import TrainingCalendarPage from './pages/training-calendar';
import TrainingProgramPage from './pages/training-program';
import CreateProgram from './pages/training-program/createTrainingProgram/create-program';
import EditTrainingProgram from './pages/training-program/createTrainingProgram/EditTrainingProgram';
import ViewTrainingProgram from './pages/training-program/ViewTrainingProgram/ViewTrainingProgram';
import UserManagementPage from './pages/user-management';
import CreateTraineePage from './pages/user-management/create-trainee/page';
import UserPermission from './pages/user-management/user-permisson';
import OtpConfirmLayout from './pages/verifiy/layout';
import ForgotPassword from './pages/forgot-password/page';
import CreateFormClassPage from './pages/class/create-class/index';
import AuthorizedRoute from './hooks/authorizedRoute';
import RoleAuthorizedProtectedRoute from './hooks/roleAuthorizedProtectedRoute';
import LearningMaterialDetailPage from './pages/learning-material/components/syllabus-detail';
import CreateClassSchedulePage from './pages/class/create-class-schedule';
import EditFormClassPage from './pages/class/edit-class';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      //Cấm sửa
      <ProtectedRoute>
        <AuthorizedRoute>
          <Layout>
            <Outlet />
          </Layout>
        </AuthorizedRoute>
      </ProtectedRoute>
    ),
    errorElement: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
    children: [
      {
        path: '/',
        element: (
          <RoleAuthorizedProtectedRoute requestTo="home" actionType="view">
            <HomePage />
          </RoleAuthorizedProtectedRoute>
        ),
      },
      {
        path: '/home',
        element: (
          <RoleAuthorizedProtectedRoute requestTo="home" actionType="view">
            <HomePage />
          </RoleAuthorizedProtectedRoute>
        ),
      },
      {
        path: '/syllabus',
        element: (
          <RoleAuthorizedProtectedRoute requestTo="syllabus" actionType="view">
            <SyllabusPage />
          </RoleAuthorizedProtectedRoute>
        ),
      },
      {
        path: '/syllabus/:id',
        element: (
          <RoleAuthorizedProtectedRoute requestTo="syllabus" actionType="view">
            <SyllabusDetailPage />
          </RoleAuthorizedProtectedRoute>
        ),
      },
      {
        path: '/syllabus/:id/update',
        element: (
          <RoleAuthorizedProtectedRoute requestTo="syllabus" actionType="modify">
            <UpdateSyllabus />
          </RoleAuthorizedProtectedRoute>
        ),
      },
      {
        path: '/syllabus/create',
        element: (
          <RoleAuthorizedProtectedRoute requestTo="syllabus" actionType="create">
            <CreateSyllabusPage />
          </RoleAuthorizedProtectedRoute>
        ),
      },
      {
        path: '/training-calendar',
        element: <TrainingCalendarPage />,
      },
      {
        path: '/training-program',
        element: (
          <RoleAuthorizedProtectedRoute requestTo="training-program" actionType="view">
            <TrainingProgramPage />
          </RoleAuthorizedProtectedRoute>
        ),
      },
      {
        path: '/training-program/Create',
        element: (
          <RoleAuthorizedProtectedRoute requestTo="training-program" actionType="create">
            <CreateProgram />
          </RoleAuthorizedProtectedRoute>
        ),
      },
      {
        path: '/training-program/:id/edit',
        element: (
          <RoleAuthorizedProtectedRoute requestTo="training-program" actionType="modify">
            <EditTrainingProgram />
          </RoleAuthorizedProtectedRoute>
        ),
      },
      {
        path: '/training-program/:id',
        element: (
          <RoleAuthorizedProtectedRoute requestTo="training-program" actionType="view">
            <ViewTrainingProgram />
          </RoleAuthorizedProtectedRoute>
        ),
      },
      {
        path: '/training-program/:trainingProgramId/:id',
        element: (
          <RoleAuthorizedProtectedRoute requestTo="training-program" actionType="view">
            <RoleAuthorizedProtectedRoute requestTo="syllabus" actionType="view">
              <SyllabusDetailPage />
            </RoleAuthorizedProtectedRoute>
          </RoleAuthorizedProtectedRoute>
        ),
      },
      {
        path: '/TrainingCalendar/View',
        element: <TrainingCalendarView />,
      },
      {
        path: '/class',
        children: [
          {
            path: '/class',
            element: (
              <RoleAuthorizedProtectedRoute requestTo="class" actionType="view">
                <ClassPage />
              </RoleAuthorizedProtectedRoute>
            ),
          },
          {
            path: '/class/:classID',
            element: (
              <RoleAuthorizedProtectedRoute requestTo="class" actionType="view">
                <ClassDetailPage />
              </RoleAuthorizedProtectedRoute>
            ),
          },
          {
            path: '/class/:classID/create-schedule',
            element: (
              <RoleAuthorizedProtectedRoute requestTo="class" actionType="view">
                <CreateClassSchedulePage />
              </RoleAuthorizedProtectedRoute>
            ),
          },
          {
            path: '/class/:classID/edit',
            element: (
              <RoleAuthorizedProtectedRoute requestTo="class" actionType="view">
                <EditFormClassPage />
              </RoleAuthorizedProtectedRoute>
            ),
          },
          {
            path: '/class/create',
            element: (
              <RoleAuthorizedProtectedRoute requestTo="class" actionType="create">
                <CreateFormClassPage />
              </RoleAuthorizedProtectedRoute>
            ),
          },
          {
            path: '/class/create/classdetail',
            element: (
              <RoleAuthorizedProtectedRoute requestTo="class" actionType="create">
                <CreateClassPage />
              </RoleAuthorizedProtectedRoute>
            ),
          },
          {
            path: '/class/create/classdetail/next',
            element: (
              <RoleAuthorizedProtectedRoute requestTo="class" actionType="create">
                <CreateNextClassPage />
              </RoleAuthorizedProtectedRoute>
            ),
          },
          {
            path: '/class/create/classdetail/next/view',
            element: (
              <RoleAuthorizedProtectedRoute requestTo="class" actionType="create">
                <CreateNextViewClassPage />
              </RoleAuthorizedProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '/user-management',
        element: (
          <RoleAuthorizedProtectedRoute requestTo="user" actionType="view">
            <UserManagementPage />
          </RoleAuthorizedProtectedRoute>
        ),
      },
      {
        path: '/user-management/create-trainee',
        element: (
          <RoleAuthorizedProtectedRoute requestTo="user" actionType="create">
            <CreateTraineePage />
          </RoleAuthorizedProtectedRoute>
        ),
      },
      {
        path: '/user-management/permission',
        element: (
          <RoleAuthorizedProtectedRoute requestTo="user" actionType="modify">
            <UserPermission />
          </RoleAuthorizedProtectedRoute>
        ),
      },
      {
        path: '/learning-materials',
        element: <LearningMaterialPage />,
      },
      {
        path: '/learning-materials/:id',
        // element: <LearningMaterialDetails />,
        element: (
            <LearningMaterialDetailPage />
        ),
      },
      {
        path: '/design-system',
        element: <DesignSystem />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/profile/update',
        element: <UpdateProfilePage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  // {
  //   path: "/register",
  //   element: <Register />,
  // },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/verify',
    element: <OtpConfirmLayout />,
    // children: [
    //   {
    //     path: "/verify",
    //     element: <VerifyEmail />,
    //   },
    //   {
    //     path: "/verify/update-info",
    //     element: <ProtectetdVerifyRoute><VerifyUpdateInfo /></ProtectetdVerifyRoute>
    //     // element: <VerifyUpdateInfo />
    //   },
    //   {
    //     path: "/verify/success",
    //     element: <VerifySuccess />,
    //   }
    // ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        stacked
      />
    </Provider>
  </React.StrictMode>,
);
