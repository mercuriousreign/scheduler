import classNames from "classnames";
import React from "react";
import "styles/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList (props) {
  const {interviewers,setInterviewer,interviewer} = props

  const individuals = interviewers?.map((ppl)=>{
    return(
      <InterviewerListItem
      key = {ppl.id}
      name = {ppl.name}
      avatar = {ppl.avatar}
      selected = {ppl.id === props.value}
      setInterviewer = {()=>onchange(ppl.id)}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{individuals}</ul>
    </section>
  )
}