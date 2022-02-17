import React, { PureComponent } from 'react';
import './Navigation.styles.scss';
import Currency from '../Currency/Currency.Component';
import { Link } from 'react-router-dom';
import { withParams } from '../../withParams';

class Navigation extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const currency = this.props.currency;
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
					<Currency
						dataFetched={this.props.dataFetched}
						currency={currency}
						handleChange={this.props.handleChange}
					/>
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
