"use strict";

require("dotenv").config();
const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongoose");
const { Model, Status } = require("../models/order.model");

/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

/** @type {ServiceSchema} */
module.exports = {
	name: "order",
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
				userId: "string",
				pickup: "string",
				dropoff: "string",
				items: {
					type: "array",
					items: {
						type: "object",
						props: {
							id: "string",
							quantity: {
								type: "number",
								convert: true,
								positive: true,
							},
							price: {
								type: "number",
								convert: true,
								positive: true,
							},
						},
					},
				},
			},
			async handler(ctx) {
				return this.adapter
					.insert({
						userId: ctx.params.userId,
						pickup: ctx.params.pickup,
						dropoff: ctx.params.dropoff,
						items: ctx.params.items,
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
