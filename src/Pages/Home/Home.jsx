import React, { useContext, useEffect, useState } from 'react';
import { Coindata } from '../../Context/Context';
import { Link } from 'react-router-dom';

const Home = () => {
  // Access global coin data and currency from context
  const { allCoin, currency } = useContext(Coindata);

  // Local state for filtered/displayed coins and search input
  const [display, setDisplay] = useState([]);
  const [input, setInput] = useState('');

  // When allCoin changes, update display list
  useEffect(() => {
    setDisplay(allCoin);
  }, [allCoin]);

  // Handle input change and update local input state
  const inputHandler = (e) => {
    setInput(e.target.value);

    // If input is cleared, show all coins again
    if (e.target.value === '') {
      setDisplay(allCoin);
    }
  };

  // On form submit, filter coins that match the input text
  const submitHandler = async (e) => {
    e.preventDefault();

    const filteredCoins = allCoin.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setDisplay(filteredCoins);
  };

  return (
    <>
      {/* Main container */}
      <div className="flex flex-col items-center max-w-full mx-auto text-center gap-8 px-4 mt-16">

        {/* Heading */}
        <div className="flex flex-col font-bold text-3xl md:text-6xl lg:text-8xl">
          <h1>Largest</h1>
          <h1>Crypto Marketplace</h1>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 max-w-[500px] dark:text-gray-300">
          Welcome to the world’s largest cryptocurrency marketplace.
          Sign up to explore more about cryptos.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-[600px] mt-6">
          <form onSubmit={submitHandler} className="relative" aria-label="Search Crypto Form">
            {/* Search input connected to datalist */}
            <input
              list="crypto-suggestions"
              onChange={inputHandler}
              value={input}
              type="text"
              required
              placeholder="Search crypto"
              className="w-full py-3 px-4 pr-[120px] rounded-md bg-amber-50 text-black text-lg outline-none"
              aria-label="Search Crypto"
            />

            {/* Datalist with suggestions */}
            <datalist id="crypto-suggestions">
              {allCoin.map((item, index) => (
                <option key={index} value={item.name} />
              ))}
            </datalist>

            {/* Submit button */}
            <button
              type="submit"
              className="absolute right-1 inset-y-1 bg-violet-800 text-white rounded-md font-semibold text-md hover:bg-violet-700 px-4 py-2"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Table Section */}
      <div className="container max-w-[1000px] mx-auto mt-10 overflow-x-auto px-2">

        {/* Table Header */}
        <div className="min-w-[700px] grid grid-cols-5 px-6 py-2 bg-gray-800 text-white rounded-md font-semibold text-sm">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p>24H Change</p>
          <p>Market Cap</p>
        </div>

        {/* Table Rows */}

  {/* Table Rows */}
{display.length === 0 ? (
  <div className="text-center text-red-500 mt-6 text-2xl md:text-4xl font-medium">
    ❌ Sorry, no cryptocurrency found with that name 404 Not Found.
  </div>
) : (
  display.slice(0, 12).map((item, index) => (
    <Link to={`/coin/${item.id}`} key={item.id}>
      <div
        className="min-w-[700px] grid grid-cols-5 items-center px-6 py-4 text-sm border-b border-gray-600 text-white"
      >
        <p>{index + 1}</p>
        <div className="flex items-center gap-3">
          <img src={item.image} alt={item.name} className="w-6 h-6" />
          <span>
            {item.name}
            <span className="uppercase text-gray-400"> ({item.symbol})</span>
          </span>
        </div>
        <p>{currency.symbol}{item.current_price}</p>
        <p
          className={`font-semibold ${
            item.price_change_percentage_24h > 0
              ? 'text-green-500'
              : 'text-red-500'
          }`}
        >
          {item.price_change_percentage_24h?.toFixed(2)}%
        </p>
        <p>{currency.symbol}{item.market_cap.toLocaleString()}</p>
      </div>
    </Link>
  ))
)}

        </div>
        

   
    </>
  );
};

export default Home;
