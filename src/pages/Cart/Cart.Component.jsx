import React, { PureComponent } from 'react';
import './Cart.styles.scss';
import { withRouter } from '../../withRouter';

class Cart extends PureComponent {
	constructor(props) {
		super(props);
	}
	render() {
		// console.log(this.props);
		return (
			<div>
				<h1>Cart</h1>
			</div>
		);
	}
}

export default withRouter(Cart);
