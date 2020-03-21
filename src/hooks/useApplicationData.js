import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  function setDay(day) {
    let bookedSlots = 0;
    let newDay = {};
    state.days.forEach(i => {
      if (i.name === day) {
        i.appointments.forEach(j => {
          if (state.appointments[j].interview === null) {
            bookedSlots++;
          }
        });
        const spots = 5 - bookedSlots;
        newDay = { ...state.days[i.id], spots: 5 - bookedSlots };
        console.log(newDay);
      }
    });
    console.log(...state.days);
    setState({ ...state, day });
  }

  useEffect(() => {
    const third = axios.get("http://localhost:8001/api/interviewers");
    const first = axios.get("http://localhost:8001/api/days");
    const second = axios.get("http://localhost:8001/api/appointments");
    Promise.all([
      Promise.resolve(first),
      Promise.resolve(second),
      Promise.resolve(third)
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
      // days: {
      //   ...state.days,
      //   [day]: {
      //     ...status.days[day],
      //     spots: state.days[day].spots - 1
      //   }
      // }
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => setState(state => ({ ...state, appointments })));
  }

  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState(state => ({ ...state, appointments })));
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
