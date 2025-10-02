const areaConteudo = document.getElementById('areaConteudo');
const menuOpcoes = document.querySelectorAll('.menu-opcao');
const submenus = document.querySelectorAll('.submenu');

// Funções para abrir/fechar submenu
function fecharSubmenu(submenu) {
  submenu.style.maxHeight = submenu.scrollHeight + "px";
  submenu.offsetHeight;
  submenu.style.maxHeight = "0";
  submenu.classList.remove('show');
}

function abrirSubmenu(submenu) {
  submenu.classList.add('show');
  submenu.style.maxHeight = submenu.scrollHeight + "px";
  submenu.addEventListener('transitionend', () => {
    if (submenu.classList.contains('show')) {
      submenu.style.maxHeight = "none";
    }
  }, { once: true });
}

// Toggle submenus
menuOpcoes.forEach(opcao => {
  opcao.addEventListener('click', () => {
    const submenu = opcao.nextElementSibling;

    // Fecha outros submenus
    menuOpcoes.forEach(o => {
      const sm = o.nextElementSibling;
      if (o !== opcao && sm && sm.classList.contains('submenu')) {
        fecharSubmenu(sm);
        o.classList.remove('active');
      }
    });

    if (submenu && submenu.classList.contains('submenu')) {
      if (submenu.classList.contains('show')) {
        fecharSubmenu(submenu);
        opcao.classList.remove('active');
      } else {
        abrirSubmenu(submenu);
        opcao.classList.add('active');
      }
    } else {
      opcao.classList.toggle('active');
    }
  });
});

// Delegação de clique para links do menu
document.addEventListener('DOMContentLoaded', () => {
  const menuLateral = document.querySelector('.menu-lateral');

  menuLateral.addEventListener('click', e => {
    const alvo = e.target.closest('a');
    if (!alvo || !menuLateral.contains(alvo)) return;
    e.preventDefault();
    const id = alvo.id;

    switch (id) {
      // Cadastros
      case 'menuDesbravadores': abrirTelaDesbravadores(); break;
      case 'menuUnidades': abrirTelaUnidades(); break;
      case 'menuClasses': abrirTelaClasses(); break;
      case 'menuEspecialidades': abrirTelaEspecialidades(); break;

      // Financeiro / Plano de contas
      case 'menuPlanoContas': abrirTelaPlanoContas(); break;
      case 'menuControleCaixa': abrirTelaCaixa(); break;
      case 'menuPatrimonio': abrirTelaPatrimonios(); break;
      case 'menuControleAtas': abrirTelaAtas(); break;
      case 'menuControleAtos': abrirTelaAtos(); break;

      // Relatórios
      case 'menuRelatorioDesbravadores': abrirRelatorioDesbravadores(); break;
      case 'menuRelatorioUnidades': abrirRelatorioUnidades(); break;
      case 'menuRelatorioEspecialidades': abrirRelatorioEspecialidades(); break;
      case 'menuRelatorioClasses': abrirRelatorioClasses(); break;
      case 'menuMensalidades': abrirRelatorioMensalidades(); break;
      case 'menuRelatorioPatrimonio': abrirRelatorioPatrimonio(); break;
      case 'menuRelatorioAtasEAtos': abrirRelatorioAtasEAtos(); break;
      case 'menuRelatorioAutorizacoes': abrirRelatorioAutorizacoes(); break;
      case 'menuFluxoCaixa': abrirRelatorioFluxoCaixa(); break;
      
      // Outros
      case 'menuMensalidades': abrirTelaMensalidades(); break;
      case 'menuPatrimonioRelatorio': abrirRelatorioPatrimonio(); break;

      default: console.log('Menu não identificado:', id);
    }
  });

  // Tela inicial
  areaConteudo.innerHTML = `<h2>Bem vindo, selecione uma opção no menu para começar.</h2>`;
});
