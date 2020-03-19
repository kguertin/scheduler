import React from "react";

export default function getAppointmentsForDay(state, day) {
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

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  let currentInterview;
  Object.keys(state.interviewers).forEach(i => {
    if (interview.interviewer === state.interviewers[i].id) {
      currentInterview = {
        ...currentInterview,
        student: interview.student,
        interviewer: {
          id: state.interviewers[i].id,
          name: state.interviewers[i].name,
          avatar: state.interviewers[i].avatar
        }
      };
    }
  });
  return currentInterview;
}
