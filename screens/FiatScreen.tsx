import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import MoedaFiat from '../models/MoedaFiat';
import { salvarCotacoes, recuperarCotacoes, adicionarAoHistorico } from '../storage/storage';

export default function FiatScreen() {
  const [dolar, setDolar] = useState<MoedaFiat | null>(null);
  const [euro, setEuro] = useState<MoedaFiat | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<string>('');

  const fetchMoedas = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://open.er-api.com/v6/latest/BRL');
      const dolarValor = (1 / res.data.rates.USD).toFixed(2);
      const euroValor = (1 / res.data.rates.EUR).toFixed(2);
      const d = new MoedaFiat('Dólar', dolarValor);
      const e = new MoedaFiat('Euro', euroValor);

      setDolar(d);
      setEuro(e);
      setUltimaAtualizacao(new Date().toLocaleString());

      await salvarCotacoes('fiat', [d, e]);

      // Adiciona ao histórico automaticamente
      await Promise.all([
        adicionarAoHistorico('Dólar', parseFloat(dolarValor)),
        adicionarAoHistorico('Euro', parseFloat(euroValor)),
      ]);
    } catch (error) {
      console.error('Erro ao buscar cotações:', error);
      const cache = await recuperarCotacoes('fiat');
      if (cache) {
        setDolar(MoedaFiat.fromJson(cache[0]));
        setEuro(MoedaFiat.fromJson(cache[1]));
      }
    }
    setLoading(false);
  };

  // Salva no histórico ao clicar em cada moeda
  const salvarNoHistorico = async (moeda: string, valor: string) => {
    await adicionarAoHistorico(moeda, parseFloat(valor));
    Alert.alert('Histórico', `${moeda} salvo no histórico!`);
  };

  useEffect(() => {
    fetchMoedas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cotação de Moedas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#42055aff" />
      ) : (
        <>
          {dolar && (
            <TouchableOpacity onPress={() => salvarNoHistorico(dolar.moeda, dolar.valor)}>
              <Text style={styles.valor}>{dolar.moeda}: R$ {dolar.valor}</Text>
            </TouchableOpacity>
          )}
          {euro && (
            <TouchableOpacity onPress={() => salvarNoHistorico(euro.moeda, euro.valor)}>
              <Text style={styles.valor}>{euro.moeda}: R$ {euro.valor}</Text>
            </TouchableOpacity>
          )}

          {ultimaAtualizacao !== '' && (
            <Text style={styles.dataAtualizacao}>
              Última atualização: {ultimaAtualizacao}
            </Text>
          )}
        </>
      )}

      <View style={styles.button}>
        <Button
          title="Atualizar Cotação"
          onPress={fetchMoedas}
          color="#42055aff"
          disabled={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#42055aff' },
  valor: { fontSize: 18, marginVertical: 4 },
  dataAtualizacao: { marginTop: 10, fontStyle: 'italic', textAlign: 'center', color: '#555' },
  button: { marginTop: 20, width: '100%' },
});
