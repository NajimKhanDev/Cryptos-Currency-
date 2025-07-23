import React, { useContext, useState } from 'react';
import { Coindata } from '../Context/Context';
import { FiAlignRight } from "react-icons/fi";
import { Link } from 'react-router-dom';


const Navbar = () => {
  const { currency, setcurrency } = useContext(Coindata);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onchangehandler = (e) => {
    const selected = e.target.value;
    switch (selected) {
      case 'USD':
        setcurrency({ name: 'usd', symbol: '$' });
        break;
      case 'INR':
        setcurrency({ name: 'inr', symbol: '₹' });
        break;
      case 'EUR':
        setcurrency({ name: 'eur', symbol: '€' });
        break;
      default:
        setcurrency({ name: 'usd', symbol: '$' });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <nav className="flex justify-between items-center py-4 text-white shadow-md relative">

        {/* Logo */}
        <Link to={`/`}>
        <div className="logo">
          <img src="src/assets/logo.png" alt="Logo" className="w-24" />
        </div>
</Link>
        {/* Desktop Menu */}
       <ul className="hidden md:flex gap-8 font-semibold text-sm">
  {["Home", "Feature", "Pricing", "Blog"].map((item, index) => (
    <li key={index}>
      <Link
        to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
        className="cursor-pointer hover:text-amber-400 transition"
      >
        {item}
      </Link>
    </li>
  ))}
</ul>


        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Currency Dropdown */}
          <select
            onChange={onchangehandler}
            value={currency.name.toUpperCase()}
            className="px-2 py-1 text-white text-sm w-10 md:w-20 rounded border-2 border-amber-100"
          >
            {["INR", "USD", "EUR"].map((item, index) => (
              <option className='text-black  bg-white '
              key={index} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Sign Up Button */}
          <button className="bg-zinc-200  text-black px-4 py-2 rounded flex items-center gap-2 hover:bg-violet-800 transition text-sm">
            Sign Up
            <img src="src/assets/arrow_icon.png" alt="arrow" className="w-4" />
          </button>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FiAlignRight/>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-pink-600 text-white flex flex-col items-center gap-4 py-4 z-50 md:hidden transition">
            {["Home", "Feature", "Pricing", "Blog"].map((item, index) => (
              <div key={index} className="cursor-pointer hover:text-amber-400 transition">
                {item}
              </div>
            ))}

            <select
              onChange={onchangehandler}
              value={currency.name.toUpperCase()}
              className="px-2 py-1 text-black rounded"
            >
              {["INR", "USD", "EUR"].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <button className="bg-violet-700 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-violet-900 transition">
              Sign Up
              <img src="src/assets/arrow_icon.png" alt="arrow" className="w-4" />
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
