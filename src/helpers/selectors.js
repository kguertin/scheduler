import React from "react";

export function getAppointmentsForDay(state, day) {
  const dayAppointments = [];
  state.days.forEach(i => {
    if (i.name === day) {
      Object.keys(state.appointments).forEach(j => {
        if (i.appointments.includes(state.appointments[j].id)) {
          dayAppointments.push(state.appointments[j]);
        }
      });
    }
  });

  if (dayAppointments.length === 0) {
    return [];
  } else {
    return dayAppointments;
  }
}
