import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags,population,cca3';

export const useCountries = () => {

    const [ countries, setCountries ] = useState([]);
    const [ filteredCountries, setFilteredCountries ] = useState([]);
    const [ filter, setFilter ] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        const getCountries = async () =>  {
            setLoading(true);
            try {
                const response = await axios.get(API_URL);
                setCountries(response.data);
                setFilteredCountries(response.data);

            } catch (error) {
                if ( error.response && error.response.status === 404 ) {
                    setError("País no encontrado")
                } else {
                    setError('Error al obtener los países.');
                }
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };

        getCountries();
    }, []);

    useEffect(() => {
        if ( filter.trim() === '' ) {
            setFilteredCountries(countries);
        } else {
            const filtered = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()));
            setFilteredCountries(filtered);
        }
    }, [filter, countries])

    const handleInputChange = (e) => {
        setFilter(e.target.value);
    }

    return {
        countries: filteredCountries,
        loading,
        error,
        setError,
        handleInputChange,
        filter
    }
    
}