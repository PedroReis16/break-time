import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StudentList from '../screens/StudentListScreen';
import AuthorizationForm from '../screens/AuthorizationFormScreen';
import AuthorizationList from '../screens/AuthorizationListScreen';
import Delivery from '../screens/DeliveryScreen';
import DeliveryList from '../screens/DeliveryListScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Alunos" component={StudentList} />
      <Stack.Screen name="Autorizar Lanche" component={AuthorizationForm} />
      <Stack.Screen name="Listar Autorizações" component={AuthorizationList} />
      <Stack.Screen name="Entregar Lanche" component={Delivery} />
      <Stack.Screen name="Lanches Entregues" component={DeliveryList} />
    </Stack.Navigator>
  );
}
