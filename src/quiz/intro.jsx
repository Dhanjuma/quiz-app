export const Intro = (props) => {
  return (
    <div className="intro">
      <h1>Mini quiz</h1>
      <p>Want to Play a Round?</p>
      <button className="intro--btn" onClick={props.start}>
        Start quiz
      </button>
    </div>
  );
};
