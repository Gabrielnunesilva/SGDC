// Função para pegar unidades do LocalStorage
function pegarUnidades() {
  const lista = localStorage.getItem('unidades');
  return lista ? JSON.parse(lista) : [];
}

// Função para salvar unidades no LocalStorage
function salvarUnidades(lista) {
  localStorage.setItem('unidades', JSON.stringify(lista));
}

// Função para atualizar a lista de unidades
function atualizarListaUnidades() {
  const lista = pegarUnidades();
  const container = document.getElementById('listaUnidades');
  container.innerHTML = '';

  lista.forEach((u, index) => {
    const item = document.createElement('div');
    item.className = 'desbravador-item'; // mesma classe usada em desbravadores
    item.textContent = u.nome;

    // Ao clicar, abre o formulário para edição
    item.addEventListener('click', () => abrirFormUnidadeCompleto(index));

    container.appendChild(item);
  });
}

// Função para abrir a tela de Unidades
function abrirTelaUnidades() {
  const areaConteudo = document.getElementById('areaConteudo');
  areaConteudo.innerHTML = `
    <div class="desbravadores-header"> <!-- mesma classe -->
      <button id="btnAdicionarUnidade">Adicionar</button>
    </div>
    <h2>Lista de Unidades:</h2>
    <div id="listaUnidades"></div>
  `;

  atualizarListaUnidades();

  document.getElementById('btnAdicionarUnidade').addEventListener('click', () => abrirFormUnidadeCompleto());
}

// Função para abrir formulário completo de Unidade
function abrirFormUnidadeCompleto(indice = null) {
  const areaConteudo = document.getElementById('areaConteudo');
  const lista = pegarUnidades();
  const unidade = indice !== null ? lista[indice] : { nome: '' };

  areaConteudo.innerHTML = `
    <h2>${indice !== null ? 'Editar' : 'Adicionar'} Unidade</h2>
    <form id="formUnidadeCompleto">
      <label>Nome da Unidade:</label>
      <input type="text" id="nomeUnidade" value="${unidade.nome}" required>

      <div class="botoes-form"> <!-- mesma classe -->
        <button type="submit">Salvar</button>
        <button type="button" id="btnCancelarUnidade">Cancelar</button>
        ${indice !== null ? '<button type="button" id="btnExcluirUnidade" style="background-color:#e53935;">Excluir</button>' : ''}
      </div>
    </form>
  `;

  // Cancelar
  document.getElementById('btnCancelarUnidade').addEventListener('click', () => abrirTelaUnidades());

  // Salvar
  document.getElementById('formUnidadeCompleto').addEventListener('submit', (e) => {
    e.preventDefault();
    const novoNome = document.getElementById('nomeUnidade').value.trim();
    if (!novoNome) return;

    if (indice !== null) {
      lista[indice].nome = novoNome; // atualiza existente
    } else {
      lista.push({ nome: novoNome }); // adiciona novo
    }

    salvarUnidades(lista);
    abrirTelaUnidades();
  });

  // Excluir (somente edição)
  if (indice !== null) {
    document.getElementById('btnExcluirUnidade').addEventListener('click', () => {
      if (confirm(`Tem certeza que deseja excluir a unidade ${unidade.nome}?`)) {
        lista.splice(indice, 1);
        salvarUnidades(lista);
        abrirTelaUnidades();
      }
    });
  }
}

// Inicializar menu lateral para unidades
document.addEventListener('DOMContentLoaded', () => {
  const menuUnidades = document.getElementById('menuUnidades');
  if (menuUnidades) {
    menuUnidades.addEventListener('click', abrirTelaUnidades);
  }
});


