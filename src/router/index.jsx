import { useRoutes } from 'react-router-dom'
import {React} from 'react'



import Home from '@/pages/Home/App';

import Interview from '@/pages/Interview/App';
import User from '@/pages/User/App';
import MockInterviewHall from '@/pages/mockInterviewHall/App';
import MockInterview from '@/pages/mockInterview/App';
import MockInterviewDetail from '@/pages/mockInterview/MockInterviewDetail';
import RecordUpload from '@/pages/User/RecordUpload';
import InterviewDetail from '@/pages/User/components/InterviewDetail';

const router = () => {
  const element = useRoutes([
    {
      path:'/',
      element: <Home />
    },
    {
      path:'/mockInterviewDetail',
      element: <MockInterviewDetail />
    },
    {
      path:'/mockInterviewHall',
      element: <MockInterviewHall />
    },
    {
      path:'/mockInterview',
      element: <MockInterview />,
    },
    {
      path:'/interview',
      element: <Interview />
    },
    {
      path: '/user',
      element: <User />
    },
    {
      path: '/experience/upload',
      element: <RecordUpload />
    },
    {
      path:'/user/interviewDetail/:id',
      element: <InterviewDetail />
    }
  ])

  return element
}




export default router