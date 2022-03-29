import React, { PureComponent } from 'react';
import './Cart.styles.scss';
import CartProductCard from '../../components/CartProductCard/CartProductCard.Component';
import { withRouter } from '../../withRouter';
import { CartContext, CurrencyContext } from '../../contexts';

class Cart extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			cart: [],
		};
	}
	static contextType = CartContext;

	componentDidMount() {
		this.setState({
			cart: this.context,
			// currency: currency,
		});
	}

	componentDidUpdate() {
		// console.log(CurrencyContext.Provider);
		this.setState({
			cart: this.context,
			// currency: currency,
		});
	}

	render() {
		return (
			<div className={'cart'}>
				<h2 className='cart-title'>Cart</h2>
				<CartContext.Consumer>
					{(cart) => (
						<CurrencyContext.Consumer>
							{(currency) => (
								<CartProductCard currency={currency} cart={cart} />
							)}
						</CurrencyContext.Consumer>
					)}
				</CartContext.Consumer>
			</div>
		);
	}
}

export default withRouter(Cart);
