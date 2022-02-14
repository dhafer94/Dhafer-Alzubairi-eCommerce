import React, { PureComponent } from 'react';
import './Navigation.styles.scss';
import { Link, useParams } from 'react-router-dom';
import { withParams } from '../../withParams';

class Navigation extends PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let id = this.props.params.id;
		// console.log(id);
	}
	render() {
		// console.log(this.props);
		return (
			<nav className='navbar'>
				<ul className='navbar-categories-links'>
					{this.props.categoriesNames.map((element, i) => {
						return (
							<Link
								onClick={this.props.handleCategoryClick}
								key={i}
								to={`/${element}`}>
								{element}
							</Link>
						);
					})}
				</ul>
				<div className='navbar-logo'>LOGO</div>
				<div className='navbar-actions'>
					<div className='navbar-currency'>currency</div>
					<Link
						onClick={this.props.handleCategoryClick}
						to='/cart'
						className='navbar-cart'>
						cart
					</Link>
				</div>
			</nav>
		);
	}
}

export default withParams(Navigation);
