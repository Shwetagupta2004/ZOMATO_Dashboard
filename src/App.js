import React, { Component } from 'react';
import ChartSection from './components/ChartSection';
import Header from './components/Header';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      Data: {
        top_locations: [],
        rating_distribution: [],
        top_cuisines: [],
        country_order: [],
        aggregate_rating: [],
        avg_rating_by_country: [],
        online_delivery_distribution: [],
        top_5_countries_order: [],
        top_cities_order: [],
        rating_text_distribution: [],
        vote_distribution_by_country: [],
        restaurant_online_delivery: [],
        table_booking_distribution: [],
        price_range_qc_cuisines: [],
        best_restaurants_vote: [],
        top_cuisines_ordered: [],
        avg_rating_by_cuisine: [],
      },
    };
  }

  fetchData = async () => {
    try {
      const response = await fetch('/zomato.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      console.log('Fetched Data:', jsonData); // Log fetched data to console
      this.setState({ Data: jsonData });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(() => this.fetchData(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="app">
        <Header handle_Submit={this.fetchData} />
        <div className="content">
          <ChartSection
            topLocations={this.state.Data.top_locations}
            ratingDistribution={this.state.Data.rating_distribution}
            topCuisines={this.state.Data.top_cuisines}
            countryOrder={this.state.Data.country_order}
            aggregateRating={this.state.Data.aggregate_rating}
            avgRatingByCountry={this.state.Data.avg_rating_by_country}
            onlineDeliveryDistribution={
              this.state.Data.online_delivery_distribution
            }
            top5CountriesOrder={this.state.Data.top_5_countries_order}
            topCitiesOrder={this.state.Data.top_cities_order}
            ratingTextDistribution={this.state.Data.rating_text_distribution}
            voteDistributionByCountry={
              this.state.Data.vote_distribution_by_country
            }
            restaurantOnlineDelivery={this.state.Data.restaurant_online_delivery}
            tableBookingDistribution={this.state.Data.table_booking_distribution}
            priceRangeQcCuisines={this.state.Data.price_range_qc_cuisines}
            bestRestaurantsVote={this.state.Data.best_restaurants_vote}
            topCuisinesOrdered={this.state.Data.top_cuisines_ordered}
            avgRatingByCuisine={this.state.Data.avg_rating_by_cuisine}
          />
        </div>
      </div>
    );
  }
}
