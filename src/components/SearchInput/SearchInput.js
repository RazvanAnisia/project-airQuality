import React , { Component } from 'react';
import InformationCard from '../InformationCard/InformationCard';
import { generateID } from '../../utilis/helper'
import searchIcon from '../../assets/search-solid.svg'
import './SearchInput.css'

class SearchInput extends Component {
    constructor(props){
        super(props)
        this.state={
            inputValue:'',
            apiData:[],
            showSuggestions:false,
            suggestions:[],
            selectedCities:[],
            noResults:false
        }
    }

    componentDidMount() {
        fetch('https://api.openaq.org/v1/cities?country=GB&limit=200')
        .then(response => response.json())
        .then(json => this.setState({apiData:json.results}))
    }

    handleChange = (e) => {
      const inputValue = e.target.value.toLowerCase();
      const capitalizedInput = e.target.value
      let suggestions = this.state.apiData.filter((cityData) => cityData.city.toLowerCase().startsWith(inputValue) )
      if(inputValue === '' || inputValue === ' ') {
          suggestions = []
      }
      suggestions.length === 0 && inputValue !==''
        ? this.setState({suggestions:suggestions, inputValue:capitalizedInput , noResults:true })
        : this.setState({suggestions:suggestions, inputValue:capitalizedInput , noResults:false, showSuggestions:true})
      e.preventDefault();
    }

    handleSelect = (e) => {
        const city = e.target.innerHTML.trim();
        const cityInfo = {
            airQualityInfo:null,
            lastUpdated:null,
            id:generateID()
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
                    inputValue: city,
                    showSuggestions:false
            })))

        )
    }
   removeCard = (id) => {
        const newState =  this.state.selectedCities.filter((city) => city.id !== id )
        this.setState({
            selectedCities:newState
        })
    }

    render(){
        return(
            <div className='input-container'>
            <form  className='input-form'
              onFocus={this.handleChange}
              onChange={this.handleChange}>
                <img className='search-icon' src={searchIcon} alt='search icon'/>
                <input type='text'
                className='search-input'
                value={this.state.inputValue}
                placeholder="Enter city name..."/>
            </form>
                <ul className="suggestions-container" id='style-1'>
                    { this.state.showSuggestions
                    ? this.state.suggestions.map((suggestion, index) => (
                        <li className="suggestion-element"
                            onClick={this.handleSelect}
                            key={index}>
                            {suggestion.city}
                        </li>
                        ))
                    : null
                    }
                </ul>

                {this.state.noResults
                ? <p className='error-msg'>Sorry, we do not have any results for your query</p>
                : null }

                <div class='cards-container'>
                    { this.state.selectedCities.length > 0
                    ? this.state.selectedCities.map((city) =>
                    (<InformationCard
                        key={city.id}
                        removeCard={()=>this.removeCard(city.id)}
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
