import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

class Signout extends Component {
	componentWillMount() {
		// sign out user through action when this component loads
		this.props.signoutUser();
	}

	render() {
		return (
			<div>
				Sorry to see you go!
			</div>
		);
	}
}

export default connect(null, actions)(Signout);