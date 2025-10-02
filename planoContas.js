// =========================
// Plano de Contas (planoContas.js)
// =========================

// Gera ID único simples
function gerarId() {
  return Date.now().toString(36) + '_' + Math.random().toString(36).slice(2);
}

// --- Armazenamento ---
function pegarPlanos() {
  const lista = localStorage.getItem('planosContas');
  return lista ? JSON.parse(lista) : [];
}

function salvarPlanos(lista) {
  localStorage.setItem('planosContas', JSON.stringify(lista));
}

// Retorna subplanos (útil para controleCaixa)
function pegarSubplanos() {
  const planos = pegarPlanos();
  return planos.filter(pl => pl.parentId !== null && pl.parentId !== undefined)
               .map(p => ({ id: p.id, nome: p.nome, tipo: p.tipo }));
}

function getPlanoPorId(id) {
  if (!id) return null;
  const planos = pegarPlanos();
  return planos.find(p => p.id === id) || null;
}

// =========================
// Tela de Plano de Contas
// =========================
function abrirTelaPlanoContas() {
  const areaConteudo = document.getElementById('areaConteudo');
  areaConteudo.innerHTML = `
    <h2>Plano de Contas</h2>
    <div class="desbravadores-header">
      <button id="btnAdicionarPlano">Adicionar Plano de Conta</button>
    </div>
    <div id="listaPlanos"></div>
  `;
  atualizarListaPlanos();

  document.getElementById('btnAdicionarPlano').addEventListener('click', () => abrirFormPlano());
}

function atualizarListaPlanos() {
  const lista = pegarPlanos();
  const container = document.getElementById('listaPlanos');
  container.innerHTML = '';

  const planosPrincipais = lista.filter(p => p.parentId === null);
  const receitas = planosPrincipais.filter(p => p.tipo === 'receita');
  const despesas = planosPrincipais.filter(p => p.tipo === 'despesa');

  function criarItem(p) {
    const item = document.createElement('div');
    item.className = 'desbravador-item';
    item.style.backgroundColor = p.tipo === 'receita' ? '#d0f0c0' : '#f9d0d0';
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.justifyContent = 'space-between';
    item.style.padding = '6px 8px';
    item.style.marginBottom = '4px';

    const nomeSpan = document.createElement('span');
    nomeSpan.textContent = p.nome;

    const botoesDiv = document.createElement('div');

    const subplanos = lista.filter(sp => sp.parentId === p.id);
    const temSubplanos = subplanos.length > 0;

    let subContainer;
    if (temSubplanos) {
      subContainer = document.createElement('div');
      subContainer.className = 'subplanos';
      subContainer.style.display = 'none';
      subContainer.style.marginLeft = '18px';
      subplanos.forEach(sub => {
        const subItem = document.createElement('div');
        subItem.className = 'desbravador-item';
        subItem.style.backgroundColor = sub.tipo === 'receita' ? '#e6f6dc' : '#fce5e5';
        subItem.style.marginLeft = '20px';
        subItem.style.display = 'flex';
        subItem.style.justifyContent = 'space-between';
        subItem.style.padding = '4px 6px';
        subItem.innerHTML = `<span>${escapeHtml(sub.nome)}</span>`;
        const editarSubBtn = document.createElement('button');
        editarSubBtn.textContent = 'Editar';
        editarSubBtn.addEventListener('click', () => abrirFormPlano(sub.id));
        subItem.appendChild(editarSubBtn);
        subContainer.appendChild(subItem);
      });
    }

    if (temSubplanos) {
      const toggleBtn = document.createElement('button');
      toggleBtn.textContent = '[+]';
      toggleBtn.style.marginRight = '8px';
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (subContainer.style.display === 'none') {
          subContainer.style.display = 'block';
          toggleBtn.textContent = '[-]';
        } else {
          subContainer.style.display = 'none';
          toggleBtn.textContent = '[+]';
        }
      });
      botoesDiv.appendChild(toggleBtn);
    }

    const editarBtn = document.createElement('button');
    editarBtn.textContent = 'Editar';
    editarBtn.style.marginRight = '6px';
    editarBtn.addEventListener('click', () => abrirFormPlano(p.id));
    botoesDiv.appendChild(editarBtn);

    item.appendChild(nomeSpan);
    item.appendChild(botoesDiv);
    container.appendChild(item);

    if (temSubplanos) container.appendChild(subContainer);
  }

  if (receitas.length > 0) {
    const hRec = document.createElement('h3'); hRec.textContent = 'Receitas'; container.appendChild(hRec);
    receitas.forEach(criarItem);
  }
  if (despesas.length > 0) {
    const hDesp = document.createElement('h3'); hDesp.textContent = 'Despesas'; container.appendChild(hDesp);
    despesas.forEach(criarItem);
  }
  if (planosPrincipais.length === 0) {
    container.innerHTML = '<p>Nenhum plano cadastrado ainda.</p>';
  }
}

// Formulário de plano de contas
function abrirFormPlano(planoId = null) {
  const lista = pegarPlanos();
  const indice = planoId ? lista.findIndex(p => p.id === planoId) : -1;
  const plano = indice !== -1 ? lista[indice] : { id: null, nome: '', tipo: 'receita', parentId: null };

  const areaConteudo = document.getElementById('areaConteudo');

  const opcoesVinculo = lista
    .filter(p => p.parentId === null)
    .map(p => `<option value="${p.id}" ${plano.parentId === p.id ? 'selected' : ''}>${escapeHtml(p.nome)}</option>`)
    .join('');

  areaConteudo.innerHTML = `
    <h2>${plano.id ? 'Editar' : 'Adicionar'} Plano de Conta</h2>
    <form id="formPlanoConta">
      <label>Nome do Plano:</label>
      <input type="text" id="nomePlano" value="${escapeHtml(plano.nome)}" required>

      <label>Tipo:</label>
      <select id="tipoPlano">
        <option value="receita" ${plano.tipo === 'receita' ? 'selected' : ''}>Receita</option>
        <option value="despesa" ${plano.tipo === 'despesa' ? 'selected' : ''}>Despesa</option>
      </select>

      <label>Plano Pai (opcional):</label>
      <select id="parentPlano">
        <option value="">Nenhum</option>
        ${opcoesVinculo}
      </select>

      <div class="botoes-form">
        <button type="submit">Salvar</button>
        <button type="button" id="btnCancelarPlano">Cancelar</button>
        ${plano.id ? '<button type="button" id="btnExcluirPlano">Excluir</button>' : ''}
      </div>
    </form>
  `;

  document.getElementById('btnCancelarPlano').addEventListener('click', abrirTelaPlanoContas);

  document.getElementById('formPlanoConta').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nomePlano').value.trim();
    let parentIdValue = document.getElementById('parentPlano').value;
    const parentId = parentIdValue !== '' ? parentIdValue : null;

    let tipo = document.getElementById('tipoPlano').value;
    if (parentId !== null) {
      const pai = lista.find(pl => pl.id === parentId);
      if (pai) tipo = pai.tipo; // força subplano ter mesmo tipo do pai
    }

    const novoPlano = {
      id: plano.id ? plano.id : gerarId(),
      nome,
      tipo,
      parentId
    };

    if (plano.id) {
      lista[indice] = novoPlano;
    } else {
      lista.push(novoPlano);
    }

    salvarPlanos(lista);
    abrirTelaPlanoContas();
  });

  if (plano.id) {
    document.getElementById('btnExcluirPlano').addEventListener('click', () => {
      if (confirm(`Excluir plano "${plano.nome}" e todos os seus subplanos?`)) {
        let novaLista = pegarPlanos().filter(p => p.id !== plano.id);
        let removedSomething;
        do {
          removedSomething = false;
          const filhos = novaLista.filter(p => p.parentId === plano.id);
          if (filhos.length > 0) {
            const idsFilhos = filhos.map(f => f.id);
            novaLista = novaLista.filter(p => !idsFilhos.includes(p.parentId));
            novaLista = novaLista.filter(p => !idsFilhos.includes(p.id));
            removedSomething = true;
          }
        } while (removedSomething);

        novaLista = novaLista.filter(p => p.parentId !== plano.id);
        salvarPlanos(novaLista);
        abrirTelaPlanoContas();
      }
    });
  }
}

// Inicializa menu do Plano de Contas
document.addEventListener('DOMContentLoaded', () => {
  const menuPlanoContas = document.getElementById('menuPlanoContas');
  if (menuPlanoContas) menuPlanoContas.addEventListener('click', abrirTelaPlanoContas);
});

// Pequena função para evitar injeção visual
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
