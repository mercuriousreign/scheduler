import React from "react";
import "components/Application.scss";
import "components/Appointment"
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"
import useApplicationData from "hooks/useApplicationData";

/**Initial entry and rendering for application */
export default function Application(props) {
  /**Setup state watch for variables and functions */
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dayInterviewers = getInterviewersForDay(state, state.day);


  /**Gets the appointment information by day and returns all the filled interviews to render in the listed view*/


  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={dayInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })

  /**Rendering everything all together after gathering all informations*/
  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler" />
        <hr className="sidebar_separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl siderbar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment time={"5pm"} />
      </section>
    </main>
  );
}
