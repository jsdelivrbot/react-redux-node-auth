import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

class Feature extends Component {
	componentWillMount() {
		// Fire action-creator when component loads to fetch data from server 
		this.props.fetchMessage();
	}

	render() {
		return (
			<div>{ this.props.message }</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		message: state.auth.message
	}
}

export default connect(mapStateToProps, actions)(Feature);