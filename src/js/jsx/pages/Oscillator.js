import React from 'react';
import dispatcher from '../../Dispatcher'
import AppModelConst from '../../const/AppModelConst'
import AppModel from '../../stores/AppModel'
import OscillatorButton from '../components/OscillatorButton'

export default class Oscillator extends React.Component {

	componentWillMount () {
		var AudioContext = window.AudioContext || window.webkitAudioContext;
		this.type='triangle';
		this.state= { gain:0.2 };

		var body=document.querySelector('body');
		body.onkeydown = (e)=>this.keyDown(e);
		this.oscillators=[];
		this.ocillatorIndex=0;
		this.audioCtx = new AudioContext()
		this.masterGain = this.audioCtx.createGain();
		this.masterGain.connect(this.audioCtx.destination);

		this.state ={ gain:.2 };
		this.masterGain.gain.value=this.state.gain;
	}

	keyDown(e) {
		//touch 'R'
		if(e.keyCode===82){
			document.onmousemove=null;
		}
	}
	/**
	 triggered by click on button
	*/
	clicked(){
			var oscObj={};
			oscObj.oscillator = this.audioCtx.createOscillator();
			oscObj.oscillator.type=this.type;
			oscObj.gainNode = this.audioCtx.createGain();
			//oscObj.gainNode.gain.value=.2;
			oscObj.oscillator.connect(oscObj.gainNode);
			oscObj.gainNode.connect(this.masterGain);



			oscObj.oscillator.start(0);

			this.oscillators.push(oscObj);
			this.ocillatorIndex=this.oscillators.length-1;
			oscObj.id=this.ocillatorIndex;
			this.setState(this.oscillators);
	}

	_volumeChanged(e){
		this.state.gain=this.refs.volume.value;
		this.masterGain.gain.value=this.state.gain;
		this.setState(this.state);
	}

	updatePage(e) {
		var oscObj= this.oscillators[this.ocillatorIndex];

		var curX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
		var curY  = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

		var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

		oscObj.oscillator.type=this.type;
		oscObj.oscillator.frequency.value = (curX/w) * this.maxFreq ;
		oscObj.gainNode.gain.value = (curY/h) * this.maxVol;
	}

	setOscillatorType(e){
		this.type = e.target.value;
	}

	modifyOscillator (oscObj) {
		this.ocillatorIndex=oscObj.id;
		document.onmousemove = (e)=> { this.updatePage(e) };
	}

	render () {
		var style = {
			marginTop: '20px'
		};

		return (
			<div class="bd-example">
				<div class="card">
					<div class="card-block">
						<div>
							<button class="btn btn-info" onClick={ ()=>this.clicked() }>Add Instrument</button>
							<input ref="volume" type="range" min="0" max="1.0" step="0.01" value={ this.state.gain } onChange={ (e)=>{ this._volumeChanged(e); } } />
						</div>
					</div>
				</div>

				<div class="row" style={ style }>
					{ this.oscillators.map((item, i )=>{
						return ( <OscillatorButton key={i} item={item} onItemClick={ (e)=>this.modifyOscillator(e) } />); })
					}
				</div>
			</div>
		)
	}


}
