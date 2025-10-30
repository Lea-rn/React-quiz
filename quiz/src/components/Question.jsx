import Options from "./Options"

function Question({question , dispatch , answer}) {

    return (
        <div className="question-container">
            <h4>{question.question}</h4>
            <div className="options">
           <Options question={question}  dispatch={dispatch} answer={answer} />
            </div>
        </div>
    )
}

export default Question
