import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Button, Image } from "react-native";
import api from "../api";

export default function StudentListScreen() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ ra: "", name: "", photo: "" });

  const load = () => api.get("/students").then((r) => setStudents(r.data));

  useEffect(() => {
    load();
  }, []);

  const save = () => {
    api.post("/students", form).then(() => {
      setForm({ ra: "", name: "", photo: "" });
      load();
    });
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="RA"
        value={form.ra}
        onChangeText={(t) => setForm({ ...form, ra: t })}
      />
      <TextInput
        placeholder="Nome"
        value={form.name}
        onChangeText={(t) => setForm({ ...form, name: t })}
      />
      <TextInput
        placeholder="Foto URL"
        value={form.photo}
        onChangeText={(t) => setForm({ ...form, photo: t })}
      />
      <Button title="Salvar" onPress={save} />

      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 40, height: 40, marginRight: 8 }}
            />
            <Text>
              {item.ra} - {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
