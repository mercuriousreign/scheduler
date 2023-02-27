import React from "react"
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"

export default function Appointment (props){
  const {time,interview , onEdit, onDelete} = props;
  //console.log("inside appointment",props);

  return(  
  <article className="appointment">
    <Header time={time}></Header>
    {interview ?<Show interview={interview}></Show>
    : <Empty></Empty>}
  </article>
  )
}

