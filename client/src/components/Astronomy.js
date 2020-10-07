import React, { useState } from 'react'
import QuestionDisplay from './QuestionDisplay';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import './Astronomy.css'

const initialStateForAstronomy = [

	{
		id: 0,
		Question: "How many constellations are officially recognized?",
		Options: [
			{ ans: "A. 12" },
			{ ans: "B. 88" },
			{ ans: "C. over a million" },
			{ ans: "D. none of these" },
		],
		CorrectAnswer: 1
	},
	{
		id: 1,
		Question: "What term do astronomers use to describe the two times a year when day and night are of equal length?",
		Options: [
			{ ans: "A. solstice" },
			{ ans: "B. blue moon" },
			{ ans: "C. equinox" },
			{ ans: "D. none of these" },
		],
		CorrectAnswer: 3
	},
	{
		id: 2,
		Question: "What term describes the effect where stars appear to move as the Earth moves?",
		Options: [
			{ ans: "A. parallax" },
			{ ans: "B. Polaris" },
			{ ans: "C. scintillation" },
			{ ans: "D. none of these" },
		],
		CorrectAnswer: 0
	},
	{
		id: 3,
		Question: "Which planet has the largest moon in the solar system?",
		Options: [
			{ ans: "A. Earth" },
			{ ans: "B. Uranus" },
			{ ans: "C. Mars" },
			{ ans: "D. Jupiter" },
		],
		CorrectAnswer: 3
	},
	{
		id: 4,
		Question: "The sun is a star?",
		Options: [
			{ ans: "A. TRUE" },
			{ ans: "B. FALSE" },
			{ ans: "C. What is a star" },
			{ ans: "D. none of these" },
		],
		CorrectAnswer: 0
	},
	{
		id: 5,
		Question: "Can a comet create a crater on the surface of the Earth?",
		Options: [
			{ ans: "A. yse" },
			{ ans: "B. no" },
			{ ans: "C. only during a full moon" },
			{ ans: "D. none of these" },
		],
		CorrectAnswer: 1
	},
	{
		id: 6,
		Question: "What space objects can create craters on the surface of the Earth?",
		Options: [
			{ ans: "A. asteroids" },
			{ ans: "B. meteorites" },
			{ ans: "C. meteors" },
			{ ans: "D. moon" },
		],
		CorrectAnswer: 2
	},
	{
		id: 7,
		Question: "What does a light-year measure?",
		Options: [
			{ ans: "A. brightness" },
			{ ans: "B. time" },
			{ ans: "C. distance" },
			{ ans: "D. minutes" },
		],
		CorrectAnswer: 2
	},
	{
		id: 8,
		Question: "Which of the following best describes a supernova?",
		Options: [
			{ ans: "A. a bright explosion" },
			{ ans: "B. a fast-moving meteor" },
			{ ans: "C. a pair of conjoined stars" },
			{ ans: "D. none of these" },
		],
		CorrectAnswer: 0
	},
	{
		id: 9,
		Question: "Who discovered that the planets travel in an ellipse, rather than a circle?",
		Options: [
			{ ans: "A. Edwin Hubble" },
			{ ans: "B. Isaac Newton" },
			{ ans: "C. Johannes Kepler" },
			{ ans: "D. none of these" },
		],
		CorrectAnswer: 2
	},
]

function Astronomy() {
	const [astronomyQuiz] = useState(initialStateForAstronomy);
	const [counter, setCounter] = useState(0);

	const [totalCorrect, setTotalCorrect] = useState(0);

	function increaseIfCorrect() {
		setTotalCorrect(totalCorrect + 1);
	}

	function finishQuiz(str) {
		const data = {
			testName: "astronomy",
			testBody: `Last try: ${totalCorrect} / 10`
		}

		axiosWithAuth()
			.post('/api/tests', data)
			.then(() => {
				if (str === "startOver")
					window.location = '/astronomy';
				else
					window.location = '/';
			})
			.catch(err => console.log('astronomy', err));
	}

	return (
		<div className="astronomy">
			<center><h1>Welcome to Astronomy Quiz</h1></center>

			{counter === astronomyQuiz.length ? (
				<>
					<div className="astronomy_finishQuiz">
						<h2>Your sccore is {totalCorrect % 10} / 10 </h2>
						<div className="astronomy_button">
							<button onClick={() => finishQuiz("startOver")} >Start over</button>
							<button onClick={() => finishQuiz("home")}>See all the Quizes</button>
						</div>
					</div>
				</>
			) : (
					astronomyQuiz.map((question, index) => {
						if (counter === question.id) {
							return <QuestionDisplay key={index} question={question.Question} options={question.Options} correctAnswer={question.CorrectAnswer} increaseIfCorrect={increaseIfCorrect} />
						}
					})
				)
			}
			{counter < astronomyQuiz.length ? (
				<button className="astronomy_next_question" onClick={() => setCounter(counter + 1)} >Next</button>

			) : (null)}
		</div>
	)
}

export default Astronomy
