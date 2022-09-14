export const Intro = (props) => {
  return (
    <div className="intro">
      <h1>Mini Quiz</h1>
      <p>Want to Play a Round?</p>
      <button className="intro--btn" onClick={props.start}>
        Start Quiz
      </button>
    </div>
  );
};
