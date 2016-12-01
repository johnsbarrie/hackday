import React from 'react';
import dispatcher from '../../Dispatcher'
import AppModelConst from '../../const/AppModelConst'
import AppModel from '../../stores/AppModel'
export default class Oscillator extends React.Component {

	componentWillMount () {
		this.type='triangle';
	}
	/**
	 triggered by click on button
	*/
	clicked(){
		var AudioContext = window.AudioContext || window.webkitAudioContext;
		var audioCtx = new AudioContext();

		this.oscillator = audioCtx.createOscillator();
		this.oscillator.type=this.type;
		this.gainNode = audioCtx.createGain();

		this.oscillator.connect(this.gainNode);
		this.gainNode.connect(audioCtx.destination);

		var WIDTH = window.innerWidth;
		var HEIGHT = window.innerHeight;

		this.maxFreq = 600;
		this.maxVol = 1.0;

		var initialFreq = 300;
		var initialVol = 0.001;

		this.oscillator.detune.value = 300;
		document.onmousemove = (e)=> { this.updatePage(e) };
		this.oscillator.start(0);
	}

 updatePage(e) {
	    var curX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	    var curY  = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

			var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
			var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

	    this.oscillator.frequency.value = (curX/w) * this.maxFreq ;
	    this.gainNode.gain.value = (curY/h) * this.maxVol;
	}

	setOscillatorType(e){
		this.type = e.target.value;
	}

	render () {
		return (
			<div class="bd-example">
				<div class="card">
					<div class="card-block">
						<p  class="card-text">Start Oscillator !</p>
						<div>
							<select ref='ocsillatorType' onChange={ (e)=> this.setOscillatorType(e) }>
								<option value="sine">sine</option>
								<option value="square">square</option>
								<option value="sawtooth">sawtooth</option>
								<option value="triangle">triangle</option>
								<option value="custom">custom</option>
							</select>
							<button class="btn btn-info" onClick={ ()=>this.clicked() }>Add Oscillator</button>
						</div>
						<div>

						</div>
					</div>
				</div>
			</div>
		)
	}
}
