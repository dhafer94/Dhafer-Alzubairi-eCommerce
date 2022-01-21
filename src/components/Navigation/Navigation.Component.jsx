import React, { PureComponent } from 'react';
import './Navigation.styles.scss';

class Navigation extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<nav className='navbar'>
				<ul className='navbar-categories-links'>
					<li className='navbar-category'>ALL</li>
					<li className='navbar-category'>CLOTHES</li>
					<li className='navbar-category'>TECH</li>
				</ul>
				<div className='navbar-logo'>LOGO</div>
				<div className='navbar-actions'>
					<div className='navbar-currency'>currency</div>
					<div className='navbar-cart'>cart</div>
				</div>
			</nav>
		);
	}
}

export default Navigation;
