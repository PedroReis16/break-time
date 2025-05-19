import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, Alert, Image } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import api from "../api";

export default function AuthorizationFormScreen() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [quantity, setQuantity] = useState("1");

  const loadStudents = () =>
    api.get("/students").then((r) => setStudents(r.data));

  useEffect(() => {
    loadStudents();
  }, []);

  const save = () => {
    api
      .post("/auths", {
        date: date.toISOString().split("T")[0],
        StudentId: studentId,
        quantity: Number(quantity),
      })
      .then(() => {
        Alert.alert("Sucesso", "Autorização salva!");
      })
      .catch((err) => {
        Alert.alert("Erro", err.response?.data?.error || "Falha ao autorizar.");
      });
  };

  const selectedStudent = students.find((s) => s.id === studentId);

  return (
    <View style={{ padding: 16 }}>
      <Text>Aluno:</Text>
      <RNPickerSelect
        onValueChange={setStudentId}
        items={students.map((s) => ({
          label: `${s.ra} - ${s.name}`,
          value: s.id,
        }))}
      />

      {selectedStudent && (
        <Image
          source={{ uri: selectedStudent.photo }}
          style={{ width: 80, height: 80, marginVertical: 10 }}
        />
      )}

      <Text>Quantidade (máx. 3):</Text>
      <TextInput
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      <Text>Data da autorização:</Text>
      <Button
        title={date.toLocaleDateString()}
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

      <Button title="Salvar autorização" onPress={save} />
    </View>
  );
}
