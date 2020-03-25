# Interview Scheduler

Scheduler is a single-page application built with React that allows users to book appointments throughout the week within a specified time frame. Users select an empty time slot, enter their name and select the interviewer from those available on a given day. Users can also edit and cancel appointments. The list of days updates the list of remaining interview spots for each day based on user actions.

## Screen Shots

![Displaying a day populated with appointments.'](https://github.com/kguertin/scheduler/blob/master/docs/scheduler-display-appointments.png)

!['Displaying the form that appears when a user adds a new appointment or edits an existing one.'](https://github.com/kguertin/scheduler/blob/master/docs/scheduler-edit-appointment.png)

!['Displaying the confirm message that appears when a user clicks delete on an existing appointment.'](https://github.com/kguertin/scheduler/blob/master/docs/scheduler-delete-appointment.png)

## Setup

Install dependencies with `npm install`.
Application defaults to http://localhost:8000.
Server defaults to http://localhost:8001/api.
Server can repopulate scheduler with randomized data by navigating to http://localhost:8001/api/debug/reset.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

react v16.9.0,
axios v0.19.2,
normalize.css v8.0.1,
classname v2.2.6
