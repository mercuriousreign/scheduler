import React from "react";
import classNames from "classnames";
import "styles/InterviewerListItem.scss"

export default function InterviewerListItem (props) {
  const {id,name,avatar,selected,setInterviewer} = props;
  let inteviewClass = classNames("interviewers__item",{"interviewers__item--selected":selected})

  return (
    <li onClick={()=>setInterviewer(id)} className={inteviewClass}>
      {avatar && <img className="interviwers__item-image"
      src={avatar}
      alot={name}/>}
      {selected && name} 
    </li>
  )
}