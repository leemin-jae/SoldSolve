import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"
import NavBar from '../../components/NavBar';


function SearchProduct() {
    const [searchData, setSearchData] = useState([]);
    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(
                `/api/product`,
                {
                    params: {
                        title: params.title,
                        category: params.category
                    }
                }
            );
            setSearchData(result.data);
            console.log(searchData);
            console.log(result.data)
        }
        fetchData();
    }, []);

    const ShowProducts = () => {
        return (
            <>
                {searchData.map((product) => {
                    return (

                        <li className='cards_item' key={product.id}>
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

                    );
                })}
            </>
        );
    };

    return (
        <>
            <NavBar />
            <div className='content'>
                <ul className='cards' id='maincontent'>
                    {<ShowProducts />}
                </ul>
            </div>
        </>
    )
}

export default SearchProduct