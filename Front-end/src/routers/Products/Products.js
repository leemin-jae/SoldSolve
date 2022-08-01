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
    filterProduct("electronics")
    return (
      <>
        {filter.map((product) => {
          return (
            <>
              <div className='ProductCard_wrap' key={product.id}>
                <img className='ProductCard_img'
                  src={product.image}
                  alt={product.title}
                />
                <div className='ProductCard_text'>
                  {product.title}
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <>
      <NavBar />
      <div className='InfiniteScroll_wrap' id='maincontent'>
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </>
  );
}

export default Products