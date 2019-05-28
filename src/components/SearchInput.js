import React , { Component } from 'react';
import InformationCard from './InformationCard';

class SearchInput extends Component {
    constructor(props){
        super(props)
        this.state={
            inputValue:'',
            apiData:[],
            suggestions:[],
            selectedCities:[],

        }
    }
    componentDidMount() {
        fetch('https://api.openaq.org/v1/cities?country=GB&limit=200')
        .then(response => response.json())
        .then(json => this.setState({apiData:json.results}))
    }

    handleChange = (e) => {
      const inputValue = e.target.value.toLowerCase();
      let suggestions = this.state.apiData.filter((cityData) => cityData.city.toLowerCase().startsWith(inputValue) )
      if(inputValue === '' || inputValue === ' ') {
          suggestions = []
      }

      this.setState({suggestions:suggestions, inputValue:inputValue})
       e.preventDefault();
    }

    handleSelect = (e) => {
        const city = e.target.innerHTML;
        //what if it is made of multiple words?
        //What if we have no results, nothing matching?

        const cityInfo = {
            airQualityInfo:null,
            lastUpdated:null,
        }

        //get Air Quality Data and Last Updated info
        fetch(`https://api.openaq.org/v1/latest?country=GB&city=${city}`)
        .then(response => response.json())
        .then(json => cityInfo.airQualityInfo = json.results[0])
        .then(() =>
            fetch(`https://api.openaq.org/v1/locations?country=GB&city=${city}`)
            .then(response => response.json())
            .then(json => cityInfo.lastUpdated = json.results[0].lastUpdated )
            .then( () =>
                //set the state
                this.setState((state) => ({
                    selectedCities: [...state.selectedCities, cityInfo],
                    inputValue: city
            })))

        )
    }

    removeCard = (id) => {
        const newState =  this.state.selectedCities.filter((city) => city.airQualityInfo.city !== id )
        this.setState({
            selectedCities:newState
        })
    }


    render(){
        return(
            <div className='input-container'>
            <form  className='input-form' onChange={this.handleChange}>
                <input type='text' value={this.state.inputValue} placeholder="Enter name of city"/>
            </form>
                <ul className="suggestions-container">
                    { this.state.suggestions.map((suggestion, index) => (
                        <li className="suggestion-element"
                            onClick={this.handleSelect}
                            key={index}>
                            {suggestion.city}
                        </li>
                        ))
                    }
                </ul>
                <div class='cards-container'>
                    { this.state.selectedCities.length > 0
                    ? this.state.selectedCities.map((city,index) =>
                    (<InformationCard
                        key={index}
                        removeCard={()=>this.removeCard(city.airQualityInfo.city)}
                        lastUpdated={city.lastUpdated}
                        airQualityInfo={city.airQualityInfo}/>)
                    )
                    : null
                    }
                </div>

            </div>
        )
    }
}
export default SearchInput;
