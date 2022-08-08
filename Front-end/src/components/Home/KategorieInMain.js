import { useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';

function KategorieInMain() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
          `/api/product`
      );
      console.log(result)
      setData(result.data.slice(0, 6));
      setLoading(false)
    }
    fetchData();
    console.log(data)
    }, []);


    const Loading = () => {
      return (
        <>
          Loading...
        </>
      );
    };
  
  
  
    const ShowNew = () => {
      return (
        <>
          {data.map((product) => {
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
    <div className="content">
      <div className='hometext'><h4>NEW ARRIVAL</h4></div>
      <ul className='cards' id='maincontent'>
          {loading ? <Loading /> : <ShowNew />}
        </ul>
    </div>
    <div className="content">
      <div className='hometext'><h4>HOT ITEMS</h4></div>
      <ul className='cards' id='maincontent'>
          {loading ? <Loading /> : <ShowNew />}
        </ul>
    </div>
    </>
  )
}

export default KategorieInMain;