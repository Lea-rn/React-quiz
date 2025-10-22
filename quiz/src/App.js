import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";

  //// "loading" , "error" , "ready" , "active" , "finished" ...

const initialState = {
  questions: [],  ///// array of question ..
  status: "loading", ///// status of quiz ..
  index : 0 , ////// number of question.. 
  answer : null ,  //////// exist of answer ... 
  points : 0
};

function reducer(state, action) { // {type:"newAnswer" , payload : 0}
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
      case "dataFailed" : 
      return {
        ...state , status : "error"
      }
   
      case "start" : 
      return {...state , status:"active"}

      case "newAnswer" : 
      const question = state.questions.at(state.index)   //// first element
      return {
        ...state , answer:action.payload , 
        points : action.payload === question.correctOption ? state.points+ question.points : state.points
      }

      case "nextQuestion" :
        return {...state , index: state.index+1 , answer : null} 
    default:
      throw new Error("Action unkonwn");
  }
}

function App() {
  const [{questions , status , index , answer }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length ;

  useEffect(function () {
    fetch("http://localhost:7000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({type : "dataFailed" }));
  }, []);


  return (
    <div>
      <Header />
      <Main>
     {status === "loading" && <Loader/>}
     {status === "error" && <Error/>}
     {status === "ready" && <StartScreen numQuestions={numQuestions} 
     dispatch={dispatch}
     />}
     {status === "active" && 
<>
       <Question question={
        questions[index] 
       }  dispatch={dispatch} answer={answer} />
       <NextButton dispatch={dispatch} answer={answer}/>
</>
    
     }
      </Main>
    </div>
  );
}

export default App;
