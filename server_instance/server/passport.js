let passport = require("passport");
let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;
let config = require("../config");

function initialize(app, database) {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(
		new JwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
				secretOrKey: config.authentication.jwtSecret
			},
			function(payload, done) {
				database.perform().getConnection(function(error, connection) {
					// Return error if database connection error
					if (error) {
						return done(error);
					}
					connection.query("select * from users where email = '" + payload.email + "'", function(err, rows) {
						if (err) return done(err);
						if (rows) {
							done(null, rows[0]);
						} else {
							done(null, false);
						}
					});
				});
			}
		)
	);

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(id, done) {
		database.perform().getConnection(function(error, connection) {
			// Return error if database connection error
			if (error) {
				done(error, null);
			}
			connection.query("SELECT * FROM `user` WHERE `id` = ? AND `active` = true", [id], function(error, rows) {
				done(error, rows[0]);
			});
		});
	});
}

function perform() {
	return passport;
}

module.exports = {
	initialize: initialize,
	perform: perform
};
