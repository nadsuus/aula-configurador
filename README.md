# Configurador Aula HERO

Configurador leve para os teclados Aula HERO (68 HE, 68 AIR, 68 MINI, 84 HE, 87 HE, 99, 100…),
feito a partir da leitura do JavaScript público de hero.aulastar.com.

Funciona de dois jeitos, com a mesma tela:

- **App para Windows** (Tauri): um programa normal, sem navegador. A parte em Rust fala com o USB.
- **Página no navegador**: Chrome ou Edge, via WebHID.

Nos dois casos: ligue o teclado **no cabo USB** (o receptor 2.4G não é suportado) e feche o site
oficial antes. Dois programas falando com o teclado ao mesmo tempo embaralham as respostas.

## App para Windows

Na primeira vez, no Windows (PowerShell):

1. Instale o Rust: baixe e rode o `rustup-init.exe` de https://rustup.rs. Quando ele oferecer,
   instale também as ferramentas de C++ do Visual Studio.
2. Instale o Tauri: `cargo install tauri-cli --version "^2" --locked` (demora alguns minutos).
3. Pegue o projeto: `git clone https://github.com/nadsuus/aula-configurador C:\dev\aula-configurador`

Depois, na pasta do projeto:

- `cargo tauri dev`: abre o app em modo de teste (a primeira compilação demora).
- `cargo tauri build`: gera o instalador em `src-tauri\target\release\bundle\nsis\`.

## Página no navegador

1. Sirva a pasta `web`: `python3 -m http.server 8765 --bind 127.0.0.1 --directory web`
2. Abra no **Chrome ou Edge** do Windows: http://localhost:8765
3. Clique em **Conectar teclado** e escolha o Aula na lista.

## O que faz

A tela segue o mesmo desenho do site oficial: perfis na lateral, abas em cima, teclado no meio.

- **Perfis**: troca entre os 3 perfis do teclado
- **Botão**: troca a função de cada tecla nas camadas normal, Fn e Fn1 (teclas, mouse, atalhos,
  multimídia), volta uma tecla ou a camada inteira ao padrão. Dá para escolher a tecla clicando no
  desenho ou apertando ela no teclado, e uma barra mostra as teclas que você está apertando
- **Atalhos**: segure Fn, aperte uma tecla e escolha o que sai (aspas `"` e `'`, `|`, `\`, `/`, `?`
  ou qualquer combinação com Ctrl/Shift/Alt/AltGr/Win). Útil no teclado de 68 teclas com o Windows em
  "Português (Brasil ABNT)", que não tem a tecla das aspas. Tem um campo para testar na hora
- **Macro**: grava teclas com o tempo real entre elas, edita passos e esperas (até 150 passos),
  escolhe como roda (N vezes, enquanto segurar, repetir) e liga numa tecla pela aba Botão.
  O teclado não devolve as macros: a lista fica guardada no computador
- **Teclas avançadas**: as funções são escolhidas numa grade por grupo, como no site; DKS, segurar/tocar (MT), liga-desliga (TGL), SOCD, profundidades (MPT)
  e ao soltar (END), conforme o teclado aceitar; até 40 por perfil
- **Explicações nas telas**: cada tela mostra as opções disponíveis com a explicação do que fazem, sem precisar clicar para revelar.
- **Perfis na barra lateral**: além dos 3 perfis do teclado, dá para criar perfis novos e usar os prontos de CS2 e Valorant. Eles guardam acionamento, Rapid Trigger, zona morta e taxa em Hz; ao voltar para um perfil do teclado, os ajustes dele voltam junto.
- **Iluminação**: efeito, cor, multicolorido, brilho e velocidade, tanto da luz das teclas quanto da
  **barra de luz**. O desenho do teclado mostra uma prévia da luz configurada (cor, brilho, efeito) e
  reage quando você aperta as teclas de verdade (Gatilho, Ondas ao digitar...)
  No efeito Personalizado, cada tecla tem a sua cor: é só pintar no desenho, clicando ou arrastando; clicar de novo desfaz.
- **Desempenho**, para todas as teclas ou só as escolhidas (com atalhos Selecionar todas, WASD, Inverter):
  - ponto de acionamento, com uma keycap 3D que afunda até o valor escolhido e uma régua em mm
  - Rapid Trigger, com sensibilidade de apertar e soltar
  - zona morta de cima e de baixo
  - **curso ao vivo**: mostra quanto cada tecla afundou e quando ela aciona
  - **calibração** das teclas, com cada tecla ficando verde quando termina
- **Dispositivo**: taxa de resposta (polling), suspensão, modo Mac, trava da tecla Windows
- Log dos bytes enviados e recebidos

De propósito **não** mexe em firmware nem em reset de fábrica.

## Arquivos

- `web/index.html`: a interface
- `web/protocol.js`: o protocolo (formato do pacote, checksum e cada comando), comentado
- `web/transport.js`: como os pacotes chegam ao teclado (WebHID no navegador, Rust no app)
- `web/layouts.js`: posição das teclas de cada modelo, extraída do app oficial
- `web/keycodes.js`: códigos das funções de tecla, extraídos do app oficial
- `web/keycap3d.js`: a keycap 3D da aba Desempenho
- `web/vendor/`: cópia local do Three.js (licença MIT), usada pela keycap 3D
- `src-tauri/src/main.rs`: a parte em Rust do app (USB pela biblioteca hidapi)

## Aviso

Projeto pessoal e não oficial, sem ligação com a Aula. Feito para usar o próprio teclado
(interoperabilidade). Use por sua conta e risco. Os nomes de modelos, a posição das teclas e os
códigos das funções vêm do configurador público da fabricante.
