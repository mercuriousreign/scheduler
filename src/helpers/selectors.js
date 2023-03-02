/**Gets all the appointments based on day key appointments values */
export function getAppointmentsForDay(state, day) {
  let target = ""
  let daysHolder = Object.values(state.days);

  
  for (let i of daysHolder) {
    if (i.name === day){
      target = i;
    }
  }

  if (target==="") {
    return [];
  }

  const allAppointments = target.appointments;
  console.log("appointments length",target.appointments.length)
  return allAppointments.map(id => state.appointments[id])

}

/**Returns specific interview information */
export function getInterview(state,interview) {

  if(interview){
    return {"student": interview.student,
            "interviewer": state.interviewers[interview.interviewer].name}
  }

  return null;
}

/**Gets all the interviewers that are available for that day based on day key interviewer values */
export function getInterviewersForDay (state,day) {
  let target = ""
  let daysHolder = Object.values(state.days);
  for (let i of daysHolder) {
    if (i.name === day){
      target = i;
    }
  }

  if (target==="") {
    return [];
  }


  let interviewers = target.interviewers;
  return interviewers.map(id => state.interviewers[id])

  
}