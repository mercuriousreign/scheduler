/**Gets all the appointments based on day key appointments values */
export function getAppointmentsForDay(state, day) {
  const results = [];
  for (const element of state.days) {
    if (
      element.name === day) {
      for (const value of element.appointments) {
        if (state.appointments[value]) {
          results.push(state.appointments[value]);
        }
      }
    }
  }
  return results;

}

/**Returns specific interview information */
export function getInterview(state, interview) {
  if (interview) {
    return {
      "student": interview.student,
      "interviewer": state.interviewers[interview.interviewer]
    }
  }
  return null;
}

/**Gets all the interviewers that are available for that day based on day key interviewer values */
export function getInterviewersForDay(state, day) {
  const results = [];
  for (const element of state.days) {
    if (
      element.name === day) {
      for (const value of element.interviewers) {
        if (state.interviewers[value]) {
          results.push(state.interviewers[value]);
        }
      }
    }
  }
  return results;


}