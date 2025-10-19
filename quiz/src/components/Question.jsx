import Options from "./Options"

function Question({question}) {
    console.log(question)
    return (
        <div>
            <h4>{question.question}</h4>
            <div className="options">
           <Options question={question}/>
            </div>
        </div>
    )
}

export default Question
