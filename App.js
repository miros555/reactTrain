import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import { Button, Navbar, NavItem, Nav, Row, Col } from "react-bootstrap";

import {connect} from 'react-redux';

const PLACES = [
  { name: "Palo Alto", zip: "94303" },
  { name: "San Jose", zip: "94088" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Kiev", zip: "01032" },
  { name: "ZP", zip: "69006" },
];


class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
	//var a = weather.temp;
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {(weatherData.main.temp-32)*(5/9)>>0}°</p>
        <p>High: {(weatherData.main.temp_max-32)*(5/9)>>0}°</p>
        <p>Low: {(weatherData.main.temp_min-32)*(5/9)>>0}°</p>
        <p>Wind Speed: {weatherData.wind.speed} m/h</p>
      </div>
    );
  }
}

class App extends Component{
	 constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
}
 
 
  addTrack(){
     console.log('Hello', this.trackInput.value);
	 this.props.onAddTrack(this.trackInput.value);
	 this.trackInput.value='';
    }
	 
  render() {
	  
	console.log(this.props.testStore);
	  
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
	  <Navbar>
              <h2>React for Weather App</h2>
        </Navbar>
<Row>
<Col md={1} sm={1}>

        {PLACES.map((place, index) => (
 
		  <Button style={{padding:10,margin:5}}
            key={index}
            onClick={() => {
              this.setState({ activePlace: index });
            }}
          >
              {place.name}
          </Button>
        ))}
</Col>
<Col md={11} sm={11}>        
		<WeatherDisplay
          key={activePlace}
          zip={PLACES[activePlace].zip}
        />
</Col>
</Row>	


<div>
  <input type="text" ref={(input) => { this.trackInput = input; }}/>
  <button onClick={this.addTrack.bind(this)}>Add track</button>
  <ul>
  </ul>
</div>
	
	{this.props.testStore.map((track,index)=>
	<li key={index} style={{padding:5}}>{track}</li>
	)}
	
      </div>
    );
  }
}

export default connect ( 
state=>({
	testStore:state
}),
dispatch=>({ 
onAddTrack: (trackName) =>{
dispatch ({ type:'ADD_TRACK', payload: trackName})
}	
})
)(App);
















