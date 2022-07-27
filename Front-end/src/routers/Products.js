import React, { useEffect, useState } from 'react'

function Products() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        let componentMounted = true;
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("상품리스트api");
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
    }, );

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
        filterProduct("bag")
        return (
            <>
                {filter.map((product) => {
                    return (
                        <>
                            <div key={product.id}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                />
                                <div>
                                    {product.subscribed}
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
            <div className=''>
                {loading ? <Loading /> : <ShowProducts />}
            </div>
        </>
    );
}

export default Products