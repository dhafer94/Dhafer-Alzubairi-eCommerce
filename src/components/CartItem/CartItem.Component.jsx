import React, { PureComponent } from 'react';
import './CartItem.styles.scss';
import { withRouter } from '../../withRouter';

class CartItem extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			allAttributes: [],
			item: [],
		};
	}

	componentDidMount() {
		const { allAttributes, item } = this.props;
		this.setState({
			allAttributes: allAttributes,
			item: item,
		});
	}

	componentDidUpdate() {
		const { allAttributes, item } = this.props;
		this.setState({
			allAttributes: allAttributes,
			item: item,
		});
	}

	render() {
		const { allAttributes, item } = this.state;

		return (
			<div
				id='cart-overlay'
				className='cart-overlay-item-attributes-main-container'>
				<div
					id='cart-overlay'
					// key={i + 5000}
					className='cart-overlay-item-attributes-other-container'>
					{allAttributes.map((att, i) =>
						att.id === item.id ? (
							att.type === 'text' ? (
								<div
									key={i + 4000}
									id='cart-overlay'
									className={
										att.selected
											? 'cart-overlay-item-attribute-box-selected'
											: 'cart-overlay-item-attribute-box'
									}>
									{att.value}
								</div>
							) : null
						) : null,
					)}
				</div>
				<div
					id='cart-overlay'
					// key={i}
					className='cart-overlay-item-attributes-swatch-container'>
					{allAttributes.map((att, i) =>
						att.id === item.id ? (
							att.type === 'swatch' ? (
								<div
									key={i + 2000}
									style={{
										background: `${att.value}`,
									}}
									id='cart-overlay'
									className={
										att.selected
											? 'cart-overlay-item-attribute-swatch-selected'
											: 'cart-overlay-item-attribute-swatch'
									}
								/>
							) : null
						) : null,
					)}
				</div>
			</div>
		);
	}
}

export default withRouter(CartItem);
