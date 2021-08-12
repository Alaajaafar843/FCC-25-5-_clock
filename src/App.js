import './App.css';
import React from 'react';
import 'font-awesome/css/font-awesome.min.css';



class App extends React.Component {

  constructor(props){

    super(props);

    this.state = {
        breakLength : 5,
        sessionLength : 25,
        name : 'Session',
        time : { m : 25 , s : 0},
        seconds : 1500,
        breakSeconds : 300,
        clock: 'stopped',
        color : 'green'
    }
    this.timer = 0
    this.decrement = this.decrement.bind(this)
    this.decrementSession = this.decrementSession.bind(this)
    this.increment = this.increment.bind(this)
    this.incrementSession = this.incrementSession.bind(this)
    this.countdown = this.countdown.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.reset = this.reset.bind(this)
    this.pause = this.pause.bind(this)
    this.breakCountdown = this.breakCountdown.bind(this)

    this.audio = new Audio('./clock-ticking-4.mp3')
    this.alarm = new Audio('./mixkit-alarm-tone-996.wav')
  }

  decrement() {
    if(this.state.breakLength<=60 && this.state.breakLength>1){
      this.setState({
        breakLength : this.state.breakLength-1,
        breakSeconds : this.state.breakSeconds-60
      })
    }
  }

  decrementSession(){
    if(this.state.sessionLength<=60 && this.state.sessionLength>1){
      this.setState({
        sessionLength : this.state.sessionLength-1,
        seconds : this.state.seconds-60,
        time : {m: this.state.time.m-1}
      })
    }
  }

  increment() {
    if(this.state.breakLength<60 && this.state.breakLength>1){
      this.setState({
        breakLength : this.state.breakLength+1,
        breakSeconds : this.state.breakSeconds+60
      })
    }
  }

  incrementSession() {
    if(this.state.sessionLength<60 && this.state.sessionLength>1){
      this.setState({
        sessionLength : this.state.sessionLength+1,
        seconds : this.state.seconds+60,
        time : {m:this.state.time.m+1}
      })
    }
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount(){
    let timeLeft = this.secondsToTime(this.state.seconds);
    this.setState({
      time : timeLeft
    })
  }

  startTimer() {
    if(this.timer===0 && this.state.seconds > 0){
      this.timer = setInterval(this.countdown , 1000)
      this.audio.play()
      this.audio.loop = true
      this.setState({
        clock: 'running'
      })
    }
  }

  breakCountdown() {
    let brseconds = this.state.breakSeconds-1;
    this.setState({
      time: this.secondsToTime(brseconds),
      breakSeconds : brseconds,
      color: 'red'
    })
    if(brseconds===0){
      this.reset()
    }
  }

  countdown() {
    let seconds = this.state.seconds-1;
    this.setState({
      time : this.secondsToTime(seconds),
      seconds : seconds
    })
    if(seconds===0){
      this.alarm.play()
      clearInterval(this.timer)
      this.timer =  setInterval(this.breakCountdown , 1000)
    }


    
  }

  pause() {
    if(this.state.clock==='running'){
      clearInterval(this.timer)
      this.setState({
        clock: 'stopped'
      })
      this.audio.pause();
      
    }
    else{
      this.timer = setInterval(this.countdown , 1000)
      this.setState({
        clock : 'running'
      })
      this.audio.play()
    }
  }

reset() {
  clearInterval(this.timer)
  this.setState({
    seconds: 1500,
    breakSeconds: 300,
    breakLength : 5,
    sessionLength : 25,
    time : {m : 25 , s : 0},
    clock: 'stopped',
    color: 'green'
  })
  this.timer = 0
  this.audio.pause()
}



  render() {
    
    return (
      
      <div class="container">
          
          <h1 id='title'>25+5 Clock</h1>
            <div class="control">
              <div><h3>Break Length</h3></div>
              <div>
                <div class="float-child"><i class="fa fa-arrow-down" aria-hidden="true" style={{fontSize:"30px"}} onClick={this.decrement}></i></div>
                <div class="float-child"><h2>{this.state.breakLength}</h2></div>
                <div class="float-child"><i class="fa fa-arrow-up" aria-hidden="true" style={{fontSize:"30px"}} onClick={this.increment}></i></div>
            </div>
          </div>
            <div class="control">
              <div><h3>Session Length</h3></div>
              <div>
              <div class="float-child"><i class="fa fa-arrow-down" aria-hidden="true" style={{fontSize:"30px"}} onClick={this.decrementSession}></i></div>
              <div class="float-child"><h2>{this.state.sessionLength}</h2></div>
              <div class="float-child"><i class="fa fa-arrow-up" aria-hidden="true" style={{fontSize:"30px"}} onClick={this.incrementSession}></i></div>
            </div>
          </div>
            <div class='buttons'>
            <button onClick={this.startTimer}>start</button>
            <button onClick={this.reset}>Reset</button>
            <button onClick={this.pause}>Pause</button>
          </div>
          <div style={{color:this.state.color}} id='time'>{this.state.time.m}:{this.state.time.s}</div>

      </div>


    )

  }

}


export default App;



