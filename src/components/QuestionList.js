 
import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  // add useState for a list of questions from an API 
  const [questions, setQuestions] = useState([]);

  // add useEffect function to fetch the list of questions from the API
  // once the list of questions is fetched, update a state of state var by calling a Setter function and passing data to it/ plus render a component 
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questions) => {
        setQuestions(questions);
      });
  }, []);

  // add fetch request to delete a question from the API server 
  // once the question is removed, update a state var/ repeat this cycle till there is no elements left 
  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestions(updatedQuestions);
      });
  }

  return (
    // mount QuestionItem to DOM thru map method --> create a QuestionItem item for each element of the array  
    <section>
      <h1>Quiz Questions</h1>
        <ul>
        {questions.map((quest) => (
          <QuestionItem key = {quest.id} question={quest} onDeleteClick={handleDeleteClick} onAnswerChange={handleAnswerChange}/>))}
      </ul>
    </section>
  );
}

export default QuestionList;