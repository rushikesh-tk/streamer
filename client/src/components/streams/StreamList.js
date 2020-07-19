import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';

class StreamList extends React.Component {

	componentDidMount(){
		this.props.fetchStreams();
	}

	renderAdmin(stream){
			if(stream.userId === this.props.currentUserId){
				return (
					<div className="right floated content">
						<button className="positive ui button">
							Edit
						</button>
						<button className="ui negative button">
							Delete
						</button>					
					</div>
				);
			}
		}

	renderList(){
		return this.props.streams.map(stream => {
			return (
					<div className="item" style={{ padding : '15px' }} key={stream.id}>
						{this.renderAdmin(stream)}
						<i className="large middle aligned icon camera"/>
						<div className="content">
							<div className="f4">
								{stream.title}
							</div>
							
							<div className="description">
								{stream.description}
							</div>
						</div>				
				</div>);
			})
		}

	renderCreate(){
		if(this.props.isSignedIn){
			return (
				<div style={{ textAlign : "right"}}>
					<Link to='streams/new'>
						<div className="ui animated fade secondary button">
						  <div className="visible content">Create Stream</div>
						  <div className="hidden content">
						    <i className="large middle aligned icon camera"></i>
						  </div>
						</div>
					</Link>
				</div>
			);
		}
	}

	render(){
		return (
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">
					{this.renderList()}
				</div>
				{this.renderCreate()}
			</div>
		);
	}	
}

const mapStateToProps = (state) => {
	return { 
		streams : Object.values(state.streams),
		currentUserId : state.auth.userId,
		isSignedIn : state.auth.isSignedIn
	}
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);