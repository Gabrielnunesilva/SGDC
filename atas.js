// Funções de armazenamento
function pegarAtas() {
  const lista = localStorage.getItem('atas');
  return lista ? JSON.parse(lista) : [];
}

function salvarAtas(lista) {
  localStorage.setItem('atas', JSON.stringify(lista));
}

// Atualiza lista de atas
function atualizarListaAtas() {
  const lista = pegarAtas();
  const container = document.getElementById('listaAtas');
  container.innerHTML = '';

  lista.forEach((a, index) => {
    const item = document.createElement('div');
    item.className = 'desbravador-item';
    item.innerHTML = `
      <span>${a.titulo}</span>
      <span>Data: ${a.data}</span>
    `;
    item.addEventListener('click', () => abrirFormAta(index));
    container.appendChild(item);
  });
}

// Abrir tela principal de Atas
function abrirTelaAtas() {
  const areaConteudo = document.getElementById('areaConteudo');
  areaConteudo.innerHTML = `
    <h2>Controle de Atas</h2>
    <div class="desbravadores-header">
      <button id="btnAdicionarAta">Adicionar</button>
    </div>
    <div id="listaAtas"></div>
  `;
  atualizarListaAtas();

  document.getElementById('btnAdicionarAta').addEventListener('click', () => abrirFormAta());
}

// Abrir formulário de Ata
function abrirFormAta(indice = null) {
  const lista = pegarAtas();
  const ata = indice !== null ? lista[indice] : { titulo:'', descricao:'', data:'' };

  const areaConteudo = document.getElementById('areaConteudo');
  areaConteudo.innerHTML = `
    <h2>${indice !== null ? 'Editar' : 'Adicionar'} Ata</h2>
    <form id="formAta">
      <label>Título:</label>
      <input type="text" id="tituloAta" value="${ata.titulo}" required>

      <label>Descrição:</label>
      <textarea id="descricaoAta" rows="6" style="resize: vertical;">${ata.descricao}</textarea>

      <label>Data:</label>
      <input type="date" id="dataAta" value="${ata.data}" required>

      <div class="botoes-form">
        <button type="submit">Salvar</button>
        <button type="button" id="btnCancelarAta">Cancelar</button>
        ${indice !== null ? '<button type="button" id="btnExcluirAta">Excluir</button>' : ''}
      </div>
    </form>
  `;

  document.getElementById('btnCancelarAta').addEventListener('click', abrirTelaAtas);

  document.getElementById('formAta').addEventListener('submit', e => {
    e.preventDefault();
    const novaAta = {
      titulo: document.getElementById('tituloAta').value.trim(),
      descricao: document.getElementById('descricaoAta').value.trim(),
      data: document.getElementById('dataAta').value
    };

    if(indice !== null) lista[indice] = novaAta;
    else lista.push(novaAta);

    salvarAtas(lista);
    abrirTelaAtas();
  });

  if(indice !== null) {
    document.getElementById('btnExcluirAta').addEventListener('click', () => {
      if(confirm(`Deseja excluir a ata "${ata.titulo}"?`)) {
        lista.splice(indice,1);
        salvarAtas(lista);
        abrirTelaAtas();
      }
    });
  }
}

// Inicializa menu lateral
document.addEventListener('DOMContentLoaded', () => {
  const menuAtas = document.querySelector('#submenuFinanceiro a:nth-child(4)'); // Controle de Atas
  if(menuAtas){
    menuAtas.addEventListener('click', abrirTelaAtas);
  }
});
