import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function JogoBomba() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [jogoAtivo, setJogoAtivo] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(10); // segundos para segurar
  const [status, setStatus] = useState<'aguardando' | 'perdeu' | 'venceu'>('aguardando');

  const ultimaAcao = useRef(Date.now());

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (jogoAtivo && tempoRestante > 0) {
      timer = setInterval(() => {
        setTempoRestante((t) => t - 1);
      }, 1000);
    } else if (tempoRestante === 0 && jogoAtivo) {
      setStatus('venceu');
      setJogoAtivo(false);
    }

    return () => clearInterval(timer);
  }, [jogoAtivo, tempoRestante]);

  useEffect(() => {
    if (jogoAtivo) {
      Accelerometer.setUpdateInterval(100);
      const subscription = Accelerometer.addListener((accData) => {
        setData(accData);
        checarMovimento(accData);
      });

      return () => subscription.remove();
    }
  }, [jogoAtivo]);

  const checarMovimento = (d: { x: number; y: number; z: number }) => {
    const intensidade = Math.sqrt(d.x ** 2 + d.y ** 2 + d.z ** 2);

    // Aceleração 'normal' parada é ~1 por causa da gravidade,
    // se passar disso além de um limite, consideramos que mexeu demais:
    if (intensidade > 1.3) {
      const agora = Date.now();
      if (agora - ultimaAcao.current > 500) {
        ultimaAcao.current = agora;
        perderJogo();
      }
    }
  };

  const perderJogo = () => {
    setStatus('perdeu');
    setJogoAtivo(false);
    Alert.alert('💥 Bomba Explodiu!', 'Você mexeu demais!');
  };

  const iniciarJogo = () => {
    setStatus('aguardando');
    setTempoRestante(10);
    setJogoAtivo(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Bomba - Não Deixe Cair!</Text>

      {jogoAtivo ? (
        <>
          <Text style={styles.timer}>Segure firme! Tempo restante: {tempoRestante}s</Text>
          <Text style={styles.info}>
            Movimento atual: {data.x.toFixed(2)} / {data.y.toFixed(2)} / {data.z.toFixed(2)}
          </Text>
        </>
      ) : status === 'venceu' ? (
        <Text style={[styles.resultado, { color: 'green' }]}>🎉 Você venceu! Parabéns!</Text>
      ) : status === 'perdeu' ? (
        <Text style={[styles.resultado, { color: 'red' }]}>💥 Você perdeu! Mexeu demais!</Text>
      ) : (
        <Text style={styles.instrucoes}>Pressione iniciar para começar a jogar.</Text>
      )}

      <Button
        title={jogoAtivo ? 'Reiniciar' : 'Iniciar Jogo'}
        onPress={iniciarJogo}
        color={jogoAtivo ? '#f39c12' : "#42055aff"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' },
  timer: { fontSize: 22, marginBottom: 10, color: '#2980b9' },
  info: { fontSize: 16, marginBottom: 30, fontStyle: 'italic', color: '#34495e' },
  instrucoes: { fontSize: 18, marginBottom: 30, textAlign: 'center' },
  resultado: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
});
