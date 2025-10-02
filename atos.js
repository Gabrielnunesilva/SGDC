// Funções de armazenamento
function pegarAtos() {
  const lista = localStorage.getItem('atos');
  return lista ? JSON.parse(lista) : [];
}

function salvarAtos(lista) {
  localStorage.setItem('atos', JSON.stringify(lista));
}

// Atualiza lista de atos
function atualizarListaAtos() {
  const lista = pegarAtos();
  const container = document.getElementById('listaAtos');
  container.innerHTML = '';

  lista.forEach((a, index) => {
    const item = document.createElement('div');
    item.className = 'desbravador-item';
    item.innerHTML = `
      <span>${a.titulo}</span>
      <span>Data: ${a.data}</span>
    `;
    item.addEventListener('click', () => abrirFormAto(index));
    container.appendChild(item);
  });
}

// Abrir tela principal de Atos
function abrirTelaAtos() {
  const areaConteudo = document.getElementById('areaConteudo');
  areaConteudo.innerHTML = `
    <h2>Controle de Atos</h2>
    <div class="desbravadores-header">
      <button id="btnAdicionarAto">Adicionar</button>
    </div>
    <div id="listaAtos"></div>
  `;
  atualizarListaAtos();

  document.getElementById('btnAdicionarAto').addEventListener('click', () => abrirFormAto());
}

// Abrir formulário de Ato
function abrirFormAto(indice = null) {
  const lista = pegarAtos();
  const ato = indice !== null ? lista[indice] : { titulo:'', descricao:'', data:'' };

  const areaConteudo = document.getElementById('areaConteudo');
  areaConteudo.innerHTML = `
    <h2>${indice !== null ? 'Editar' : 'Adicionar'} Ato</h2>
    <form id="formAto">
      <label>Título:</label>
      <input type="text" id="tituloAto" value="${ato.titulo}" required>

      <label>Descrição:</label>
      <textarea id="descricaoAto" rows="6" style="resize: vertical;">${ato.descricao}</textarea>

      <label>Data:</label>
      <input type="date" id="dataAto" value="${ato.data}" required>

      <div class="botoes-form">
        <button type="submit">Salvar</button>
        <button type="button" id="btnCancelarAto">Cancelar</button>
        ${indice !== null ? '<button type="button" id="btnExcluirAto">Excluir</button>' : ''}
      </div>
    </form>
  `;

  document.getElementById('btnCancelarAto').addEventListener('click', abrirTelaAtos);

  document.getElementById('formAto').addEventListener('submit', e => {
    e.preventDefault();
    const novoAto = {
      titulo: document.getElementById('tituloAto').value.trim(),
      descricao: document.getElementById('descricaoAto').value.trim(),
      data: document.getElementById('dataAto').value
    };

    if(indice !== null) lista[indice] = novoAto;
    else lista.push(novoAto);

    salvarAtos(lista);
    abrirTelaAtos();
  });

  if(indice !== null) {
    document.getElementById('btnExcluirAto').addEventListener('click', () => {
      if(confirm(`Deseja excluir o ato "${ato.titulo}"?`)) {
        lista.splice(indice,1);
        salvarAtos(lista);
        abrirTelaAtos();
      }
    });
  }
}

// Inicializa menu lateral
document.addEventListener('DOMContentLoaded', () => {
  const menuAtos = document.querySelector('#submenuFinanceiro a:nth-child(5)'); // Controle de Atos
  if(menuAtos){
    menuAtos.addEventListener('click', abrirTelaAtos);
  }
});
