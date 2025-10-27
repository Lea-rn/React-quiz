function Progress({index , numQuestions , points , maxPossiblePoints , answer}) {///// question 4/17
    return (
        <div className="progress"> 
           <div>
             <progress value={index + Number(answer !==null)} max={numQuestions}></progress>
           </div>
         <p className="progress-question">Question <strong>{index+1}</strong> / {numQuestions}</p>
         <p className="progress-points"><strong>{points}</strong> / {maxPossiblePoints}</p>
        </div>
    )
}

export default Progress
