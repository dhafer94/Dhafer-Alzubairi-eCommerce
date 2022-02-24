import React, { PureComponent } from 'react';
import './Product.styles.scss';
import ProductProfile from '../../components/ProductProfile/ProductProfile.Component';
import {
	CategoryProductsContext,
	CurrencyContext,
	AllDataContext,
	DataFetchedContext,
} from '../../contexts';

class Product extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='product-profile'>
				<CurrencyContext.Consumer>
					{(currency) => (
						<DataFetchedContext.Consumer>
							{(dataFetched) => (
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
															dataFetched={dataFetched}
														/>
													)}
												</CategoryProductsContext.Consumer>
											)}
										</CurrencyContext.Consumer>
									)}
								</AllDataContext.Consumer>
							)}
						</DataFetchedContext.Consumer>
					)}
				</CurrencyContext.Consumer>
			</div>
		);
	}
}

export default Product;
