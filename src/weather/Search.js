/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Spinner from '../components/Spinner';
import ErrorContainer from '../components/ErrorContainer';
import useWeatherSearch from '../hooks/useWeatherSearch';
import { Global, css } from '@emotion/react';
import background from "../assets/background3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSmog, faClock, faLocationDot, faTemperatureHigh,faTemperatureLow, faDroplet, faCalendar} from "@fortawesome/free-solid-svg-icons";

import Moment from 'moment';

function Search({ query }) {
  const [ inputQuery, setInputQuery ] = useState(query || "");
  const [ searchParams, setSearchParams ] = useSearchParams()

  const [ forecasts, loading, error ] = useWeatherSearch(query);
  
  

  const main = css`
    background-size: cover;
    height: 100%;
    width: 100%;
    position: relative;
    
  `;
  const textbox = css`
    color: #7881A1;
    font-size: 2.4rem;
    vertical-align: middle;
    transition: color .25s;
    opacity: 0.6;
  `;

  const header = css`
    background-color: #6495ED;
    border-radius: 15px;
    border: 4px solid #D3D3D3;
    color: white;
    text-align: center;
    font-family: FreeMono, monospace;
    opacity: 0.8;
  `;

  const data_container = css`
    border: 3px solid #D3D3D3;
    border-radius: 25px;
    border-color:; 'lightgray';
    background-color: #6495ED;
    opacity: 0.8;
    height: 350px;
    width:500px;
    display:inline-block
    
    

  `;

  const center = css`
    text-align: center;
    color: white;
    font-family: FreeMono, monospace;
  `;

  const loc_date = css`
//   text-align: center;
  color: white;
  font-family: FreeMono, monospace;
  font-size: 15px;

  `;
  const date = css`
//   text-align: right;
  color: white;
  font-family: FreeMono, monospace;
  font-size: 15px;
  padding-top: 15px;
  `;

  const weather_info = css`
    // text-align: center;
    color: white;
    font-family: FreeMono, monospace;
    font-size: 15px;
    padding-top: 15px;
    `;

    const iconPadding = css`
    padding-left: 30px;
    padding-right: 10px;
    `;

    const description = css`
    padding-top: 30px;
    font-family: FreeMono, monospace;
    font-size: 23px;
    
    `;


  return (
    <div css = {main}  style= {{ backgroundImage: `url(${background})` } }  >
        <div css = {header}>
            <h1>WeatherPointer <FontAwesomeIcon icon={faSmog} /></h1>
        <div css= {textbox}>
      <form onSubmit={(e) => {
        e.preventDefault();
        setSearchParams({ q: inputQuery })
      }}>
        <input value={inputQuery} placeholder="Search City"onChange={e => setInputQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div css = {center}>
          {forecasts.map(forecast => <p>
              <div css = {data_container}>
               {/* Referenced this to get weather images: https://stackoverflow.com/questions/46609385/passing-reactjs-variable-to-image-and-link-tags    */}
              <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}></img>
                  <div css = {loc_date}>
                    <h2 ><FontAwesomeIcon icon={faLocationDot} /> {query}</h2>
                    <h2 css = {date}><FontAwesomeIcon icon={faCalendar} /> {Moment(forecast.dt_txt).format('MMM DD, YYYY ha z')}</h2>
                    </div>
                    <div css = {weather_info}>
                    <FontAwesomeIcon icon={faTemperatureHigh} css = {iconPadding}/>{forecast.main.temp_max}
                    <FontAwesomeIcon icon={faTemperatureLow} css = {iconPadding}/>{forecast.main.temp_min}
                    <FontAwesomeIcon icon={faDroplet} css = {iconPadding}/>{forecast.pop}
                    </div>
                    <div css = {description}>
                   {forecast.weather[0].description}
                    </div>
              </div>
              </p>)}
          
        </div>
        
      )}
      {error && <ErrorContainer>Error!</ErrorContainer>}
      <footer css = {header}>
      <p>Author:Jacob Urenda Garibay</p>
      </footer>
    </div>
    
  );
}

export default Search;