import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"
import NavBar from '../../components/NavBar';
import NoItem from '../../components/NoItem';

import CardActions from '@mui/material/CardActions';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';

import SearchBar from './SearchBar';
import LikeButton from '../Products/LikeButton';
import LiveButton from '../Products/LiveButton';

function SearchProduct() {
    const [searchData, setSearchData] = useState([]);
    const [oksearch, setOkSearch] = useState(false);
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
            if (result.data.length === 0) {
                const allData = await axios.get(`/api/product`);
                setSearchData(allData.data.reverse())
            } else {
                setSearchData(result.data.reverse())
                setOkSearch(true)
            }
        }
        fetchData();
    }, []);

    const [keywords, setKeywords] = useState(
        JSON.parse(localStorage.getItem('keywords') || '[]'),
    )

    useEffect(() => {
        localStorage.setItem('keywords', JSON.stringify(keywords))
    }, [keywords])

    const handleAddKeyword = (text) => {
        const newKeyword = {
            id: Date.now(),
            text: text,
        }
        setKeywords([newKeyword, ...keywords])
    }

    const NoSearchItem = () => {
        return (
            <div style={{ textAlign: 'center' }}>
                <h5>검색결과가 없습니다</h5>
            </div>
        )
    }

    const ShowProducts = () => {
        return (
            <>
                {searchData ?
                    <>
                        {searchData.map((product) => {
                            let mainImg = null;
                            if (product.productImg.length > 0) {
                                mainImg = 'https://i7c110.p.ssafy.io' + product.productImg[0].path
                            }
                            let pTitle = null;
                            if (product.title.length > 8) {
                                pTitle = product.title.substr(0, 8) + "...";
                            } else {
                                pTitle = product.title
                            }


                            let price = product.price
                            const productPrice = price.toLocaleString('ko-KR');
                            return (

                                <li className='cards_item' key={product.no}>
                                    <div className='card'>
                                        <a href={`/product/${product.no}`}>
                                            {product.state ?
                                                <div style={{ height: '170px' }}>
                                                    <img className='card_image'
                                                        src={mainImg}
                                                        alt={product.title}
                                                        style={{ opacity: '70%', width: '100%', height: '170px' }}
                                                    />
                                                    <h1 style={{ marginTop: '-100px', color: '#6667ab' }}>판매 완료</h1>
                                                </div>
                                                :
                                                <img className='card_image'
                                                    src={mainImg}
                                                    alt={product.title}
                                                    style={{ height: '170px', width: '100%' }}
                                                />
                                            }
                                            <div className='card_content'>
                                                <h5 className='card_title'>{pTitle}</h5>
                                                <p className='card_text'>{productPrice} 원</p>
                                            </div>

                                        </a>
                                        <CardActions disableSpacing sx={{ justifyContent: 'space-around', marginTop: "-10px" }}>
                                            <LikeButton no={product.no} />
                                            <LiveButton no={product.no} />
                                            <IconButton aria-label="share" onClick={function () { alert('링크가 복사되었습니다.') }} >
                                                <CopyToClipboard text={`https://i7c110.p.ssafy.io/product/` + product.no}>
                                                    <ShareIcon />
                                                </CopyToClipboard>
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
            <div className='fixnav'>
                <NavBar />
            </div>
            <SearchBar onAddKeyword={handleAddKeyword}></SearchBar>
            <div className='content'>
                {oksearch ? <></> : <NoSearchItem />}
                <ul className='cards' id='maincontent'>
                    {<ShowProducts />}
                </ul>
            </div>
        </>
    )
}

export default SearchProduct