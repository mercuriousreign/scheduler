import React from "react";
import classNames from "classnames";
import "styles/InterviewerListItem.scss";

/**Renders individual interviewer's information such as their avatar and name */
export default function InterviewerListItem (props) {
  const {name,avatar,selected,setInterviewer} = props;
  let inteviewClass = classNames("interviewers__item",{"interviewers__item--selected":selected})

  return (
    <li selected={props.selected} onClick={setInterviewer} className={inteviewClass}>
      {avatar && <img className="interviewers__item-image"
      src={avatar}
      alt={name}/>}
      {selected && name} 
    </li>
  )
}