import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar';
import './products.css'

function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    let componentMounted = true;
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
        console.log(filter);
      }

      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        Loading...
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  }

  const ShowProducts = () => {
    filterProduct("women's clothing")
    return (
      <>
        {data.map((product) => {
          return (
            <>
              <li className='cards_item'>
                <a href={`/products/${product.id}`} className='card'>
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
            </>
          );
        })}
      </>
    );
  };

  return (
    <>
      <NavBar />
      <div className='content'>
        <h1>옷</h1>
        <ul className='cards' id='maincontent'>
          {loading ? <Loading /> : <ShowProducts />}
        </ul>
      </div>
    </>
  );
}

export default Products
