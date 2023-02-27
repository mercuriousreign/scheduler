export function getAppointmentsForDay(state, day) {
  let target = ""
  let result = [];
  // console.log(state);
  // console.log(day);
  let placeHolder = Object.values(state.days);

  
  for (let i of placeHolder) {
    if (i.name === day){
      target = i;
    }
  }

  if (target==="") {
    return [];
  }

  let placeHolder2 = Object.values(target.appointments);
  //console.log("placeholder2", placeHolder2);
  for (let i of placeHolder2){
    result.push(state.appointments[i])
  }

  return result;
}

export function getInterview(state,interview) {

  if(interview){
    console.log("somethings the name",state.interviewers[interview.interviewer].name)
    return {"student": interview.student,
            "interviewer": state.interviewers[interview.interviewer].name}
  }

  console.log(state.interviewers);

  return null;
}

// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }
