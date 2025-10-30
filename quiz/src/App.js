import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";


  //// "loading" , "error" , "ready" , "active" , "finished" ...
  const SECS_PER_QUESTION = 20

const initialState = {
  questions: [],  ///// array of question ..
  status: "loading", ///// status of quiz ..
  index : 0 , ////// number of question.. 
  answer : null ,  //////// exist of answer ... 
  points : 0 ,
  highscore : 0 ,
  secondRemaining : null
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
      return {...state , status:"active" , secondRemaining : state.questions.length* SECS_PER_QUESTION }

      case "newAnswer" : 
      const question = state.questions.at(state.index)   //// first element
      return {
        ...state , answer:action.payload , 
        points : action.payload === question.correctOption ? state.points+ question.points : state.points
      }

      case "nextQuestion" :
        return {...state , index: state.index+1 , answer : null} 

        case  "finish" : 
        return {...state , status : "finished" ,
           highscore : state.points > state.highscore ? state.points : state.highscore }

           case "restart" : 
           return {
            ...initialState , questions : state.questions ,   status: "ready"
           }

           case "tick" : 
           return {
            ...state , secondRemaining : state.secondRemaining - 1 ,
            status : state.secondRemaining === 0 ? "finished" : state.status
           }

    default:
      throw new Error("Action unkonwn");
  }
}

function App() {
  const [{questions , status , index , answer , points , highscore , secondRemaining }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length ;

  const maxPossiblePoints = questions.reduce((acc,ele)=> acc  + ele.points,0) 


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
    <Progress index={index} 
    numQuestions={numQuestions}
    points={points}
    maxPossiblePoints={maxPossiblePoints}
    answer={answer}
    />
       <Question question={
        questions[index] 
       }  dispatch={dispatch} answer={answer} />
       <Footer>
              <NextButton dispatch={dispatch}
        answer={answer}
        numQuestions={numQuestions}
        index={index}
        />

      <Timer dispatch={dispatch} 
      secondRemaining={secondRemaining}
      />
       </Footer>
 
</>
}

{status === "finished" && (
  <FinishScreen points={points} 
  maxPossiblePoints={maxPossiblePoints}
  highscore={highscore}
  dispatch={dispatch}
  />
)}
      </Main>
    </div>
  );
}

export default App;
