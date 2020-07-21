import React from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth';
import tv from '../assets/tv.png';

const Header = () => {

	return (
		<div className="ui secondary pointing menu">
			<Link to="/" className="item">
				<img src={tv} alt='tv'/>
			</Link>

			<div className="right menu pt3">
				<GoogleAuth/>
			</div>
		</div>
	);
}

export default Header;