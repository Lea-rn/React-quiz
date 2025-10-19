function Options({question}) {
    return (
        <div className="options">
            {question.options.map((option)=> (
                <button key={option} className="btn-option">{option}</button>
            ))}
        </div>
    )
}

export default Options
