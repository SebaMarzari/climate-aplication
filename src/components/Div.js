const Div = ({ padding, dataResponse, num }) => {
  const data = [];
  const round = (num) => {
    return Math.round(num * 100) / 100;
  };
  data.push({
    day: dataResponse.obj[num]?.day,
    weather: dataResponse.obj[num]?.weather,
    icon: dataResponse.obj[num]?.icon,
    pressure: dataResponse.obj[num]?.pressure,
    temp_min: round(dataResponse.obj[num]?.temp_min),
    temp_max: round(dataResponse.obj[num]?.temp_max),
    humidity: dataResponse.obj[num]?.humidity,
    visibility: dataResponse.obj[num]?.visibility,
    windSpeed: dataResponse.obj[num]?.windSpeed,
  });

  return (
    <div>
      <div>{data[0].day}</div>
      <div>Tiempo: {data[0].weather}</div>
      {data[0].icon ? (
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${data[0].icon}@2x.png`}
          />
        </div>
      ) : null}
      <div style={{ padding: padding }}>
        Temperatura Mínima: {data[0].temp_min} °C
      </div>
      <div style={{ padding: padding }}>
        Temperatura Máxima: {data[0].temp_max} °C
      </div>
      <div style={{ padding: padding }}>Presión: {data[0].pressure} hPa</div>
      <div style={{ padding: padding }}>Humedad: {data[0].humidity} %</div>
      <div style={{ padding: padding }}>
        Visibilidad: {data[0].visibility} metros
      </div>
      <div style={{ padding: padding }}>
        Velocidad de viento: {data[0].windSpeed} m/s
      </div>
    </div>
  );
};

export default Div;
