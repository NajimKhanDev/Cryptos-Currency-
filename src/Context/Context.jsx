import React, { createContext, useEffect, useState } from 'react';

export const Coindata = createContext();

const Context = ({ children }) => {
  const [allCoin, setcoin] = useState([]);
  const [currency, setcurrency] = useState({
    name: 'usd',
    symbol: '$',
  });

  const fetchdata = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': 'CG-JuGes1FhBSwAywdpS2dUrDXa',
          },
        }
      );

      const data = await res.json();
      setcoin(data);
      console.log("Fetched Coin Data:", data[0]);
    } catch (err) {
      console.error('Error fetching coin data:', err);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [currency]);

  const changevalue = {
    currency,
    setcurrency,
    allCoin,
  };

  return (
    <Coindata.Provider value={changevalue}>
      {children}
    </Coindata.Provider>
  );
};

export default Context;
