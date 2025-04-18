import React, { useEffect, useState } from 'react'
import { getAllProperties } from '../services/operations/propertyAPI'
import { locationsData, propertyTypes } from '../../utils/constants'
import Spinner from '../Components/Spinner';

const Home = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [locationFilter, setLocationFilter] = useState('')
  const [minPriceFilter, setMinPriceFilter] = useState(0)
  const [maxPriceFilter, setMaxPriceFilter] = useState(10000)
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('')

  const fetchAllProps = async () => {
    const response = await getAllProperties()
    if (response?.length) {
      setData(response)
      setFilteredData(response)
    }
  }

  useEffect(() => {
    fetchAllProps()
  }, [])

  useEffect(() => {
    applyFilters();
  }, [locationFilter, minPriceFilter, maxPriceFilter, propertyTypeFilter])

  const applyFilters = () => {
    const filteredProperties = data.filter(property => {
      const lowerCasedPropertyType = property.typeOfProperty.toLowerCase()
      const lowerCasedFilter = propertyTypeFilter.toLowerCase()

      return (
        (locationFilter === '' || property.location === locationFilter) &&
        (property.price >= minPriceFilter && property.price <= maxPriceFilter) &&
        (propertyTypeFilter === '' || lowerCasedPropertyType === lowerCasedFilter)
      )
    })
    setFilteredData(filteredProperties)
  }
  const [showSpinner, setShowSpinner] = useState(true)
    const [showError, setShowError] = useState(false)
    useEffect(() => {
      const timeOutId = setTimeout(() => {
        setShowSpinner(false)
        setShowError(true)
      }, 10000)
      return () => clearTimeout(timeOutId)
  }, [])

  return (
    <div className='p-5'>
      <p className='text-4xl font-medium text-center'>List of Available Properties</p>
      <p className='mt-5 lg:mt-0 text-2xl mb-5 font-normal'>Filters</p>
      <div className='flex flex-wrap gap-5 border border-black px-3 p-2 shadow-sm rounded-lg'>
        <label className='flex border shadow-sm rounded-lg p-3 items-center gap-5'>
          <p className='font-medium text-lg'>Location: </p>
          <select className='border px-3 rounded-lg shadow-sm p-2' value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
            <option value=''>All</option>
            {locationsData.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
        <div className='flex gap-2 shadow-sm border p-3 rounded-lg'>
          <label className='flex items-center'>
            <p className='font-medium text-lg'>Min Price: ₹</p>
            <input
              className='border px-3 p-2 rounded-lg'
              type='number'
              min={0}
              max={9999}
              value={minPriceFilter}
              onChange={e => setMinPriceFilter(Number(e.target.value))}
            />
          </label>
          <label className='flex items-center'>
            <p className='font-medium text-lg'>Max Price: ₹</p>
            <input
              className='border px-3 p-2 rounded-lg'
              type='number'
              min={0}
              max={10000}
              value={maxPriceFilter}
              onChange={e => setMaxPriceFilter(Number(e.target.value))}
            />
          </label>
        </div>
        <label className='flex items-center shadow-sm gap-5 p-3 border rounded-lg'>
          <p className='font-medium text-lg'>Property Type:</p>
          <select className='border px-3 rounded-lg shadow-sm p-2' value={propertyTypeFilter} onChange={e => setPropertyTypeFilter(e.target.value)}>
            <option value=''>All</option>
            {propertyTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>
      {!filteredData.length ?
          (
            <>
              {showSpinner && <Spinner/>}
              {showError && (
                <div className='flex flex-col items-center justify-center'>
                  <p className='text-center mt-14 lg:mt-28 text-xl'>⚠️ No Data Found with these Filters</p>
                </div>
              )}
            </>
          ) :
      (
      <div className='flex flex-wrap gap-4 mt-10 justify-center lg:justify-start'>
        {
          filteredData.map(prop => (
            <div key={prop?._id} className='border w-11/12 md:w-fit min-w-[297px] shadow-md items-start flex flex-col gap-3 p-6 hover:shadow-xl transition-all duration-200 cursor-pointer rounded-lg'>
              <p className='text-xl font-medium'>{prop?.name}</p>
              <p className='text-lg'>Rent: <span className='text-blue-700 text-lg font-medium'>₹{prop?.price}</span><span className='text-black font-normal text-sm'> /month</span></p>
              <p className='text-lg'>Location: <span className='font-medium text-red-950'>{prop?.location}</span></p>
              <div className='flex gap-3'>
                <p>BedRooms: <span className='font-semibold text-red-700'>{prop?.bedRooms}</span></p>
                <p>Halls: <span className='font-semibold text-red-700'>{prop?.hallRooms}</span></p>
              </div>
              <p>Residential Type: <span className='text-lg font-semibold text-green-700'>{prop?.typeOfProperty}</span></p>
            </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default Home