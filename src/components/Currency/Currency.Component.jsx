import React, { PureComponent } from 'react';

class Currency extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const currency = this.props.currency;
		return (
			<select
				className='navbar-currency'
				onChange={this.onSelectHandler}
				name='currency'
				id=''>
				{' '}
				{currency.map((item, i) => {
					if (i === 0) {
						return (
							<option key={i} value={`${item.label}`}>
								{item.symbol}
							</option>
						);
					} else {
						return (
							<option key={i} value={`${item.label}`}>
								{item.symbol} {item.label}
							</option>
						);
					}
				})}
			</select>
		);
	}
}

export default Currency;
