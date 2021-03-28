import React, { useState } from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export const AppDateTime = (props) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(null);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const Unix_timestamp = (t) => {
    var dt = new Date(t * 1000);
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    var s = "0" + dt.getSeconds();
    return hr + ":" + m.substr(-2) + ":" + s.substr(-2);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === "ios");
    setDate(currentDate);

    // const today = new Date();
    // if (currentDate.getDate() === today.getDate()) {
    //   alert("today is the day!");
    // }
    console.log(formatDate(currentDate));
    console.log(formatTime(currentDate));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const formatDate = (newDate) => {
    const d = new Date(newDate);

    return (
      ("0" + d.getDate()).slice(-2) +
      "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      d.getFullYear()
    );
  };

  const formatTime = (newTime) => {
    const t = new Date(newTime);
    return (
      ("0" + t.getHours()).slice(-2) + ":" + ("0" + t.getMinutes()).slice(-2)
    );
  };

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      {show && (
        <DateTimePicker
          format="DD-MM-YYYY HH:mm"
          is24Hour={true}
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
