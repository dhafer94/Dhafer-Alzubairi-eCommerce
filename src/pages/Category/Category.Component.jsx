import React, { PureComponent } from 'react';
import './Category.styles.scss';
import Navigation from '../../components/Navigation/Navigation.Component';
import Directory from '../../components/Directory/Directory.Component';

class Category extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='category-page'>
				<Navigation />
				<Directory />
			</div>
		);
	}
}

export default Category;
