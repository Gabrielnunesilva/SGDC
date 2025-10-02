// =========================
// LocalStorage
// =========================
function pegarDesbravadores() {
  const lista = localStorage.getItem('desbravadores');
  return lista ? JSON.parse(lista) : [];
}

function salvarDesbravadores(lista) {
  localStorage.setItem('desbravadores', JSON.stringify(lista));
}

// =========================
// Lista de Desbravadores
// =========================
function atualizarListaDesbravadores() {
  const lista = pegarDesbravadores();
  const filtro = document.getElementById('filtroStatus')?.value || 'todos';
  let listaFiltrada = lista;

  if (filtro === 'ativos') listaFiltrada = lista.filter(d => d.status === 'ativo');
  else if (filtro === 'inativos') listaFiltrada = lista.filter(d => d.status === 'inativo');

  const container = document.getElementById('listaDesbravadores');
  container.innerHTML = '';

  listaFiltrada.forEach(d => {
    const item = document.createElement('div');
    item.className = 'desbravador-item';
    item.innerHTML = `<span class="nome">${d.nome}</span> <span class="status">${d.status}</span>`;
    const indiceOriginal = lista.indexOf(d);
    item.addEventListener('click', () => abrirFormDesbravadorCompleto(indiceOriginal));
    container.appendChild(item);
  });
}

// =========================
// Abrir Tela Desbravadores
// =========================
function abrirTelaDesbravadores() {
  const areaConteudo = document.getElementById('areaConteudo');
  areaConteudo.innerHTML = `
    <div class="desbravadores-header">
      <select id="filtroStatus">
        <option value="todos">Todos</option>
        <option value="ativos">Ativos</option>
        <option value="inativos">Inativos</option>
      </select>
      <button id="btnAdicionar">Adicionar</button>
    </div>
    <h2>Lista de Desbravadores:</h2>
    <div id="listaDesbravadores"></div>
  `;

  atualizarListaDesbravadores();
  document.getElementById('btnAdicionar').addEventListener('click', () => abrirFormDesbravadorCompleto());
  document.getElementById('filtroStatus').addEventListener('change', atualizarListaDesbravadores);
}

// =========================
// Abrir Formulário Desbravador
// =========================
function abrirFormDesbravadorCompleto(indice = null) {
  const areaConteudo = document.getElementById('areaConteudo');
  const lista = pegarDesbravadores();
  let desbravador = indice !== null ? lista[indice] : {
    nome: '', endereco: '', telefone: '', rg: '', cpf: '', status: 'ativo',
    financeiro: [], classes: [], especialidades: []
  };

  areaConteudo.innerHTML = `
    <div class="container-desbravador">
      <main class="conteudo-desbravador" id="conteudoDesbravador">
        ${conteudoAbaGeral(desbravador)}
      </main>
      <aside class="menu-desbravador">
        <div class="aba-desbravador active" data-aba="geral">Informações Gerais</div>
        <div class="aba-desbravador" data-aba="financeiro">Financeiro</div>
        <div class="aba-desbravador" data-aba="classes">Classes</div>
        <div class="aba-desbravador" data-aba="especialidades">Especialidades</div>
        <div class="aba-desbravador" data-aba="autorizacoes">Autorizações</div>
      </aside>
    </div>
  `;

  aplicarEventosAbas(desbravador, indice);
  aplicarEventosForm(desbravador, indice);
}

// =========================
// Conteúdo Aba Geral
// =========================
function conteudoAbaGeral(d) {
  const unidades = pegarUnidades();
  const optionsUnidades = [`<option value="">Nenhum</option>`]
    .concat(unidades.map(u => `<option value="${escapeHtml(u.nome)}" ${d.cargo === u.nome ? 'selected' : ''}>${escapeHtml(u.nome)}</option>`))
    .join('');

  return `
    <h2>Informações Gerais</h2>
    <form id="formDesbravadorCompleto">
      <div class="linha">
        <div class="campo">
          <label>Nome:</label>
          <input type="text" id="nomeDesbravador" value="${d.nome}" required>
        </div>
        <div class="campo-pequeno">
          <label>Status:</label>
          <select id="statusDesbravador">
            <option value="ativo" ${d.status === 'ativo' ? 'selected' : ''}>Ativo</option>
            <option value="inativo" ${d.status === 'inativo' ? 'selected' : ''}>Inativo</option>
          </select>
        </div>
      </div>

      <div class="linha">
        <div class="campo-pequeno">
          <label>RG:</label>
          <input type="text" id="rgDesbravador" value="${d.rg}">
        </div>
        <div class="campo-pequeno">
          <label>CPF:</label>
          <input type="text" id="cpfDesbravador" value="${d.cpf}">
        </div>
      </div>

      <div class="linha">
        <div class="campo">
          <label>Endereço:</label>
          <input type="text" id="enderecoDesbravador" value="${d.endereco}">
        </div>
        <div class="campo-pequeno">
          <label>Telefone:</label>
          <input type="text" id="telefoneDesbravador" value="${d.telefone}">
        </div>
      </div>

      <div class="linha">
        <div class="campo-pequeno">
          <label>Unidade:</label>
          <select id="cargoDesbravador">
            ${optionsUnidades}
          </select>
        </div>
      </div>

      <div class="botoes-form">
        <button type="submit">Salvar</button>
        <button type="button" id="btnCancelar">Cancelar</button>
        ${d.nome ? '<button type="button" id="btnExcluir">Excluir</button>' : ''}
      </div>
    </form>
  `;
}

// =========================
// Conteúdo Aba Financeiro
// =========================
function conteudoAbaFinanceiro() {
  return `
    <h2>Financeiro</h2>
    <div class="financeiro-header">
      <button id="btnAdicionarLancamento">Adicionar Lançamento</button>
    </div>
    <div id="listaLancamentos"></div>
  `;
}

// =========================
// Conteúdo Aba Classes
// =========================
function conteudoAbaClasses(desbravador, indice) {
  const todasClasses = pegarClasses();
  const desbravadorClasses = desbravador.classes || [];

  return `
    <h2>Classes</h2>
    <div class="financeiro-header">
      <select id="selectClasse">
        <option value="">Selecione uma classe</option>
        ${todasClasses.map(c => `<option value="${c.nome}">${c.nome}</option>`).join('')}
      </select>
      <select id="statusClasse">
        <option value="Iniciado">Iniciado</option>
        <option value="Concluido">Concluído</option>
      </select>
      <button id="btnAdicionarClasseDesbravador">Adicionar</button>
    </div>
    <div id="listaClassesDesbravador">
      ${desbravadorClasses.length === 0 ? '<p>Nenhuma classe adicionada.</p>' : ''}
    </div>
  `;
}

// =========================
// Conteúdo Aba Especialidades
// =========================
function conteudoAbaEspecialidades(desbravador, indice) {
  const todasEspecialidades = pegarEspecialidades();
  const desbravadorEspecialidades = desbravador.especialidades || [];

  return `
    <h2>Especialidades</h2>
    <div class="financeiro-header">
      <select id="selectEspecialidade">
        <option value="">Selecione uma especialidade</option>
        ${todasEspecialidades.map(e => `<option value="${e.nome}">${e.nome}</option>`).join('')}
      </select>
      <button id="btnAdicionarEspecialidadeDesbravador">Adicionar</button>
    </div>
    <div id="listaEspecialidadesDesbravador">
      ${desbravadorEspecialidades.length === 0 ? '<p>Nenhuma especialidade adicionada.</p>' : ''}
    </div>
  `;
}

// =========================
// Conteúdo Aba Autorizações
// =========================
function conteudoAbaAutorizacoes(desbravador, indice) {
  const autorizacoes = desbravador.autorizacoes || [];
  return `
    <h2>Autorizações</h2>
    <div class="financeiro-header">
      <button id="btnAdicionarAutorizacao">Adicionar</button>
    </div>
    <div id="listaAutorizacoes">
      ${autorizacoes.length === 0 ? '<p>Nenhuma autorização adicionada.</p>' : ''}
    </div>
  `;
}



// =========================
// Atualizar listas das abas
// =========================
function atualizarListaLancamentos(desbravador, indiceDesbravador) {
  const container = document.getElementById('listaLancamentos');
  container.innerHTML = '';

  if (!desbravador.financeiro || desbravador.financeiro.length === 0) {
    container.innerHTML = '<p>Nenhum lançamento ainda.</p>';
    return;
  }

  desbravador.financeiro.forEach((l, i) => {
    const item = document.createElement('div');
    item.className = 'lancamento-item';

    const descricao = document.createElement('strong');
    descricao.textContent = l.descricao;

    const valor = document.createElement('span');
    const isDespesa = l.planoTipo?.toLowerCase() === 'despesa';

    let dataFormatada = '-';
    if (l.data) {
      const partes = l.data.split('-');
      dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    valor.textContent = `${isDespesa ? '- ' : ''}R$ ${Number(l.valor).toFixed(2)} (${dataFormatada})`;
    if (isDespesa) valor.classList.add('valor-negativo');

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', () => {
      desbravador.financeiro.splice(i, 1);
      const lista = pegarDesbravadores();
      lista[indiceDesbravador] = desbravador;
      salvarDesbravadores(lista);
      atualizarListaLancamentos(desbravador, indiceDesbravador);
    });

    item.appendChild(descricao);
    item.appendChild(valor);
    item.appendChild(btnExcluir);
    container.appendChild(item);
  });
}
function atualizarListaAutorizacoes(desbravador, indice) {
  const container = document.getElementById('listaAutorizacoes');
  container.innerHTML = '';

  if (!desbravador.autorizacoes || desbravador.autorizacoes.length === 0) {
    container.innerHTML = '<p>Nenhuma autorização adicionada.</p>';
    return;
  }

  desbravador.autorizacoes.forEach((a, i) => {
    const item = document.createElement('div');
    item.className = 'lancamento-item';
    item.innerHTML = `<span>${a.nome} (${a.dataInicio} até ${a.dataFim})</span>`;
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', () => {
      desbravador.autorizacoes.splice(i, 1);
      const lista = pegarDesbravadores();
      lista[indice] = desbravador;
      salvarDesbravadores(lista);
      atualizarListaAutorizacoes(desbravador, indice);
    });
    item.appendChild(btnExcluir);
    container.appendChild(item);
  });
}


// =========================
// Abrir Form Lançamento
// =========================
function abrirFormLancamento(desbravador, indiceDesbravador) {
  const container = document.getElementById('listaLancamentos');
  const planos = typeof pegarSubplanos === 'function' ? pegarSubplanos().filter(p => p.tipo === 'receita') : [];

  container.innerHTML = `
    <h3>Adicionar Lançamento</h3>
    <form id="formLancamento" class="formulario-interno">
      <label>Descrição:</label>
      <input type="text" id="descricaoLancamento" required>
      <label>Valor (R$):</label>
      <input type="number" step="0.01" id="valorLancamento" required>
      <label>Plano de Contas:</label>
      <select id="planoLancamento" required>
        <option value="">Selecione...</option>
        ${planos.map(p => `<option value="${p.id}">${escapeHtml(p.nome)}</option>`).join('')}
      </select>
      <label>Data:</label>
      <input type="date" id="dataLancamento" value="${new Date().toISOString().slice(0, 10)}" required>
      <div class="botoes-form">
        <button type="submit">Salvar</button>
        <button type="button" id="btnCancelarLancamento">Cancelar</button>
      </div>
    </form>
  `;

  document.getElementById('btnCancelarLancamento').addEventListener('click', () => atualizarListaLancamentos(desbravador, indiceDesbravador));

  document.getElementById('formLancamento').addEventListener('submit', e => {
    e.preventDefault();
    const descricao = document.getElementById('descricaoLancamento').value.trim();
    const valor = parseFloat(document.getElementById('valorLancamento').value);
    const planoId = document.getElementById('planoLancamento').value;
    const data = document.getElementById('dataLancamento').value;
    if (!descricao || !valor || !planoId || !data) return alert('Preencha todos os campos!');

    const planoSelecionado = typeof getPlanoPorId === 'function' ? getPlanoPorId(planoId) : null;
    const planoTipo = planoSelecionado?.tipo || 'receita';
    const planoNome = planoSelecionado?.nome || '';

    const novoLancamento = { descricao, valor, planoId, data, planoTipo, planoNome };

    // Salva no desbravador
    if (!desbravador.financeiro) desbravador.financeiro = [];
    desbravador.financeiro.push(novoLancamento);

    const lista = pegarDesbravadores();
    lista[indiceDesbravador] = desbravador;
    salvarDesbravadores(lista);
    atualizarListaLancamentos(desbravador, indiceDesbravador);

    // --- Adiciona também no Controle de Caixa ---
    if (typeof pegarLancamentosCaixa === 'function' && typeof salvarLancamentosCaixa === 'function') {
      const listaCaixa = pegarLancamentosCaixa();
      listaCaixa.push(novoLancamento);
      salvarLancamentosCaixa(listaCaixa);
    }
  });
}


// =========================
// Abrir Form Autorização
// =========================
function abrirFormAutorizacao(desbravador, indice) {
  const container = document.getElementById('listaAutorizacoes');
  container.innerHTML = `
    <h3>Adicionar Autorização</h3>
    <form id="formAutorizacao" class="formulario-interno">
      <label>Nome da Autorização:</label>
      <input type="text" id="nomeAutorizacao" required>
      <label>Data Inicial:</label>
      <input type="date" id="dataInicioAutorizacao" required>
      <label>Data Final:</label>
      <input type="date" id="dataFimAutorizacao" required>
      <label>Descrição:</label>
      <textarea id="descricaoAutorizacao" rows="4"></textarea>
      <div class="botoes-form">
        <button type="submit">Salvar</button>
        <button type="button" id="btnCancelarAutorizacao">Cancelar</button>
      </div>
    </form>
  `;

  document.getElementById('btnCancelarAutorizacao').addEventListener('click', () => {
    atualizarListaAutorizacoes(desbravador, indice);
  });

  document.getElementById('formAutorizacao').addEventListener('submit', e => {
    e.preventDefault();
    const novaAutorizacao = {
      nome: document.getElementById('nomeAutorizacao').value.trim(),
      dataInicio: document.getElementById('dataInicioAutorizacao').value,
      dataFim: document.getElementById('dataFimAutorizacao').value,
      descricao: document.getElementById('descricaoAutorizacao').value.trim()
    };
    if (!desbravador.autorizacoes) desbravador.autorizacoes = [];
    desbravador.autorizacoes.push(novaAutorizacao);

    const lista = pegarDesbravadores();
    lista[indice] = desbravador;
    salvarDesbravadores(lista);

    atualizarListaAutorizacoes(desbravador, indice);
  });
}





// =========================
// Atualizar Classes e Especialidades
// =========================
function atualizarListaClassesDesbravador(desbravador, indice) {
  const container = document.getElementById('listaClassesDesbravador');
  container.innerHTML = '';
  if (!desbravador.classes || desbravador.classes.length === 0) {
    container.innerHTML = '<p>Nenhuma classe adicionada.</p>';
    return;
  }
  desbravador.classes.forEach((c, i) => {
    const item = document.createElement('div');
    item.className = 'lancamento-item';
    item.innerHTML = `<span>${c.nome} - ${c.status}</span>`;
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', () => {
      desbravador.classes.splice(i, 1);
      const lista = pegarDesbravadores();
      lista[indice] = desbravador;
      salvarDesbravadores(lista);
      atualizarListaClassesDesbravador(desbravador, indice);
    });
    item.appendChild(btnExcluir);
    container.appendChild(item);
  });
}

function atualizarListaEspecialidadesDesbravador(desbravador, indice) {
  const container = document.getElementById('listaEspecialidadesDesbravador');
  container.innerHTML = '';
  if (!desbravador.especialidades || desbravador.especialidades.length === 0) {
    container.innerHTML = '<p>Nenhuma especialidade adicionada.</p>';
    return;
  }
  desbravador.especialidades.forEach((e, i) => {
    const item = document.createElement('div');
    item.className = 'lancamento-item';
    item.innerHTML = `<span>${e.nome}</span>`;
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', () => {
      desbravador.especialidades.splice(i, 1);
      const lista = pegarDesbravadores();
      lista[indice] = desbravador;
      salvarDesbravadores(lista);
      atualizarListaEspecialidadesDesbravador(desbravador, indice);
    });
    item.appendChild(btnExcluir);
    container.appendChild(item);
  });
}

// =========================
// Eventos de abas
// =========================
function aplicarEventosAbas(desbravador, indice) {
  document.querySelectorAll('.aba-desbravador').forEach(aba => {
    aba.addEventListener('click', () => {
      // Remove active de todas
      document.querySelectorAll('.aba-desbravador').forEach(a => a.classList.remove('active'));
      // Marca a aba clicada como ativa
      aba.classList.add('active');

      const conteudo = document.getElementById('conteudoDesbravador');

      // === Aba Geral ===
      if (aba.dataset.aba === 'geral') {
        conteudo.innerHTML = conteudoAbaGeral(desbravador);
        aplicarEventosForm(desbravador, indice);

      // === Aba Financeiro ===
      } else if (aba.dataset.aba === 'financeiro') {
        conteudo.innerHTML = conteudoAbaFinanceiro();
        atualizarListaLancamentos(desbravador, indice);
        document.getElementById('btnAdicionarLancamento')
          .addEventListener('click', () => abrirFormLancamento(desbravador, indice));

      // === Aba Classes ===
      } else if (aba.dataset.aba === 'classes') {
        conteudo.innerHTML = conteudoAbaClasses(desbravador, indice);
        document.getElementById('btnAdicionarClasseDesbravador').addEventListener('click', () => {
          const select = document.getElementById('selectClasse');
          const status = document.getElementById('statusClasse').value;
          const nomeClasse = select.value;
          if (!nomeClasse) return alert('Selecione uma classe!');
          if (!desbravador.classes) desbravador.classes = [];
          desbravador.classes.push({ nome: nomeClasse, status });
          const lista = pegarDesbravadores();
          lista[indice] = desbravador;
          salvarDesbravadores(lista);
          atualizarListaClassesDesbravador(desbravador, indice);
        });
        atualizarListaClassesDesbravador(desbravador, indice);

      // === Aba Especialidades ===
      } else if (aba.dataset.aba === 'especialidades') {
        conteudo.innerHTML = conteudoAbaEspecialidades(desbravador, indice);
        document.getElementById('btnAdicionarEspecialidadeDesbravador').addEventListener('click', () => {
          const select = document.getElementById('selectEspecialidade');
          const nome = select.value;
          if (!nome) return alert('Selecione uma especialidade!');
          if (!desbravador.especialidades) desbravador.especialidades = [];
          desbravador.especialidades.push({ nome });
          const lista = pegarDesbravadores();
          lista[indice] = desbravador;
          salvarDesbravadores(lista);
          atualizarListaEspecialidadesDesbravador(desbravador, indice);
        });
        atualizarListaEspecialidadesDesbravador(desbravador, indice);

      // === Aba Autorizações (nova) ===
      } else if (aba.dataset.aba === 'autorizacoes') {
        conteudo.innerHTML = conteudoAbaAutorizacoes(desbravador, indice);
        document.getElementById('btnAdicionarAutorizacao').addEventListener('click', () => {
          abrirFormAutorizacao(desbravador, indice);
        });
        atualizarListaAutorizacoes(desbravador, indice);
      }
    });
  });
}

// =========================
// Eventos Formulário
// =========================
function aplicarEventosForm(desbravador, indice) {
  document.getElementById('formDesbravadorCompleto').addEventListener('submit', e => {
    e.preventDefault();
    const lista = pegarDesbravadores();
    const novoDesbravador = {
      ...desbravador,
      nome: document.getElementById('nomeDesbravador').value.trim(),
      endereco: document.getElementById('enderecoDesbravador').value.trim(),
      telefone: document.getElementById('telefoneDesbravador').value.trim(),
      rg: document.getElementById('rgDesbravador').value.trim(),
      cpf: document.getElementById('cpfDesbravador').value.trim(),
      status: document.getElementById('statusDesbravador').value,
      cargo: document.getElementById('cargoDesbravador').value || '',
      financeiro: desbravador.financeiro,
      classes: desbravador.classes || [],
      especialidades: desbravador.especialidades || []
    };
    if (indice !== null) lista[indice] = novoDesbravador;
    else lista.push(novoDesbravador);
    salvarDesbravadores(lista);
    abrirTelaDesbravadores();
  });

  document.getElementById('btnCancelar').addEventListener('click', () => abrirTelaDesbravadores());

  const btnExcluir = document.getElementById('btnExcluir');
  if (btnExcluir) btnExcluir.addEventListener('click', () => {
    if (confirm(`Tem certeza que deseja excluir ${desbravador.nome}?`)) {
      const lista = pegarDesbravadores();
      lista.splice(indice, 1);
      salvarDesbravadores(lista);
      abrirTelaDesbravadores();
    }
  });
}


// =========================
// Inicialização do menu
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const menuDesbravadores = document.getElementById('menuDesbravadores');
  if (menuDesbravadores) menuDesbravadores.addEventListener('click', abrirTelaDesbravadores);
});
