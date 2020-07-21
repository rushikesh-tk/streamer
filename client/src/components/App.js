import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';
import './App.css';

const App = () => {
	return (
		<div className='body-style' style={{height:'650px'}}>
			<div className="ui container">
				<Router history={history}>
					<div>
						<Header/>
						<Switch>
							<Route path='/' exact component={StreamList}/>
							<Route path='/streams/new' component={StreamCreate}/>
							<Route path='/streams/edit/:id' component={StreamEdit}/>
							<Route path='/streams/delete/:id' component={StreamDelete}/>
							<Route path='/streams/:id' exact component={StreamShow}/>
						</Switch>
					</div>
				</Router>
			</div>
		</div>
	);
}

export default App;