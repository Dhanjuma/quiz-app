import React from "react";
export const Quiz = (props) => {
  const multipleChoices = props.quiz.options.map((option, index) => (
    <button
      // className=""
      style={{
        fontWeight:
          option.value === props.quiz.answer && props.quiz.showAnswer && 900,
        fontStyle:
          option.value === props.quiz.answer &&
          props.quiz.showAnswer &&
          "italic",
        backgroundColor:
          (option.selected && "#edfd08") ||
          (option.value === props.quiz.answer &&
            props.quiz.showAnswer &&
            "#F5F7FB"),
        color:
          option.value === props.quiz.answer && props.quiz.showAnswer && "red",
      }}
      id={index}
      key={index}
      value={option.value}
      onClick={props.select}
      disabled={props.showPoints}
    >
      {option.value}
    </button>
  ));

  return (
    <div className="questions">
      <h3>{props.quiz.question}</h3>
      <div className="options">{multipleChoices}</div>
    </div>
  );
};
