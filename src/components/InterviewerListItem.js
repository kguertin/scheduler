import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewListItem(props) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li
      id={props.id}
      className={interviewerClass}
      onClick={() => {
        props.setInterviewer(props.name);
      }}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {props.name}
    </li>
  );
}
