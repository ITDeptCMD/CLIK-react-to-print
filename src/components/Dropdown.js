import React, {useState, useEffect} from 'react'
import axios from 'axios';

const Dropdown = ({api, data, onCitySelect }) => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        const getCity = async () => {
          try {
            const requestBody = {
                "Function" : "Daftar_119_208_408_kabupaten"
            };

            const response = await axios.post(api, requestBody);
            const citiesArray = Object.entries(response.data.success).map(([key, value]) => ({
                id: key,
                name: value
            }));
            setCities(citiesArray);
          } catch (error) {
            console.error('Error fetching addresses:', error);
          }
        };
    
        // Fetch addresses from the provided API endpoint
        getCity();
      }, [api]);

      const handleCityChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedCity(selectedValue);
    
        // Pass the selected city value to the parent component
        if (onCitySelect) {
          onCitySelect(selectedValue);
        }
      };

  return (
    <div>
        <select
        name={data}
        id={data}
        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
        value={selectedCity}
        onChange={handleCityChange}>
        <option value="">Select</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown

