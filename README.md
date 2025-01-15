# Estoque Mind Group (Frontend)

Este repositório é um projeto feito para o processo seletivo da Mind Group. Ele é um aplicativo em React Native, que é o frontend para este [backend](https://github.com/rafosos/estoque-mind-group-back).

## Dispositivos compatíveis

Para melhor compatibilidade, o app deverá seu utilizado em dispositivos Android. O funcionamento em dispositivos iOS e Web não foi testado, podendo funcionar com bugs e falhas de layout.

## Rodar o projeto

1. Instalar dependênicas

   ```bash
   npm install
   ```
2. Criar o arquivo .env e colocar a URL do servidor backend, como no arquivo abaixo:

```
EXPO_PUBLIC_IP_SERVIDOR=http://192.168.xxx.xx:3000 //substituir pelo IP correto
EXPO_PUBLIC_IP_SERVIDOR_WEB=http://localhost:3000 //substituir por outro IP, caso o frontend Web não seja na mesma máquina do servidor
```

3. Iniciar o servidor

   ```bash
    npx expo start
   ```

4. No dispositivo móvel, instalar o app Expo Go e escanear o QR Code gerado no console.
