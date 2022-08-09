import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"
import NavBar from '../../components/NavBar';
import NoItem from '../../components/NoItem';

import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';

import SearchBar from './SearchBar';

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
            setSearchData(result.data)
            console.log(searchData);
            console.log(result.data)
        }
        fetchData();
    }, []);

    const ShowProducts = () => {
        return (
            <>
                {searchData ?
                    <>
                        {searchData.map((product) => {
                            return (

                                <li className='cards_item' key={product.no}>
                                    <div className='card'>
                                        <a href={`/product/${product.no}`}>
                                            <img className='card_image'
                                                src={product.image}
                                                alt={product.title}
                                            />
                                            <div className='card_content'>
                                                <h5 className='card_title'>{product.title}</h5>
                                                <p className='card_text'>{product.price}</p>
                                            </div>

                                        </a>
                                        <CardActions disableSpacing sx={{ justifyContent: 'space-around' }}>
                                            <IconButton aria-label="add to favorites">
                                                <FavoriteIcon />
                                            </IconButton>
                                            <IconButton aria-label="share">
                                                <ShareIcon />
                                            </IconButton>
                                        </CardActions>
                                    </div>
                                </li>

                            );
                        })}
                    </>
                    :
                    <>
                        <NoItem></NoItem>
                    </>
                }

            </>
        );
    };

    return (
        <>
            <NavBar />
            <SearchBar></SearchBar>
            <div className='content'>
                <ul className='cards' id='maincontent'>
                    {<ShowProducts />}
                </ul>
            </div>
        </>
    )
}

export default SearchProduct