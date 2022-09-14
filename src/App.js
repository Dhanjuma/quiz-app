import React from "react";
import Confetti from "react-dom-confetti";
import "./App.css";
import { Intro } from "./quiz/intro";
import { Quiz } from "./quiz/quizzes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Footer } from "./quiz/footer";
import { Form } from "./quiz/category";
// import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

function App() {
  const [quiz, SetQuiz] = React.useState(false);
  const [category, SetCategory] = React.useState(false);
  const [intro, SetIntro] = React.useState(true);
  const [questions, setQuestions] = React.useState([]);
  const [points, setPoints] = React.useState(0);
  const [showPoints, setShowPoints] = React.useState(false);
  // !setting darkmode
  const [mode, setMode] = React.useState(true);
  const toggleMode = () => {
    setMode((prevMode) => !prevMode);
  };
  // ! state for picking categories
  const [formData, setFormData] = React.useState({
    category: "",
    levelOfDifficulty: "",
  });

  function handleChange(name, value) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    SetCategory(true);
    setShowPoints(false);
  }

  // ? configuration for confetti package
  const config = {
    angle: 90,
    spread: 60,
    // startVelocity: "100",
    elementCount: "200",
    // dragFriction: "0.01",
    duration: "6000",
    stagger: "10",
    width: "20px",
    height: "20px",
    // perspective: "1000px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  const select = (picked, qId) => {
    setQuestions((oldQuestions) =>
      oldQuestions.map((question) => {
        if (question.question_id === qId) {
          return {
            ...question,
            options: question.options.map((option) =>
              option.value === picked
                ? { ...option, selected: !option.selected }
                : { ...option, selected: false }
            ),
            selected_option: picked,
            correct: question.answer === picked ? true : false,
          };
        } else {
          return question;
        }
      })
    );
  };

  // React.useEffect(() => {
  //   if (!showPoints) {
  //     // setQuestions();
  //   }
  // }, [showPoints]);

  const startQuiz = () => {
    SetIntro(false);
  };

  React.useEffect(() => {
    const allCorrectQuestions = questions.filter((question) => {
      return question.correct === true;
    });

    setPoints(allCorrectQuestions.length);
  }, [questions]);

  const correct = () => {
    setShowPoints(true);
    setQuestions((oldQuestions) =>
      oldQuestions.map((question) => {
        return {
          ...question,
          showAnswer: true,
        };
      })
    );
  };

  const changeCategory = () => {
    SetCategory(false);
  };

  const reset = () => {
    SetQuiz((q) => !q);
    setShowPoints(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${formData.category}&difficulty=${formData.levelOfDifficulty}&type=multiple`
      );
      const all = await response.json();
      console.log(all);
      setQuestions(
        all.results.map((item, index) => ({
          question: item.question,
          question_id: index,
          options: [item.correct_answer, ...item.incorrect_answers]
            .map((op, index) => ({
              value: op,
              id: index,
              selected: false,
              // correct: "",
            }))
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value),

          answer: item.correct_answer,
          selected_option: "",
          correct: false,
          showAnswer: false,
        }))
      );
    };
    fetchData();
  }, [quiz, formData, category]);
  console.log(questions);

  const quizzes = questions.map((question, index) => (
    <Quiz
      key={index}
      select={(event) => select(event.target.value, question.question_id)}
      quiz={question}
      showPoints={showPoints}
    />
  ));

  return (
    <main className={mode && "dark"}>
      <div className="toggler">
        <div className="toggler--slider" onClick={toggleMode}>
          <div className="toggler--slider--circle"></div>
        </div>
        {mode ? (
          <FontAwesomeIcon icon={faMoon} />
        ) : (
          <FontAwesomeIcon icon={faSun} inverse />
        )}
      </div>

      {intro ? (
        <Intro start={startQuiz} />
      ) : category ? (
        <div className="app">
          {quizzes}
          <Confetti
            className="confetti"
            active={points === 10 && showPoints}
            config={config}
          />
          {showPoints && (
            <h1 className="score">
              {points === 10 && "Congratulations, "}You scored {points}/10
            </h1>
          )}
          {showPoints === true ? (
            <div className="app--btn-container">
              <button className="app--btn" onClick={reset}>
                Play Again
              </button>
              <button className="app--btn" onClick={changeCategory}>
                Change Category
              </button>
            </div>
          ) : (
            <button className="app--btn" onClick={correct}>
              Check Answers
            </button>
          )}
          <Footer />
        </div>
      ) : (
        <Form
          handleChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
          handleSubmit={handleSubmit}
          formData={formData}
        />
      )}
    </main>
  );
}

export default App;
