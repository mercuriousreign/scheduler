import React from "react";
import "styles/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types'; 

/**Renders inside the form that allows uer to select individual interviewer of the day when booking an appointment */
export default function InterviewerList (props) {
  const {interviewers,onChange} = props


  const individuals = interviewers?.map((interviewer)=>{
    return(
      <InterviewerListItem
      key = {interviewer.id}
      name = {interviewer.name}
      avatar = {interviewer.avatar}
      selected = {interviewer.id === props.value}
      setInterviewer = {()=>{onChange(interviewer.id)}}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

