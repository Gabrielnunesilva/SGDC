// Função para pegar especialidades do LocalStorage
function pegarEspecialidades() {
  const lista = localStorage.getItem('especialidades');
  return lista ? JSON.parse(lista) : [];
}

// Função para salvar especialidades no LocalStorage
function salvarEspecialidades(lista) {
  localStorage.setItem('especialidades', JSON.stringify(lista));
}

// Função para atualizar a lista de especialidades
function atualizarListaEspecialidades() {
  const lista = pegarEspecialidades();
  const container = document.getElementById('listaEspecialidades');
  container.innerHTML = '';

  lista.forEach((e, index) => {
    const item = document.createElement('div');
    item.className = 'desbravador-item'; // mesma classe usada em unidades/desbravadores
    item.textContent = e.nome;

    // Ao clicar, abre o formulário para edição
    item.addEventListener('click', () => abrirFormEspecialidadeCompleto(index));

    container.appendChild(item);
  });
}

// Função para abrir a tela de Especialidades
function abrirTelaEspecialidades() {
  const areaConteudo = document.getElementById('areaConteudo');
  areaConteudo.innerHTML = `
    <div class="desbravadores-header">
      <button id="btnAdicionarEspecialidade">Adicionar</button>
    </div>
    <h2>Lista de Especialidades:</h2>
    <div id="listaEspecialidades"></div>
  `;

  atualizarListaEspecialidades();

  document.getElementById('btnAdicionarEspecialidade').addEventListener('click', () => abrirFormEspecialidadeCompleto());
}

// Função para abrir formulário completo de Especialidade
function abrirFormEspecialidadeCompleto(indice = null) {
  const areaConteudo = document.getElementById('areaConteudo');
  const lista = pegarEspecialidades();
  const especialidade = indice !== null ? lista[indice] : { nome: '' };

  areaConteudo.innerHTML = `
    <h2>${indice !== null ? 'Editar' : 'Adicionar'} Especialidade</h2>
    <form id="formEspecialidadeCompleto">
      <label>Nome da Especialidade:</label>
      <input type="text" id="nomeEspecialidade" value="${especialidade.nome}" required>

      <div class="botoes-form">
        <button type="submit">Salvar</button>
        <button type="button" id="btnCancelarEspecialidade">Cancelar</button>
        ${indice !== null ? '<button type="button" id="btnExcluirEspecialidade" style="background-color:#e53935;">Excluir</button>' : ''}
      </div>
    </form>
  `;

  // Cancelar
  document.getElementById('btnCancelarEspecialidade').addEventListener('click', () => abrirTelaEspecialidades());

  // Salvar
  document.getElementById('formEspecialidadeCompleto').addEventListener('submit', (e) => {
    e.preventDefault();
    const novoNome = document.getElementById('nomeEspecialidade').value.trim();
    if (!novoNome) return;

    if (indice !== null) {
      lista[indice].nome = novoNome; // atualiza existente
    } else {
      lista.push({ nome: novoNome }); // adiciona novo
    }

    salvarEspecialidades(lista);
    abrirTelaEspecialidades();
  });

  // Excluir (somente edição)
  if (indice !== null) {
    document.getElementById('btnExcluirEspecialidade').addEventListener('click', () => {
      if (confirm(`Tem certeza que deseja excluir a especialidade ${especialidade.nome}?`)) {
        lista.splice(indice, 1);
        salvarEspecialidades(lista);
        abrirTelaEspecialidades();
      }
    });
  }
}

// Inicializar menu lateral para especialidades
document.addEventListener('DOMContentLoaded', () => {
  const menuEspecialidades = document.getElementById('menuEspecialidades');
  if (menuEspecialidades) {
    menuEspecialidades.addEventListener('click', abrirTelaEspecialidades);
  }
});


