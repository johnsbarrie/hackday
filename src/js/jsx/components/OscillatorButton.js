import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router"

export default class OscillatorButton extends React.Component {
	constructor(props, context){
		super(props, context);
		this.router = context.router;
		this.location = context.location;
	}

	_clicked() {
		this.props.onItemClick(this.props.item);
	}
	/**
	Render tab bar using
	*/
	render () {
		return (
			<button class="col-md-2 btn-warning" onClick={ ()=>this._clicked()}>O</button>
		)
	}
}
