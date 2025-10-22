function NextButton({dispatch , answer}) {
    if (answer === null) return null   ///// early return ...
    return (
      <button className="next-btn"
      onClick={()=> dispatch({type:"nextQuestion"})}
      >
        Next
      </button>
    )
}

export default NextButton
