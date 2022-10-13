import React from "react";
import Confetti from "react-dom-confetti";
import "./App.css";
import { Intro } from "./quiz/intro";
import { Quiz } from "./quiz/quizzes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Footer } from "./quiz/footer";
import { Form } from "./quiz/category";

function App() {
  const [quiz, SetQuiz] = React.useState(false);
  const [category, SetCategory] = React.useState(false);
  const [intro, SetIntro] = React.useState(true);
  const [questions, setQuestions] = React.useState([]);
  const [points, setPoints] = React.useState(0);
  const [showPoints, setShowPoints] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(true);
  // !setting darkmode
  const [mode, setMode] = React.useState(true);
  const toggleMode = () => {
    setMode((prevMode) => !prevMode);
  };
  // ! state for picking categories
  const [formData, setFormData] = React.useState({
    category: "",
    levelOfDifficulty: "",
    noOfQuestions: 10,
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
    elementCount: "200",
    duration: "6000",
    stagger: "10",
    width: "20px",
    height: "20px",
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
    setIsFetching(true);
  };

  const reset = () => {
    SetQuiz((q) => !q);
    setShowPoints(false);
    setIsFetching(true);
  };

  // console.log(questions);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${formData.noOfQuestions}&category=${formData.category}&difficulty=${formData.levelOfDifficulty}&type=multiple`
      );
      const all = await response.json();

      setIsFetching(false);

      let data = all.results.map((item, index) => ({
        question: item.question,
        question_id: index,
        options: [item.correct_answer, ...item.incorrect_answers]
          .map((op, index) => ({
            value: op,
            id: index,
            selected: false,
          }))
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value),

        answer: item.correct_answer,
        selected_option: "",
        correct: false,
        showAnswer: false,
      }));

      let fixed = JSON.parse(
        JSON.stringify(data)
          .replaceAll(/&sub;/g, "⊂")
          .replaceAll(/&sup;/g, "⊃")
          .replaceAll(/&micro;/g, "µ")
          .replaceAll(/&atilde;/g, "ã")
          .replaceAll(/&uacute;/g, "ú")
          .replaceAll(/&rsquo;/g, "’")
          .replaceAll(/&quot;/g, "'")
          .replaceAll(/&deg;/g, "°")
          .replaceAll(/&hellip;/g, "…")
          .replaceAll(/&ecirc;/g, "ê")
          .replaceAll(/&#039;/g, "'")
          .replaceAll(/&ldquo;/g, "“")
          .replaceAll(/&rdquo;/g, "”")
          .replaceAll(/&amp;/g, "&")
          .replaceAll(/&lt;/g, "<")
          .replaceAll(/&gt;/g, ">")
          .replaceAll(/&ouml;/g, "ö")
          .replaceAll(/&reg;/g, "®")
          .replaceAll(/&trade;/g, "™")
          .replaceAll(/&lrm;/g, "")
          .replaceAll(/&euml;/g, "ë")
          .replaceAll(/&uuml;/g, "Ü")
          .replaceAll(/&Uuml;/g, "Ü")
          .replaceAll(/&iacute;/g, "í")
          .replaceAll(/&aacute;/g, "á")
          .replaceAll(/&Aacute;/g, "á")
          .replaceAll(/&aring;/g, "å")
          .replaceAll(/&pi;/g, "π")
          .replaceAll(/&Pi;/g, "π")
          .replaceAll(/&Sigma;/g, "σ")
          .replaceAll(/&Omicron;/g, "ο")
          .replaceAll(/&Nu;/g, "ν")
          .replaceAll(/&ntilde;/g, "ñ")
          .replaceAll(/&oacute;/g, "ó")
          .replaceAll(/&eacute;/g, "é")
          .replaceAll(/&Eacute;/g, "é")
          .replaceAll(/&prime;/g, "′")
      );
      setQuestions(fixed);
    };
    category && fetchData();
    return () => {};
  }, [quiz, formData, category]);

  const quizzes = questions.map((question, index) => (
    <Quiz
      key={index}
      select={(event) => select(event.target.value, question.question_id)}
      quiz={question}
      showPoints={showPoints}
    />
  ));

  return (
    <main className={mode ? "dark" : ""}>
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
        isFetching ? (
          <div className="intro">
            <h1>Loading Questions...</h1>
          </div>
        ) : (
          <div className="app">
            {quizzes}
            <Confetti
              className="confetti"
              active={points === questions.length && showPoints}
              config={config}
            />
            {showPoints && (
              <h1 className="score">
                {points === questions.length && "Congratulations, "}You scored{" "}
                {points}/{questions.length}
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
        )
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
