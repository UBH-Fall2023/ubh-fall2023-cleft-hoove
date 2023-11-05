"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let DeliverSchema = new Schema(
	{
		name: {
			type: String,
		},
		location: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = {
	Model: mongoose.model("Deliver", DeliverSchema),
};
