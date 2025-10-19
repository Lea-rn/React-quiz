import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
  //// "loading" , "error" , "ready" , "active" , "finished" ...

const initialState = {
  questions: [],
  status: "loading",
  index : 0 ,
};

function reducer(state, action) {   /// action ===> {type: ..., payload:...  }
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
    default:
      throw new Error("Action unkonwn");
  }
}

function App() {
  const [{questions , status , index}, dispatch] = useReducer(reducer, initialState);

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
     {status === "active" && <Question question={
      questions[index]
     }/>}
      </Main>
    </div>
  );
}

export default App;
