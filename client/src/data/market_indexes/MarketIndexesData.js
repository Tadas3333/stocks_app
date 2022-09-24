import { useState, useEffect } from 'react';
import URL from 'data/url/URL';

export default function useMarketIndexesData() {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        try {
            fetch(URL.prepareURL("get_prices_of_indexes"))
            .then(res => res.json())
            .then(data => {
                setData(data);
            });
        } catch(err) {
            console.log(err);
        };
    }, []);
    
    return data;
}