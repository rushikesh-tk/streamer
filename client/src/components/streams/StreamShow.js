import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';

import { fetchStream } from '../../actions';
import history from '../../history';

class StreamShow extends React.Component {

	constructor(props){
		super(props);

		this.videoRef = React.createRef();
	}

	componentDidMount(){

		const { id } = this.props.match.params

		this.props.fetchStream(id)
		this.buildPlayer()
	}

	componentDidUpdate(){
		this.buildPlayer();
	}

	componentWillUnmount(){
		this.player.destroy();
	}

	buildPlayer(){
		if(this.player || !this.props.stream){
			return;
		}

		const { id } = this.props.match.params

		this.player = flv.createPlayer({
			type : 'flv',
			url : `http://localhost:8000/live/${id}.flv`
		})

		this.player.attachMediaElement(this.videoRef.current);
		this.player.load();
	}

	goToHome(){
		history.push('/')
	}

	render(){

		if(this.props.isSignedIn){

		if(!this.props.stream){
			return <h4>Loading...</h4>
		}

		const { title, description } = this.props.stream

		return (
			<div className="flex">
				<video 
					className="ba bg-near-black" 
					ref={this.videoRef} 
					style={{ width:'100%' }} 
					controls
				/>
				<div className="b pa3 bg-dark-gray moon-gray flex flex-column justify-between">
					<div>
						<h2>{title}</h2>
						<h5>{description}</h5>
					</div>
					<span className="green">NOTE: Please Add Your Stream ID from URL as Stream KEY to OBS</span>
				</div>
			</div>
				
			);
		}
		else {
			return <div>{this.goToHome()}</div>
		}
	}
	}

const mapStateToProps = (state, ownProps) => {
	return { 
		stream : state.streams[ownProps.match.params.id],
		isSignedIn : state.auth.isSignedIn
	 }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);