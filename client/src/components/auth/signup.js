import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

const renderField = ({ input, label, type, className, meta: { touched, error } }) => (
	<div>
		<div>
			<input {...input} placeholder={ label } type={ type } className={ className } />
			{/* if all expressions true, return the last one (<span>) */ }
			{ touched && error && <span className="error">{ error }</span> }
		</div>
	</div>
)

class Signup extends Component {

	// redux-form will not submit form if it is invalid
	handleFormSubmit(formProps) {
		// Call action creator to sign up the user
		this.props.signupUser(formProps);
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> { this.props.errorMessage }
				</div>
			);
		}
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
				<fieldset className="form-group">
					<label>Email</label>
					<Field
						name="email"
						component={ renderField }
						type="text"
						className="form-control" />
				</fieldset>

				<fieldset className="form-group">
					<label>Password</label>
					<Field
						name="password"
						component={ renderField }
						type="password"
						className="form-control" />
				</fieldset>

				<fieldset className="form-group">
					<label>Password Confirm</label>
					<Field
						name="passwordConfirm"
						component={ renderField }
						type="password"
						className="form-control" />
				</fieldset>

				{ this.renderAlert() }
				<button type="submit" className="btn btn-primary">Sign Up</button>
			</form>
		);
	}
}

// formProps contains our Field names and is provided by redux-form
function validate(formProps) {
	const errors = {};

	if (!formProps.email) {
		errors.email = 'Please enter an email';
	}
	if (!formProps.password) {
		errors.password = 'Please enter a password';
	}
	if (!formProps.passwordConfirm) {
		errors.passwordConfirm = 'Please enter a password confirmation';
	}
	if (formProps.password !== formProps.passwordConfirm) {
		errors.password = 'Passwords must match';
	}

	return errors;
}

function mapStateToProps(state) {
	return {
		errorMessage: state.auth.error
	};
}

export default connect(mapStateToProps, actions)(reduxForm({
	form: 'signup',
	validate
})(Signup));
