import React, { useState } from 'react';
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"



export default function Form(props) {
  const {interviewers,onSave} = props
  const [student, setStudent] = useState(props.student || "");
  const [error, setError] = useState("");

  const [interviewer, setInterviewer] = useState(props.interviewer || null)

  function reset(){
    setStudent("");
    setInterviewer("");
  }

  function cancel(){
    reset();
    props.onCancel();
  }

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
  
    onSave(student, interviewer);
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
        onChange={(event)=>setStudent(event.target.value)}
        value ={student}
        data-testid="student-name-input"
        /*
          This must be a controlled component
          your code goes here
        */
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={interviewers} onChange={setInterviewer} value={interviewer}
      /* your code goes here */
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      {/* ()=>{onSave(student,interviewer)} */}
      <Button confirm onClick={validate}>Save</Button>
    </section>
  </section>
</main>

  )
}