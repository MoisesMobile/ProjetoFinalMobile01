import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as Location from 'expo-location';

export default function HomeScreen() {
  const [endereco, setEndereco] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setEndereco({ error: 'Permissão negada' });
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const [info] = await Location.reverseGeocodeAsync(location.coords);
      setEndereco(info);
      setLoading(false);
    })();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bem-vindo ao CriptoApp</Text>
      <Text style={styles.subtitle}>Dados da Localização:</Text>
      {loading ? (
        <Text>Carregando localização...</Text>
      ) : endereco ? (
        <>
          <Text>País: {endereco.country || 'Não encontrado'}</Text>
          <Text>Estado: {endereco.region || 'Não encontrado'}</Text>
          <Text>Cidade: {endereco.city || 'Não encontrado'}</Text>
          <Text>Bairro: {endereco.subregion || 'Não encontrado'}</Text>
          <Text>Rua: {endereco.street || 'Não encontrado'}</Text>
          <Text>CEP: {endereco.postalCode || 'Não encontrado'}</Text>
        </>
      ) : (
        <Text>Não foi possível obter localização.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginVertical: 10 },
});
