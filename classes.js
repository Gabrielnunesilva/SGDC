// Função para pegar classes do LocalStorage
function pegarClasses() {
  const lista = localStorage.getItem('classes');
  return lista ? JSON.parse(lista) : [];
}

// Função para salvar classes no LocalStorage
function salvarClasses(lista) {
  localStorage.setItem('classes', JSON.stringify(lista));
}

// Função para atualizar a lista de classes
function atualizarListaClasses() {
  const lista = pegarClasses();
  const container = document.getElementById('listaClasses');
  container.innerHTML = '';

  lista.forEach((c, index) => {
    const item = document.createElement('div');
    item.className = 'desbravador-item'; // mesmo estilo de lista
    item.textContent = c.nome;

    // Clicar para editar
    item.addEventListener('click', () => abrirFormClasseCompleto(index));

    container.appendChild(item);
  });
}

// Função para abrir tela de Classes
function abrirTelaClasses() {
  const areaConteudo = document.getElementById('areaConteudo');
  areaConteudo.innerHTML = `
    <div class="desbravadores-header"> <!-- mesmo cabeçalho -->
      <button id="btnAdicionarClasse">Adicionar</button>
    </div>
    <h2>Lista de Classes:</h2>
    <div id="listaClasses"></div>
  `;

  atualizarListaClasses();

  document.getElementById('btnAdicionarClasse').addEventListener('click', () => abrirFormClasseCompleto());
}

// Função para abrir formulário completo de Classe
function abrirFormClasseCompleto(indice = null) {
  const areaConteudo = document.getElementById('areaConteudo');
  const lista = pegarClasses();
  const classe = indice !== null ? lista[indice] : { nome: '' };

  areaConteudo.innerHTML = `
    <h2>${indice !== null ? 'Editar' : 'Adicionar'} Classe</h2>
    <form id="formClasseCompleto">
      <label>Nome da Classe:</label>
      <input type="text" id="nomeClasse" value="${classe.nome}" required>

      <div class="botoes-form">
        <button type="submit">Salvar</button>
        <button type="button" id="btnCancelarClasse">Cancelar</button>
        ${indice !== null ? '<button type="button" id="btnExcluirClasse" style="background-color:#e53935;">Excluir</button>' : ''}
      </div>
    </form>
  `;

  // Cancelar
  document.getElementById('btnCancelarClasse').addEventListener('click', () => abrirTelaClasses());

  // Salvar
  document.getElementById('formClasseCompleto').addEventListener('submit', (e) => {
    e.preventDefault();
    const novoNome = document.getElementById('nomeClasse').value.trim();
    if (!novoNome) return;

    if (indice !== null) {
      lista[indice].nome = novoNome; // editar existente
    } else {
      lista.push({ nome: novoNome }); // novo registro
    }

    salvarClasses(lista);
    abrirTelaClasses();
  });

  // Excluir
  if (indice !== null) {
    document.getElementById('btnExcluirClasse').addEventListener('click', () => {
      if (confirm(`Tem certeza que deseja excluir a classe ${classe.nome}?`)) {
        lista.splice(indice, 1);
        salvarClasses(lista);
        abrirTelaClasses();
      }
    });
  }
}

// Inicializar menu lateral para classes
document.addEventListener('DOMContentLoaded', () => {
  const menuClasses = document.getElementById('menuClasses');
  if (menuClasses) {
    menuClasses.addEventListener('click', abrirTelaClasses);
  }
});



