"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ItemSchema = new Schema(
	{
		vendorId: {
			type: String,
		},
		name: {
			type: String,
		},
		stock: {
			type: Number,
		},
		price: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = {
	Model: mongoose.model("Item", ItemSchema),
};
