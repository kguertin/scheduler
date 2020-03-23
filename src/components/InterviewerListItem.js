import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewListItem(props) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  console.log(props.selected);
  return (
    <li
      id={props.id}
      className={interviewerClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
