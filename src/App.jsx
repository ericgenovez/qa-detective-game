import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, CheckCircle, BarChart3, Brain, Bug, Trophy, Home, AlertCircle, X, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// ========================================
// BASE DE DADOS DOS BUGS COM KEYWORDS
// ========================================
const BUGS_DATABASE = {
  'login-empty-password': {
    keywords: ['senha', 'vazia', 'vazio', 'empty', 'aceita', 'permite', 'validação', 'campo'],
    title: 'Login aceita senha vazia',
    hint: 'Tente fazer login sem preencher a senha...'
  },
  'login-typo': {
    keywords: ['email', 'emaill', 'typo', 'erro', 'digitação', 'placeholder', 'escrito'],
    title: 'Erro de digitação no placeholder',
    hint: 'Observe atentamente o texto dentro do campo de email...'
  },
  'login-error-message': {
    keywords: ['mensagem', 'erro', 'aparece', 'sucesso', 'login', 'bem-sucedido', 'vermelho', 'alerta'],
    title: 'Mensagem de erro aparece incorretamente',
    hint: 'Faça login com sucesso e observe as mensagens...'
  },
  'shop-duplicate': {
    keywords: ['duplicado', 'repetido', 'duas vezes', 'mouse', 'gamer', 'produto', 'lista'],
    title: 'Produto duplicado na lista',
    hint: 'Conte quantos "Mouse Gamer" aparecem na lista...'
  },
  'shop-undefined': {
    keywords: ['indefinido', 'undefined', 'sem nome', 'produto', 'nome', 'vazio'],
    title: 'Produto sem nome',
    hint: 'Verifique se todos os produtos têm um nome válido...'
  },
  'shop-remove': {
    keywords: ['remover', 'carrinho', 'não', 'funciona', 'remove', 'item', 'deletar', 'excluir'],
    title: 'Remover do carrinho não funciona',
    hint: 'Adicione produtos e tente removê-los do carrinho...'
  },
  'shop-total': {
    keywords: ['total', 'soma', 'errado', 'multiplica', 'cálculo', 'preço', 'valor', 'incorreto'],
    title: 'Total do carrinho calcula errado',
    hint: 'Adicione 2 produtos e verifique se o total está correto...'
  },
  'task-disappear': {
    keywords: ['desaparece', 'some', 'concluída', 'tarefa', 'marcar', 'checkbox', 'completa'],
    title: 'Tarefa concluída desaparece',
    hint: 'Marque uma tarefa como concluída e veja o que acontece...'
  },
  'task-counter': {
    keywords: ['contador', 'errado', 'número', 'pendente', 'contagem', '+1', 'mais'],
    title: 'Contador de tarefas errado',
    hint: 'Compare o número mostrado com a quantidade real de tarefas pendentes...'
  },
  'task-edit': {
    keywords: ['editar', 'título', 'não', 'atualiza', 'salvar', 'texto', 'modificar'],
    title: 'Edição de tarefa não salva',
    hint: 'Tente editar o título de uma tarefa e salvar...'
  },
  'report-swapped': {
    keywords: ['trocado', 'invertido', 'abertos', 'resolvidos', 'gráfico', 'cor', 'valores'],
    title: 'Valores do gráfico trocados',
    hint: 'Verifique se as cores correspondem às legendas corretas...'
  },
  'report-label': {
    keywords: ['label', 'cortada', 'cortado', 'eixo', 'y', 'texto', 'visível'],
    title: 'Label do eixo Y cortada',
    hint: 'Observe o lado esquerdo do gráfico...'
  },
  'report-kpi': {
    keywords: ['kpi', 'pendentes', 'abertos', 'mesmo', 'valor', 'igual', 'duplicado'],
    title: 'KPI Pendentes com valor errado',
    hint: 'Compare os valores dos três KPIs no topo...'
  },
  'quiz-wrong-score': {
    keywords: ['resposta', 'correta', 'errada', 'pontuação', 'invertida', 'score', 'acerto'],
    title: 'Respostas corretas contam como erradas',
    hint: 'Responda corretamente e veja se a pontuação aumenta...'
  },
  'quiz-no-reset': {
    keywords: ['reiniciar', 'reset', 'pontuação', 'não', 'zera', 'mantém', 'limpar'],
    title: 'Pontuação não reseta ao reiniciar',
    hint: 'Complete o quiz, reinicie e veja a pontuação inicial...'
  },
  'quiz-duplicate': {
    keywords: ['alternativa', 'duplicada', 'repetida', 'duas', 'idêntica', 'opção', 'resposta'],
    title: 'Alternativas duplicadas no quiz',
    hint: 'Leia todas as opções de resposta da segunda pergunta...'
  }
};

// ========================================
// COMPONENTE MODAL DE REPORT DE BUG
// ========================================
function BugReportModal({ isOpen, onClose, bugId, onSubmit }) {
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState('');
  const [expected, setExpected] = useState('');
  const [obtained, setObtained] = useState('');
  const [showHint, setShowHint] = useState(false);

  const bugData = BUGS_DATABASE[bugId];

  const handleSubmit = () => {
    if (!description.trim() || !steps.trim() || !expected.trim() || !obtained.trim()) {
      alert('⚠️ Preencha todos os campos para reportar o bug!');
      return;
    }

    // Validação: verifica se a descrição contém palavras-chave do bug real
    const combinedText = (description + ' ' + steps + ' ' + expected + ' ' + obtained).toLowerCase();
    const foundKeywords = bugData.keywords.filter(keyword =>
      combinedText.includes(keyword.toLowerCase())
    );

    // Precisa de pelo menos 2 palavras-chave para considerar válido
    const isValid = foundKeywords.length >= 2;

    onSubmit(isValid, {
      description,
      steps,
      expected,
      obtained,
      foundKeywords: foundKeywords.length
    });

    // Limpar formulário
    setDescription('');
    setSteps('');
    setExpected('');
    setObtained('');
    setShowHint(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-yellow-400"
      >
        {/* Header */}
        <div className="bg-yellow-400 text-black p-4 flex justify-between items-center sticky top-0">
          <div className="flex items-center gap-2">
            <Bug size={24} />
            <h2 className="text-xl font-bold">Reportar Bug</h2>
          </div>
          <button onClick={onClose} className="hover:bg-yellow-500 p-2 rounded">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-white">
          {/* Hint */}
          <div className="bg-blue-600 bg-opacity-20 border border-blue-500 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-blue-400">💡 Dica de Investigação:</h3>
              <button
                onClick={() => setShowHint(!showHint)}
                className="bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                {showHint ? 'Ocultar' : 'Ver Dica'}
              </button>
            </div>
            {showHint && (
              <p className="text-sm text-gray-300 mt-2">{bugData.hint}</p>
            )}
          </div>

          {/* Instruções */}
          <div className="bg-purple-600 bg-opacity-20 border border-purple-500 p-4 rounded-lg">
            <h3 className="font-bold text-purple-400 mb-2">📝 Instruções:</h3>
            <p className="text-sm text-gray-300">
              Descreva o bug que você encontrou. Seja específico e use termos técnicos relacionados ao problema.
              <strong> Sua descrição será validada automaticamente!</strong>
            </p>
          </div>

          {/* Formulário */}
          <div className="space-y-4">
            {/* Descrição */}
            <div>
              <label className="block font-bold mb-2">🐛 Descrição do Bug:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: O campo de email aceita entrada vazia sem validação..."
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-gray-600 focus:border-yellow-400 focus:outline-none min-h-[80px] text-white"
              />
            </div>

            {/* Passos para Reproduzir */}
            <div>
              <label className="block font-bold mb-2">🔄 Passos para Reproduzir:</label>
              <textarea
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="Ex: 1. Acesse a tela de login&#10;2. Deixe o campo senha vazio&#10;3. Clique em Entrar"
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-gray-600 focus:border-yellow-400 focus:outline-none min-h-[100px] text-white"
              />
            </div>

            {/* Resultado Esperado */}
            <div>
              <label className="block font-bold mb-2">✅ Resultado Esperado:</label>
              <textarea
                value={expected}
                onChange={(e) => setExpected(e.target.value)}
                placeholder="Ex: Sistema deve exibir mensagem de erro e bloquear o login"
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-gray-600 focus:border-yellow-400 focus:outline-none min-h-[60px] text-white"
              />
            </div>

            {/* Resultado Obtido */}
            <div>
              <label className="block font-bold mb-2">❌ Resultado Obtido:</label>
              <textarea
                value={obtained}
                onChange={(e) => setObtained(e.target.value)}
                placeholder="Ex: Sistema permite login mesmo sem senha preenchida"
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-gray-600 focus:border-yellow-400 focus:outline-none min-h-[60px] text-white"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2"
            >
              <FileText size={20} />
              Enviar Relatório
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white font-bold py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ========================================
// COMPONENTE PRINCIPAL - APP
// ========================================
function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [bugsFound, setBugsFound] = useState([]);
  const [showBugReport, setShowBugReport] = useState(false);
  const [currentBugId, setCurrentBugId] = useState(null);
  const [bugReports, setBugReports] = useState([]);

  // Função para abrir modal de report
  const openBugReport = (bugId) => {
    if (bugsFound.includes(bugId)) {
      alert('🔒 Você já reportou este bug!');
      return;
    }
    setCurrentBugId(bugId);
    setShowBugReport(true);
  };

  // Função para processar report de bug
  const handleBugReport = (isValid, reportData) => {
    const bugId = currentBugId;
    const bugInfo = BUGS_DATABASE[bugId];

    setBugsFound([...bugsFound, bugId]);
    setBugReports([...bugReports, { bugId, ...reportData, isValid, timestamp: new Date() }]);

    if (isValid) {
      setPoints(points + 10);
      alert(`✅ Bug Válido Confirmado!\n\n"${bugInfo.title}"\n\n+10 pontos\n\n🎯 Palavras-chave identificadas: ${reportData.foundKeywords}`);
    } else {
      setPoints(points - 5);
      alert(`❌ Descrição Insuficiente!\n\nO bug existe, mas sua descrição não foi específica o suficiente.\n\n-5 pontos\n\n💡 Dica: Use termos mais técnicos e específicos relacionados ao problema.`);
    }

    setShowBugReport(false);
    setCurrentBugId(null);
  };

  // Reset do jogo
  const resetGame = () => {
    setPoints(0);
    setBugsFound([]);
    setBugReports([]);
    setCurrentScreen('mission-map');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header com pontuação */}
      {currentScreen !== 'login' && (
        <div className="bg-black bg-opacity-30 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bug className="text-yellow-400" />
            <span className="font-bold text-xl">QA Detective</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-400" />
              <span className="font-bold">{points} pontos</span>
            </div>
            <div className="flex items-center gap-2">
              <Bug className="text-red-400" />
              <span>{bugsFound.length}/16 bugs</span>
            </div>
            {currentScreen !== 'mission-map' && (
              <button
                onClick={() => setCurrentScreen('mission-map')}
                className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
              >
                <Home size={16} />
                Mapa
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal de Report de Bug */}
      <AnimatePresence>
        {showBugReport && (
          <BugReportModal
            isOpen={showBugReport}
            onClose={() => {
              setShowBugReport(false);
              setCurrentBugId(null);
            }}
            bugId={currentBugId}
            onSubmit={handleBugReport}
          />
        )}
      </AnimatePresence>

      {/* Renderização condicional das telas */}
      <AnimatePresence mode="wait">
        {currentScreen === 'login' && (
          <LoginScreen onLogin={(email) => {
            setUser(email);
            setCurrentScreen('mission-map');
          }} reportBug={openBugReport} />
        )}

        {currentScreen === 'mission-map' && (
          <MissionMap setCurrentScreen={setCurrentScreen} />
        )}

        {currentScreen === 'shop' && (
          <BuggyShop reportBug={openBugReport} />
        )}

        {currentScreen === 'tasks' && (
          <TaskPanel reportBug={openBugReport} />
        )}

        {currentScreen === 'report' && (
          <StatusReport reportBug={openBugReport} />
        )}

        {currentScreen === 'quiz' && (
          <QAQuiz reportBug={openBugReport} />
        )}

        {currentScreen === 'endgame' && (
          <EndGame points={points} bugsFound={bugsFound.length} resetGame={resetGame} bugReports={bugReports} />
        )}
      </AnimatePresence>

      {/* Botão flutuante de ajuda */}
      <div className="fixed bottom-6 right-6 bg-gray-900 p-4 rounded-lg shadow-2xl border border-yellow-500 max-w-sm">
        <h3 className="font-bold mb-2 text-yellow-400 flex items-center gap-2">
          <Bug size={20} />
          Como reportar bugs:
        </h3>
        <ul className="text-sm space-y-1 text-gray-300">
          <li>🔍 Explore e teste cada funcionalidade</li>
          <li>🐛 Encontre comportamentos estranhos</li>
          <li>📝 Clique no botão de reportar</li>
          <li>✍️ Descreva detalhadamente o bug</li>
          <li>⚠️ Use termos técnicos específicos!</li>
        </ul>
      </div>
    </div>
  );
}

// ========================================
// TELA DE LOGIN
// ========================================
function LoginScreen({ onLogin, reportBug }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const handleLogin = () => {
    if (!email) {
      alert('Digite um email!');
      return;
    }

    setShowError(true);
    setTimeout(() => {
      onLogin(email);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen p-4"
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="text-center mb-8">
          <Bug size={64} className="mx-auto mb-4 text-yellow-400" />
          <h1 className="text-4xl font-bold mb-2">QA Detective</h1>
          <p className="text-gray-300">The Training Game v1.0</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Emaill"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-gray-400 focus:border-yellow-400 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-gray-400 focus:border-yellow-400 focus:outline-none"
          />

          {showError && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 p-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={20} />
              <span>Erro ao fazer login!</span>
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-all"
          >
            Entrar no jogo
          </button>

          <div className="grid grid-cols-3 gap-2 mt-6">
            <button
              onClick={() => reportBug('login-empty-password')}
              className="bg-red-600 py-2 px-2 rounded text-xs hover:bg-red-700 flex flex-col items-center gap-1"
            >
              <Bug size={16} />
              <span>Bug #1</span>
            </button>
            <button
              onClick={() => reportBug('login-typo')}
              className="bg-red-600 py-2 px-2 rounded text-xs hover:bg-red-700 flex flex-col items-center gap-1"
            >
              <Bug size={16} />
              <span>Bug #2</span>
            </button>
            <button
              onClick={() => reportBug('login-error-message')}
              className="bg-red-600 py-2 px-2 rounded text-xs hover:bg-red-700 flex flex-col items-center gap-1"
            >
              <Bug size={16} />
              <span>Bug #3</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ========================================
// MAPA DE MISSÕES
// ========================================
function MissionMap({ setCurrentScreen }) {
  const missions = [
    { id: 'shop', icon: ShoppingCart, title: 'Loja Bugada', color: 'bg-green-600', bugs: 4 },
    { id: 'tasks', icon: CheckCircle, title: 'Painel de Tarefas', color: 'bg-blue-600', bugs: 3 },
    { id: 'report', icon: BarChart3, title: 'Relatório de Status', color: 'bg-purple-600', bugs: 3 },
    { id: 'quiz', icon: Brain, title: 'Quiz de QA', color: 'bg-pink-600', bugs: 3 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen p-4"
    >
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-4">Escolha sua Missão</h1>
        <p className="text-center text-gray-300 mb-12">Cada missão contém bugs escondidos. Encontre-os e reporte!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {missions.map((mission, index) => (
            <motion.button
              key={mission.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setCurrentScreen(mission.id)}
              className={`${mission.color} p-8 rounded-2xl shadow-2xl hover:scale-105 transition-all relative`}
            >
              <div className="absolute top-4 right-4 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-sm">
                {mission.bugs} bugs
              </div>
              <mission.icon size={64} className="mx-auto mb-4" />
              <h2 className="text-2xl font-bold">{mission.title}</h2>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ========================================
// MISSÃO 1 - LOJA BUGADA
// ========================================
function BuggyShop({ reportBug }) {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: 'Mouse Gamer', price: 150 },
    { id: 2, name: 'Teclado Mecânico', price: 350 },
    { id: 3, name: 'Mouse Gamer', price: 150 },
    { id: 4, name: undefined, price: 200 },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    setCart(newCart);
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => acc * item.price, 1);
  };

  return (
    <motion.div
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      exit={{ x: 1000 }}
      className="p-8 max-w-6xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8">🏪 Loja Bugada</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product, index) => (
              <div key={index} className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">
                  {product.name || 'Produto indefinido'}
                </h3>
                <p className="text-2xl text-yellow-400 mb-4">R$ {product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-green-600 py-2 rounded hover:bg-green-700"
                >
                  Adicionar ao carrinho
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white bg-opacity-10 p-6 rounded-lg h-fit">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <ShoppingCart />
            Carrinho
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-400">Carrinho vazio</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-2 pb-2 border-b border-gray-600">
                  <span>{item.name || 'Produto'}</span>
                  <div className="flex items-center gap-2">
                    <span>R$ {item.price}</span>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="bg-red-600 px-2 py-1 rounded text-sm hover:bg-red-700"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-600">
                <div className="flex justify-between font-bold text-xl">
                  <span>Total:</span>
                  <span className="text-yellow-400">R$ {getTotal()}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-2">
        <button onClick={() => reportBug('shop-duplicate')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2">
          <Bug size={16} /> Bug #4
        </button>
        <button onClick={() => reportBug('shop-undefined')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2">
          <Bug size={16} /> Bug #5
        </button>
        <button onClick={() => reportBug('shop-remove')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2">
          <Bug size={16} /> Bug #6
        </button>
        <button onClick={() => reportBug('shop-total')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2">
          <Bug size={16} /> Bug #7
        </button>
      </div>
    </motion.div>
  );
}

// ========================================
// MISSÃO 2 - PAINEL DE TAREFAS
// ========================================
function TaskPanel({ reportBug }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Testar login', completed: false },
    { id: 2, title: 'Verificar carrinho', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  const saveEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const pendingCount = tasks.filter(t => !t.completed).length + 1;

  return (
    <motion.div
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      exit={{ y: 1000 }}
      className="p-8 max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8">📋 Painel de Tarefas</h1>

      <div className="bg-white bg-opacity-10 p-6 rounded-lg mb-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Nova tarefa..."
            className="flex-1 px-4 py-2 rounded bg-white bg-opacity-20 border border-gray-400 focus:border-yellow-400 focus:outline-none"
          />
          <button
            onClick={addTask}
            className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
          >
            Adicionar
          </button>
        </div>

        <div className="mb-4">
          <span className="text-lg">Tarefas pendentes: <span className="font-bold text-yellow-400">{pendingCount}</span></span>
        </div>

        <div className="space-y-2">
          {tasks.map(task => (
            <div key={task.id} className="bg-white bg-opacity-5 p-4 rounded flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5"
              />

              {editingId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 px-2 py-1 rounded bg-white bg-opacity-20 border border-gray-400"
                  />
                  <button
                    onClick={saveEdit}
                    className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
                  >
                    Salvar
                  </button>
                </>
              ) : (
                <>
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                    {task.title}
                  </span>
                  <button
                    onClick={() => startEdit(task)}
                    className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
                  >
                    Editar
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button onClick={() => reportBug('task-disappear')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2">
          <Bug size={16} /> Bug #8
        </button>
        <button onClick={() => reportBug('task-counter')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2">
          <Bug size={16} /> Bug #9
        </button>
        <button onClick={() => reportBug('task-edit')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2">
          <Bug size={16} /> Bug #10
        </button>
      </div>
    </motion.div>
  );
}

// ========================================
// MISSÃO 3 - RELATÓRIO DE STATUS
// ========================================
function StatusReport({ reportBug }) {
  const data = [
    { name: 'Jan', abertos: 40, resolvidos: 24 },
    { name: 'Fev', abertos: 30, resolvidos: 13 },
    { name: 'Mar', abertos: 20, resolvidos: 18 },
    { name: 'Abr', abertos: 27, resolvidos: 39 },
    { name: 'Mai', abertos: 18, resolvidos: 48 },
  ];

  const kpis = {
    abertos: 42,
    resolvidos: 135,
    pendentes: 42,
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="p-8 max-w-6xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8">📊 Relatório de Status</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-red-600 bg-opacity-20 border border-red-600 p-6 rounded-lg">
          <h3 className="text-lg mb-2">Bugs Abertos</h3>
          <p className="text-4xl font-bold">{kpis.abertos}</p>
        </div>
        <div className="bg-green-600 bg-opacity-20 border border-green-600 p-6 rounded-lg">
          <h3 className="text-lg mb-2">Bugs Resolvidos</h3>
          <p className="text-4xl font-bold">{kpis.resolvidos}</p>
        </div>
        <div className="bg-yellow-600 bg-opacity-20 border border-yellow-600 p-6 rounded-lg">
          <h3 className="text-lg mb-2">Bugs Pendentes</h3>
          <p className="text-4xl font-bold">{kpis.pendentes}</p>
        </div>
      </div>

      <div className="bg-white bg-opacity-10 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Histórico Mensal</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: 'none' }} />
            <Legend />
            <Bar dataKey="resolvidos" fill="#ef4444" name="Abertos" />
            <Bar dataKey="abertos" fill="#22c55e" name="Resolvidos" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-2">
        <button onClick={() => reportBug('report-swapped')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2">
          <Bug size={16} /> Bug #11
        </button>
        <button onClick={() => reportBug('report-label')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2">
          <Bug size={16} /> Bug #12
        </button>
        <button onClick={() => reportBug('report-kpi')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2">
          <Bug size={16} /> Bug #13
        </button>
      </div>
    </motion.div>
  );
}

// ========================================
// MISSÃO 4 - QUIZ DE QA
// ========================================
function QAQuiz({ reportBug }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      question: 'O que é um teste de regressão?',
      options: ['Teste de novas funcionalidades', 'Teste para garantir que bugs antigos não voltaram', 'Teste de performance', 'Teste de segurança'],
      correct: 1
    },
    {
      question: 'Qual a diferença entre bug e defeito?',
      options: ['Não há diferença', 'Bug é no código, defeito é no comportamento', 'Defeito é no código, bug é no comportamento', 'Bug é no código, defeito é no comportamento'],
      correct: 1
    },
    {
      question: 'O que é teste de caixa preta?',
      options: ['Teste sem conhecer o código', 'Teste do código interno', 'Teste de interface', 'Teste automatizado'],
      correct: 0
    },
  ];

  const handleAnswer = (index) => {
    setSelectedAnswer(index);

    if (index !== questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  const restart = () => {
    setCurrentQuestion(0);
    setFinished(false);
    setSelectedAnswer(null);
  };

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 max-w-2xl mx-auto text-center"
      >
        <h1 className="text-4xl font-bold mb-8">Quiz Finalizado!</h1>
        <p className="text-6xl font-bold text-yellow-400 mb-8">{score}/{questions.length}</p>
        <button
          onClick={restart}
          className="bg-green-600 px-8 py-3 rounded-lg text-xl hover:bg-green-700"
        >
          Reiniciar Quiz
        </button>

        <div className="mt-8 grid grid-cols-3 gap-2">
          <button onClick={() => reportBug('quiz-wrong-score')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2">
            <Bug size={16} /> Bug #14
          </button>
          <button onClick={() => reportBug('quiz-no-reset')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2">
            <Bug size={16} /> Bug #15
          </button>
          <button onClick={() => reportBug('quiz-duplicate')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2">
            <Bug size={16} /> Bug #16
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-8 max-w-3xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8">🧩 Quiz de QA</h1>

      <div className="bg-white bg-opacity-10 p-8 rounded-lg">
        <div className="mb-6">
          <span className="text-sm text-gray-400">Questão {currentQuestion + 1} de {questions.length}</span>
          <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
            <div
              className="bg-yellow-400 h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="text-2xl mb-6">{questions[currentQuestion].question}</h2>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                selectedAnswer === null
                  ? 'bg-white bg-opacity-10 hover:bg-opacity-20'
                  : selectedAnswer === index
                  ? index === questions[currentQuestion].correct
                    ? 'bg-green-600'
                    : 'bg-red-600'
                  : 'bg-white bg-opacity-5'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <span className="text-xl">Pontuação: <span className="font-bold text-yellow-400">{score}</span></span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-2">
        <button onClick={() => reportBug('quiz-wrong-score')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2">
          <Bug size={16} /> Bug #14
        </button>
        <button onClick={() => reportBug('quiz-no-reset')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2">
          <Bug size={16} /> Bug #15
        </button>
        <button onClick={() => reportBug('quiz-duplicate')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2">
          <Bug size={16} /> Bug #16
        </button>
      </div>
    </motion.div>
  );
}

// ========================================
// TELA DE FIM DE JOGO
// ========================================
function EndGame({ points, bugsFound, resetGame, bugReports }) {
  const [showReports, setShowReports] = useState(false);

  const getMessage = () => {
    const validBugs = bugReports.filter(r => r.isValid).length;
    if (validBugs === 16 && points >= 160) return { title: '🏆 QA Master!', msg: 'Você encontrou TODOS os bugs com descrições perfeitas!' };
    if (validBugs >= 12) return { title: '⭐ QA Experiente', msg: 'Muito bem! Você tem ótima atenção aos detalhes.' };
    if (validBugs >= 8) return { title: '👍 QA em Desenvolvimento', msg: 'Bom trabalho! Continue praticando suas descrições.' };
    return { title: '📚 QA Aprendiz', msg: 'Continue estudando e sendo mais específico!' };
  };

  const result = getMessage();
  const validBugs = bugReports.filter(r => r.isValid).length;
  const invalidBugs = bugReports.filter(r => !r.isValid).length;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      className="flex items-center justify-center min-h-screen p-4"
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-12 rounded-2xl shadow-2xl max-w-4xl w-full">
        <div className="text-center mb-8">
          <Trophy size={80} className="mx-auto mb-6 text-yellow-400" />
          <h1 className="text-5xl font-bold mb-4">{result.title}</h1>
          <p className="text-xl text-gray-300">{result.msg}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-purple-600 bg-opacity-30 p-6 rounded-lg">
            <p className="text-gray-300 mb-2 text-sm">Pontuação Final</p>
            <p className="text-4xl font-bold text-yellow-400">{points}</p>
          </div>
          <div className="bg-blue-600 bg-opacity-30 p-6 rounded-lg">
            <p className="text-gray-300 mb-2 text-sm">Bugs Reportados</p>
            <p className="text-4xl font-bold text-blue-400">{bugsFound}/16</p>
          </div>
          <div className="bg-green-600 bg-opacity-30 p-6 rounded-lg">
            <p className="text-gray-300 mb-2 text-sm">Descrições Válidas</p>
            <p className="text-4xl font-bold text-green-400">{validBugs}</p>
          </div>
          <div className="bg-red-600 bg-opacity-30 p-6 rounded-lg">
            <p className="text-gray-300 mb-2 text-sm">Descrições Fracas</p>
            <p className="text-4xl font-bold text-red-400">{invalidBugs}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={resetGame}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-lg text-xl hover:from-yellow-500 hover:to-orange-600 transition-all"
          >
            🔄 Jogar Novamente
          </button>
          <button
            onClick={() => setShowReports(!showReports)}
            className="flex-1 bg-blue-600 text-white font-bold px-8 py-4 rounded-lg text-xl hover:bg-blue-700 transition-all"
          >
            📋 {showReports ? 'Ocultar' : 'Ver'} Relatórios
          </button>
        </div>

        {showReports && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-gray-900 bg-opacity-50 p-6 rounded-lg max-h-96 overflow-y-auto"
          >
            <h3 className="text-2xl font-bold mb-4">📊 Seus Relatórios de Bugs</h3>
            {bugReports.length === 0 ? (
              <p className="text-gray-400">Nenhum bug reportado ainda.</p>
            ) : (
              <div className="space-y-4">
                {bugReports.map((report, index) => (
                  <div key={index} className={`p-4 rounded-lg border-2 ${report.isValid ? 'bg-green-900 bg-opacity-20 border-green-500' : 'bg-red-900 bg-opacity-20 border-red-500'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold">{BUGS_DATABASE[report.bugId].title}</h4>
                      <span className={`px-3 py-1 rounded text-sm font-bold ${report.isValid ? 'bg-green-600' : 'bg-red-600'}`}>
                        {report.isValid ? '✅ Válido (+10)' : '❌ Fraco (-5)'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      <strong>Descrição:</strong> {report.description.substring(0, 100)}...
                    </p>
                    <p className="text-xs text-gray-400">
                      Keywords identificadas: {report.foundKeywords}/{ BUGS_DATABASE[report.bugId].keywords.length}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default App;