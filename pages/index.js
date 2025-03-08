import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    async function fetchDeals() {
      try {
        const response = await fetch('/api/deals'); // Replace with actual API
        const data = await response.json();
        
        // Filter deals that have at least 15% discount
        const filteredDeals = data.filter(deal => deal.discountPercentage >= 15);
        
        setDeals(filteredDeals);
      } catch (error) {
        console.error('Error fetching deals:', error);
      }
    }
    
    fetchDeals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <Head>
        <title>Deal Fetch | Find the Best Deals</title>
      </Head>
      
      <h1 className="text-4xl font-bold text-gray-800 mb-4">🔥 Welcome to Deal Fetch</h1>
      <p className="text-lg text-gray-600 mb-6">Find the best deals in real-time from Lowe's and Home Depot.</p>
      
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-700 mb-6">
        Start Tracking Deals Now
      </button>
      
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top Deals (15%+ Off)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deals.length > 0 ? deals.map((deal, index) => (
            <div key={index} className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">{deal.name}</h3>
              <p className="text-red-600 font-bold">{deal.discountPercentage}% Off</p>
              <p className="text-gray-600">Current Price: ${deal.currentPrice}</p>
              <a href={deal.url} target="_blank" className="text-blue-500 hover:underline">
                View Deal
              </a>
            </div>
          )) : <p className="text-gray-600">No deals available.</p>}
        </div>
      </div>
    </div>
  );
}
