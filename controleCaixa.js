// =========================
// Controle de Caixa (controleCaixa.js) - VERSÃO FINAL
// =========================

// --- Armazenamento ---
function pegarLancamentosCaixa() {
  return JSON.parse(localStorage.getItem('lancamentosCaixa') || '[]');
}

function salvarLancamentosCaixa(lista) {
  localStorage.setItem('lancamentosCaixa', JSON.stringify(lista));
}

// Subplanos
function pegarSubplanos() {
  const planos = JSON.parse(localStorage.getItem('planosContas') || '[]');
  return planos.filter(p => p.parentId !== null).map(p => ({ id: p.id, nome: p.nome, tipo: p.tipo }));
}

// Buscar plano por id
function getPlanoPorId(id) {
  const planos = JSON.parse(localStorage.getItem('planosContas') || '[]');
  return planos.find(p => p.id === id) || null;
}

// Pequena função de escape
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

// Formatar data
function formatarDataBr(isoDate) {
  if (!isoDate) return '-';
  const partes = isoDate.split('-');
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// =========================
// Função para abrir tela de caixa
// =========================
function abrirTelaCaixa() {
  let lista = pegarLancamentosCaixa();

  // Corrige lançamentos antigos sem planoTipo
  lista.forEach(l => {
    const plano = getPlanoPorId(l.planoId);
    if (plano) l.planoTipo = plano.tipo;
  });
  salvarLancamentosCaixa(lista);

  const areaConteudo = document.getElementById('areaConteudo');

  let linhas = lista.map((l, i) => {
    const data = formatarDataBr(l.data);
    const isDespesa = l.planoTipo?.toLowerCase() === 'despesa';
    const valorNumerico = Number(l.valor) || 0;
    const valorFormatado = isDespesa ? `- R$ ${valorNumerico.toFixed(2)}` : `R$ ${valorNumerico.toFixed(2)}`;
    const classe = isDespesa ? 'valor-negativo' : '';

    return `
      <div class="caixa-item">
        <div class="caixa-info">
          <span class="descricao">${escapeHtml(l.descricao)}</span>
          <span class="valor ${classe}">${valorFormatado}</span>
          <span class="plano">${escapeHtml(l.planoNome)}</span>
          <span class="data">${data}</span>
        </div>
        <div class="caixa-acoes">
          <button type="button" onclick="abrirFormCaixa(${i})">Editar</button>
        </div>
      </div>
    `;
  }).join('');

  if (!linhas) linhas = '<p>Nenhum lançamento ainda.</p>';

  areaConteudo.innerHTML = `
    <div class="caixa-header">
      <h2>Controle de Caixa</h2>
      <div class="caixa-header-actions">
        <span>Lista de Lançamentos:</span>
        <button id="btnAdicionarCaixa">Adicionar</button>
      </div>
    </div>
    <div id="listaCaixa">${linhas}</div>
  `;

  document.getElementById('btnAdicionarCaixa').addEventListener('click', () => abrirFormCaixa());
}

// =========================
// Função para abrir formulário de lançamento
// =========================
function abrirFormCaixa(indice = null) {
  const lista = pegarLancamentosCaixa();
  const lancamento = indice !== null ? lista[indice] : { descricao: '', valor: '', planoId: null, planoNome: '', planoTipo: 'receita', data: new Date().toISOString().slice(0,10) };

  const areaConteudo = document.getElementById('areaConteudo');
  const subplanos = pegarSubplanos();

  if (subplanos.length === 0) {
    areaConteudo.innerHTML = `<h2>Controle de Caixa</h2><p>Não existem subplanos cadastrados.</p><button id="btnVoltarCaixa">Voltar</button>`;
    document.getElementById('btnVoltarCaixa').addEventListener('click', abrirTelaCaixa);
    return;
  }

  const optionsPlano = subplanos.map(sp => `<option value="${sp.id}" ${lancamento.planoId===sp.id?'selected':''}>${escapeHtml(sp.nome)}</option>`).join('');

  areaConteudo.innerHTML = `
    <h2>Controle de Caixa</h2>
    <form id="formCaixa">
      <label>Descrição:</label>
      <input type="text" id="descricaoCaixa" value="${escapeHtml(lancamento.descricao)}" required>
      <label>Valor:</label>
      <input type="number" id="valorCaixa" value="${lancamento.valor}" step="0.01" min="0" required>
      <label>Data:</label>
      <input type="date" id="dataCaixa" value="${lancamento.data}" required>
      <label>Plano de Contas:</label>
      <select id="planoCaixa" required>${optionsPlano}</select>
      <div class="botoes-form">
        <button type="submit">Salvar</button>
        <button type="button" id="btnCancelarCaixa">Cancelar</button>
        ${indice!==null?'<button type="button" id="btnExcluirCaixa">Excluir</button>':''}
      </div>
    </form>
  `;

  document.getElementById('btnCancelarCaixa').addEventListener('click', abrirTelaCaixa);

  document.getElementById('formCaixa').addEventListener('submit', e => {
    e.preventDefault();

    const descricao = document.getElementById('descricaoCaixa').value.trim();
    const valor = parseFloat(document.getElementById('valorCaixa').value);
    const data = document.getElementById('dataCaixa').value;
    const planoId = document.getElementById('planoCaixa').value;
    const planoObj = getPlanoPorId(planoId);

    if (!planoObj) {
      alert("Plano selecionado não existe!");
      return;
    }

    const planoNome = planoObj.nome;
    const planoTipo = planoObj.tipo;

    const novoLancamento = { descricao, valor: isNaN(valor) ? 0 : valor, planoId, planoNome, planoTipo, data };

    if (indice !== null) lista[indice] = novoLancamento;
    else lista.push(novoLancamento);

    salvarLancamentosCaixa(lista);
    abrirTelaCaixa();
  });

  if (indice !== null) {
    document.getElementById('btnExcluirCaixa').addEventListener('click', () => {
      if (confirm(`Deseja excluir o lançamento "${lancamento.descricao}"?`)) {
        lista.splice(indice, 1);
        salvarLancamentosCaixa(lista);
        abrirTelaCaixa();
      }
    });
  }
}

// =========================
// Inicializa menu do Caixa
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const menuCaixa = document.getElementById('menuCaixa');
  if (menuCaixa) menuCaixa.addEventListener('click', abrirTelaCaixa);
});
