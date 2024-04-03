import {useCallback, useState} from "react";

import QUESTIONS from "../question.js";
import quizCompleteImg from "../assets/quiz-complete.png";

import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx"

function Quiz () {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex= answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer (selectedAnswer) {
    setAnswerState("answered");
    setUserAnswers((prevAnswer) => {
      return [...prevAnswer, selectedAnswer];
    });

    setTimeout(() => {
      if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnswerState("correct");
      } else {
        setAnswerState("wrong");
      }

      setTimeout(() => {
        setAnswerState("");
      }, 2000);
    }, 1000);
  }, [activeQuestionIndex]);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Thropy icon"/>
        <h2>Quiz completed!</h2>
      </div>
    )
  }

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          timeout={10000}
          key={activeQuestionIndex}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <Answers
          answerState={answerState}
          onSelect={handleSelectAnswer}
          answers={QUESTIONS[activeQuestionIndex].answers}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
        />
      </div>
    </div>
  )
}

export default Quiz;