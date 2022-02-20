import React, { PureComponent } from 'react';
import './Navigation.styles.scss';
import Currency from '../Currency/Currency.Component';
import { NavLink } from 'react-router-dom';
import { withRouter } from '../../withRouter';

class Navigation extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const { currency, categoriesNames, dataFetched, handleChange } = this.props;
		// console.log(this.props.router.params);

		return (
			<nav className='navbar'>
				<ul className='navbar-categories-links'>
					{categoriesNames.map((element, i) => {
						return (
							<NavLink key={i} to={`/plp/${element}`}>
								{element}
							</NavLink>
						);
					})}
				</ul>
				<div className='navbar-logo'>LOGO</div>
				<div className='navbar-actions'>
					<Currency
						dataFetched={dataFetched}
						currency={currency}
						handleChange={handleChange}
					/>
					<NavLink to='/cart' className='navbar-cart'>
						cart
					</NavLink>
				</div>
			</nav>
		);
	}
}

export default withRouter(Navigation);
