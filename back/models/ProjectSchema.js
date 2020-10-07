const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
	name: {
		type: mongoose.Types.ObjectId,
		ref: 'users'
	},
	physicsCounter: {
		type: Number,
		default: 0
	},
	mathCounter: {
		type: Number,
		default: 0
	},
	astronomyCounter: {
		type: Number,
		default: 0
	},
	physicsLastTest: {
		type: String,
	},
	mathLastTest: {
		type: String,
	},
	astronomyLastTest: {
		type: String,
	}
});

module.exports = Project = mongoose.model("projects", ProjectSchema);
