"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let VendorSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
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
	Model: mongoose.model("Vendor", VendorSchema),
};
