import React, { useState } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import api from "../api";

export default function AuthorizationListScreen() {
  const [date, setDate] = useState(new Date());
  const [auths, setAuths] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  const load = () => {
    const formatted = date.toISOString().split("T")[0];
    api.get(`/auths?date=${formatted}`).then((r) => setAuths(r.data));
  };

  const del = (id) => {
    Alert.alert("Confirmação", "Deseja excluir esta autorização?", [
      { text: "Cancelar" },
      {
        text: "Excluir",
        onPress: () => api.delete(`/auths/${id}`).then(load),
      },
    ]);
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
      <Button title="Buscar Autorizações" onPress={load} />

      <FlatList
        data={auths}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginTop: 10 }}>
            <Text>
              {item.Student?.ra} - {item.Student?.name}
            </Text>
            <Text>Lanches: {item.quantity}</Text>
            <Button title="Excluir" color="red" onPress={() => del(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
