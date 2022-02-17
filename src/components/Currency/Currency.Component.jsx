import React, { PureComponent } from 'react';

class Currency extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const handleChange = this.props.handleChange;
		return (
			<select
				onInput={(e) => handleChange(e.target.value)}
				className='navbar-currency'
				name='currency'>
				{this.props.currency.map((item, i) => {
					if (item.selected) {
						return (
							<option {...item.selected} key={i} value={item.label}>
								{`${item.symbol}`}
							</option>
						);
					}
					return (
						<option {...item.selected} key={i} value={item.label}>
							{`${item.symbol} | ${item.label}`}
						</option>
					);
				})}
			</select>
		);
	}
}

export default Currency;
