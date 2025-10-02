// =========================
// RELATÓRIOS COMPLETOS
// =========================

// -------------------------
// Relatório de Desbravadores
// -------------------------
function abrirRelatorioDesbravadores() {
  const area = document.getElementById('areaConteudo');
  const lista = typeof pegarDesbravadores === 'function' ? pegarDesbravadores() : [];

  area.innerHTML = `
    <h2>Relatório de Desbravadores</h2>
    <div class="relatorio-desbravadores">
      <div class="linha-header">
        <span class="col-nome">Nome</span>
        <span class="col-rg">RG</span>
        <span class="col-cpf">CPF</span>
        <span class="col-unidade">Unidade</span>
      </div>
      ${lista.map(d => `
        <div class="linha-dado">
          <span class="col-nome">${d.nome}</span>
          <span class="col-rg">${d.rg}</span>
          <span class="col-cpf">${d.cpf}</span>
          <span class="col-unidade">${d.cargo || '-'}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// -------------------------
// Relatório de Unidades
// -------------------------
function abrirRelatorioUnidades() {
  const area = document.getElementById('areaConteudo');
  const unidades = typeof pegarUnidades === 'function' ? pegarUnidades() : [];
  const desbravadores = typeof pegarDesbravadores === 'function' ? pegarDesbravadores() : [];

  area.innerHTML = `
    <h2>Relatório de Unidades</h2>
    <div class="relatorio-unidades">
      <div class="linha-header">
        <span class="col-unidade">Unidade</span>
        <span class="col-quantidade">Quantidade de Desbravadores</span>
      </div>
      ${unidades.map(u => {
        const quantidade = desbravadores.filter(d => d.cargo === u.nome).length;
        return `
          <div class="linha-dado">
            <span class="col-unidade">${u.nome}</span>
            <span class="col-quantidade">${quantidade}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// -------------------------
// Relatório de Especialidades
// -------------------------
function abrirRelatorioEspecialidades() {
  const area = document.getElementById('areaConteudo');
  const especialidades = typeof pegarEspecialidades === 'function' ? pegarEspecialidades() : [];
  const desbravadores = typeof pegarDesbravadores === 'function' ? pegarDesbravadores() : [];

  area.innerHTML = `
    <h2>Relatório de Especialidades</h2>
    <div class="relatorio-especialidades">
      <div class="linha-header">
        <span class="col-especialidade">Especialidade</span>
        <span class="col-quantidade">Quantidade de Desbravadores</span>
      </div>
      ${especialidades.map(e => {
        const quantidade = desbravadores.filter(d => d.especialidades?.some(se => se.nome === e.nome)).length;
        return `
          <div class="linha-dado">
            <span class="col-especialidade">${e.nome}</span>
            <span class="col-quantidade">${quantidade}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// -------------------------
// Relatório de Classes
// -------------------------
function abrirRelatorioClasses() {
  const area = document.getElementById('areaConteudo');
  const classes = typeof pegarClasses === 'function' ? pegarClasses() : [];
  const desbravadores = typeof pegarDesbravadores === 'function' ? pegarDesbravadores() : [];

  area.innerHTML = `
    <h2>Relatório de Classes</h2>
    <div class="relatorio-classes">
      <div class="linha-header">
        <span class="col-classe">Classe</span>
        <span class="col-iniciado">Iniciado</span>
        <span class="col-concluido">Concluído</span>
      </div>
      ${classes.map(c => {
        const iniciado = desbravadores.filter(d => d.classes?.some(sc => sc.nome === c.nome && sc.status === 'Iniciado')).length;
        const concluido = desbravadores.filter(d => d.classes?.some(sc => sc.nome === c.nome && sc.status === 'Concluido')).length;
        return `
          <div class="linha-dado">
            <span class="col-classe">${c.nome}</span>
            <span class="col-iniciado">${iniciado}</span>
            <span class="col-concluido">${concluido}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// -------------------------
// Relatório de Atas e Atos
// -------------------------
function abrirRelatorioAtasEAtos() {
  const area = document.getElementById('areaConteudo');
  const atas = typeof pegarAtas === 'function' ? pegarAtas() : [];
  const atos = typeof pegarAtos === 'function' ? pegarAtos() : [];

  area.innerHTML = `
    <h2>Livro de Atas e Atos</h2>

    <h3>Atas</h3>
    <div class="relatorio-atas-atos">
      <div class="linha-header">
        <span class="col-titulo">Título</span>
        <span class="col-data">Data</span>
      </div>
      ${atas.map(a => `
        <div class="linha-dado">
          <span class="col-titulo">${a.titulo}</span>
          <span class="col-data">${a.data}</span>
        </div>
      `).join('')}
    </div>

    <h3>Atos</h3>
    <div class="relatorio-atas-atos">
      <div class="linha-header">
        <span class="col-titulo">Título</span>
        <span class="col-data">Data</span>
      </div>
      ${atos.map(a => `
        <div class="linha-dado">
          <span class="col-titulo">${a.titulo}</span>
          <span class="col-data">${a.data}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// -------------------------
// Relatório de Patrimônio
// -------------------------
function abrirRelatorioPatrimonio() {
  const area = document.getElementById('areaConteudo');
  const patrimonios = typeof pegarPatrimonios === 'function' ? pegarPatrimonios() : [];

  area.innerHTML = `
    <h2>Relatório de Patrimônio</h2>
    <div class="relatorio-patrimonio">
      <div class="linha-header">
        <span class="col-item">Item</span>
        <span class="col-quantidade">Quantidade</span>
        <span class="col-valor">Valor Total (R$)</span>
      </div>
      ${patrimonios.map(p => `
        <div class="linha-dado">
          <span class="col-item">${p.item}</span>
          <span class="col-quantidade">${p.quantidade}</span>
          <span class="col-valor">${Number(p.valor).toFixed(2)}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// -------------------------
// Relatório de Fluxo de Caixa
// -------------------------
function abrirRelatorioFluxoCaixa() {
  const area = document.getElementById('areaConteudo');
  const lancamentos = typeof pegarLancamentosCaixa === 'function' ? pegarLancamentosCaixa() : [];
  const planos = typeof pegarPlanos === 'function' ? pegarPlanos() : [];

  const planosPai = planos.filter(p => !p.parentId);
  let html = `<h2>Relatório de Fluxo de Caixa</h2>`;

  planosPai.forEach(pai => {
    const subplanos = planos.filter(sp => sp.parentId === pai.id);
    html += `<h3>${pai.nome} (${pai.tipo.charAt(0).toUpperCase() + pai.tipo.slice(1)})</h3>`;

    if (subplanos.length === 0) {
      html += `<p>Sem subplanos cadastrados.</p>`;
    } else {
      html += `<div class="relatorio-fluxo-caixa">
        <div class="linha-header">
          <span class="col-subplano">Subplano</span>
          <span class="col-total">Total (R$)</span>
        </div>`;
      subplanos.forEach(sp => {
        const total = lancamentos.filter(l => l.planoId === sp.id)
                                 .reduce((acc, l) => acc + Number(l.valor || 0), 0);
        html += `<div class="linha-dado">
                  <span class="col-subplano">${sp.nome}</span>
                  <span class="col-total">${total.toFixed(2)}</span>
                </div>`;
      });
      html += `</div>`;
    }
  });

  area.innerHTML = html;
}


// --------------------------
// Relatório de Mensalidades
// -------------------------
function abrirRelatorioMensalidades() {
  const area = document.getElementById('areaConteudo');
  const desbravadores = pegarDesbravadores();
  const subplanos = pegarSubplanos(); // do planoContas.js

  // Encontra o subplano "Mensalidades"
  const planoMensalidades = subplanos.find(p => p.nome.toLowerCase() === 'mensalidades');
  if (!planoMensalidades) {
    area.innerHTML = `<h2>Relatório de Mensalidades</h2><p>Não existe nenhum subplano chamado "Mensalidades".</p>`;
    return;
  }

  // Filtra todos os lançamentos de todos os desbravadores que são desse subplano
  const lancamentosMensalidades = [];
  desbravadores.forEach(d => {
    (d.financeiro || []).forEach(l => {
      if (l.planoId === planoMensalidades.id) {
        lancamentosMensalidades.push({
          nome: d.nome,
          data: l.data,
          valor: l.valor
        });
      }
    });
  });

  if (lancamentosMensalidades.length === 0) {
    area.innerHTML = `<h2>Relatório de Mensalidades</h2><p>Nenhum lançamento encontrado no subplano "Mensalidades".</p>`;
    return;
  }

  // HTML do relatório
  let html = `<h2>Relatório de Mensalidades</h2>
    <div class="relatorio-mensalidades">
      <div class="linha-header">
        <span class="col-nome">Desbravador</span>
        <span class="col-data">Data</span>
        <span class="col-valor">Valor (R$)</span>
      </div>`;

  lancamentosMensalidades.forEach(l => {
    const dataFormatada = l.data ? l.data.split('-').reverse().join('/') : '-';
    html += `
      <div class="linha-dado">
        <span class="col-nome">${l.nome}</span>
        <span class="col-data">${dataFormatada}</span>
        <span class="col-valor">${Number(l.valor).toFixed(2)}</span>
      </div>
    `;
  });

  html += `</div>`;
  area.innerHTML = html;
}

// -------------------------
// Relatório de Autorizações
// -------------------------
function abrirRelatorioAutorizacoes() {
  const area = document.getElementById('areaConteudo');
  const desbravadores = typeof pegarDesbravadores === 'function' ? pegarDesbravadores() : [];

  // Monta lista com todas as autorizações
  const todasAutorizacoes = [];
  desbravadores.forEach(d => {
    (d.autorizacoes || []).forEach(a => {
      todasAutorizacoes.push({
        nomeDesbravador: d.nome,
        nomeAutorizacao: a.nome,
        dataInicio: a.dataInicio,
        dataFim: a.dataFim
      });
    });
  });

  if (todasAutorizacoes.length === 0) {
    area.innerHTML = `<h2>Relatório de Autorizações</h2><p>Nenhuma autorização cadastrada.</p>`;
    return;
  }

  // HTML do relatório
  let html = `<h2>Relatório de Autorizações</h2>
    <div class="relatorio-autorizacoes">
      <div class="linha-header">
        <span class="col-desbravador">Desbravador</span>
        <span class="col-autorizacao">Autorização</span>
        <span class="col-data-inicio">Data Inicial</span>
        <span class="col-data-fim">Data Final</span>
      </div>`;

  todasAutorizacoes.forEach(a => {
    const dataInicio = a.dataInicio ? a.dataInicio.split('-').reverse().join('/') : '-';
    const dataFim = a.dataFim ? a.dataFim.split('-').reverse().join('/') : '-';
    html += `
      <div class="linha-dado">
        <span class="col-desbravador">${a.nomeDesbravador}</span>
        <span class="col-autorizacao">${a.nomeAutorizacao}</span>
        <span class="col-data-inicio">${dataInicio}</span>
        <span class="col-data-fim">${dataFim}</span>
      </div>
    `;
  });

  html += `</div>`;
  area.innerHTML = html;
}
