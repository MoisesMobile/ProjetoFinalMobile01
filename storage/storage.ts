// storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const salvarCotacoes = async (key: string, data: any): Promise<void> => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

export const recuperarCotacoes = async (key: string): Promise<any | null> => {
  const json = await AsyncStorage.getItem(key);
  return json ? JSON.parse(json) : null;
};

export const adicionarAoHistorico = async (moeda: string, valor: number): Promise<void> => {
  const dataAtual = new Date().toLocaleString('pt-BR');
  const novoItem = { data: dataAtual, moeda, valor };
  try {
    const historicoString = await AsyncStorage.getItem('historico');
    const historico = historicoString ? JSON.parse(historicoString) : [];
    historico.push(novoItem);
    await AsyncStorage.setItem('historico', JSON.stringify(historico));
  } catch (error) {
    console.error('Erro ao adicionar ao histórico:', error);
  }
};
