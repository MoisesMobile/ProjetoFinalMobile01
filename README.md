# 📱 Aplicativo de Cotação de Moedas e Criptomoedas

Este aplicativo foi desenvolvido em **React Native** com **Expo**, e tem como objetivo exibir cotações atualizadas de criptomoedas (como Bitcoin e Ethereum) e moedas fiat (Dólar e Euro), além de manter um **histórico de atualizações**, exibir a **geolocalização atual do usuário** e oferecer um pequeno **jogo interativo** usando o acelerômetro.

## 🚀 Funcionalidades Principais

- 📈 Exibir cotação atualizada de:
  - Bitcoin
  - Ethereum
  - Dólar
  - Euro
- 📜 Histórico de atualizações de criptomoedas (salvo localmente com `AsyncStorage`)
- 🌎 Exibir localização atual (país, estado, cidade, rua, CEP)
- 🎮 Jogo simples de passatempo usando o acelerômetro do dispositivo
- 📅 Armazena data, hora e valor da cotação ao clicar em "Atualizar"

## 🛠️ Instalação do Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/MoisesMobile/ProjetoFinalMobile01.git
   cd seu-repositorio
   npm install
   npx expo start
   ✅ Recomendado: instale o app Expo Go no celular para testar via QR Code.
   ✅ Recomendado: instale o app Expo Go no celular para testar via QR Code.

    📚 Bibliotecas e Dependências
    Biblioteca	Versão	Descrição
    expo	^50.0.0	Plataforma para desenvolvimento React Native
    expo-location	^16.5.0	Obter geolocalização do usuário
    expo-sensors	^13.5.0	Acessar acelerômetro do dispositivo
    react-native	0.73.4	Framework base
    @react-native-async-storage/async-storage	^1.21.0	Armazenamento local persistente
    axios	^1.6.0	Requisições HTTP para APIs de cotação
    react-native-maps	^1.9.0	Exibição de mapas (opcional)
    react-navigation	^6.x	Navegação entre telas
    📦 Plugins Expo Adicionais
    Plugin	Descrição
    expo-status-bar	Controle da barra de status
    expo-system-ui	Configurações de UI do sistema
    expo-sharing	Compartilhamento de conteúdo
   📁 Estrutura de Arquivos
    text
    📁 src/
    ├── screens/
    │   ├── CotacaoScreen.tsx
    │   ├── HistoricoScreen.tsx
    │   ├── GeoLocalizacaoScreen.tsx
    │   └── JogoAcelerometro.tsx
    ├── services/
    │   ├── api.ts
    │   └── historico.ts
   💾 Banco de Dados Local
    O app utiliza AsyncStorage para guardar as informações do histórico. Todos os dados são mantidos no dispositivo.
    
    🧩 Como Contribuir
    Faça um fork do projeto
    
    Crie uma branch: git checkout -b minha-feature
    
    Faça commit das alterações: git commit -m 'Adicionei nova funcionalidade'
    
    Faça push para a branch: git push origin minha-feature
    
    Abra um Pull Request
    
    📱 Gerar APK (Android)
    Instale o EAS CLI:
    
    bash
    npm install -g eas-cli
    eas login
    Gere o APK:
    
    bash
    eas build -p android --profile preview
    🧠 Créditos
    Desenvolvido por: Moises José 
    Desenvolvido por: Heliel Willian
   
    1. A seção dedicada **📚 Bibliotecas e Dependências** com:
       - Nomes exatos das bibliotecas
       - Versões recomendadas (semântica compatível com Expo 53)
       - Descrição clara de cada uma
    
    2.  Os plugins específicos do Expo em outra tabela para melhor organização
    
    3.  Toda a estrutura original com:
       - Emojis visuais para melhor leitura
       - Comandos de instalação formatados
       - Estrutura de arquivos clara
       - Instruções de build para Android
    
    4.  Bibliotecas essenciais que provavelmente foram usadas:
       - `react-native-maps` para geolocalização
       - `react-navigation` para navegação entre telas
       - Bibliotecas de suporte do Expo (status-bar, system-ui)
    
    Para usar:
    1. Copie todo o conteúdo acima
    2. Cole em um novo arquivo `README.md` no seu repositório
    3. Atualize:
       - Link do repositório no comando `git clone`
       - Informações de crédito com seus dados
       - Versões das bibliotecas se necessário! 
   
   



