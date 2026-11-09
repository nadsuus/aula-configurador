// Idioma do app. O texto original fica em portugues no codigo; esta camada troca o que aparece na tela.
// Chave com {} aceita partes variaveis (numeros, nomes). O que nao estiver aqui continua em portugues.
// Para outro idioma: acrescente em LANGS e crie o dicionario em DICTS.
const LANGS = [["pt", "Português"], ["en", "English"]];
const EN = {
  // Abas e telas
  "BOTÃO": "KEYS", "ATALHOS": "SHORTCUTS", "ILUMINAÇÃO": "LIGHTING", "MACRO": "MACRO", "DESEMPENHO": "PERFORMANCE",
  "TECLAS AVANÇADAS": "ADVANCED KEYS", "DISPOSITIVO": "DEVICE", "CONECTAR TECLADO": "CONNECT KEYBOARD",
  "Configurador Aula HERO": "Aula HERO Configurator", "Idioma": "Language",
  "Conectar teclado": "Connect keyboard", "Conecte o teclado": "Connect the keyboard", "Ligue o Aula HERO no": "Plug in the Aula HERO with the",
  "cabo USB": "USB cable", "e feche o site oficial.": "and close the official website.",
  "No navegador, use Chrome ou Edge: ele vai pedir permissão para acessar o teclado.": "In a browser, use Chrome or Edge: it will ask for permission to access the keyboard.",
  "Procurando o teclado...": "Looking for the keyboard...", "Nenhum teclado": "No keyboard", "Desconectado": "Disconnected", "desconectado": "disconnected", "conectado": "connected",
  "Desconhecida": "Unknown", "Desconhecido ({})": "Unknown ({})", "Pronto": "Ready", "Lendo configurações...": "Reading settings...",
  "O teclado foi desconectado. Ligue de novo e clique em Reconectar.": "The keyboard was disconnected. Plug it back in and click Reconnect.",
  "Reler do teclado": "Read from keyboard", "Reconectar": "Reconnect", "Mostrar log de pacotes": "Show packet log", "Firmware:": "Firmware:",
  // Perfis
  "Perfis": "Profiles", "Perfil 1": "Profile 1", "Perfil 2": "Profile 2", "Perfil 3": "Profile 3", "Perfis prontos": "Ready-made profiles",
  "+ Adicionar perfil": "+ Add profile", "Nome do perfil": "Profile name", "Salvar": "Save", "Cancelar": "Cancel", "Apagar perfil": "Delete profile", "Apagar?": "Delete?",
  "Meu perfil {}": "My profile {}", "Nome vazio ou repetido": "Empty or duplicate name", "Perfil {} criado com os ajustes atuais": "Profile {} created from the current settings",
  "Selecionando {}": "Selecting {}", "Trocando perfil": "Switching profile", "Pare o modo ao vivo antes de trocar os ajustes": "Stop live mode before changing settings",
  "W A S D": "W A S D", "Ctrl esquerdo (agachar)": "Left Ctrl (crouch)", "Shift esquerdo (andar devagar)": "Left Shift (walk)", "Q E C (habilidades)": "Q E C (abilities)",
  "X (ultimate)": "X (ultimate)", "Espaço (pular)": "Space (jump)", "Esc e Windows": "Esc and Windows", "Demais teclas": "Other keys", "E (usar e desarmar)": "E (use and defuse)",
  "Taxa de resposta: 1000 Hz": "Polling rate: 1000 Hz",
  "{}: {} mm, RT {} mm": "{}: {} mm, RT {} mm", "{}: {} mm": "{}: {} mm",
  // Desempenho
  "Todas as teclas": "All keys", "Teclas individuais": "Individual keys", "Todas as teclas:": "All keys:", "Teclas individuais:": "Individual keys:",
  "cada ajuste vale para o teclado inteiro.": "each setting applies to the whole keyboard.",
  "clique nas teclas do desenho e ajuste só elas, como deixar WASD mais sensível para jogar.": "click keys on the drawing and adjust only those, such as making WASD more sensitive for gaming.",
  "Número na tecla: ponto de acionamento em mm ·": "Number on key: actuation point in mm ·", "Rapid Trigger ligado": "Rapid Trigger on",
  "Selecionar todas": "Select all", "Limpar seleção": "Clear selection", "Inverter seleção": "Invert selection",
  "Ponto de acionamento": "Actuation point", "Quanto a tecla precisa afundar para contar.": "How far a key must travel to register.",
  "Valor baixo:": "Low value:", "responde mais rápido, bom para jogar, mas pega toques sem querer.": "responds faster, good for gaming, but picks up accidental presses.",
  "Valor alto:": "High value:", "mais seguro para digitar. Exemplo: WASD em 0,3 mm e Esc em 3 mm.": "safer for typing. Example: WASD at 0.3 mm and Esc at 3 mm.",
  "Vale para todas as teclas": "Applies to all keys", "Vale para {} tecla(s) selecionada(s)": "Applies to {} selected key(s)", "Clique nas teclas do desenho para escolher": "Click keys on the drawing to choose them",
  "Calibrar teclas": "Calibrate keys", "Curso ao vivo": "Live travel", "Calibrar:": "Calibrate:", "Curso ao vivo:": "Live travel:",
  "ensina ao teclado o curso real de cada tecla; use se alguma acionar fora do ponto.": "teaches the keyboard each key's real travel; use it if a key triggers off its point.",
  "mostra quanto cada tecla afundou, para testar os ajustes.": "shows how far each key went down, to test your settings.",
  "Aciona em {} mm (de {} mm)": "Triggers at {} mm (of {} mm)", "Ao vivo: {} mm{}": "Live: {} mm{}", " · ACIONOU": " · TRIGGERED", "· ACIONOU": "· TRIGGERED", "· aciona em {} mm": "· triggers at {} mm",
  "Esse switch vai até {} mm; acima disso o valor é cortado. Mínimo 0.10 mm.": "This switch goes up to {} mm; anything above is capped. Minimum 0.10 mm.",
  "Régua do curso da tecla": "Key travel ruler", "solta": "release", "Rapid Trigger (RT)": "Rapid Trigger (RT)",
  "A tecla solta e aciona de novo assim que muda de direção.": "The key releases and triggers again as soon as it changes direction.",
  "Ligar ou desligar": "Turn on or off", "Desligado:": "Off:", "Ligado:": "On:",
  "a tecla só volta a valer depois de subir até um ponto fixo.": "the key only resets after rising to a fixed point.",
  "basta subir um pouquinho para soltar e descer um pouquinho para acionar de novo. Ajuda a repetir toques e a parar o movimento mais rápido nos jogos.": "rising slightly releases it and pressing slightly triggers it again. Helps you repeat presses and stop moving faster in games.",
  "Evite menos de 0,04 mm: o tremor do dedo pode contar como soltar.": "Avoid less than 0.04 mm: finger tremor may count as a release.",
  "Sensibilidade: quanto a tecla precisa se mover para acionar de novo (ao apertar) ou soltar (ao subir).": "Sensitivity: how far the key must move to trigger again (pressing) or release (rising).",
  "Sensibilidade ao apertar": "Press sensitivity", "Sensibilidade ao soltar": "Release sensitivity", "Ajustar apertar e soltar separados": "Set press and release separately",
  "Desligado, soltar usa o mesmo valor de apertar.": "When off, release uses the same value as press.",
  "Zona morta": "Dead zone", "Em cima evita toque acidental; embaixo evita a tecla soltar sozinha no fundo.": "Top avoids accidental presses; bottom keeps the key from releasing by itself at the bottom.",
  "Em cima:": "Top:", "Embaixo:": "Bottom:", "Em cima": "Top", "Embaixo": "Bottom",
  "o começo do curso não conta, para a tecla não acionar com um toque de leve.": "the start of the travel does not count, so a light touch won't trigger the key.",
  "tremidas no fundo da tecla não contam, para ela não soltar sozinha enquanto você segura.": "tremors at the bottom don't count, so the key won't release by itself while held.",
  "Com zona morta 0, um leve tremor do dedo pode contar como soltar.": "With a dead zone of 0, slight finger tremor may count as a release.",
  "Gravando em {} tecla(s)": "Saving to {} key(s)", "Escolha ao menos uma tecla no desenho": "Choose at least one key on the drawing",
  "Aciona em: {}": "Triggers at: {}", "Rapid Trigger: desligado": "Rapid Trigger: off", "Rapid Trigger: apertar {}, soltar {}": "Rapid Trigger: press {}, release {}",
  "Zona morta: desligada": "Dead zone: off", "Zona morta: cima {}, baixo {}": "Dead zone: top {}, bottom {}",
  "A calibração regrava a leitura dos sensores. Depois de começar, aperte TODAS as teclas até o fundo antes de terminar. Continuar?": "Calibration rewrites the sensor readings. Once started, press ALL keys to the bottom before finishing. Continue?",
  "Calibrando: aperte cada tecla devagar até o fundo e solte. Ela fica verde quando termina. Só clique em": "Calibrating: press each key slowly to the bottom and release. It turns green when done. Only click",
  "Terminar calibração": "Finish calibration", "depois que todas estiverem verdes.": "after all of them are green.", "Iniciando calibração": "Starting calibration", "Terminando calibração": "Finishing calibration",
  "Só {} de {} teclas ficaram verdes. Terminar mesmo assim?": "Only {} of {} keys turned green. Finish anyway?", "{} de {} teclas calibradas": "{} of {} keys calibrated",
  "Saindo do curso ao vivo": "Leaving live travel", "Parar": "Stop", "{}: {} mm de {}": "{}: {} mm of {}", "Não foi possível mostrar a keycap 3D.": "Could not show the 3D keycap.",
  // Botao
  "Aperte teclas no teclado: elas aparecem aqui.": "Press keys on the keyboard: they show up here.",
  "Clique numa tecla do desenho (ou aperte ela no teclado) e depois escolha a nova função abaixo.": "Click a key on the drawing (or press it on the keyboard), then choose the new function below.",
  "Voltar ao padrão": "Restore default", "Normal": "Normal", "Segurando Fn": "Holding Fn", "Segurando Fn1": "Holding Fn1", "Restaurar camada": "Restore layer",
  "Cada camada guarda funções próprias. Marque uma para ver e trocar o que as teclas fazem nela.": "Each layer stores its own functions. Select one to see and change what the keys do on it.",
  "— escolha a nova função abaixo": "— choose the new function below", "({}) faz agora:": "({}) now does:", "camada normal": "normal layer", "camada Fn": "Fn layer", "camada Fn1": "Fn1 layer",
  "Lendo camada": "Reading layer", "Restaurando camada": "Restoring layer", "Gravando {} = macro {}": "Saving {} = macro {}", "Gravando {} = {}": "Saving {} = {}", "Voltando {} ao padrão": "Restoring {} to default",
  "Voltar TODAS as teclas da camada {} para o padrão de fábrica?": "Restore ALL keys on layer {} to factory defaults?",
  "Esta é a tecla Fn. Trocando ela, você perde o acesso à camada Fn pelo teclado (dá para restaurar por aqui). Continuar?": "This is the Fn key. If you change it, you lose access to the Fn layer from the keyboard (you can restore it here). Continue?",
  "Teclas básicas": "Basic keys", "Mouse": "Mouse", "Edição": "Editing", "Navegação": "Navigation", "Windows": "Windows", "Produtividade": "Productivity", "Editar": "Edit", "Multimídia": "Multimedia", "Ferramentas": "Tools", "Ações do sistema": "System actions", "Macros": "Macros",
  "Letras, números e Fn": "Letters, numbers and Fn", "Cliques e desativar tecla": "Clicks and disable key", "Copiar, colar, salvar": "Copy, paste, save", "Voltar e avançar": "Back and forward", "Atalhos com a tecla Win": "Win key shortcuts", "Alt+Tab, fechar programa": "Alt+Tab, close program", "Recortar, copiar, colar": "Cut, copy, paste", "Música e volume": "Music and volume", "Abrir apps, modo Mac": "Open apps, Mac mode", "Bloquear, zoom, brilho": "Lock, zoom, brightness", "Sequências que você criou": "Sequences you created",
  "Nenhuma macro ainda. Crie uma na aba Macro.": "No macros yet. Create one in the Macro tab.", "Macro: {}": "Macro: {}",
  "Alt dir.": "Right Alt", "Alt esq.": "Left Alt", "Ctrl dir.": "Right Ctrl", "Ctrl esq.": "Left Ctrl", "Shift dir.": "Right Shift", "Shift esq.": "Left Shift", "Win dir.": "Right Win", "Win esq.": "Left Win", "Espaço": "Space", "Menu (App)": "Menu (App)",
  "Desativar tecla": "Disable key", "Desativada": "Disabled", "Clique esquerdo": "Left click", "Clique direito": "Right click", "Clique do meio": "Middle click", "Avançar (mouse)": "Forward (mouse)", "Voltar (mouse)": "Back (mouse)", "Mouse avançar": "Mouse forward", "Mouse voltar": "Mouse back",
  "Ctrl + 0 (zoom normal)": "Ctrl + 0 (normal zoom)", "Ctrl + O (abrir)": "Ctrl + O (open)", "Ctrl + A (selecionar tudo)": "Ctrl + A (select all)", "Ctrl + C (copiar)": "Ctrl + C (copy)", "Ctrl + F (pesquisar)": "Ctrl + F (find)", "Ctrl + N (novo)": "Ctrl + N (new)", "Ctrl + S (salvar)": "Ctrl + S (save)", "Ctrl + T (nova aba)": "Ctrl + T (new tab)", "Ctrl + V (colar)": "Ctrl + V (paste)", "Ctrl + W (fechar aba)": "Ctrl + W (close tab)", "Ctrl + X (recortar)": "Ctrl + X (cut)", "Ctrl + Y (refazer)": "Ctrl + Y (redo)", "Ctrl + Z (desfazer)": "Ctrl + Z (undo)",
  "Alt + Left (voltar)": "Alt + Left (back)", "Alt + Right (avançar)": "Alt + Right (forward)",
  "Win + tab (visão de tarefas)": "Win + Tab (task view)", "Win + D (mostrar área de trabalho)": "Win + D (show desktop)", "Win + Ctrl + Enter (narrador)": "Win + Ctrl + Enter (narrator)", "Win + T (percorrer barra de tarefas)": "Win + T (cycle taskbar)", "Win + A (central de ações)": "Win + A (action center)", "Win + E (explorador de arquivos)": "Win + E (file explorer)", "Win + I (configurações)": "Win + I (settings)", "Win + L (bloquear tela)": "Win + L (lock screen)", "Win + K (conectar tela sem fio)": "Win + K (wireless display)", "Win + B (bandeja do sistema)": "Win + B (system tray)", "Win + G (barra de jogo Xbox)": "Win + G (Xbox Game Bar)", "Win + R (executar)": "Win + R (run)", "Win + S (pesquisar)": "Win + S (search)", "Win + U (acessibilidade)": "Win + U (accessibility)", "Win + P (projetar tela)": "Win + P (project screen)", "Win + X (menu rápido)": "Win + X (quick menu)", "Win + . (emojis)": "Win + . (emoji)", "Win + = (lupa)": "Win + = (magnifier)",
  "Ctrl + Shift + Esc (gerenciador de tarefas)": "Ctrl + Shift + Esc (task manager)", "Ctrl + ESC (menu iniciar)": "Ctrl + Esc (Start menu)", "Alt + Tab (alternar janelas)": "Alt + Tab (switch windows)", "Alt + F4 (fechar programa)": "Alt + F4 (close program)", "Alt + ESC (próxima janela)": "Alt + Esc (next window)",
  "Recortar": "Cut", "Copiar": "Copy", "Colar": "Paste", "Desfazer": "Undo", "Tocar / pausar": "Play / pause", "Abrir player": "Open player", "Mudo": "Mute", "Faixa anterior": "Previous track", "Próxima faixa": "Next track",
  "Modo Windows": "Windows mode", "Modo Mac": "Mac mode", "Navegador": "Browser", "Calculadora": "Calculator", "E-mail": "E-mail", "Meu computador": "My computer", "Favoritos": "Favorites",
  "Fechar janela": "Close window", "Bloquear PC": "Lock PC", "Mais zoom": "Zoom in", "Menos zoom": "Zoom out", "Mostrar área de trabalho": "Show desktop", "Gerenciador de tarefas": "Task manager", "Brilho da tela +": "Screen brightness +", "Brilho da tela −": "Screen brightness −",
  // Atalhos
  "Aperte o atalho no teclado": "Press the shortcut on the keyboard", "Clique aqui e aperte o atalho (ex.: Fn + S)": "Click here and press the shortcut (e.g. Fn + S)", "Clique aqui e aperte Fn + {}": "Click here and press Fn + {}",
  "Segure": "Hold", "e aperte uma tecla, por exemplo Fn + S.": "and press a key, for example Fn + S.", "agora aperte a tecla...": "now press the key...", "Se preferir, escolha aqui: Fn +": "Or choose here: Fn +",
  "Faltou segurar o Fn. Segure Fn e aperte a tecla de novo.": "You need to hold Fn. Hold Fn and press the key again.",
  "O que deve sair quando apertar?": "What should it output when pressed?", "Outra combinação": "Other combination", "Aspas duplas": "Double quotes", "Aspas simples": "Single quote", "Barra reta": "Vertical bar", "Barra invertida": "Backslash", "Barra": "Slash", "Interrogação": "Question mark", "Barra /": "Slash /", "Barra invertida \\": "Backslash \\", "Barra reta |": "Vertical bar |", "Interrogação ?": "Question mark ?", "/ ? (tecla ABNT)": "/ ? (ABNT key)", "\\ | (tecla ABNT)": "\\ | (ABNT key)", "Aspas duplas \"": "Double quotes \"", "Aspas simples '": "Single quote '",
  "Os símbolos prontos funcionam com o Windows no teclado \"Português (Brasil ABNT)\".": "The ready-made symbols work with Windows set to the \"Portuguese (Brazil ABNT)\" keyboard.",
  "Salve": "Save", "Salvar no teclado": "Save to keyboard", "Já salvo ✓": "Already saved ✓", "Teste": "Test", "Seus atalhos": "Your shortcuts", "Nenhum ainda.": "None yet.", "Remover atalho": "Remove shortcut", "escolha a tecla": "choose the key", "escolha o que deve sair": "choose what it should output",
  "Fn + {} hoje faz: {}. Trocar pelo atalho?": "Fn + {} currently does: {}. Replace it with the shortcut?", "Salvando atalho": "Saving shortcut", "Removendo Fn + {}": "Removing Fn + {}", "· {} faz: {}": "· {} does: {}",
  "Digite aqui para testar": "Type here to test",
  // Iluminacao
  "Luz das teclas": "Key light", "Barra de luz": "Light bar", "Cor única": "Single color", "Multicolorido": "Multicolor", "Escolher cor": "Choose color", "Velocidade": "Speed", "Brilho": "Brightness", "{n} de {n}": "{} of {}",
  "Desligado": "Off", "Sempre aceso": "Always on", "Sempre acesa": "Always on", "Respirando": "Breathing", "Neon": "Neon", "Gatilho (acende ao tocar)": "Trigger (lights on press)", "Andando na chuva": "Walking in the rain", "Roleta arco-iris": "Rainbow roulette", "Ondas ao digitar": "Typing ripples", "Estrelas": "Stars", "Pegadas na neve": "Footprints in the snow", "Fluxo continuo": "Continuous flow", "Fluxo contínuo": "Continuous flow", "Seguindo a onda": "Go with the flow", "Sombra": "Shadow", "Onda senoidal": "Sine wave", "Varredura": "Scan", "Cata-vento": "Windmill", "Cachoeira colorida": "Colorful waterfall", "Flores": "Flowers", "Tempestade": "Storm", "Personalizado (cores por tecla)": "Custom (per-key colors)", "Corrida (luz andando)": "Race (moving light)",
  "Pintar as teclas": "Paint the keys", "Pintar todas": "Paint all", "Apagar todas": "Clear all",
  "Escolha a cor abaixo e clique nas teclas do desenho. Arraste para pintar várias. Clique de novo para desfazer. O botão direito do mouse apaga.": "Choose a color below and click keys on the drawing. Drag to paint several. Click again to undo. The right mouse button clears.",
  "Prévia aproximada · Teclas: {} · Barra de luz: {}": "Approximate preview · Keys: {} · Light bar: {}", "{}, multicolorido": "{}, multicolor", "Aplicando luz": "Applying light", "Aplicando barra de luz": "Applying light bar", "Gravando cor de {} {}": "Saving color of {} {}", "tecla": "key", "teclas": "keys",
  // Macro
  "Nome da nova macro": "New macro name", "Nova": "New", "Enviar todas para o teclado": "Send all to keyboard", "Enviar todas para o teclado (há mudanças)": "Send all to keyboard (changes pending)", "Enviando macros": "Sending macros",
  "O teclado não devolve as macros, então a lista fica guardada neste computador. Para usar uma macro, vá na aba Botão → categoria Macros e escolha a tecla.": "The keyboard does not return macros, so the list is kept on this computer. To use a macro, go to the Keys tab → Macros category and choose the key.",
  "O que é:": "What it is:", "uma macro faz uma tecla digitar uma sequência inteira de teclas, com as esperas entre elas.": "a macro makes one key type a whole sequence of keys, with the delays between them.", "Como rodar:": "How it runs:", "Como usar:": "How to use:",
  "Repetir N vezes, Enquanto segurar a tecla, Modo repetir.": "Repeat N times, While holding the key, Repeat mode.", "Repetir N vezes": "Repeat N times", "Enquanto segurar a tecla": "While holding the key", "Modo repetir": "Repeat mode",
  "crie uma macro à esquerda, grave ou monte os passos e aplique em uma tecla na aba Botão, categoria Macros. Cada macro aceita até {} passos.": "create a macro on the left, record or build the steps, and apply it to a key in the Keys tab, Macros category. Each macro takes up to {} steps.",
  "Nome": "Name", "Como roda na tecla": "How it runs on the key", "Vezes": "Times", "Gravar teclas": "Record keys", "Parar gravação": "Stop recording", "Gravação parada.": "Recording stopped.", "Adicionar passo": "Add step", "Apagar passo": "Delete step", "Limpar passos": "Clear steps", "Excluir macro": "Delete macro", "Mesma espera em todos": "Same delay on all", "Esperar depois (ms)": "Wait after (ms)", "Ação": "Action", "Tecla": "Key",
  "Clique em Gravar e digite: cada tecla vira um passo \"desce\" e um \"sobe\", com o tempo real entre eles.": "Click Record and type: each key becomes a \"down\" and an \"up\" step, with the real time between them.",
  "Gravando... digite as teclas. As teclas não fazem nada no PC enquanto grava.": "Recording... type the keys. Keys do nothing on the PC while recording.", "Sem passos. Grave ou adicione abaixo.": "No steps. Record or add them below.", "Apagar todos os passos?": "Delete all steps?", "Essa macro está vazia": "This macro is empty", "Dê um nome para a macro": "Give the macro a name", "Já existe uma macro com esse nome": "A macro with this name already exists", "Macro chegou no máximo de {} passos": "Macro reached the maximum of {} steps", "{} passos · {}": "{} steps · {}", "desce": "down", "sobe": "up", "Aperte uma tecla...": "Press a key...",
  "Excluir a macro \"{}\"? As teclas ligadas às macros depois dela passam a apontar para a macro seguinte até você enviar e religar.": "Delete macro \"{}\"? Keys bound to later macros will point to the next macro until you send and rebind them.",
  // Teclas avancadas
  "Escolha uma função abaixo e clique na tecla do desenho que vai usá-la. Cada tecla aceita uma função.": "Choose a function below and click the key on the drawing that will use it. Each key takes one function.",
  "Agora clique na tecla do desenho que vai usar": "Now click the key on the drawing that will use", "Clique numa tecla do desenho para dar uma função avançada a ela.": "Click a key on the drawing to give it an advanced function.",
  ": sem função avançada. Escolha o tipo e ajuste abaixo.": ": no advanced function. Choose the type and adjust it below.", ": tem {}. Escolha o tipo e ajuste abaixo.": ": has {}. Choose the type and adjust it below.",
  "{} de 40 em uso": "{} of 40 in use", "Gravar no teclado": "Save to keyboard", "Remover função avançada": "Remove advanced function", "Removendo função avançada de {}": "Removing advanced function from {}", "Gravando {} em {}": "Saving {} to {}",
  "Segurar / tocar (MT)": "Hold / tap (MT)", "Liga-desliga (TGL)": "Toggle (TGL)", "Profundidades (MPT)": "Depths (MPT)", "Ao soltar (END)": "On release (END)", "Exemplo: {}": "Example: {}",
  "Uma tecla faz até 4 ações em 4 pontos do curso: começo do aperto, fundo, subindo do fundo e solta.": "One key does up to 4 actions at 4 points of its travel: start of press, bottom, rising from bottom, and release.", "No começo do aperto mira; no fundo atira.": "Aim at the start of the press; shoot at the bottom.",
  "Um toque rápido faz uma função e segurar faz outra.": "A quick tap does one function and holding does another.", "Caps Lock: o toque manda Esc; segurando vira Ctrl.": "Caps Lock: a tap sends Esc; holding becomes Ctrl.",
  "Um toque liga ou desliga o disparo contínuo; segurando, a tecla funciona normal.": "A tap turns continuous firing on or off; when held, the key works normally.", "W continua apertado até o próximo toque, para andar sem segurar.": "W stays pressed until the next tap, so you walk without holding it.",
  "Liga duas teclas opostas e decide o que vale quando as duas estão apertadas.": "Links two opposite keys and decides what counts when both are pressed.", "A e D: a última apertada vale.": "A and D: the last one pressed counts.",
  "Até 3 funções em 3 profundidades diferentes da mesma tecla.": "Up to 3 functions at 3 different depths of the same key.", "Leve manda 1, médio manda 2, fundo manda 3.": "Light sends 1, medium sends 2, bottom sends 3.",
  "Manda outra tecla no momento em que você solta.": "Sends another key the moment you release.", "Solta o botão de mirar e recarrega.": "Release the aim button and reload.",
  "Atenção: não use no CS2. Nos servidores oficiais, a Valve expulsa da partida quem usa esse tipo de automação.": "Warning: do not use in CS2. On official servers, Valve kicks players who use this kind of automation from the match.",
  "Ponto do curso (mm)": "Travel point (mm)", "Começo do aperto": "Start of press", "No fundo": "At the bottom", "Subindo do fundo": "Rising from bottom", "Soltou totalmente": "Fully released", "Toque": "Tap", "Segura na etapa": "Hold during step", "Segura até a etapa 2": "Hold until step 2", "Segura até a etapa 3": "Hold until step 3", "Função {}": "Function {}", "função {}": "function {}",
  "\"Toque\" aperta e solta na hora; \"Segura\" mantém a tecla apertada enquanto o curso estiver naquela parte.": "\"Tap\" presses and releases at once; \"Hold\" keeps the key pressed while the travel is in that part.",
  "Ao segurar": "On hold", "Ao tocar": "On tap", "ao segurar": "on hold", "ao tocar": "on tap", "Segurar a partir de (ms)": "Hold after (ms)", "Toque curto até (ms)": "Short tap up to (ms)", "Mandar ao soltar": "Send on release", "mandar ao soltar": "send on release", "Na profundidade (mm)": "At depth (mm)", "— nenhuma —": "— none —", "Nenhuma": "None",
  "O teclado espera esse tempo para saber se foi toque ou segurar, então o toque sai um pouco mais lento (padrão: 200 ms). Se \"ao segurar\" for Ctrl, Shift ou Alt e você apertar outra tecla junto, ele vale na hora.": "The keyboard waits this long to tell a tap from a hold, so the tap comes out slightly slower (default: 200 ms). If \"on hold\" is Ctrl, Shift or Alt and you press another key with it, it applies at once.",
  "Toque curto prende ou solta a tecla; segurando mais que esse tempo ela funciona normal. Como o teclado precisa esperar para decidir, esta tecla responde um pouco mais devagar. Rapid Trigger com distância pequena melhora, mas não iguala uma tecla comum.": "A short tap latches or releases the key; held longer than this time, it works normally. Since the keyboard must wait to decide, this key responds a little slower. Rapid Trigger with a small distance helps, but won't match a regular key.",
  "Tecla 1": "Key 1", "Tecla 2": "Key 2", "Quando as duas estão apertadas": "When both are pressed", "A última apertada vale": "Last pressed counts", "Tecla 1 sempre vale": "Key 1 always counts", "Tecla 2 sempre vale": "Key 2 always counts", "Nenhuma vale (se anulam)": "Neither counts (they cancel)", "A tecla apertada por último solta a anterior.": "The last key pressed releases the previous one.", "Com as duas apertadas, só a Tecla 1 conta.": "With both pressed, only Key 1 counts.", "Com as duas apertadas, só a Tecla 2 conta.": "With both pressed, only Key 2 counts.", "Com as duas apertadas, nenhuma conta.": "With both pressed, neither counts.",
  "Exemplo: A e D num jogo. Com \"a última apertada vale\", segurar A e apertar D faz andar para a direita.": "Example: A and D in a game. With \"last pressed counts\", holding A and pressing D moves right.",
  "Escolha duas teclas diferentes para o SOCD": "Choose two different keys for SOCD", "O teclado aceita no máximo 40 teclas avançadas por perfil": "The keyboard accepts at most 40 advanced keys per profile", "Escolhendo: {}. Clique em outro campo acima para trocar.": "Choosing: {}. Click another field above to switch.",
  // Dispositivo
  "Conexão": "Connection", "Cabo USB": "USB cable", "Modelo": "Model", "Firmware": "Firmware", "Taxa de resposta": "Polling rate", "Travar tecla Windows": "Lock Windows key", "Suspender após": "Sleep after", "Nunca": "Never", "Suspensão": "Sleep", "Trava do Windows": "Windows lock",
  "Quantas vezes por segundo o teclado avisa o computador. Mais Hz, menos atraso.": "How many times per second the keyboard reports to the computer. More Hz, less delay.", "Desliga a tecla Win para ela não tirar você do jogo.": "Turns off the Win key so it won't take you out of the game.", "Faz o teclado seguir o padrão de teclas do Mac.": "Makes the keyboard follow the Mac key layout.", "Tempo sem uso até o teclado entrar em repouso.": "Idle time before the keyboard goes to sleep.",
  // Erros e mensagens compostas
  "Sem resposta do teclado (cmd 0x{})": "No response from keyboard (cmd 0x{})", "{}...": "{}...", "{}: ok": "{}: ok", "{}: {}": "{}: {}",
};
const DICTS = { en: EN };

const I18N = (() => {
  const key = "aula-lang";
  let lang = "pt";
  try { lang = localStorage.getItem(key) || (navigator.language?.startsWith("pt") ? "pt" : "en"); } catch {}
  if (!LANGS.some(([c]) => c === lang)) lang = "pt";
  const compile = (dict) => {
    const exact = new Map(), patterns = [];
    for (const [k, v] of Object.entries(dict)) {
      if (!/\{n?\}/.test(k)) { exact.set(k, v); continue; }
      // {} aceita qualquer texto; {n} so aceita numero
      const src = k.split(/(\{n?\})/).map((s) => s === "{}" ? "(.+?)" : s === "{n}" ? "(\\d+(?:[.,]\\d+)?)" : s.replace(/[.*+?^$()|[\]\\{}]/g, "\\$&")).join("");
      patterns.push({ re: new RegExp("^" + src + "$", "s"), to: v, weight: k.replace(/\{n?\}/g, "").length });
    }
    patterns.sort((a, b) => b.weight - a.weight); // o modelo mais especifico vem primeiro
    return { exact, patterns };
  };
  const compiled = Object.fromEntries(Object.entries(DICTS).map(([c, d]) => [c, compile(d)]));
  const one = (text, depth) => {
    const d = compiled[lang];
    if (!d || !/\p{L}/u.test(text)) return text;
    const hit = d.exact.get(text);
    if (hit !== undefined) return hit;
    if (depth > 3) return text;
    for (const { re, to } of d.patterns) {
      const m = text.match(re);
      if (!m) continue;
      let i = 1;
      return to.replace(/\{\}/g, () => t(m[i++], depth + 1));
    }
    return text;
  };
  // Mantem os espacos das pontas; texto com varias linhas e traduzido linha a linha.
  function t(text, depth = 0) {
    if (lang === "pt" || !text) return text;
    const fix = (x) => (lang === "en" ? x.replace(/(\d),(\d\d? mm)/g, "$1.$2") : x); // 0,30 mm -> 0.30 mm
    // Quebra de linha que veio do proprio HTML nao separa frases: tenta o texto inteiro primeiro.
    const inteiro = compiled[lang]?.exact.get(text.replace(/\s+/g, " ").trim());
    if (inteiro !== undefined) return text.match(/^\s*/)[0] + fix(inteiro) + text.match(/\s*$/)[0];
    return text.split("\n").map((line) => {
      const m = line.match(/^(\s*)(.*?)(\s*)$/s);
      return m[1] + fix(one(m[2], depth)) + m[3];
    }).join("\n");
  }
  const ATTRS = ["title", "placeholder", "aria-label"];
  const textState = new WeakMap(), attrState = new WeakMap();
  const skipped = (el) => !el || el.closest?.('script,style,[translate="no"]');
  function doText(node) {
    if (skipped(node.parentElement)) return;
    const st = textState.get(node);
    if (st && node.data === st.shown) return;
    const shown = t(node.data);
    textState.set(node, { orig: node.data, shown });
    if (shown !== node.data) node.data = shown;
  }
  function doAttr(el, name) {
    if (skipped(el) || !el.hasAttribute(name)) return;
    const all = attrState.get(el) ?? {}, cur = el.getAttribute(name);
    attrState.set(el, all);
    if (all[name] && cur === all[name].shown) return;
    const shown = t(cur);
    all[name] = { orig: cur, shown };
    if (shown !== cur) el.setAttribute(name, shown);
  }
  function walk(root) {
    if (root.nodeType === 3) return doText(root);
    if (root.nodeType !== 1) return;
    if (root.matches?.('script,style,[translate="no"]')) return;
    ATTRS.forEach((a) => doAttr(root, a));
    for (const c of root.childNodes) walk(c);
  }
  const obs = new MutationObserver((list) => {
    for (const m of list) {
      if (m.type === "characterData") doText(m.target);
      else if (m.type === "attributes") doAttr(m.target, m.attributeName);
      else m.addedNodes.forEach(walk);
    }
  });
  const title = document.title;
  function refresh() { // reaplica tudo a partir do texto original, ao trocar de idioma
    const back = (n) => {
      if (n.nodeType === 3) { const s = textState.get(n); if (s && n.data === s.shown) n.data = s.orig; textState.delete(n); return; }
      if (n.nodeType !== 1) return;
      const a = attrState.get(n);
      if (a) { for (const [k, s] of Object.entries(a)) if (n.getAttribute(k) === s.shown) n.setAttribute(k, s.orig); attrState.delete(n); }
      n.childNodes.forEach(back);
    };
    back(document.body);
    obs.takeRecords();
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
    document.title = t(title);
    walk(document.body);
    obs.takeRecords();
  }
  const set = (c) => { lang = c; try { localStorage.setItem(key, c); } catch {} refresh(); };
  for (const name of ["confirm", "alert"]) { // caixas de mensagem tambem seguem o idioma
    const orig = window[name].bind(window);
    window[name] = (msg) => orig(t(String(msg)));
  }
  function start() {
    const sel = document.getElementById("lang");
    sel.innerHTML = LANGS.map(([c, n]) => `<option value="${c}">${n}</option>`).join("");
    sel.value = lang;
    sel.onchange = () => set(sel.value);
    obs.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    refresh();
  }
  return { t, start };
})();
