import React, { PureComponent } from 'react';
import './Product.styles.scss';
import ProductProfile from '../../components/ProductProfile/ProductProfile.Component';
import {
	CategoryProductsContext,
	CurrencyContext,
	AllDataContext,
} from '../../contexts';

class Product extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<AllDataContext.Consumer>
					{(allData) => (
						<CurrencyContext.Consumer>
							{(currency) => (
								<CategoryProductsContext.Consumer>
									{(products) => (
										<ProductProfile
											currency={currency}
											products={products}
											allData={allData}
										/>
									)}
								</CategoryProductsContext.Consumer>
							)}
						</CurrencyContext.Consumer>
					)}
				</AllDataContext.Consumer>
			</div>
		);
	}
}

export default Product;
