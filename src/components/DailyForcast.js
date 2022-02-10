import { useState, useEffect } from "react";
import moment from "moment";
import Div from "./Div";

const DailyForcast = ({ region }) => {
  const [dataResponse, setDataResponse] = useState([]);

  const round = (num) => {
    return Math.round(num * 100) / 100;
  };
  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?${region}&appid=12f79219938e1bf1c3a59af0fca96d62`
    )
      .then((response) => response.json())
      .then((data) => {
        const obj = [];
        var startDate = moment(new Date()).add(1, "day").format("DD-MM-YYYY");
        var day = moment(new Date()).add(1, "day").format("DD-MM-YYYY");
        if (data.list.length > 0) {
          for (var i = 0; data?.list.length; i++) {
            day = moment(data?.list[i].dt * 1e3).format("DD-MM-YYYY");
            if (day === startDate) {
              obj.push({
                day: day,
                weather: data?.list[i].weather[0].main,
                icon: data?.list[i].weather[0].icon,
                pressure: data?.list[i].main.pressure,
                temp_min: round(data?.list[i].main.temp_min - 273.15),
                temp_max: round(data?.list[i].main.temp_max - 273.15),
                humidity: data?.list[i].main.humidity,
                visibility: data?.list[i].visibility,
                windSpeed: data?.list[i].wind.speed,
              });
              startDate = moment(startDate, "DD-MM-YYYY")
                .add(1, "day")
                .format("DD-MM-YYYY");
              setDataResponse({ ...dataResponse, obj });
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [region]);

  if (JSON.stringify(dataResponse).length > 2) {
    return (
      <div>
        {dataResponse !== undefined ? (
          <div style={{ display: "flex" }}>
            <Div padding={5} dataResponse={dataResponse} num={0} />
            <Div padding={5} dataResponse={dataResponse} num={1} />
            <Div padding={5} dataResponse={dataResponse} num={2} />
            <Div padding={5} dataResponse={dataResponse} num={3} />
            <Div padding={5} dataResponse={dataResponse} num={4} />
          </div>
        ) : null}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DailyForcast;
