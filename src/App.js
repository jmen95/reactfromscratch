import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			properties: [],
			counter: 0,
		};
		this.aumentar = this.aumentar.bind(this);
		this.fetchHTML = this.fetchHTML.bind(this);
	}

	aumentar() {
		const counter = this.state.counter + 1;
		this.setState({ counter });
	}

	fetchHTML() {
		const linkToFetch = 'https://investment.appfolio.com/listings';
		axios
			.get(linkToFetch)
			.then(({ data }) => {
				const container = document.createElement('div');
				container.innerHTML = data;
				const items = container.querySelectorAll('.listing-item');
				const properties = [];
				for (let index = 0; index < items.length; index++) {
					const element = items[index];
					const imageUrl = element.querySelector('.listing-item__image').dataset.original;
					const address = element.querySelector('.js-listing-address').innerHTML;
					const rent = element.querySelector('.detail-box__item:first-child dd').innerHTML;
					const property = {
						id: index,
						imageUrl,
						address,
						rent,
					};
					properties.push(property);
				}

				this.setState({ properties });
			})
			.catch((error) => console.log('Error', error));
	}

	componentDidMount() {
		this.fetchHTML();
	}

	render() {
		return (
			<div>
				Hola Mundo!
				<br />
				How are you? contador: {this.state.counter}
				<button onClick={this.aumentar}>Aumentar</button>
				<div className="list-items">
					{this.state.properties.length &&
						this.state.properties.map((item) => (
							<div key={item.id}>
								<div className="image-box">
									<img src={item.imageUrl} />
								</div>
								<div className="details-box">
									{item.address}
									<br />
									<strong>{item.rent}</strong>
								</div>
							</div>
						))}
				</div>
			</div>
		);
	}
}
