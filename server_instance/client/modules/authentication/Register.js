import React from "react";
import PropTypes from "prop-types";
import validate from "validate.JS";
import { t } from "~/shared/translations/i18n";

import { register } from "~/shared/validation/authentication";

import InputField from "../../common/components/inputs/InputField";
import WorkspaceURLField from "../../common/components/inputs/WorkspaceURLField";

class Register extends React.Component {
constructor(props) {
	super(props);

	this.state = {
		workspaceURL: "",
		firstName: "",
		lastName: "",
		emailAddress: "",
		password: "",
		loading: false,
		errors: {}
	};

	this.register = this.register.bind(this);
	this.changeField = this.changeField.bind(this);
}

changeField(evt) {
	this.setState({[evt.target.name]: evt.target.value});
}

register() {
	this.setState({ loading: true });
	const client = {
		workspaceURL: this.state.workspaceURL,
		firstName: this.state.firstName,
		lastName: this.state.lastName,
		emailAddress: this.state.emailAddress,
		password: this.state.password
	};

	// Validate input parameters
	const valid = validate(client, register);
	if (valid != null) {
		this.setState({
			loading: false,
			errors: valid
		});
	}
}

  render() {
	const { firstName, lastName, emailAddress, password, workspaceURL, loading, errors } = this.state;
    return (
		<div id="register">
			<div className="pl-5 pr-5 justify-content-center">
				<form className="w-100">
					<div className="w-100 text-center">
						<span>Logo</span>
					</div>
					<div className="w-100 mb-3">
						<span className="h3">{t("action.register")}</span>
					</div>
					<div className="form-row">
						<div className="col">
						<InputField
							label={t("label.firstName")}
							name={"firstName"}
							id={"firstName-input"}
							value={firstName}
							type={"textField"}
							ariaLabel={"firstName"}
							onChange={this.changeField}
							disabled={loading}
							error={errors}
						/>
						</div>
						<div className="col">
						<InputField
							label={t("label.lastName")}
							name={"lastName"}
							id={"lastName-input"}
							value={lastName}
							type={"textField"}
							ariaLabel={"lastName"}
							onChange={this.changeField}
							disabled={loading}
							error={errors}
						/>
						</div>
					</div>
					<InputField
						label={t("label.emailAddress")}
						name={"emailAddress"}
						id={"email-input"}
						value={emailAddress}
						type={"textField"}
						ariaLabel={"emailAddress"}
						onChange={this.changeField}
						disabled={loading}
						error={errors}
					/>
					<InputField
						label={t("label.password")}
						name={"password"}
						id={"password-input"}
						value={password}
						type={"password"}
						ariaLabel={"Password"}
						onChange={this.changeField}
						disabled={loading}
						error={errors}
					/>
					<WorkspaceURLField
						value={workspaceURL}
						onChange={this.changeField}
						disabled={loading}
						error={errors}
					/>
					<button
						type="button"
						className="btn btn-primary btn-lg btn-block mt-4 p-3"
						onClick={this.register}
						disabled={loading}
					>
						{t("action.signUp")}
					</button>
					<div className="text-center">
						<span>
						<small>
							By signing up, you agree to our Terms & Conditions and
							Privacy policy
						</small>
						</span>
					</div>
				</form>
			</div>
		</div>
    );
  }
}

export default Register;
