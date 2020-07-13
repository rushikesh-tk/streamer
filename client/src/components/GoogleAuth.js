import React from 'react';

class GoogleAuth extends React.Component {

	state = { isSignedIn : null }

	componentDidMount(){
		window.gapi.load('client:auth2', () => {
			window.gapi.client.init({
				clientId : '802839075046-do5ibnj37vf5u6aoap8ja7dt0jaciinp.apps.googleusercontent.com',
				scope : 'email'
			}).then(() => {
				this.auth = window.gapi.auth2.getAuthInstance();
				this.setState({ isSignedIn : this.auth.isSignedIn.get() })
				this.auth.isSignedIn.listen(this.onAuthChange)
			})
		})
	}

	onAuthChange = () => {
		this.setState({ isSignedIn : this.auth.isSignedIn.get() })
	}
	
	onSignInClick = () => {
		this.auth.signIn();
	}

	onSignOutClick = () => {
		this.auth.signOut();
	}

	renderAuthButton(){
		if(this.state.isSignedIn === null){
			return <button class="ui primary loading button">Loading</button>;
		}
		else if(this.state.isSignedIn){
			return (
				<button
					onClick={this.onSignOutClick} 
					className="ui red google button">
					<i className="ui google icon"/>
					Sign Out
				</button>
			);
		}
		else {
			return (
				<button
					onClick={this.onSignInClick} 
					className="ui blue  button">
					<i class="ui google icon"></i>
					Sign In
				</button>
			);
		}
	}

	render(){
		return (
			<div>{this.renderAuthButton()}</div>
		);
	}
}

export default GoogleAuth;