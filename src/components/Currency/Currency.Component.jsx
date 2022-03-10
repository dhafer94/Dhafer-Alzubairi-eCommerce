import React, { PureComponent } from 'react';
import './Currency.styles.scss';

class Currency extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			// currency
		};
	}

	// handleDropdown = (e) => {
	// 	if (e.target.className === 'currency-container') {
	// 		if (
	// 			e.target.lastChild.className === 'navbar-currency-select-menu-inactive'
	// 		) {
	// 			e.target.lastChild.className = 'navbar-currency-select-menu-active';
	// 		} else {
	// 			e.target.lastChild.className = 'navbar-currency-select-menu-inactive';
	// 		}
	// 	}
	// 	if (e.target.className === 'currency-placeholder') {
	// 		if (
	// 			e.target.parentNode.lastChild.className ===
	// 			'navbar-currency-select-menu-inactive'
	// 		) {
	// 			e.target.parentNode.lastChild.className =
	// 				'navbar-currency-select-menu-active';
	// 		} else {
	// 			e.target.parentNode.lastChild.className =
	// 				'navbar-currency-select-menu-inactive';
	// 		}
	// 	}
	// };

	render() {
		const { handleCurrencyClick, currency, dataFetched, dropdown } = this.props;
		let selectedCurrency = currency.filter((item, i) => item.selected);
		// console.log(dropdown);
		return (
			<div
				className={
					dropdown === 'active'
						? 'currency-container active-bg'
						: 'currency-container inactive-bg'
				}>
				{dataFetched ? (
					<>
						{typeof selectedCurrency[0] !== 'undefined' && (
							<option
								className='currency-placeholder'
								{...selectedCurrency[0].selected}
								value={selectedCurrency[0].label}>
								{`${selectedCurrency[0].symbol}`}
							</option>
						)}
					</>
				) : null}
				<div
					className={
						dropdown === 'active'
							? 'navbar-currency-select-menu-active'
							: 'navbar-currency-select-menu-inactive'
					}>
					{currency.map((item, i) => {
						return (
							<option
								onClick={(e) => handleCurrencyClick(e)}
								className='navbar-currency-option'
								{...item.selected}
								key={i}
								value={item.label}>
								{`${item.symbol} ${item.label}`}
							</option>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Currency;
