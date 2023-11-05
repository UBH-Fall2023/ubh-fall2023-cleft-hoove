"use strict";

require("dotenv").config();
const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongoose");
const { Model, Status } = require("../models/order.model");
const mongoose = require("mongoose");

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
				price: {
					type: "number",
					convert: true,
					positive: true,
				},
				items: {
					type: "array",
					optional: true,
				},
			},
			async handler(ctx) {
				return this.adapter
					.insert({
						userId: ctx.params.userId,
						pickup: ctx.params.pickup,
						dropoff: ctx.params.dropoff,
						items: ctx.params.items,
						price: ctx.params.price,
					})
					.then((doc) => this.transformDocuments(ctx, {}, doc));
			},
		},

		getPickupOrders: {
			rest: {
				path: "/pickup",
				method: "GET",
			},
			params: {
				pickup: "string",
			},
			async handler(ctx) {
				return this.adapter
					.find({
						query: {
							pickup: ctx.params.pickup,
							status: Status.Created,
						},
						sort: ["createdAt"],
					})
					.then((docs) => this.transformDocuments(ctx, {}, docs));
			},
		},

		getUserOrders: {
			rest: {
				path: "/user",
				method: "GET",
			},
			params: {
				userId: "string",
			},
			async handler(ctx) {
				return this.adapter
					.find({
						query: {
							userId: ctx.params.userId,
						},
						sort: ["-createdAt"],
					})
					.then((docs) => this.transformDocuments(ctx, {}, docs));
			},
		},

		getDeliverOrders: {
			rest: {
				path: "/deliver",
				method: "GET",
			},
			params: {
				deliverId: "string",
			},
			async handler(ctx) {
				const deliver = await ctx.call("v1.user.get", {
					id: ctx.params.deliverId,
				});
				return this.adapter
					.find({
						query: {
							status: Status.Created,
							dropoff: deliver.location,
						},
						sort: ["-createdAt"],
					})
					.then((docs) => {
						let m = new Map();
						for (let order of docs) {
							if (m.has(order.pickup)) {
								m.set(order.pickup, {
									count: m.get(order.pickup).count + 1,
									location: order.pickup,
									closingTime: order.closingTime,
								});
							} else {
								m.set(order.pickup, {
									count: 1,
									location: order.pickup,
									closingTime: order.closingTime,
								});
							}
						}
						let orders = [];
						for (let order of m.values()) {
							orders.push(order);
						}
						return orders;
					});
			},
		},

		updateDeliver: {
			rest: {
				path: "/deliver",
				method: "PUT",
			},
			params: {
				id: "string",
				deliverId: "string",
			},
			async handler(ctx) {
				return this.adapter
					.findOne({
						_id: mongoose.Types.ObjectId(ctx.params.id),
					})
					.then((doc) => {
						doc.deliverId = ctx.params.deliverId;
						return this.adapter.updateById(doc._id, doc);
					})
					.then((doc) => this.transformDocuments(ctx, {}, doc));
			},
		},

		pickupOrder: {
			rest: {
				path: "/pickup",
				method: "PUT",
			},
			params: {
				id: "string",
			},
			async handler(ctx) {
				return this.adapter
					.findOne({
						_id: mongoose.Types.ObjectId(ctx.params.id),
					})
					.then((doc) => {
						doc.status = Status.OnTheWay;
						return this.adapter.updateById(doc._id, doc);
					})
					.then((doc) => this.transformDocuments(ctx, {}, doc));
			},
		},

		completeOrder: {
			rest: {
				path: "/complete",
				method: "PUT",
			},
			params: {
				id: "string",
			},
			async handler(ctx) {
				return this.adapter
					.findOne({
						_id: mongoose.Types.ObjectId(ctx.params.id),
					})
					.then((doc) => {
						doc.status = Status.Completed;
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
