import React, { Component } from 'react';

class Zoos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			zoos: []
		};
	}

	render() {
		return (
			<div className="zoos">
				<h1>List of zoos </h1>
				<ul>
					{this.props.zoos.map((zoo) => {
						return (
							<div className="zoo-card">
								<h3>{zoo.name}</h3>
								<button>Update</button>
								<button>Delete</button>
							</div>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default Zoos;
