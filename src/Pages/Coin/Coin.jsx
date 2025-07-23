import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Coindata } from '../../Context/Context';

const Coin = () => {
  const { id } = useParams();
  const { currency } = useContext(Coindata);
  const [Coinddata, Setcoindta] = useState(null); // null instead of []


 


  const fetchdata = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-JuGes1FhBSwAywdpS2dUrDXa',
      },
    };

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=true&tickers=true`,
        options
      );
      const data = await res.json();
      console.log('fetch data in coin.jsx', data);
      Setcoindta(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [currency]);

  // ✅ Show spinner if data is not yet fetched
  if (!Coinddata) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-dashed border-violet-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // ✅ Once data is available
  return (
    <div className="p-4 h-screen flex flex-col gap-6 items-center justify-center">
      <h1 className="text-xl font-bold text-violet-700">Coin: {Coinddata.name}</h1>
      <img src={Coinddata.image.large} alt={Coinddata.name} className="w-24 h-24 my-4" />
      
      <p className="text-gray-600 dark:text-gray-300 text-center w-[40%]">{Coinddata.description.en?.slice(0, 300)}...</p>
    </div>
  );
};

export default Coin;
