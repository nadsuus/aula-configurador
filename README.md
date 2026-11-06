# Configurador Aula HERO

Configurador leve para os teclados Aula HERO (68 HE, 68 AIR, 68 MINI, 84 HE, 87 HE, 99, 100…),
feito a partir da leitura do JavaScript público de hero.aulastar.com. Roda no navegador via WebHID.

## Como usar

1. Ligue o teclado **no cabo USB** (o receptor 2.4G usa outro transporte e não é suportado).
2. Sirva a pasta: `python3 -m http.server 8765 --bind 127.0.0.1`
3. Abra no **Chrome ou Edge do Windows**: http://localhost:8765
4. Clique em **Conectar teclado** e escolha o Aula na lista.
5. Feche o site oficial antes: duas páginas falando com o teclado ao mesmo tempo embaralham as respostas.

## O que faz

A tela segue o mesmo desenho do site oficial: perfis na lateral, abas em cima, teclado no meio.

- **Perfis**: troca entre os 3 perfis do teclado
- **Iluminação**: efeito, cor, multicolorido, brilho e velocidade, tanto da luz das teclas quanto da
  **barra de luz** lateral
- **Desempenho**, para todas as teclas ou só as escolhidas (com atalhos Selecionar todas, WASD, Inverter):
  - ponto de acionamento
  - Rapid Trigger, com sensibilidade de apertar e soltar
  - zona morta de cima e de baixo
  - **curso ao vivo**: mostra quanto cada tecla afundou e quando ela aciona
  - **calibração** das teclas, com cada tecla ficando verde quando termina
- **Dispositivo**: taxa de resposta (polling), suspensão, modo Mac, trava da tecla Windows
- Log dos bytes enviados e recebidos

As abas Botão, Macro e Teclas avançadas aparecem desativadas: esses comandos ainda não foram mapeados.

De propósito **não** mexe em firmware, reset de fábrica ou macros.

## Arquivos

- `protocol.js`: o protocolo (formato do pacote, checksum e cada comando), comentado
- `layouts.js`: posição das teclas de cada modelo, extraída do app oficial
- `index.html`: a interface

## Aviso

Projeto pessoal e não oficial, sem ligação com a Aula. Feito para usar o próprio teclado
(interoperabilidade). Use por sua conta e risco. Os nomes de modelos e a posição das teclas
vêm do configurador público da fabricante.
