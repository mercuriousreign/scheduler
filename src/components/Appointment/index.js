import React from "react"
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import useVisualMode from "hooks/useVisualMode"

export default function Appointment(props) {
  const { time, interview, onEdit, onDelete } = props;
  //console.log("inside appointment",props);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  useVisualMode(EMPTY);


  return (
    <article className="appointment">
      <Header time={time}></Header>
      {/* {interview ?<Show interview={interview}></Show>
    : <Empty></Empty>} */}
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
      {mode === SHOW &&
        <Show
          interview={interview}
        />}
      {mode === CREATE && <Form onSave={()=>{transition(SHOW)}} onCancel={back} interviewers={[]}/>}
    </article>
  )
}
