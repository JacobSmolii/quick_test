import React, { useState } from 'react'
import QuestionDisplay from './QuestionDisplay';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import './Maths.css'

const initialStateForMath = [

	{
		id: 0,
		Question: "Find the sum of 111 + 222 + 333",
		Options: [
			{ ans: "A. 700" },
			{ ans: "B. 666" },
			{ ans: "C. 10" },
			{ ans: "D.100" },
		],
		CorrectAnswer: 1
	},
	{
		id: 1,
		Question: "Subtract 457 from 832",
		Options: [
			{ ans: "A. 375" },
			{ ans: "B. 57" },
			{ ans: "C. 376" },
			{ ans: "D. 970" },
		],
		CorrectAnswer: 0
	},
	{
		id: 2,
		Question: "50 times 5 is equal to",
		Options: [
			{ ans: "A. 2500" },
			{ ans: "B. 505" },
			{ ans: "C. 500" },
			{ ans: "D. None of these" },
		],
		CorrectAnswer: 0
	},
	{
		id: 3,
		Question: "90 ÷ 10",
		Options: [
			{ ans: "A. 0" },
			{ ans: "B. 9" },
			{ ans: "C. 56" },
			{ ans: "D. 46" },
		],
		CorrectAnswer: 1
	},
	{
		id: 4,
		Question: "26 + 32 - 12",
		Options: [
			{ ans: "A. 0" },
			{ ans: "B. 32" },
			{ ans: "C. 56" },
			{ ans: "D. 46" },
		],
		CorrectAnswer: 3
	},
	{
		id: 5,
		Question: "Find the product of 72 × 3",
		Options: [
			{ ans: "A. 216" },
			{ ans: "B. 7230" },
			{ ans: "C. 106" },
			{ ans: "D. 372" },
		],
		CorrectAnswer: 0
	},
	{
		id: 6,
		Question: "Solve : 200 – (96 ÷ 4)",
		Options: [
			{ ans: "A. 105" },
			{ ans: "B. 176" },
			{ ans: "C. 26" },
			{ ans: "D. 16" },
		],
		CorrectAnswer: 1
	},
	{
		id: 7,
		Question: "Solve : 24 + 4 ÷ 4",
		Options: [
			{ ans: "A. 24" },
			{ ans: "B. 6" },
			{ ans: "C. 25" },
			{ ans: "D. 7" },
		],
		CorrectAnswer: 2
	},
	{
		id: 8,
		Question: "Simplify : 3 + 6 x (5 + 4) ÷ 3 - 7",
		Options: [
			{ ans: "A. 11" },
			{ ans: "B. 16" },
			{ ans: "C. 28" },
			{ ans: "D. 14" },
		],
		CorrectAnswer: 3
	},
	{
		id: 9,
		Question: "Simplify :150 ÷ (6 + 3 x 8) - 5",
		Options: [
			{ ans: "A. 2" },
			{ ans: "B. 5" },
			{ ans: "C. 0" },
			{ ans: "D. None of these" },
		],
		CorrectAnswer: 2
	},
]

function Maths() {
	const [mathQuiz] = useState(initialStateForMath);
	const [counter, setCounter] = useState(0);
	const [totalCorrect, setTotalCorrect] = useState(0);

	function increaseIfCorrect() {
		setTotalCorrect(totalCorrect + 1);
	}

	function finishQuiz(str) {
		const data = {
			testName: "math",
			testBody: `Last try: ${totalCorrect} / 10`
		}

		axiosWithAuth()
			.post('/api/tests', data)
			.then(() => {
				if (str === "startOver")
					window.location = '/math';
				else
					window.location = '/';
			})
			.catch(err => console.log('math', err));
	}

	return (
		<div className="math">

			<center><h1>Welcome to Math Quiz</h1></center>

			{counter === mathQuiz.length ? (
				<>
					<div className="math_finishQuiz">
						<div className="math_finishQuiz">
							<h2>Your sccore is {totalCorrect % 10} / 10 </h2>
							<div className="math_button">
								<button onClick={() => finishQuiz("startOver")} >Start over</button>
								<button onClick={() => finishQuiz("home")}>See all the Quizes</button>
							</div>
						</div>
					</div>
				</>
			) : (
					mathQuiz.map((question, index) => {
						if (counter === question.id) {
							return <QuestionDisplay key={index} question={question.Question} options={question.Options} correctAnswer={question.CorrectAnswer} increaseIfCorrect={increaseIfCorrect} />
						}
					})
				)
			}
			{counter < mathQuiz.length ? (
				<button className="math_next_question" onClick={() => setCounter(counter + 1)} >Next</button>

			) : (null)}
		</div>
	)
}

export default Maths


