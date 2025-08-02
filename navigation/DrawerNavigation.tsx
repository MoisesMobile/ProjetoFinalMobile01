import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import CryptoScreen from '../screens/CryptoScreen';
import FiatScreen from '../screens/FiatScreen';
import HistoricoScreen from '../screens/HistoricoScreen';
import JogoBomba from '../screens/JogoBomba';  // Para cada pagina, adicione um import com o nome correto.
import HistoricoFiatScreenn from '../screens/HistoricoFiatScreenn';


const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicio" id={undefined}>
     <Drawer.Screen name="Inicio" component={HomeScreen} options={{ title: 'Início' }} />
        <Drawer.Screen name="Criptomoedas" component={CryptoScreen} />
        <Drawer.Screen name="Dólar e Euro" component={FiatScreen} />
        <Drawer.Screen name="Histórico Criptomoedas" component={HistoricoScreen} />
        <Drawer.Screen name="Histórico Dólar & Euro" component={HistoricoFiatScreenn} />
        <Drawer.Screen name="Jogo da Bomba" component={JogoBomba} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}  


