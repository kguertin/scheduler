import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(err => transition(ERROR_SAVE, true));
  }

  function deleteListing(id) {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          id={props.id}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={(name, interviewer) => {
            save(name, interviewer);
          }}
          onCancel={() => {
            back();
          }}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={(name, interviewer) => {
            save(name, interviewer);
          }}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === SAVING && <Status mode={mode} />}
      {mode === DELETE && <Status mode={mode} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are You Sure You Want To Delete?"}
          id={props.id}
          onCancel={() => back()}
          onConfirm={id => {
            deleteListing(id);
          }}
        />
      )}
      {mode === ERROR_SAVE && <Error mode={mode} onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error mode={mode} onClose={() => back()} />}
    </article>
  );
}
