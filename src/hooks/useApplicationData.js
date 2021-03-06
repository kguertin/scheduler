import React, { useState, useEffect } from "react";
import axios from "axios";

// Manage Application State
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  function setDay(day) {
    setState({ ...state, day });
  }

  // Api routing
  useEffect(() => {
    const third = axios.get("/api/interviewers");
    const first = axios.get("/api/days");
    const second = axios.get("/api/appointments");
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
    let totalSpots = 0;
    days.forEach(i => {
      totalSpots++;
      if (i.name === day) {
        i.appointments.forEach(j => {
          if (appointments[j].interview !== null) {
            bookedSpots++;
          }
        });
      }
    });
    return totalSpots - bookedSpots;
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
