"use strict";

require("dotenv").config();
const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongoose");
const { Model } = require("../models/item.model");
const mongoose = require("mongoose");

/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

/** @type {ServiceSchema} */
module.exports = {
	name: "item",
	version: 1,

	/**
	 * Mixins
	 */
	mixins: [DbService],

	adapter: new MongooseAdapter(process.env.MONGO_URI),
	model: Model,

	/**
	 * Settings
	 */
	settings: {
		// Available fields in the responses
		// fields: ["_id", "name", "quantity", "price"],
		// Validator for the `create` & `insert` actions.
		// entityValidator: {
		// 	name: "string|min:3",
		// 	price: "number|positive",
		// },
	},

	/**
	 * Action Hooks
	 */
	hooks: {
		before: {
			/**
			 * Register a before hook for the `create` action.
			 * It sets a default value for the quantity field.
			 *
			 * @param {Context} ctx
			 */
			// create(ctx) {
			// 	ctx.params.quantity = 0;
			// },
		},
	},

	/**
	 * Actions
	 */
	actions: {
		/**
		 * The "moleculer-db" mixin registers the following actions:
		 *  - list
		 *  - find
		 *  - count
		 *  - create
		 *  - insert
		 *  - update
		 *  - remove
		 */
		// --- ADDITIONAL ACTIONS ---
		create: {
			params: {
				name: "string",
				vendorId: "string",
				stock: {
					type: "number",
					positive: true,
					convert: true,
				},
				price: {
					type: "number",
					positive: true,
					convert: true,
				},
			},
			async handler(ctx) {
				console.log(ctx.params);
				return this.adapter
					.insert({
						name: ctx.params.name,
						vendorId: ctx.params.vendorId,
						stock: +ctx.params.stock,
						price: +ctx.params.price,
					})
					.then((doc) => this.transformDocuments(ctx, {}, doc));
			},
		},

		getVendorItems: {
			rest: {
				path: "/vendor",
				method: "GET",
			},
			params: {
				vendorId: "string",
			},
			async handler(ctx) {
				return this.adapter
					.find({
						query: {
							vendorId: ctx.params.vendorId,
						},
						sort: ["-createdAt"],
					})
					.then((docs) => this.transformDocuments(ctx, {}, docs));
			},
		},

		update: {
			params: {
				name: "string",
				vendorId: "string",
				id: "string",
				stock: {
					type: "number",
					positive: true,
					convert: true,
				},
				price: {
					type: "number",
					positive: true,
					convert: true,
				},
			},
			async handler(ctx) {
				return this.adapter
					.findOne({
						_id: mongoose.Types.ObjectId(ctx.params.id),
					})
					.then((doc) => {
						doc.name = ctx.params.name;
						doc.vendorId = ctx.params.vendorId;
						doc.stock = +ctx.params.stock;
						doc.price = +ctx.params.price;
						return this.adapter.updateById(doc._id, doc);
					})
					.then((doc) => this.transformDocuments(ctx, {}, doc));
			},
		},
	},

	/**
	 * Methods
	 */
	methods: {
		/**
		 * Loading sample data to the collection.
		 * It is called in the DB.mixin after the database
		 * connection establishing & the collection is empty.
		 */
	},

	/**
	 * Fired after database connection establishing.
	 */
	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
	},
};
