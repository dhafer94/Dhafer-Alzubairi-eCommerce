import React, { PureComponent } from 'react';
import './Category.styles.scss';
import Directory from '../../components/Directory/Directory.Component';
import {
	CategoryProductsContext,
	CurrencyContext,
	DataFetchedContext,
} from '../../contexts';
import { withRouter } from '../../withRouter';

class Category extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		// console.log(this.props);
		return (
			<div className='category-page'>
				<DataFetchedContext.Consumer>
					{(dataFetched) => (
						<CurrencyContext.Consumer>
							{(currency) => (
								<CategoryProductsContext.Consumer>
									{(products) => (
										<Directory
											currency={currency}
											products={products}
											dataFetched={dataFetched}
										/>
									)}
								</CategoryProductsContext.Consumer>
							)}
						</CurrencyContext.Consumer>
					)}
				</DataFetchedContext.Consumer>
			</div>
		);
	}
}

export default withRouter(Category);
