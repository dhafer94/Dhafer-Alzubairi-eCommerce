import React, { PureComponent } from 'react';
import './Cart.styles.scss';
import { gql } from '@apollo/client';

class Cart extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>Cart</h1>
			</div>
		);
	}
}

export default Cart;
