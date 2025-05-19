import React, { useState } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import api from "../api";

export default function DeliveryScreen() {
  const [date, setDate] = useState(new Date());
  const [auths, setAuths] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  const load = () => {
    const d = date.toISOString().split("T")[0];
    api.get(`/auths?date=${d}`).then((r) => setAuths(r.data));
  };

  const entregar = (studentId) => {
    const d = date.toISOString().split("T")[0];
    api
      .post("/deliveries", { StudentId: studentId, date: d })
      .then(() => Alert.alert("Entregue com sucesso"), load)
      .catch(() => Alert.alert("Erro", "Já entregue ou inválido"));
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
            <Button
              title="Marcar como Entregue"
              onPress={() => entregar(item.Student.id)}
            />
          </View>
        )}
      />
    </View>
  );
}
