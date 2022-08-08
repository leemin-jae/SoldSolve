import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import './products.css'


function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const location = useLocation().state.category;
  
  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      const result = await axios.get(
          `/api/product`
      );
      setData(result.data);
      setLoading(false)
      const updatedList = result.data.filter((x) => x.category === location)
      setFilter(updatedList);
    }
    fetchData();
    }, [location]);


  const Loading = () => {
    return (
      <>
        Loading...
      </>
    );
  };



  const ShowProducts = () => {
    return (
      <>
        {filter.map((product) => {
          return (
              <li className='cards_item' key={product.no}>
                <a href={`/product/${product.no}`} className='card'>
                <img className='card_image'
                  src={product.image}
                  alt={product.title}
                />
                <div className='card_content'>
                  <h5 className='card_title'>{product.title}</h5>
                  <p className='card_text'>{product.price}</p>
                </div>
                </a>
              </li>
            
          );
        })}
      </>
    );
  };

  return (
    <>
      <NavBar />
      <div className='content'>
        <h1>{location}</h1>
        <ul className='cards' id='maincontent'>
          {loading ? <Loading /> : <ShowProducts />}
        </ul>
      </div>
    </>
  );
}

export default Products
