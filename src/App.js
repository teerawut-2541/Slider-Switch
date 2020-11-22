import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Switch, Box, MdGraphicEq } from "@chakra-ui/react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
export default function App() {
  const [Sliders, setSliders] = useState();
  const [dim, setdim] = useState();
  const [Switchs, setSwitchs] = useState([]);
  const [dataswitchs, setdataswitchs] = useState([]);
  const handleChangedim = (event) => {
    console.log(event);
    console.log(Sliders);
    var data = {
      room_id: Sliders.room_id,
      dim: event,
      device_id: Sliders.device_id,
    };
    console.log(data)
    let url = "https://smarthome-bu.online/device/update/dim";
    axios.post(url,data).catch((error)=>console.log(error))
    setdim(event);
  };
  const handleChange = (event) => {
    var checkeds = "";
    if (event.target.checked) {
      var checkeds = "true";
    } else {
      var checkeds = "false";
    }
    let url = "https://smarthome-bu.online/device/update";
    var data = {
      room_id: dataswitchs.room_id,
      status: checkeds,
      dim: "0",
      device_id: dataswitchs.device_id,
    };
    axios.post(url, data).catch((error) => {
      console.log(error.res);
    });
  };

  useEffect(() => {
    var url = "https://smarthome-bu.online/device";
    axios
      .get(url, { headers: { id: 1 } })
      .then((res) => {
        setSwitchs(res.data);
      })
      .catch((error) => {
        console.log(error.res);
      });
  }, [Switchs]);
  return (
    <div>
      {Switchs.map((item, i) => {
        var stringValue = item.status;
        var boolValue = stringValue.toLowerCase() === "true" ? true : false;
        // console.log(status[0])
        return (
          <div key={i} style={{ width: "300px" }}>
            <Switch
              colorScheme="teal"
              size="lg"
              isChecked={boolValue}
              onClick={() => setdataswitchs(item)}
              onChange={handleChange}
              loading
              />
            <Slider
              defaultValue={item.dim}
              size="lg"
              max={100}
              min={0}
              isReadOnly={!boolValue}
              orientation="horizontal"
              onChangeEnd={() => setSliders(item,i)}
              onChange={handleChangedim}
            >
              <SliderTrack bg="red.600">
                <SliderFilledTrack bg="tomato" />
              </SliderTrack>
              <SliderThumb boxSize={4}>
                
                <Box color="tomato" />
              </SliderThumb>
            </Slider>
          </div>
        );
      })}
    </div>
  );
}
