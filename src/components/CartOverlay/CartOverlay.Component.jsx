import React, { PureComponent } from 'react';
import './CartOverlay.styles.scss';
import { myCart } from './myCart';

class CartOverlay extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return <div className='cart-overlay'></div>;
	}
}

export default CartOverlay;
