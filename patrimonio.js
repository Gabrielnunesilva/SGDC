// Funções de armazenamento
function pegarPatrimonios() {
  const lista = localStorage.getItem('patrimonios');
  return lista ? JSON.parse(lista) : [];
}

function salvarPatrimonios(lista) {
  localStorage.setItem('patrimonios', JSON.stringify(lista));
}

// Atualiza lista de patrimônio
function atualizarListaPatrimonios() {
  const lista = pegarPatrimonios();
  const container = document.getElementById('listaPatrimonios');
  container.innerHTML = '';

  lista.forEach((p, index) => {
    const item = document.createElement('div');
    item.className = 'desbravador-item';
    item.innerHTML = `
      <span>${p.item}</span>
      <span>Qtd: ${p.quantidade}</span>
      <span>Valor total: R$ ${p.valor}</span>
    `;
    item.addEventListener('click', () => abrirFormPatrimonio(index));
    container.appendChild(item);
  });
}

// Abrir tela principal de Patrimônio
function abrirTelaPatrimonios() {
  const areaConteudo = document.getElementById('areaConteudo');
  areaConteudo.innerHTML = `
    <h2>Controle de Patrimônio</h2>
    <div class="desbravadores-header">
      <button id="btnAdicionarPatrimonio">Adicionar</button>
    </div>
    <div id="listaPatrimonios"></div>
  `;
  atualizarListaPatrimonios();

  document.getElementById('btnAdicionarPatrimonio').addEventListener('click', () => abrirFormPatrimonio());
}

// Abrir formulário de Patrimônio
function abrirFormPatrimonio(indice = null) {
  const lista = pegarPatrimonios();
  const patrimonio = indice !== null ? lista[indice] : { item:'', quantidade:1, valor:0 };

  const areaConteudo = document.getElementById('areaConteudo');
  areaConteudo.innerHTML = `
    <h2>${indice !== null ? 'Editar' : 'Adicionar'} Patrimônio</h2>
    <form id="formPatrimonio">
      <label>Item:</label>
      <input type="text" id="itemPatrimonio" value="${patrimonio.item}" required>

      <label>Quantidade:</label>
      <input type="number" id="quantidadePatrimonio" value="${patrimonio.quantidade}" min="1" required>

      <label>Valor:</label>
      <input type="number" id="valorPatrimonio" value="${patrimonio.valor}" min="0" step="0.01" required>

      <div class="botoes-form">
        <button type="submit">Salvar</button>
        <button type="button" id="btnCancelarPatrimonio">Cancelar</button>
        ${indice !== null ? '<button type="button" id="btnExcluirPatrimonio">Excluir</button>' : ''}
      </div>
    </form>
  `;

  document.getElementById('btnCancelarPatrimonio').addEventListener('click', abrirTelaPatrimonios);

  document.getElementById('formPatrimonio').addEventListener('submit', e => {
    e.preventDefault();
    const novoPatrimonio = {
      item: document.getElementById('itemPatrimonio').value.trim(),
      quantidade: parseInt(document.getElementById('quantidadePatrimonio').value),
      valor: parseFloat(document.getElementById('valorPatrimonio').value)
    };

    if(indice !== null) lista[indice] = novoPatrimonio;
    else lista.push(novoPatrimonio);

    salvarPatrimonios(lista);
    abrirTelaPatrimonios();
  });

  if(indice !== null) {
    document.getElementById('btnExcluirPatrimonio').addEventListener('click', () => {
      if(confirm(`Deseja excluir o item ${patrimonio.item}?`)) {
        lista.splice(indice,1);
        salvarPatrimonios(lista);
        abrirTelaPatrimonios();
      }
    });
  }
}

// Inicializa menu lateral
document.addEventListener('DOMContentLoaded', () => {
  const menuPatrimonio = document.querySelector('#submenuFinanceiro a:nth-child(3)'); // Controle de Patrimônio
  if(menuPatrimonio){
    menuPatrimonio.addEventListener('click', abrirTelaPatrimonios);
  }
});
