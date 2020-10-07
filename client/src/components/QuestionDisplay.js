import React, { useState } from 'react'
import "./QuestionDisplay.css"

function QuestionDisplay({ question, options, correctAnswer, increaseIfCorrect }) {
	const [correctIndex, setCorrectIndex] = useState(null);
	const [color, setColor] = useState(null);

	function checkAnswer(answerId) {
		if (answerId === correctAnswer) {
			increaseIfCorrect();
			setCorrectIndex(answerId);
			setColor("green");
		}
		else if (answerId !== correctAnswer) {
			setCorrectIndex(answerId);
			setColor("pink")
		}
	}

	return (
		<div className="questionDisplay" >
			<div className="questionDisplay_question">
				<p>{question}</p>
			</div>

			{options.map((item, index) => {
				return (
					<div
						key={index}
						className={`questionDisplay_option ${correctIndex === index ? color : null}`}
						onClick={() => checkAnswer(index)}
					>
						<p >
							<span> {item.ans} </span>
						</p>
					</div>
				)
			})}

		</div>
	)
}

export default QuestionDisplay
