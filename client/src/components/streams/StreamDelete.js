import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../../Modal';
import { fetchStream, deleteStream } from '../../actions';
import history from '../../history';

class StreamDelete extends React.Component {

	componentDidMount(){
		this.props.fetchStream(this.props.match.params.id)
	}

	renderActions(){
		const { id } = this.props.match.params;

		return(
			<React.Fragment>
				<button onClick={() => this.props.deleteStream(id)} className="ui negative button">Delete</button>
				<Link
					to='/' 
					className="ui button">
					Cancel
				</Link>
			</React.Fragment>
		)
	}

	renderContent(){
		if(!this.props.stream){
			return 'Are You Sure Want to Delete this Stream?'
		}

		return `Are You Sure Want to Delete this Stream with title : ${this.props.stream.title}`
	}
		
	render(){
		return (
			<Modal
				title="Delete Stream"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => history.push('/')}
			/>
		);
	}

}

const mapStateToProps = (state, ownProps) => {
	return { stream : state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);