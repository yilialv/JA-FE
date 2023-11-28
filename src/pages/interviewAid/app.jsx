import { observer } from "mobx-react";

import InterviewAidModel from "../../components/InterviewAidModel/InterviewAidModel";
import { useLocation } from 'react-router-dom';

function interviewAid(){

  return (
    <div className="interviewAid" style={{ height: "calc(100vh - 80px)",  display: "flex", justifyContent: "center", alignItems: "center"}}>
      <InterviewAidModel />
    </div>
  )
}

export default observer(interviewAid);