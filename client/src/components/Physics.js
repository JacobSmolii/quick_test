import React, { useState } from 'react';
import QuestionDisplay from './QuestionDisplay';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import './Physics.css'

const initialStateForPhysics = [
	{
		id: 0,
		Question: "What’s the difference between weight and mass?",
		Options: [
			{ ans: "A. No difference – they’re synonyms" },
			{ ans: "B. Mass is the amount of matter in an object, weight is the gravitational force on an object" },
			{ ans: "C. Mass is metric, weight is imperial" },
			{ ans: "D. Mass is a measure of size, weight is a measure of density" }
		],
		CorrectAnswer: 1
	},

	{
		id: 1,
		Question: "The laws of physics tell us that energy is:",
		Options: [
			{ ans: "A. Conserved" },
			{ ans: "B. Concerned" },
			{ ans: "C. Constant" },
			{ ans: "D. Contained" },
		],
		CorrectAnswer: 0
	},

	{
		id: 2,
		Question: "Which two elementary particles are described as “massless”?",
		Options: [
			{ ans: "A. Photon and gluon" },
			{ ans: "B. Muon and neutrino" },
			{ ans: "C. Electron and proton" },
			{ ans: "D. None of the above" },
		],
		CorrectAnswer: 0
	},

	{
		id: 3,
		Question: "The Large Hadron Collider at CERN uses 1.3 terawatt hours of electricity annually. That’s equivalent to:",
		Options: [
			{ ans: "A. The amount needed to power roughly 300,000 middle-class homes" },
			{ ans: "B. The energy released by roughly 1.4 million 100-watt light bulbs in a year" },
			{ ans: "C. Roughly the same annual usage as Madagascar" },
			{ ans: "D. All of the above" },
		],
		CorrectAnswer: 3
	},

	{
		id: 4,
		Question: "The universe is made up of three main ingredients: ordinary matter (e.g. stars, planets, people), dark matter, and dark energy. In what proportions?",
		Options: [
			{ ans: "A. Mostly matter: 80% ordinary matter / 14% dark matter / 6% dark energy" },
			{ ans: "B. A good mix: 33% ordinary matter / 28% dark matter / 39% dark energy" },
			{ ans: "C. A dark stew: 5% ordinary matter / 27% dark matter / 68% dark energy" },
			{ ans: "D. Potluck: We don’t actually know" },
		],
		CorrectAnswer: 2
	},

	{
		id: 5,
		Question: "Which of these phenomena inspired Albert Einstein in his development of general relativity?",
		Options: [
			{ ans: "A. Seeing an apple drop from tree" },
			{ ans: "B. Watching two trains move in opposite directions" },
			{ ans: "C. The vibration of strings on a violin" },
			{ ans: "D. Seeing a man fall off a roof" },
		],
		CorrectAnswer: 3
	},

	{
		id: 6,
		Question: "When you map out the universe from the smallest scale (the Planck length, which is 1.6×10−35 metres) to the largest (the observable universe, which is 91 billion light years across), what do you find approximately in the middle?",
		Options: [
			{ ans: "A. An electron" },
			{ ans: "B. Life as we know it (cells, molecules, and the like)" },
			{ ans: "C. The Earth" },
			{ ans: "D. Our solar system" },
		],
		CorrectAnswer: 1
	},

	{
		id: 7,
		Question: "The largest known star in the galaxy is UY Scuti, in the Scutum Constellation. If it was plopped into the centre of our solar system, where our Sun is now, how much space would it take up?",
		Options: [
			{ ans: "A. It is five times larger than our Sun, and 400 times hotter" },
			{ ans: "B. It would swallow up Earth and all the planets closer to the sun" },
			{ ans: "C. Its outer edge would sit somewhere between Mars and Jupiter" },
			{ ans: "D. Its outer edge would be beyond the orbit of Jupiter - basically" },
		],
		CorrectAnswer: 3
	},

	{
		id: 8,
		Question: "Speaking of our galaxy, there’s a black hole at the middle of the Milky Way, called Sagittarius A*. Roughly how massive is it, compared to our sun?",
		Options: [
			{ ans: "A. 4,000 times the mass of our sun" },
			{ ans: "B. 400,000 times the mass of our sun" },
			{ ans: "C. 4,000,000 times the mass of our sun" },
			{ ans: "D. They’re radically different sizes, but the same mass" },
		],
		CorrectAnswer: 2
	},

	{
		id: 9,
		Question: "Planets come in a variety of sizes. The exoplanet Draugr (a.k.a. PSR B1257+12 A) is the smallest legitimate exoplanet known so far. How puny is it?",
		Options: [
			{ ans: "A. The size of South Dakota" },
			{ ans: "B. Twice as massive as our moon" },
			{ ans: "C. 1/100,000,000th the mass of Earth" },
			{ ans: "D. Self-conscious about its weight and won’t divulge" },
		],
		CorrectAnswer: 1
	},
]

function Physics() {
	const [physicsQuiz] = useState(initialStateForPhysics);
	const [counter, setCounter] = useState(0);

	const [totalCorrect, setTotalCorrect] = useState(0);

	function increaseIfCorrect() {
		setTotalCorrect(totalCorrect + 1);
	};

	function finishQuiz(str) {
		const data = {
			testName: "physics",
			testBody: `Last try: ${totalCorrect} / 10`
		}

		axiosWithAuth()
			.post('/api/tests', data)
			.then(() => {
				if (str === "startOver")
					window.location = '/physics';
				else
					window.location = '/';
			})
			.catch(err => console.log('physics', err));
	}

	return (
		<div className="physics">
			<center><h1>Welcome to physics Quiz</h1></center>

			{counter === physicsQuiz.length ? (
				<>
					<div className="physics_finishQuiz">
						<h2>Your sccore is {totalCorrect % 10} / 10 </h2>
						<div className="physics_button">
							<button onClick={() => finishQuiz("startOver")} >Start over</button>
							<button onClick={() => finishQuiz("home")}>See all the Quizes</button>
						</div>
					</div>
				</>
			) : (
					physicsQuiz.map(question => {
						if (counter === question.id) {
							return <QuestionDisplay key={question.id} question={question.Question} options={question.Options} correctAnswer={question.CorrectAnswer} increaseIfCorrect={increaseIfCorrect} />
						}
					})
				)
			}
			{counter < physicsQuiz.length ? (
				<button className="physics_next_question" onClick={() => setCounter(counter + 1)} >Next</button>

			) : (null)}
		</div>
	)
}

export default Physics
