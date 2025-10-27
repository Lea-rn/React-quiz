function FinishScreen({points , maxPossiblePoints , highscore , dispatch}) {
    const percentage = (points / maxPossiblePoints) * 100 ;

    let emoji ;
    if (percentage === 100) emoji ="🥇"
    if (percentage >=80 && percentage < 100) emoji ="🎉" 
    if (percentage >= 50 && percentage < 80) emoji ="😊"
    if (percentage >0 && percentage < 50 ) emoji ="😑"
    if (percentage === 0 ) emoji = "😵"
    return (
    <div className="finished-screen">
            <div className="finished-container">
                <p> {emoji}You Scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%) </p>  
                    
            </div>
            <p style={{textAlign:"center"}}> (Highscore : {highscore} points )</p>

            <button 
            onClick={()=> dispatch({type : "restart"})}
            className="restart-btn">
             Restart Quiz
            </button>

    </div>
    
    )
}

export default FinishScreen
