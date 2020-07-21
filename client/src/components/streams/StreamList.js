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
						<Link to={`/streams/edit/${stream.id}`} className="positive ui button">
							Edit
						</Link>
						<Link to={`/streams/delete/${stream.id}`} className="ui negative button">
							Delete
						</Link>					
					</div>
				);
			}
		}

	renderList(){
		if(!this.props.streams[0] && !this.props.isSignedIn){
			return <h4 className="i">Oops...Seems to be no streams here<br/>SignIn to Create One</h4>
		}

		if(!this.props.streams[0] && this.props.isSignedIn){
			return <h4 className="i">Click on Create Stream to Add One</h4>
		}

		return this.props.streams.map(stream => {
			return (
					<div className="item" style={{ padding : '15px' }} key={stream.id}>
						{this.renderAdmin(stream)}
						<i className="large middle aligned icon tv"/>
						<div className="content">
							<div className="f3">
								<Link 
									to={`/streams/${stream.id}`}

								>
									{stream.title}
								</Link>
							</div>
							
							<div className="description pt2 b" >
								{stream.description}
							</div>
						</div>				
				</div>
			);
		})
	}

	renderCreate(){
		if(this.props.isSignedIn){
			return (
				<div style={{ textAlign : "right"}}>
					<Link to='streams/new'>
						<div className="ui animated secondary button">
						  <div className="visible content">Create Stream</div>
						  <div className="hidden content">
						    <i className="middle aligned icon tv"></i>
						  </div>
						</div>
					</Link>
				</div>
			);
		}
	}

	render(){
		if(this.props.isSignedIn){
			return (
				<div>
					{this.renderCreate()}
					<h2 className="i">Streams</h2>
					<div className="ui celled list">
						{this.renderList()}
					</div>
				</div>
			);
		}
		else {
			return (
				<div className="i">
					<h1>Please SignIn</h1>
					<h2>To Stream</h2>
					<h3>Your Videos</h3>
				</div>
			);
		}
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