import React, { useState } from 'react';
import Button from "components/Button"
import InterviewerListItem from 'components/InterviewerListItem';
import InterviewerList from "components/InterviewerList"



export default function Form(props) {
  const {interviewers,onSave,onCancel} = props
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null)

  function reset(){
    setStudent("");
    setInterviewer("");
  }

  function cancel(){
    reset();
    props.onCancel();
  }


  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={()=>setStudent(student)}
        /*
          This must be a controlled component
          your code goes here
        */
      />
    </form>
    <InterviewerList interviewers={interviewers}
      /* your code goes here */
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={onSave}>Save</Button>
    </section>
  </section>
</main>

  )
}