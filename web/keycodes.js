// Codigos de funcao de tecla (4 bytes) do app oficial (tabela "Si"), com nomes em portugues.
// Formato do codigo: byte 1 = tipo (00 teclado, 01 mouse, 02 midia, 07 sistema, 0d Fn),
// byte 2 = modificadores (01 Ctrl, 02 Shift, 04 Alt, 08 Win; x10 para os do lado direito),
// bytes 3 e 4 = codigo HID da tecla. 0 = tecla desativada.
// Cada item: [nome na tela, codigo, nome original do app]
window.KEYCODES = [
 {
  "id": "basic_key",
  "name": "Teclas básicas",
  "keys": [
   [
    "Fn",
    218103808,
    "Fn"
   ],
   [
    "Fn1",
    218169344,
    "Fn1"
   ],
   [
    "-_",
    45,
    "-_"
   ],
   [
    ",<",
    54,
    ",<"
   ],
   [
    ";:",
    51,
    ";:"
   ],
   [
    ".>",
    55,
    ".>"
   ],
   [
    "' \"",
    52,
    "' \""
   ],
   [
    "[{",
    47,
    "[{"
   ],
   [
    "]}",
    48,
    "]}"
   ],
   [
    "/?",
    56,
    "/?"
   ],
   [
    "\\ |",
    49,
    "\\ |"
   ],
   [
    "`~",
    53,
    "`~"
   ],
   [
    "=+",
    46,
    "=+"
   ],
   [
    "0",
    39,
    "0"
   ],
   [
    "1",
    30,
    "1"
   ],
   [
    "2",
    31,
    "2"
   ],
   [
    "3",
    32,
    "3"
   ],
   [
    "4",
    33,
    "4"
   ],
   [
    "5",
    34,
    "5"
   ],
   [
    "6",
    35,
    "6"
   ],
   [
    "7",
    36,
    "7"
   ],
   [
    "8",
    37,
    "8"
   ],
   [
    "9",
    38,
    "9"
   ],
   [
    "A",
    4,
    "A"
   ],
   [
    "B",
    5,
    "B"
   ],
   [
    "C",
    6,
    "C"
   ],
   [
    "D",
    7,
    "D"
   ],
   [
    "E",
    8,
    "E"
   ],
   [
    "F",
    9,
    "F"
   ],
   [
    "G",
    10,
    "G"
   ],
   [
    "H",
    11,
    "H"
   ],
   [
    "I",
    12,
    "I"
   ],
   [
    "J",
    13,
    "J"
   ],
   [
    "K",
    14,
    "K"
   ],
   [
    "L",
    15,
    "L"
   ],
   [
    "M",
    16,
    "M"
   ],
   [
    "N",
    17,
    "N"
   ],
   [
    "O",
    18,
    "O"
   ],
   [
    "P",
    19,
    "P"
   ],
   [
    "Q",
    20,
    "Q"
   ],
   [
    "R",
    21,
    "R"
   ],
   [
    "S",
    22,
    "S"
   ],
   [
    "T",
    23,
    "T"
   ],
   [
    "U",
    24,
    "U"
   ],
   [
    "V",
    25,
    "V"
   ],
   [
    "W",
    26,
    "W"
   ],
   [
    "X",
    27,
    "X"
   ],
   [
    "Y",
    28,
    "Y"
   ],
   [
    "Z",
    29,
    "Z"
   ],
   [
    "Alt esq.",
    262144,
    "L_Alt"
   ],
   [
    "Backspace",
    42,
    "Backspace"
   ],
   [
    "Caps Lock",
    57,
    "Caps"
   ],
   [
    "Ctrl esq.",
    65536,
    "L_Ctrl"
   ],
   [
    "Delete",
    76,
    "Delete"
   ],
   [
    "↓",
    81,
    "Down"
   ],
   [
    "End",
    77,
    "End"
   ],
   [
    "Enter",
    40,
    "Enter"
   ],
   [
    "Esc",
    41,
    "Esc"
   ],
   [
    "F1",
    58,
    "F1"
   ],
   [
    "F2",
    59,
    "F2"
   ],
   [
    "F3",
    60,
    "F3"
   ],
   [
    "F4",
    61,
    "F4"
   ],
   [
    "F5",
    62,
    "F5"
   ],
   [
    "F6",
    63,
    "F6"
   ],
   [
    "F7",
    64,
    "F7"
   ],
   [
    "F8",
    65,
    "F8"
   ],
   [
    "F9",
    66,
    "F9"
   ],
   [
    "F10",
    67,
    "F10"
   ],
   [
    "F11",
    68,
    "F11"
   ],
   [
    "F12",
    69,
    "F12"
   ],
   [
    "PrtSc",
    70,
    "PrtSc"
   ],
   [
    "Home",
    74,
    "Home"
   ],
   [
    "Insert",
    73,
    "Insert"
   ],
   [
    "←",
    80,
    "Left"
   ],
   [
    "Win esq.",
    524288,
    "L_WIN"
   ],
   [
    "Num -",
    86,
    "Num -"
   ],
   [
    "Num *",
    85,
    "Num *"
   ],
   [
    "Num /",
    84,
    "Num /"
   ],
   [
    "Num +",
    87,
    "Num +"
   ],
   [
    "Num 0",
    98,
    "Num 0"
   ],
   [
    "Num 1",
    89,
    "Num 1"
   ],
   [
    "Num 2",
    90,
    "Num 2"
   ],
   [
    "Num 3",
    91,
    "Num 3"
   ],
   [
    "Num 4",
    92,
    "Num 4"
   ],
   [
    "Num 5",
    93,
    "Num 5"
   ],
   [
    "Num 6",
    94,
    "Num 6"
   ],
   [
    "Num 7",
    95,
    "Num 7"
   ],
   [
    "Num 8",
    96,
    "Num 8"
   ],
   [
    "Num 9",
    97,
    "Num 9"
   ],
   [
    "Num Del",
    99,
    "Num Del"
   ],
   [
    "Num Enter",
    88,
    "Num Enter"
   ],
   [
    "Num Lock",
    83,
    "Num Lock"
   ],
   [
    "PgDn",
    78,
    "PgDn"
   ],
   [
    "PgUp",
    75,
    "PgUp"
   ],
   [
    "Pause",
    72,
    "Pause"
   ],
   [
    "→",
    79,
    "Right"
   ],
   [
    "Alt dir.",
    4194304,
    "R_Alt"
   ],
   [
    "Ctrl dir.",
    1048576,
    "R_Ctrl"
   ],
   [
    "Shift dir.",
    2097152,
    "R_Shift"
   ],
   [
    "Win dir.",
    8388608,
    "R_WIN"
   ],
   [
    "Scroll Lock",
    71,
    "Scroll Lock"
   ],
   [
    "Shift esq.",
    131072,
    "L_Shift"
   ],
   [
    "Space",
    44,
    "Space"
   ],
   [
    "Tab",
    43,
    "Tab"
   ],
   [
    "Menu (App)",
    101,
    "App"
   ],
   [
    "↑",
    82,
    "Up"
   ]
  ]
 },
 {
  "id": "mouse",
  "name": "Mouse",
  "keys": [
   [
    "Desativar tecla",
    0,
    "empty_button"
   ],
   [
    "Clique esquerdo",
    16843008,
    "left_button"
   ],
   [
    "Clique direito",
    16908544,
    "right_button"
   ],
   [
    "Clique do meio",
    16974080,
    "mid_button"
   ],
   [
    "Avançar (mouse)",
    17105152,
    "forward"
   ],
   [
    "Voltar (mouse)",
    17039616,
    "back"
   ]
  ]
 },
 {
  "id": "edit",
  "name": "Edição",
  "keys": [
   [
    "Ctrl + .",
    79616,
    "Ctrl + ."
   ],
   [
    "Ctrl + ;",
    78592,
    "Ctrl + ;"
   ],
   [
    "Ctrl + 0 (zoom normal)",
    75520,
    "Ctrl + 0"
   ],
   [
    "Ctrl + O (abrir)",
    70144,
    "Ctrl + O"
   ],
   [
    "Ctrl + A (selecionar tudo)",
    66560,
    "Ctrl + A"
   ],
   [
    "Ctrl + C (copiar)",
    67072,
    "Ctrl + C"
   ],
   [
    "Ctrl + F (pesquisar)",
    67840,
    "Ctrl + F"
   ],
   [
    "Ctrl + N (novo)",
    69888,
    "Ctrl + N"
   ],
   [
    "Ctrl + S (salvar)",
    71168,
    "Ctrl + S"
   ],
   [
    "Ctrl + T (nova aba)",
    71424,
    "Ctrl + T"
   ],
   [
    "Ctrl + V (colar)",
    71936,
    "Ctrl + V"
   ],
   [
    "Ctrl + W (fechar aba)",
    72192,
    "Ctrl + W"
   ],
   [
    "Ctrl + X (recortar)",
    72448,
    "Ctrl + X"
   ],
   [
    "Ctrl + Y (refazer)",
    72704,
    "Ctrl + Y"
   ],
   [
    "Ctrl + Z (desfazer)",
    72960,
    "Ctrl + Z"
   ]
  ]
 },
 {
  "id": "navigation",
  "name": "Navegação",
  "keys": [
   [
    "Alt + Left (voltar)",
    282624,
    "Alt + Left"
   ],
   [
    "Alt + Right (avançar)",
    282368,
    "Alt + Right"
   ]
  ]
 },
 {
  "id": "windows",
  "name": "Windows",
  "keys": [
   [
    "Win + tab (visão de tarefas)",
    535296,
    "LWin + tab"
   ],
   [
    "Win + D (mostrar área de trabalho)",
    526080,
    "LWin + D"
   ],
   [
    "Win + Ctrl + Enter (narrador)",
    612352,
    "LWin + Ctrl + Enter"
   ],
   [
    "Win + T (percorrer barra de tarefas)",
    530176,
    "LWin + T"
   ],
   [
    "Win + A (central de ações)",
    525312,
    "LWin + A"
   ],
   [
    "Win + E (explorador de arquivos)",
    526336,
    "LWin + E"
   ],
   [
    "Win + I (configurações)",
    527360,
    "LWin + I"
   ],
   [
    "Win + L (bloquear tela)",
    528128,
    "LWin + L"
   ],
   [
    "Win + K (conectar tela sem fio)",
    527872,
    "LWin + K"
   ],
   [
    "Win + B (bandeja do sistema)",
    525568,
    "LWin + B"
   ],
   [
    "Win + G (barra de jogo Xbox)",
    526848,
    "LWin + G"
   ],
   [
    "Win + R (executar)",
    529664,
    "LWin + R"
   ],
   [
    "Win + S (pesquisar)",
    529920,
    "LWin + S"
   ],
   [
    "Win + U (acessibilidade)",
    530432,
    "LWin + U"
   ],
   [
    "Win + X (menu rápido)",
    531200,
    "LWin + X"
   ],
   [
    "Win + P (projetar tela)",
    524307,
    "LWin + P"
   ],
   [
    "Win + . (emojis)",
    538368,
    "LWin + ."
   ],
   [
    "Win + = (lupa)",
    536064,
    "LWin + ="
   ]
  ]
 },
 {
  "id": "efficiency",
  "name": "Produtividade",
  "keys": [
   [
    "Ctrl + Shift + Esc (gerenciador de tarefas)",
    207104,
    "Ctrl + Shift + Esc"
   ],
   [
    "Ctrl + ESC (menu iniciar)",
    65577,
    "Ctrl + ESC"
   ],
   [
    "Alt + Tab (alternar janelas)",
    273152,
    "Alt + Tab"
   ],
   [
    "Alt + F4 (fechar programa)",
    277760,
    "Alt + F4"
   ],
   [
    "Alt + ESC (próxima janela)",
    272640,
    "Alt + ESC"
   ]
  ]
 },
 {
  "id": "system_edit",
  "name": "Editar",
  "keys": [
   [
    "Recortar",
    72448,
    "cut"
   ],
   [
    "Copiar",
    67072,
    "copy"
   ],
   [
    "Colar",
    71936,
    "paste"
   ],
   [
    "Desfazer",
    72960,
    "revoke"
   ]
  ]
 },
 {
  "id": "system_multimedia",
  "name": "Multimídia",
  "keys": [
   [
    "Tocar / pausar",
    33554637,
    "play_pause"
   ],
   [
    "Abrir player",
    33554819,
    "system_multimedia"
   ],
   [
    "Mudo",
    33554658,
    "mute"
   ],
   [
    "Parar",
    33554615,
    "pause"
   ],
   [
    "Faixa anterior",
    33554614,
    "previous_song"
   ],
   [
    "Próxima faixa",
    33554613,
    "next_song"
   ],
   [
    "Volume +",
    33554665,
    "volume_up"
   ],
   [
    "Volume −",
    33554666,
    "volume_down"
   ]
  ]
 },
 {
  "id": "system_tools",
  "name": "Ferramentas",
  "keys": [
   [
    "Modo Windows",
    117440526,
    "Win"
   ],
   [
    "Modo Mac",
    117440527,
    "Mac"
   ],
   [
    "Navegador",
    33554979,
    "browser"
   ],
   [
    "Calculadora",
    33554834,
    "calculator"
   ],
   [
    "E-mail",
    33554826,
    "email"
   ],
   [
    "Meu computador",
    33554836,
    "my_computer"
   ],
   [
    "Favoritos",
    33554986,
    "favorite"
   ]
  ]
 },
 {
  "id": "system_action",
  "name": "Ações do sistema",
  "keys": [
   [
    "Fechar janela",
    277760,
    "close_windows"
   ],
   [
    "Bloquear PC",
    528128,
    "lock_computer"
   ],
   [
    "Mais zoom",
    77312,
    "zoom_in"
   ],
   [
    "Menos zoom",
    77056,
    "zoom_out"
   ],
   [
    "Mostrar área de trabalho",
    526080,
    "show_desktop"
   ],
   [
    "Gerenciador de tarefas",
    347136,
    "task_manager"
   ],
   [
    "Salvar",
    71168,
    "save"
   ],
   [
    "Brilho da tela +",
    33554543,
    "screen_bright_up"
   ],
   [
    "Brilho da tela −",
    33554544,
    "screen_bright_down"
   ]
  ]
 }
];

// Teclas que uma macro pode usar (tabela "l4" do app oficial), pelo nome que o navegador da
// a tecla (KeyboardEvent.code; MouseKeyN = botao N do mouse). Valor: [codigo, tipo], tipo 0 = tecla,
// 1 = modificador (Ctrl/Shift/Alt/Win), 2 = botao do mouse.
window.MACRO_KEYS = {"MouseKey0":[1,2],"MouseKey1":[4,2],"MouseKey2":[2,2],"MouseKey3":[8,2],"MouseKey4":[16,2],"Escape":[41,0],"F1":[58,0],"F2":[59,0],"F3":[60,0],"F4":[61,0],"F5":[62,0],"F6":[63,0],"F7":[64,0],"F8":[65,0],"F9":[66,0],"F10":[67,0],"F11":[68,0],"F12":[69,0],"Delete":[76,0],"Home":[74,0],"End":[77,0],"PageUp":[75,0],"PageDown":[78,0],"Backquote":[53,0],"Digit1":[30,0],"Digit2":[31,0],"Digit3":[32,0],"Digit4":[33,0],"Digit5":[34,0],"Digit6":[35,0],"Digit7":[36,0],"Digit8":[37,0],"Digit9":[38,0],"Digit0":[39,0],"Minus":[45,0],"Equal":[46,0],"Backspace":[42,0],"NumLock":[83,0],"NumpadDivide":[84,0],"NumpadMultiply":[85,0],"NumpadSubtract":[86,0],"Tab":[43,0],"KeyQ":[20,0],"KeyW":[26,0],"KeyE":[8,0],"KeyR":[21,0],"KeyT":[23,0],"KeyY":[28,0],"KeyU":[24,0],"KeyI":[12,0],"KeyO":[18,0],"KeyP":[19,0],"BracketLeft":[47,0],"BracketRight":[48,0],"Backslash":[49,0],"Numpad7":[95,0],"Numpad8":[96,0],"Numpad9":[97,0],"NumpadAdd":[87,0],"CapsLock":[57,0],"KeyA":[4,0],"KeyS":[22,0],"KeyD":[7,0],"KeyF":[9,0],"KeyG":[10,0],"KeyH":[11,0],"KeyJ":[13,0],"KeyK":[14,0],"KeyL":[15,0],"Semicolon":[51,0],"Quote":[52,0],"Enter":[40,0],"Numpad4":[92,0],"Numpad5":[93,0],"Numpad6":[94,0],"ShiftLeft":[225,1],"KeyZ":[29,0],"KeyX":[27,0],"KeyC":[6,0],"KeyV":[25,0],"KeyB":[5,0],"KeyN":[17,0],"KeyM":[16,0],"Comma":[54,0],"Period":[55,0],"Slash":[56,0],"PrintScreen":[70,0],"ScrollLock":[71,0],"Pause":[72,0],"Insert":[73,0],"ShiftRight":[229,1],"ArrowUp":[82,0],"Numpad1":[89,0],"Numpad2":[90,0],"Numpad3":[91,0],"NumpadEnter":[88,0],"ControlLeft":[224,1],"MetaLeft":[227,1],"ContextMenu":[231,1],"AltLeft":[226,1],"Space":[44,0],"AltRight":[230,1],"ControlRight":[228,1],"ArrowLeft":[80,0],"ArrowDown":[81,0],"ArrowRight":[79,0],"Numpad0":[98,0],"NumpadDecimal":[99,0]};
window.MACRO_KEY_NAMES = {"MouseKey0":"Clique esquerdo","MouseKey1":"Clique do meio","MouseKey2":"Clique direito","MouseKey3":"Mouse voltar","MouseKey4":"Mouse avançar","ControlLeft":"Ctrl esq.","ControlRight":"Ctrl dir.","ShiftLeft":"Shift esq.","ShiftRight":"Shift dir.","AltLeft":"Alt esq.","AltRight":"Alt dir.","MetaLeft":"Win","ContextMenu":"Menu","ArrowUp":"↑","ArrowDown":"↓","ArrowLeft":"←","ArrowRight":"→","Escape":"Esc","Space":"Espaço","Backquote":"`","Minus":"-","Equal":"=","BracketLeft":"[","BracketRight":"]","Backslash":"\\","Semicolon":";","Quote":"'","Comma":",","Period":".","Slash":"/","CapsLock":"Caps Lock","PageUp":"PgUp","PageDown":"PgDn","PrintScreen":"PrtSc"};
window.macroKeyName = (code) => MACRO_KEY_NAMES[code] ?? code.replace(/^Key|^Digit/, "").replace(/^Numpad/, "Num ");
