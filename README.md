# 🕵️ QA Detective: The Training Game v1.0

Jogo de treinamento gamificado para QAs. Encontre bugs escondidos e **documente-os corretamente** para ganhar pontos.

## 🎯 Objetivo

- Explorar o sistema e encontrar 16 bugs intencionais
- Preencher relatório completo de cada bug
- Sistema valida sua descrição por palavras-chave
- **+10 pontos** para descrições técnicas válidas
- **-5 pontos** para descrições genéricaas

## 🚀 Como Executar o Projeto

Siga os passos abaixo para instalar e rodar a aplicação em sua máquina local.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/ericgenovez/qa-detective-game.git
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd qa-detective-game
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie a aplicação em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173` (ou na porta indicada pelo Vite).

---


## 🎮 Como Jogar

1. **Explore** cada missão cuidadosamente
2. **Identifique** comportamentos estranhos
3. **Clique** no botão 🐛 Bug #X
4. **Preencha** o formulário completo:
   - Descrição técnica do bug
   - Passos para reproduzir
   - Resultado esperado vs obtido
5. **Use termos técnicos específicos!**

## 📊 Missões e Bugs

| Missão | Bugs | Dificuldade |
|--------|------|-------------|
| 🔐 Login | 3 | Fácil |
| 🏪 Loja | 4 | Média |
| 📋 Tarefas | 3 | Média |
| 📊 Relatório | 3 | Média |
| 🧩 Quiz | 3 | Difícil |

**Total:** 16 bugs | **Pontuação Máxima:** 160 pontos

## ✅ Exemplo de Descrição Válida
```
🐛 DESCRIÇÃO:
O campo de senha não valida entrada vazia. Sistema aceita
login sem senha preenchida, violando regras de segurança.

🔄 PASSOS:
1. Digite email válido
2. Deixe senha vazia
3. Clique em "Entrar"

✅ ESPERADO: Bloquear login e exibir erro de validação
❌ OBTIDO: Login aceito com senha vazia
```

## ❌ Exemplo de Descrição Fraca
```
"Tem um erro aqui"
"Não funciona direito"
"Algo está estranho"
```

**Por quê?** Muito genérico, sem termos técnicos, não descreve o problema.

## 💡 Dicas Importantes

- ✅ Use vocabulário técnico (validação, comportamento, cálculo, etc.)
- ✅ Seja específico sobre o que está errado
- ✅ Liste passos claros e reproduzíveis
- ✅ Compare esperado vs obtido
- ❌ Evite descrições genéricas tipo "não funciona"

## 📁 Estrutura do Projeto
```
qa-detective-game/
├── src/
│   ├── App.jsx           # Código principal
│   ├── index.css         # Estilos Tailwind
│   └── main.jsx          # Entry point
├── GABARITO/             # ⚠️ Apenas para instrutores
│   └── README_GABARITO.md
├── package.json
└── README.md
```

## 🛠️ Comandos Úteis
```bash
npm run dev          # Iniciar (http://localhost:5173)
npm run build        # Build produção
Ctrl + C             # Parar servidor
```

## 🎓 Para Instrutores

- Gabarito completo em `gabarito/README_GABARITO.md`
- Keywords de validação de cada bug
- Use como avaliação prática em processos seletivos
- Material de apoio para treinamentos

## 📚 Tecnologias

React 18 · Vite · Tailwind CSS · Framer Motion · Recharts · Lucide React

---

**⚠️ NÃO OLHE O GABARITO ANTES DE JOGAR!**

O aprendizado vem da descoberta. Gabarito é apenas para instrutores e conferência pós-jogo.
