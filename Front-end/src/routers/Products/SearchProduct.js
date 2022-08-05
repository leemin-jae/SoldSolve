import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"
import { Navbar } from 'react-bootstrap';

function SearchProduct() {
    const [searchData, setSearchData] = useState([]);
    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(
                `/api/product`,
                {
                    params: {
                        title : params.title,
                        category : params.category
                    }
                }
            );
            setSearchData(result.data.result);
            console.log(searchData);
            console.log(result)
        }
        fetchData();
    }, []);
    return (
        <>
        <Navbar />
        <div>{params.title}</div>
        </>
    )
}

export default SearchProduct