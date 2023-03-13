import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

/**Initialization of rendering each individual appointment slot on the list */
export default function Appointment(props) {
  const { time, id, interview, interviewers } = props;

  /**State watch based on interview item interaction */
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );



  /**Loads a deleting animation alongside canceling the interview, transition to add when the inteview has deleted*/
  function deleteInterview(id) {

    transition(DELETE, true);
    props.cancelInterview(id).then(() => transition(EMPTY)).catch(error => transition(ERROR_DELETE, true));



  }

  /**Loads a saving animation alongside booking the interview, transition to add when the inteview has been booked*/
  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(id, interview).then(() => {

      transition(SHOW, true)
    })
      .catch((error) => transition(ERROR_SAVE, true));
  }

  /**Rendering the interview item on the list based on mode */
  return (
    <article data-testid="appointment" className="appointment">
      <Header time={time}></Header>
      {mode === SHOW &&
        <Show
          interview={interview}
          onDelete={() => { transition(CONFIRM) }}
          onEdit={() => { transition(EDIT) }}
        />}
      {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}
      {mode === CREATE && <Form onSave={save} onCancel={back} interviewers={interviewers} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM && <Confirm id={id} onConfirm={deleteInterview} onCancel={back} />}
      {mode === DELETE && <Status message={"Deleting"} />}
      {mode === EDIT && <Form student={interview.student} interviewer={interview.interviewer.id} onSave={save} onCancel={back} interviewers={interviewers} />}
      {mode === ERROR_SAVE && <Error message={'Could not save appointment'} onClose={back} />}
      {mode === ERROR_DELETE && <Error message={'Could not delete appointment'} onClose={back} />}
    </article>
  )
}
