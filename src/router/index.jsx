import { useRoutes } from "react-router-dom";
import { React } from "react";



import Home from '@/pages/Home/App';
import Interview from '@/pages/Interview/App';
import User from '@/pages/User/App';
import MockInterviewHall from '@/pages/mockInterviewHall/App';
import MockInterview from '@/pages/mockInterview/App';
import MockInterviewDetail from '@/pages/mockInterview/MockInterviewDetail';
import RecordUpload from '@/pages/User/RecordUpload';
import InterviewDetail from '@/pages/User/components/InterviewDetail';
import UserCenter from '../pages/UserCenter';

import InterviewAid from '@/pages/interviewAid/app';
import AssistantInterview from "../pages/AssistantInterview/index"
import InterviewDetailPage from "../pages/InterviewDetail/index"
import InterviewEdit from "../pages/InterviewEdit/index"

const router = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/interviewAid",
      element: <InterviewAid />,
    },
    {
      path: "/mockInterviewDetail",
      element: <MockInterviewDetail />,
    },
    {
      path: "/mockInterviewHall",
      element: <MockInterviewHall />,
    },
    {
      path: "/mockInterview",
      element: <MockInterview />,
    },
    {
      path: "/interview",
      element: <Interview />,
    },
    {
      path: "/user",
      element: <User />,
    },
    {
      path: "/experience/upload",
      element: <RecordUpload />,
    },
    {
      path:'/user/interviewDetail/:id',
      element: <InterviewDetail />
    },
    {
      path:"/user-center",
      element: <UserCenter />
    },
    {
      path:"/assistant-interview",
      element: <AssistantInterview />
    },
    {
      path:"/interiew-detail/:id",
      element: <InterviewDetailPage />
    },
    {
      path:"/interiew-edit/:id",
      element: <InterviewEdit />
    }
  ])

  return element
}




export default router;
