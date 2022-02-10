import { useState, useEffect } from "react";
import moment from "moment";

const Clima = ({ region }) => {
  const [dataResponse, setDataResponse] = useState({
    weather: "",
    icon: "",
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
    visibility: 0,
    windsSpeed: 0,
    sunrise: "",
    sunset: "",
  });

  const round = (num) => {
    return Math.round(num * 100) / 100;
  };
  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?${region}&appid=12f79219938e1bf1c3a59af0fca96d62`
    )
      .then((response) => response.json())
      .then((data) => {
        const obj = {
          weather: data?.weather[0].main,
          icon: data?.weather[0].icon,
          temp: round(data?.main.temp - 273.15),
          feels_like: round(data?.main.feels_like - 273.15),
          pressure: data?.main.pressure,
          temp_min: round(data?.main.temp_min - 273.15),
          temp_max: round(data?.main.temp_max - 273.15),
          humidity: data?.main.humidity,
          visibility: data?.visibility,
          windSpeed: data?.wind.speed,
          sunrise: moment(data?.sys.sunrise * 1e3).format("hh:mm a"),
          sunset: moment(data?.sys.sunset * 1e3).format("hh:mm a"),
        };
        setDataResponse((state) => ({
          ...state,
          weather: obj.weather,
          icon: obj.icon,
          temp: obj.temp,
          feels_like: obj.feels_like,
          temp_min: obj.temp_min,
          temp_max: obj.temp_max,
          pressure: obj.pressure,
          humidity: obj.humidity,
          visibility: obj.visibility,
          windSpeed: obj.windSpeed,
          sunrise: obj.sunrise,
          sunset: obj.sunset,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [region]);

  return (
    <div>
      <div>Tiempo: {dataResponse.weather}</div>
      {dataResponse.icon ? (
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${dataResponse.icon}@2x.png`}
          />
        </div>
      ) : null}
      <div style={{ padding: 10 }}>Temperatura: {dataResponse.temp} °C</div>
      <div style={{ padding: 10 }}>
        Sensación Térmica: {dataResponse.feels_like} °C
      </div>
      <div style={{ padding: 10 }}>
        Temperatura Mínima: {dataResponse.temp_min} °C
      </div>
      <div style={{ padding: 10 }}>
        Temperatura Máxima: {dataResponse.temp_max} °C
      </div>
      <div style={{ padding: 10 }}>Presión: {dataResponse.pressure} hPa</div>
      <div style={{ padding: 10 }}>Humedad: {dataResponse.humidity} %</div>
      <div style={{ padding: 10 }}>
        Visibilidad: {dataResponse.visibility} metros
      </div>
      <div style={{ padding: 10 }}>
        Velocidad de viento: {dataResponse.windSpeed} m/s
      </div>
      <div style={{ padding: 10 }}>Amanecer: {dataResponse.sunrise}</div>
      <div style={{ padding: 10 }}>Atardecer: {dataResponse.sunset}</div>
    </div>
  );
};

export default Clima;
