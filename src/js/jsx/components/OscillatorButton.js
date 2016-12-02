import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router"

export default class OscillatorButton extends React.Component {
	constructor(props, context){
		super(props, context);
		this.router = context.router;
		this.location = context.location;
	}

	componentWillMount () {
		var gain = this.props.item.gainNode.gain.value;
		var detune=300*Math.random();
		this.props.item.oscillator.detune.value = detune;
		this.state= { active:true, gain:gain, detune:detune };
		this.pulsing=false;
	}

	_setOscillatorType(e){
		this.props.item.oscillator.type = e.target.value;
	}

	_setPreset(e){
		if (e.target.value=="pulse"){
			this.pulsing=true;
			window.requestAnimationFrame((e)=>{ this._pulse(e); });
		} else {
			this.pulsing=false;
		}
	}

	_pulse(timeStamp) {
		if(this.pulsing){
			this.props.item.oscillator.frequency.value = this.refs.frequency.value* (Math.sin( timeStamp/300)+1);
			console.log(this.pulsing, Math.sin( timeStamp/1000));
			window.requestAnimationFrame((e)=>{ this._pulse(e); });
		}
	}

	_checkBoxChanged(e) {
		var active=this.refs.activedCheckBox.checked;
		this.state.active=!this.state.active;

		if (this.state.active) {
			this.props.item.gainNode.gain.value=this.state.gain;
		} else {
			this.state.gain=this.props.item.gainNode.gain.value;
			this.props.item.gainNode.gain.value=0;
		}

		this.setState(this.state);
	}

	_volumeChanged(e){
		this.props.item.gainNode.gain.value=this.refs.volume.value;
		this.state.gain=this.refs.volume.value;
		this.setState(this.state);
	}

	_frequencyChanged(e){
		this.props.item.oscillator.frequency.value = this.refs.frequency.value;
	}

	_detuneChanged(e){
		this.props.item.oscillator.detune.value=this.refs.detune.value;
		this.state.detune=this.refs.detune.value;
		this.setState(this.state);
	}

	//oscObj.oscillator.detune.value = 300;

	render () {
		return (
			<div class="card">
				<div class="card-block">
					<p  class="card-text">Instrument</p>
					<div>
						<select ref='ocsillatorType' onChange={ (e)=> this._setOscillatorType(e) }>
							<option value="sine">sine</option>
							<option value="square">square</option>
							<option value="sawtooth">sawtooth</option>
							<option value="triangle">triangle</option>
						</select>
						<select ref='ocsillatorPreset' onChange={ (e)=> this._setPreset(e) }>
							<option value="none">preset</option>
							<option value="pulse">pulse</option>
						</select>
						<div>
							<label>volume</label>
							<input ref="volume" type="range" min="0" max="1.0" step="0.01" value={ this.state.gain } onChange={ (e)=>{this._volumeChanged(e); } } />
						</div>
						<div>
						<label > frequency <input ref="frequency" type="range" min="1" max="600" step="1" onChange={ (e)=>{this._frequencyChanged(e) } } /></label>
						</div>
						<div>
							<label>tune</label>
							<input ref="detune" type="range" min="1" max="600" step="1" value={ this.state.detune }  onChange={ (e)=>{this._detuneChanged(e); } } />
						</div>
						<input type="checkbox" ref="activedCheckBox" onChange={ ()=>{this._checkBoxChanged(); } } checked={ this.state.active } />
					</div>
				</div>
			</div>
		)
	}
}
