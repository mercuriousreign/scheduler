import React, {useState , useEffect} from "react";
import "components/Application.scss";
import "components/Appointment"
import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";
import axios from "axios";
import {getAppointmentsForDay , getInterview, getInterviewersForDay} from "../helpers/selectors"


// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };



// const interviewers = [
//   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
// ];

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

export default function Application(props) {
  const [state,setState] = useState({
    day:"Monday",
    days: [],
    appointments : {},
    interviewers : {}
  });

  useEffect(()=>{
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  },[])

  function bookInterview(id,interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });
    
    axios.put(`/api/appointments/${id}`,appointments)

  }

  function cancelInterview(id){
    axios.delete(`/api/appointments/${id}`)
  }
  



  const appointments = getAppointmentsForDay(state, state.day);
  const dayInterviewers = getInterviewersForDay(state, state.day);

// console.log("selector function",appointments);
const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={dayInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  );
});

  const dailyAppointments =  getAppointmentsForDay(state, state.day);

  const setDay = (day) => {setState({ ...state, day })};

  const schedule1 = dailyAppointments.map((appointment)=>{
    const interview = getInterview(state, appointment.interview);
    return(
      <Appointment
      key = {appointment.id}
      {...appointment}
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"/>
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
      </section>
    </main>
  );
}
