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

  function calcSpot(day, days, appointments) {
    let bookedSpots = 0;
    days.forEach(i => {
      if (i.name === day) {
        i.appointments.forEach(j => {
          if (appointments[j].interview !== null) {
            bookedSpots++;
          }
        });
      }
    });
    return 5 - bookedSpots;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = state.days.map(day => {
      if (state.day === day.name) {
        day.spots = calcSpot(state.day, state.days, appointments);
        return day;
      } else {
        return day;
      }
    });

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => setState(state => ({ ...state, appointments, days })));
  }

  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = state.days.map(day => {
      if (state.day === day.name) {
        day.spots = calcSpot(state.day, state.days, appointments);
        return day;
      } else {
        return day;
      }
    });
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState(state => ({ ...state, appointments, days })));
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
