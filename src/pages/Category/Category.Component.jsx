import React, { PureComponent } from 'react';
import './Category.styles.scss';
import Directory from '../../components/Directory/Directory.Component';
import { gql } from '@apollo/client';
import { CategoryContext, CategoryProductsContext } from '../../contexts';

class Category extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='category-page'>
				<CategoryContext.Consumer>
					{(category) => (
						<CategoryProductsContext.Consumer>
							{(products) => (
								<Directory
									products={products}
									category={category}
									client={this.props.client}
								/>
							)}
						</CategoryProductsContext.Consumer>
					)}
				</CategoryContext.Consumer>
			</div>
		);
	}
}

export default Category;
