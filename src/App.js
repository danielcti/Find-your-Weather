import React, { Component } from 'react';
import './App.css';
import CardList from './components/CardList';
import Form from './components/Form'
const APIKey = 'UA5VVpQ6HNr1w5Cs1lkbzir95p6UBWoM';
const cityUrlStart = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey=';
const picUrlStart = 'http://openweathermap.org/img/w/';
class App extends Component {
  constructor(){
    super();
    this.state = {
      pics: [],
      city: '',
      cityUrl: `${cityUrlStart}${APIKey}&q=`,
      cityKey: '',
      weatherInfo: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
  }
 
  handleChange(event) {
    this.setState({city: event.target.value});
  }

  handleSubmit(event) {
    // this.setState({cityUrl: this.state.cityUrl.concat(this.state.city)})
    event.preventDefault(); // n refresh a pagina
    // console.log(this.state.city)
    this.setCityKey();
  }

  setCityKey = () => {
    var request = require('request');
    var Key = '';
    request(this.state.cityUrl.concat(this.state.city), function (error, response, body) {
      try{
        const dados = JSON.parse(body)
        Key = dados[0].Key
        // console.log(Key)   
      }
      catch{
        alert('Não foi possível encontrar essa cidade. Digite novamente.')
      }
    });
    setTimeout(() => { // problemas com async
    this.setState({cityKey: Key})
    this.getWeather()
    },50)
  }

  getWeather = () => {
    console.log(this.state.city, this.state.cityKey)
    const urlStart = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
    const urlEnd =  `?apikey=${APIKey}&metric=true`;
    var request = require('request');
    let weatherInfo = []
    let phrases = []
    request(urlStart + this.state.cityKey + urlEnd, function(error, response, body){
      try{
        var obj = JSON.parse(body);
        let data = obj.DailyForecasts;
        // console.log(data)
        data.forEach(element => {
          const JSONDate = element.Date;
          const i =  JSONDate.search('T'); // a data se encontra ate achar o T
          const date = JSONDate.substring(0,i)
          const min = element.Temperature.Minimum.Value
          const max = element.Temperature.Maximum.Value
          phrases.push(element.Day.IconPhrase)
          weatherInfo.push({min: min, max: max, date: date})
        });
      }
      catch{
        alert('Não foi possível encontrar as informações dessa cidade. Atualize a pagina e tente novamente!')
      }
    });
    setTimeout(() => this.getUrl(phrases), 50) // problemas com assync
    setTimeout(() => this.setState({weatherInfo: weatherInfo}), 50)// problemas com assync
    setTimeout(() => console.log(this.state.weatherInfo),50)
  }

  getUrl = (phrases) => {
    let pics = []
    phrases.forEach(element => {
      element = element.toLowerCase()
      if(element.includes('cloud')){
        pics.push(picUrlStart+'03d.png')
      }else if(element.includes('sunny')){
        pics.push(picUrlStart+'01d.png')
      }else if(element.includes('rain')){
        pics.push(picUrlStart+'09d.png')
      }else if(element.includes('snow')){
        pics.push(picUrlStart+'13d.png')
      }else if(element.includes('thunder')){
        pics.push(picUrlStart+'11d.png')
      }else{
        pics.push('')
      }
    });
    console.log(phrases)
    this.setState({pics: pics})
  }

  render() {
    return (
      <div className="App">
      <Form handleChange={this.handleChange} handleSubmit={this.handleSubmit} citykey={this.state.cityKey}/>
      <CardList {...this.state}/>
      </div>
    );
  }
}

export default App;
