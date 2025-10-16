# 🔐 GABARITO - QA Detective v2.0

⚠️ **APENAS PARA INSTRUTORES**

## 📊 Resumo Geral

**Total:** 16 bugs | **Pontuação Máxima:** 160 pontos

---

## 🔐 LOGIN (3 bugs)

### Bug #1: Login aceita senha vazia
**ID:** `login-empty-password` | **Severidade:** 🔴 Alta

**Como Encontrar:** Digite email, deixe senha vazia, clique em Entrar

**Keywords:** `['senha', 'vazia', 'vazio', 'aceita', 'validação', 'campo']`

**Descrição:** Sistema permite login sem senha preenchida. Não há validação de campo obrigatório.

**Código:**
```javascript
// Bug: aceita qualquer entrada sem validar senha
if (!email) { alert('Digite um email!'); return; }
// Falta: if (!password) { alert('Digite senha!'); return; }
```

---

### Bug #2: Erro de digitação no placeholder
**ID:** `login-typo` | **Severidade:** 🟡 Baixa

**Como Encontrar:** Observe o placeholder do campo de email

**Keywords:** `['email', 'emaill', 'typo', 'erro', 'digitação', 'placeholder']`

**Descrição:** Placeholder exibe "Emaill" (com dois L) ao invés de "Email"

**Código:**
```javascript
<input placeholder="Emaill" /> // ❌ Typo
// Correção: <input placeholder="Email" />
```

---

### Bug #3: Mensagem de erro em login bem-sucedido
**ID:** `login-error-message` | **Severidade:** 🔴 Alta

**Como Encontrar:** Faça login com sucesso e observe mensagem vermelha

**Keywords:** `['mensagem', 'erro', 'aparece', 'sucesso', 'login', 'bem-sucedido']`

**Descrição:** Exibe "Erro ao fazer login!" mesmo quando login é bem-sucedido

**Código:**
```javascript
setShowError(true); // ❌ Sempre mostra erro
// Deveria mostrar erro apenas quando login falha
```

---

## 🏪 LOJA (4 bugs)

### Bug #4: Produto duplicado
**ID:** `shop-duplicate` | **Severidade:** 🟡 Média

**Como Encontrar:** Conte quantos "Mouse Gamer" aparecem na lista

**Keywords:** `['duplicado', 'repetido', 'duas vezes', 'mouse', 'gamer']`

**Descrição:** "Mouse Gamer" aparece duas vezes com mesmo nome e preço

**Código:**
```javascript
products = [
  { id: 1, name: 'Mouse Gamer', price: 150 },
  { id: 2, name: 'Teclado Mecânico', price: 350 },
  { id: 3, name: 'Mouse Gamer', price: 150 }, // ❌ Duplicado
]
```

---

### Bug #5: Produto sem nome
**ID:** `shop-undefined` | **Severidade:** 🔴 Alta

**Como Encontrar:** Observe o 4º produto (R$ 200)

**Keywords:** `['indefinido', 'undefined', 'sem nome', 'produto']`

**Descrição:** Produto exibe "Produto indefinido" pois name está undefined

**Código:**
```javascript
{ id: 4, name: undefined, price: 200 } // ❌ name undefined
```

---

### Bug #6: Remover do carrinho não funciona
**ID:** `shop-remove` | **Severidade:** 🔴 Crítica

**Como Encontrar:** Adicione produtos, clique em "Remover"

**Keywords:** `['remover', 'carrinho', 'não funciona', 'remove', 'item']`

**Descrição:** Botão remover não remove item do carrinho

**Código:**
```javascript
const removeFromCart = (index) => {
  const newCart = [...cart];
  setCart(newCart); // ❌ Não remove nada!
};
// Correção: newCart.splice(index, 1);
```

---

### Bug #7: Total multiplica ao invés de somar
**ID:** `shop-total` | **Severidade:** 🔴 Crítica

**Como Encontrar:** Adicione 2 produtos e veja o total absurdo

**Keywords:** `['total', 'soma', 'multiplica', 'cálculo', 'errado']`

**Descrição:** Total usa multiplicação (*) ao invés de soma (+)

**Código:**
```javascript
const getTotal = () => {
  return cart.reduce((acc, item) => acc * item.price, 1); // ❌
};
// Correção: acc + item.price, 0
```

---

## 📋 TAREFAS (3 bugs)

### Bug #8: Tarefa concluída desaparece
**ID:** `task-disappear` | **Severidade:** 🔴 Alta

**Como Encontrar:** Marque checkbox de uma tarefa

**Keywords:** `['desaparece', 'some', 'concluída', 'tarefa', 'marcar']`

**Descrição:** Ao marcar como concluída, tarefa é removida ao invés de marcada

**Código:**
```javascript
const toggleTask = (id) => {
  setTasks(tasks.filter(task => task.id !== id)); // ❌ Remove!
};
// Deveria: marcar completed = true
```

---

### Bug #9: Contador de pendentes errado
**ID:** `task-counter` | **Severidade:** 🟡 Média

**Como Encontrar:** Compare número mostrado com tarefas reais

**Keywords:** `['contador', 'errado', 'número', 'pendente', '+1']`

**Descrição:** Contador sempre mostra +1 além do valor real

**Código:**
```javascript
const pendingCount = tasks.filter(t => !t.completed).length + 1; // ❌
// Correção: remover o + 1
```

---

### Bug #10: Edição não salva
**ID:** `task-edit` | **Severidade:** 🔴 Alta

**Como Encontrar:** Edite título e clique em Salvar

**Keywords:** `['editar', 'título', 'não atualiza', 'salvar']`

**Descrição:** Alteração no título não é persistida ao salvar

**Código:**
```javascript
const saveEdit = () => {
  setEditingId(null); // ❌ Fecha mas não salva!
  setEditText('');
};
// Falta: atualizar o título no array tasks
```

---

## 📊 RELATÓRIO (3 bugs)

### Bug #11: Valores do gráfico trocados
**ID:** `report-swapped` | **Severidade:** 🔴 Alta

**Como Encontrar:** Compare cores com legendas no gráfico

**Keywords:** `['trocado', 'invertido', 'abertos', 'resolvidos', 'gráfico']`

**Descrição:** Barra vermelha mostra Resolvidos, verde mostra Abertos (invertido)

**Código:**
```javascript
<Bar dataKey="resolvidos" fill="#ef4444" name="Abertos" /> // ❌
<Bar dataKey="abertos" fill="#22c55e" name="Resolvidos" /> // ❌
// dataKey e name estão trocados
```

---

### Bug #12: Label do eixo Y cortada
**ID:** `report-label` | **Severidade:** 🟡 Baixa

**Como Encontrar:** Observe números do eixo Y (lateral esquerda)

**Keywords:** `['label', 'cortada', 'eixo', 'y', 'texto']`

**Descrição:** Labels numéricas aparecem cortadas por margem negativa

**Código:**
```javascript
<BarChart data={data} margin={{ left: -20 }}> // ❌ Negativo!
// Correção: margin={{ left: 20 }}
```

---

### Bug #13: KPI Pendentes = Abertos
**ID:** `report-kpi` | **Severidade:** 🟡 Média

**Como Encontrar:** Compare valores dos 3 KPIs no topo

**Keywords:** `['kpi', 'pendentes', 'abertos', 'mesmo valor', 'igual']`

**Descrição:** "Pendentes" e "Abertos" mostram ambos 42 (hardcoded igual)

**Código:**
```javascript
const kpis = {
  abertos: 42,
  resolvidos: 135,
  pendentes: 42, // ❌ Mesmo valor de abertos
};
```

---

## 🧩 QUIZ (3 bugs)

### Bug #14: Respostas corretas contam errado
**ID:** `quiz-wrong-score` | **Severidade:** 🔴 Crítica

**Como Encontrar:** Responda corretamente e veja se pontuação aumenta

**Keywords:** `['resposta', 'correta', 'errada', 'pontuação', 'invertida']`

**Descrição:** Lógica invertida: acerto não soma, erro soma

**Código:**
```javascript
if (index !== questions[currentQuestion].correct) {
  setScore(score + 1); // ❌ Soma quando ERRA!
}
// Deveria: index === correct
```

---

### Bug #15: Pontuação não reseta
**ID:** `quiz-no-reset` | **Severidade:** 🟡 Média

**Como Encontrar:** Complete quiz, reinicie e veja pontuação inicial

**Keywords:** `['reiniciar', 'reset', 'pontuação', 'não zera']`

**Descrição:** Ao reiniciar quiz, pontuação mantém valor anterior

**Código:**
```javascript
const restart = () => {
  setCurrentQuestion(0);
  setFinished(false);
  // ❌ Falta: setScore(0);
};
```

---

### Bug #16: Alternativas duplicadas
**ID:** `quiz-duplicate` | **Severidade:** 🟡 Média

**Como Encontrar:** Leia todas opções da 2ª pergunta

**Keywords:** `['alternativa', 'duplicada', 'repetida', 'idêntica']`

**Descrição:** Segunda pergunta tem duas opções com texto idêntico

**Código:**
```javascript
options: [
  'Não há diferença',
  'Bug é no código, defeito é no comportamento',
  'Defeito é no código, bug é no comportamento',
  'Bug é no código, defeito é no comportamento', // ❌ Duplicada!
]
```

---

## 🎯 Tabela Resumo - Todos os Bugs

| # | Missão | ID | Severidade | Keywords Principais |
|---|--------|-----|------------|---------------------|
| 1 | Login | login-empty-password | 🔴 Alta | senha, vazia, validação |
| 2 | Login | login-typo | 🟡 Baixa | emaill, typo, placeholder |
| 3 | Login | login-error-message | 🔴 Alta | mensagem erro, sucesso |
| 4 | Loja | shop-duplicate | 🟡 Média | duplicado, mouse gamer |
| 5 | Loja | shop-undefined | 🔴 Alta | indefinido, sem nome |
| 6 | Loja | shop-remove | 🔴 Crítica | remover, não funciona |
| 7 | Loja | shop-total | 🔴 Crítica | total, multiplica, soma |
| 8 | Tarefas | task-disappear | 🔴 Alta | desaparece, concluída |
| 9 | Tarefas | task-counter | 🟡 Média | contador, errado, +1 |
| 10 | Tarefas | task-edit | 🔴 Alta | editar, não atualiza |
| 11 | Relatório | report-swapped | 🔴 Alta | trocado, gráfico, valores |
| 12 | Relatório | report-label | 🟡 Baixa | label, cortada, eixo y |
| 13 | Relatório | report-kpi | 🟡 Média | kpi, pendentes, igual |
| 14 | Quiz | quiz-wrong-score | 🔴 Crítica | resposta, invertida |
| 15 | Quiz | quiz-no-reset | 🟡 Média | reiniciar, não zera |
| 16 | Quiz | quiz-duplicate | 🟡 Média | alternativa, duplicada |

---

## 📝 Critérios de Validação

O sistema valida descrições buscando **pelo menos 2 keywords** relacionadas ao bug.

**Exemplo Bug #7 (Total multiplica):**
- Keywords: `['total', 'soma', 'errado', 'multiplica', 'cálculo', 'preço', 'valor']`
- Descrição válida: "O total do carrinho está com cálculo errado, multiplica ao invés de somar"
  - ✅ Contém: "total", "cálculo", "errado", "multiplica", "somar"
  - ✅ 5 keywords encontradas = VÁLIDO (+10 pontos)

- Descrição fraca: "Tem um problema no carrinho"
  - ❌ Contém apenas: "carrinho" (0 keywords específicas)
  - ❌ Muito genérico = INVÁLIDO (-5 pontos)

---

## 🎓 Uso em Treinamentos

### Sugestões de Exercícios:

1. **Individual:** Cada aluno joga e documenta todos bugs
2. **Revisão:** Discutir quais descrições foram válidas/inválidas
3. **Competição:** Quem consegue mais pontos em 30min?
4. **Análise:** Comparar diferentes formas de descrever o mesmo bug

### Para Avaliação de Candidatos:

- Analise: pontuação final, descrições técnicas, atenção aos detalhes
- Considere: bugs críticos encontrados vs bugs cosméticos

---

**📧 Contato:** [ericgenovez@hotmail.com]