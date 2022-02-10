import { useState, useEffect } from "react";
import Card from "./Card";
import Clima from "./Clima";
import DailyForcast from "./DailyForcast";
import "./Select.css";
import axios from "axios";

const Select = () => {
  const [value, setValue] = useState("");
  const [ip, setIp] = useState("");

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIp(res.data.IPv4);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    fetch(`http://ip-api.com/json/${ip}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        var latLong = "lat=" + data.lat + "&lon=" + data.lon;
        setValue(latLong);
      });
  }, [ip]);

  const handleChange = ({ target }) => {
    setValue(target.value);
  };
  return (
    <div>
      <select
        className="custom-select"
        value={value}
        name="select"
        onChange={handleChange}
      >
        <option value="">--Seleccione Region--</option>
        <option value="lat=-33.1236&lon=-64.3492">Rio Cuarto</option>
        <option value="lat=-31.417&lon=-64.183">Cordoba</option>
        <option value="lat=-34.615921&lon=-58.433449">Buenos Aires</option>
        <option value="lat=-40.809502&lon=-65.095512">Las Grutas</option>
        <option value="lat=-32.206640&lon=-64.400210">Embalse</option>
      </select>
      <Card>
        <div style={{ padding: 5 }}>
          <Clima region={value} />
        </div>
      </Card>
      <Card>
        {value ? (
          <div style={{ padding: 5 }}>
            <h3> Pronóstico 5 días </h3>
            <DailyForcast region={value} />
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default Select;
