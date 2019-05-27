import React , { Component } from 'react';

class SearchInput extends Component {
    constructor(props){
        super(props)
        this.state={
            inputValue:'',
            apiData:[],
            suggestions:[],
            selectedCity:[],
            airQualityInfo:'',
            lastUpdated:[]
        }
    }
    componentDidMount() {
        fetch('https://api.openaq.org/v1/cities?country=GB&limit=200')
        .then(response => response.json())
        .then(json => this.setState({apiData:json.results}))
    }

    handleChange = (e) => {
      const inputValue = e.target.value.toLowerCase();
      console.log(inputValue)
      const suggestions = this.state.apiData.filter((cityData) => cityData.city.toLowerCase().startsWith(inputValue) )
      console.log(suggestions)
      this.setState({suggestions:suggestions})
       e.preventDefault();
    }

    handleSelect(e) {
        const city = e.target.innerHTML;
        //what if it is made of multiple words?

        //get Air Quality Data
        fetch(`https://api.openaq.org/v1/latest?country=GB&city=${city}`)
        .then(response => response.json())
        .then(json => console.log(json.results))

        //get Last Updated info
        fetch(`https://api.openaq.org/v1/locations?country=GB&city=${city}`)
        .then(response => response.json())
        .then(json => this.setState({lastUpdated:json.results[0].lastUpdated}))
    }

    getDataForCity = (city) => {

    }

    render(){
        return(
            <div>
            <form onChange={this.handleChange}>
                <input type='text' placeholder="Search city"/>
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
            </div>
        )
    }
}
export default SearchInput;
