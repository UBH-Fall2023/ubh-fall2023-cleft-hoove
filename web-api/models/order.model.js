"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const Status = Object.freeze({
	Created: Symbol("created"),
	OnTheWay: Symbol("ontheway"),
	Completed: Symbol("completed"),
});

let OrderSchema = new Schema(
	{
		userId: {
			type: String,
			index: true,
		},
		pickup: {
			type: String,
		},
		dropoff: {
			type: String,
		},
		items: {
			type: JSON,
		},
		price: {
			type: Number,
		},
		deliverId: {
			type: String,
			index: true,
		},
		status: {
			type: String,
			enum: Status,
			default: Status.Created,
			index: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = {
	Model: mongoose.model("Order", OrderSchema),
	Status: Status,
};
