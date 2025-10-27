function NextButton({dispatch , answer , numQuestions , index}) {
    if (answer === null) return null   ///// early return ..
    if (index < numQuestions -1 ) //// 15 < 16
    return (
      <button className="next-btn"
      onClick={()=> dispatch({type:"nextQuestion"})}
      >
        Next
      </button>
    )

    if (index === numQuestions -1 ) 
      return <button 
      onClick={()=> dispatch({type:"finish"})}
      className="next-btn">
        finish
      </button>
}

export default NextButton
