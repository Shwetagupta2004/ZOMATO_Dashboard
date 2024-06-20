import React from 'react';
import {
  BarChart, Bar, PieChart,Pie, XAxis, YAxis, Tooltip, CartesianGrid,Cell, ResponsiveContainer,AreaChart, Area
} from 'recharts';
import './ChartSection.css';

const COLORS = ['#FF5733', '#FF7657', '#FF9D8F', '#FFC1B5', '#FFDED0', '#FFEAE6', '#FFF5F3', '#FFFCFC'];



const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, value }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  return (
    <text
      x={x}
      y={y}
      fill="#4b4d4b"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={14}
    >
      {`${name} (${value})`}
    </text>
  );
};



const ChartSection = ({
  topLocations,
  ratingDistribution,
  topCuisines,
  countryOrder,
  avgRatingByCountry,
  onlineDeliveryDistribution,
  top5CountriesOrder,
  topCitiesOrder,
  voteDistributionByCountry,
  restaurantOnlineDelivery,
  priceRangeQcCuisines,
  bestRestaurantsVote,
  avgRatingByCuisine,
}) => {
  const bestRestaurantsData = Object.keys(bestRestaurantsVote).map(restaurant => ({
    name: restaurant,
    votes: bestRestaurantsVote[restaurant]
  }));
  const totalVotes = bestRestaurantsData.reduce((sum, restaurant) => sum + restaurant.votes, 0);
  const avgRatingByCuisineData = Object.keys(avgRatingByCuisine).map(cuisine => ({
    name: cuisine,
    value: avgRatingByCuisine[cuisine],
  }));

  return (

    <div className="chart-section">
      <div className="chart-container">
        <center><h3>Top Locations</h3></center>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topLocations} layout="vertical" margin={{ left: 45 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="City" />
            <Tooltip />
            <Bar dataKey="count" fill="#ff4757" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <center><h3>Overall Rating Distribution</h3></center>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ratingDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Aggregate Rating" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Count" fill="#ff4757" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <center><h3>Top Cuisines Order</h3></center>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={topCuisines}
              dataKey="count"
              nameKey="Cuisines"
              cx="50%"
              cy="50%"
              outerRadius={152}
              label={renderCustomLabel}
              labelLine={false}
            >
              {topCuisines.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #cccccc', borderRadius: '5px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <center><h3>Top Countries Order</h3></center>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={countryOrder}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Country" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Orders" fill="#ff4757" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <center><h3>Average Rating by Country</h3></center>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={avgRatingByCountry} layout="vertical" margin={{ left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="Country" />
            <Tooltip />
            <Bar dataKey="Aggregate rating" fill="#ff4757" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="chart-container">
        <center><h3>Vote Distribution by Country</h3></center>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={voteDistributionByCountry}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Country" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="Votes" stroke="#ff4757" fillOpacity={1} fill="rgba(255,71,87,0.4)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
      <center><h3>Online Delivery Counts</h3></center>
      <table style={{width: '80%',height: '50%',marginTop:'70px',marginLeft:'30px',borderCollapse: 'collapse', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'}}>
        <thead>
          <tr>
            <th style={{ padding: '14px', textAlign: 'center', backgroundColor: '#FF5C5C', color: 'white', fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>Online Delivery</th>
            <th style={{ padding: '14px', textAlign: 'center', backgroundColor: '#FF5C5C', color: 'white', fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ backgroundColor: '#f9f9f9' }}>
            <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>No</td>
            <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{onlineDeliveryDistribution.No}</td>
          </tr>
          <tr style={{ backgroundColor: '#f9f9f9' }}>
            <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Yes</td>
            <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{onlineDeliveryDistribution.Yes}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="chart-container">
        <center><h3>Average Rating by Cuisine</h3></center>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={avgRatingByCuisineData}
              dataKey="value"
              innerRadius={60}
              outerRadius={100}
              startAngle={90}
              endAngle={450}
              paddingAngle={5}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 1.2; // Adjusting the radius for label distance
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text
                    x={x}
                    y={y}
                    fill="#4b4d4b"
                    fontSize="13px" // Adjusting font size
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {avgRatingByCuisineData[index].name}
                  </text>
                );
              }}
              labelLine={false}
            >
              {avgRatingByCuisineData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>


    <div className="chart-container">
      <center><h3>Best Restaurants Vote Counts</h3></center>
          {bestRestaurantsData.map((entry, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '6px 0' }}>
              <span style={{ width: '120px', textAlign: 'right', paddingRight: '10px',color: '#4b4d4b' }}>{entry.name}</span>
              <div style={{ flex: 1, height: '20px', backgroundColor: '#f0f0f0', borderRadius: '5px', marginRight: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${(entry.votes / totalVotes) * 100}%`, height: '100%', backgroundColor: COLORS[index % COLORS.length], borderRadius: '5px' }}></div>
              </div>
              <span>{entry.votes} votes</span>
            </div>
          ))}
        </div>
      
    </div>
  );
};
export default ChartSection;
