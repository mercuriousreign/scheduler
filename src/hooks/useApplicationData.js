import {useState , useEffect} from "react";
import axios from "axios";

export default function useApplicationData (initial) {
  
  const [state,setState] = useState({
    day:"Monday",
    days: [],
    appointments : {},
    interviewers : {}
  });
  
/**Finish geting data from api without constantly changing state */
  useEffect(()=>{
    Promise.all([
      // axios.get('http://localhost:8001/api/days'),
      // axios.get('http://localhost:8001/api/appointments'),
      // axios.get('http://localhost:8001/api/interviewers')
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });

  },[])


  const setDay = (day) => {setState({ ...state, day })};
  
  /**Saves an interview to the backend, refreshes the web/react state with updated info*/
  function bookInterview(id,interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`,{interview}).then((prev)=>{
      //refreshData();
      
      const days = updateSpot(state, appointments,id);
      setState(prev => ({...prev,
        days,
        appointments
      }))
      })

  }

  /**Deletes an interview from backend, refreshes the web/react with updated info */
  function cancelInterview(id){

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    

    return axios.delete(`/api/appointments/${id}`).then((prev)=>{
      const days = updateSpot(state, appointments,id);
      setState(prev => ({...prev,
        days,
        appointments
      }))
      })
  }

  /**Updates spot info, is called by both bookinterview and cancelinterview function */
  function updateSpot(state,appointments) {
    
    const dayObj = state.days.find(d => d.name === state.day);
    
    if (!dayObj){
      return state.days;
    }

    let spots = 0;

    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++
      }

    }

    const day = {...dayObj, spots};
    const days = state.days.map(d=> d.name === state.day ? day: d);

    return days;

  }

  return {state,setDay,bookInterview,cancelInterview};
}