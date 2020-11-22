import React, { useState, useEffect } from "react";
import Switch from "@material-ui/core/Switch";
import axios from "axios";
// import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

export default function Appp() {

  const [room, setroom] = useState(1);
  const [Switchs, setSwitchs] = useState([]);
  const marks = [
    {
      value: 0,
      label: "0 %",
    },
    {
      value: 100,
      label: "100 %",
    },
  ];
  useEffect(() => {
    var url = "https://smarthome-bu.online/device";
    axios
      .get(url, { headers: { id: room } })
      .then((res) => {
        setSwitchs(res.data);
      })
      .catch((error) => {
        console.log(error.res);
      });
  }, [Switchs]);

  const handleChange = (event) => {
    var stringValue = event.target.checked;
    var boolValue = stringValue === true ? "true" : "false";
    let url = "https://smarthome-bu.online/device/update";
    var data = {
      room_id: room,
      status: boolValue,
      device_id: event.target.value,
    };
    axios.post(url, data).catch((error) => {
      console.log(error.res);
    });
  };

  const handleSliderChange = (event, newValue) => {
    var data = {
      room_id: room,
      dim: newValue,
      device_id: event.target.offsetParent.id,
    };
    console.log(data)
    let url = "https://smarthome-bu.online/device/update/dim";
    axios.post(url, data).catch((error) => console.log(error));
  };
  return (
    <div>
      {Switchs.map((item, i) => {
        var stringValue = item.status;
        var boolValue = stringValue.toLowerCase() === "true" ? true : false;
        return (
          <div key={i} style={{ width: "400px",margin:"30px" }}>
            <Switch
              checked={boolValue}
              onChange={handleChange}
              value={item.device_id}
            />
            <Slider
            disabled={!boolValue}
              valueLabelDisplay="auto"
              aria-labelledby="non-linear-slider"
              defaultValue={Number(item.dim)}
              marks={marks}
              onChange={handleSliderChange}
              id={item.device_id}
              step={1}
            />
          </div>
        );
      })}
    </div>
  );
}
