module.exports = {
	SERVER_DETAILS: Object.freeze({
		PROTOCOL: "http",
		DOMAIN: "localhost:3000"
	}),

	FEATURES: Object.freeze({
		STYLING: 1
	}),

	ROLE_TYPE: Object.freeze({
		UNREGISTERED: 0,
		OWNER: 1,
		ADMINISTRATOR: 2
	}),

	SUBSCRIPTION_TYPE: Object.freeze({
		TRIAL: 1
	}),

	REDUX_STATE: Object.freeze({
		PENDING: "PENDING",
		FULFILLED: "FULFILLED",
		REJECTED: "REJECTED"
	})
};
