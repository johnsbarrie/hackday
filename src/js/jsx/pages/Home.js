import React from 'react';
import dispatcher from '../../Dispatcher'
export default class SpinnerControlPage extends React.Component {
	render () {
		return (
			<div class="bd-example">
				<div class="card ">
					<div class=" card-header card-info">Hacker Day Stuff</div>
					<div class="card-block ">
						<p  class="card-text ">Eclectic shit for Hack day</p>
						<p  class="card-text "> </p>
						<ul>
							<li><b>Spinner</b> : An MVC example with a flux store  </li>
							<li><b>QRcode</b> : React interacting with a Pixi stage to create a QRCode</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}
