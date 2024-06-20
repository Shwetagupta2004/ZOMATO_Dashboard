import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/zomato.json');
        const jsonData = await response.json();
        // Round the overall ratings to two decimal places
        if (jsonData && jsonData.overall_ratings) {
          jsonData.overall_ratings = Number(jsonData.overall_ratings).toFixed(2);
        }
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Only fetch data once on component mount

  return (
    <header>
      <h1>ZOMATO DASHBOARD</h1>
      <div className="button-container">
  {data && (
    <>
      <button>
        <h3>Restaurant Counts</h3>
        <span>{data.restaurant_counts}</span>
      </button>
      <button>
        <h3>Total Orders</h3>
        <span>{data.total_orders}</span>
      </button>
      <button>
        <h3>Overall Ratings</h3>
        <span>{data.overall_ratings}</span>
      </button>
      <button>
        <h3>Total Countries</h3>
        <span>{data.total_countries}</span>
      </button>
      <button>
        <h3>Total Votes</h3>
        <span>{data.total_votes}</span>
      </button>
      <button>
        <h3>Total Cities</h3>
        <span>{data.total_cities}</span>
      </button>
    </>
  )}
</div>

    </header>
  );
};

export default Header;
