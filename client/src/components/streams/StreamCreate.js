import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { createStream } from '../../actions';

class StreamCreate extends React.Component {

	renderError({ error, touched }){
		if(touched && error){
			return (
				<div className="red">
					{error}
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta }) => {
		return (
			<div className="field">
				<label>{label} :</label>
				<input {...input} />
				{this.renderError(meta)}
			</div>
		);
	}

	onSubmit = (formValues) => {
		this.props.createStream(formValues)
	}

	render(){
		return (
			<form
				onSubmit={this.props.handleSubmit(this.onSubmit)}
				className="ui form error">
				<Field name="title" component={this.renderInput} label="Enter Title"/>
				<Field name="description" component={this.renderInput} label="Enter Description"/>
				<button className="ui primary button">Submit</button>
			</form>
		);	
	}
	
}

const validate = (formValues) => {
	const errors = {};

	if(!formValues.title){
		errors.title = "You Must Enter Valid Title"
	}

	if(!formValues.description){
		errors.description = "You Must Enter A Description"
	}
	return errors;
}

const formWrapper = reduxForm({
	form : 'createStream',
	validate : validate
})(StreamCreate);

export default connect(null, {
	createStream
})(formWrapper)