import React, { PureComponent } from 'react';
import './Cart.styles.scss';
import { withRouter } from '../../withRouter';
import { CartContext, DropdownContext } from '../../contexts';

class Cart extends PureComponent {
	constructor(props) {
		super(props);
	}
	static contextType = CartContext;

	componentDidMount() {}
	render() {
		return (
			<div className={'cart'}>
				<h1>Cart</h1>
			</div>
		);
	}
}

export default withRouter(Cart);
