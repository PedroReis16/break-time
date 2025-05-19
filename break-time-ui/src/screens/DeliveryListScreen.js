import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ScreenOrientation from "expo-screen-orientation";
import api from "../api";

export default function DeliveryListScreen() {
  const [date, setDate] = useState(new Date());
  const [deliveries, setDeliveries] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => ScreenOrientation.unlockAsync();
  }, []);

  const load = () => {
    const d = date.toISOString().split("T")[0];
    api.get(`/deliveries?date=${d}`).then((r) => setDeliveries(r.data));
  };

  return (
    <View style={{ padding: 16 }}>
      <Button
        title={`Selecionar Data: ${date.toLocaleDateString()}`}
        onPress={() => setShowPicker(true)}
      />
      {showPicker && (
        <DateTimePicker
          mode="date"
          value={date}
          onChange={(e, d) => {
            setShowPicker(false);
            if (d) setDate(d);
          }}
        />
      )}
      <Button title="Buscar Entregas" onPress={load} />

      <FlatList
        data={deliveries}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text>
              {item.Student?.ra} - {item.Student?.name}
            </Text>
            <Text>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}
