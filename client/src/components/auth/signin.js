import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions'; // import action creators

class Signin extends Component {
	// entire form will be submitted, so just pull off email and password properties
	handleFormSubmit({ email, password }) {
		console.log(email, password);

		// log user in - call action creator
		this.props.signinUser({ email, password });
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	render() {
		// handleSubmit method comes from redux-form
		const { handleSubmit } = this.props;

		// pass a callback we create to redux-form's handleSubmit()
		// bind this context when passing off a callback function
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<label>Email:</label>
					<Field
            name="email"
            component="input"
            type="text"
            placeholder="Email"
						className="form-control" />
				</fieldset>

				<fieldset className="form-group">
					<label>Password:</label>
					<Field
            name="password"
            component="input"
            type="password"
						placeholder="Password"
						className="form-control" />
				</fieldset>

				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign in</button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

// redux form fields config - pass in above component to second function
// these become available in component as this.props.fields.email, etc..

// connect(mapStateToProps, mapDispatchToProps) to wire up redux -> made available on this.props above
export default connect(mapStateToProps, actions)(reduxForm({
	form: 'signin'
})(Signin));

// export our conntected redux-form component instead of the class above
