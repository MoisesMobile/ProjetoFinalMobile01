import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import MoedaCripto from '../models/MoedaCripto';
import { salvarCotacoes, recuperarCotacoes, adicionarAoHistorico } from '../storage/storage';

export default function CryptoScreen() {
  const [dados, setDados] = useState<MoedaCripto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<string>('');

  const fetchCriptos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=brl'
      );
      const cripto = [
        new MoedaCripto('Bitcoin', res.data.bitcoin.brl.toFixed(2)),
        new MoedaCripto('Ethereum', res.data.ethereum.brl.toFixed(2)),
      ];
      setDados(cripto);
      setUltimaAtualizacao(new Date().toLocaleString());

      // Salva no histórico cada cripto (convertendo preco para número com fallback)
      await Promise.all(
        cripto.map(c => {
          const valorNumerico = typeof c.preco === 'string' ? parseFloat(c.preco) : c.preco;
          return adicionarAoHistorico(c.nome, isNaN(valorNumerico) ? 0 : valorNumerico);
        })
      );

      await salvarCotacoes('cripto', cripto);
    } catch {
      const cache = await recuperarCotacoes('cripto');
      if (cache) setDados(cache);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCriptos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Criptomoedas</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#42055aff" />
        ) : (
          <>
            <FlatList
              data={dados}
              keyExtractor={(item) => item.nome}
              renderItem={({ item }) => (
                <Text style={styles.valor}>
                  {item.nome}: R$ {item.preco}
                </Text>
              )}
            />
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
            onPress={fetchCriptos}
            color="#42055aff"
            disabled={loading}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center',     // Centraliza horizontalmente
    padding: 20,
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  valor: {
    fontSize: 18,
    marginVertical: 4,
  },
  dataAtualizacao: {
    marginTop: 10,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#555',
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});
