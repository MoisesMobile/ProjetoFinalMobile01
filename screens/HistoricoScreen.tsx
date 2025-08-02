import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function HistoricoCriptoScreen() {
  const [historico, setHistorico] = useState<any[]>([]);

  const carregarHistorico = async () => {
    const data = await AsyncStorage.getItem('historico');
    if (data) {
      const todos = JSON.parse(data);
      const cripto = todos.filter((item: any) => item.moeda !== 'Dólar' && item.moeda !== 'Euro');
      setHistorico(cripto);
    }
  };

  const limparHistorico = async () => {
    const data = await AsyncStorage.getItem('historico');
    if (data) {
      const todos = JSON.parse(data);
      const apenasFiat = todos.filter((item: any) => item.moeda === 'Dólar' || item.moeda === 'Euro');
      await AsyncStorage.setItem('historico', JSON.stringify(apenasFiat));
    }
    setHistorico([]);
  };

  useFocusEffect(useCallback(() => {
    carregarHistorico();
  }, []));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📜 Histórico de Criptomoedas</Text>
      <FlatList
        data={[...historico].reverse()}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.data} - {item.moeda}: R$ {item.valor}</Text>
        )}
      />
      <TouchableOpacity style={styles.botao} onPress={limparHistorico}>
        <Text style={styles.textoBotao}>Limpar Histórico</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: "#42055aff", textAlign: 'center' },
  item: { fontSize: 16, marginVertical: 4 },
  botao: { backgroundColor: "#42055aff", paddingVertical: 25, paddingHorizontal: 24, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
