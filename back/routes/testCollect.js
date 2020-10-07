const express = require("express");
const router = express.Router();
const Project = require('../models/ProjectSchema');
const User = require('../models/Users');

router.post('/', (req, res) => {
	if (!req.body || !req.body.testName)
		return res.send('check answers');

	const { id } = req.token;
	const { testName, testBody } = req.body;

	Project
		.findOne({ name: id })
		.then(projectQuiz => {
			if (!projectQuiz) { // create new
				const newQuiz = new Project({
					name: id,
					[`${testName}Counter`]: 1,
					[`${testName}LastTest`]: testBody
				})
				newQuiz.save()
			} else { // update the current one
				projectQuiz[`${testName}LastTest`] = testBody;
				projectQuiz[`${testName}Counter`] = projectQuiz[`${testName}Counter`] + 1;
				projectQuiz.save();
			}
			res.status(201).send("Quiz list updated");
		})
		.catch(err => {
			res.status(400).send('cannot update the db, check the code')
		})
})

router.get('/', (req, res) => {
	const { id } = req.token;

	Project
		.findOne({ name: id })
		.then(projectQuiz => {
			if (!projectQuiz) {
				const neverQuized = {
					physicsCounter: 0,
					mathCounter: 0,
					astronomyCounter: 0,
					physicsLastTest: '',
					mathLastTest: '',
					astronomyLastTest: ''
				}
				return res.status(200).send(neverQuized)
			}
			res.status(200).json(projectQuiz);
		})
		.catch(err => res.status(404).send('testCollect', err))
})


module.exports = router;
