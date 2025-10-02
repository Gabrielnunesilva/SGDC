const loginForm = document.getElementById('loginForm');
const cadastrarLink = document.getElementById('cadastrarLink');

// Função para simular login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  // Recupera usuários do LocalStorage
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);

  if(usuarioEncontrado){
    alert('Login bem-sucedido!');
    // Aqui você pode redirecionar para a página principal do sistema
    // window.location.href = "sistema.html";
  } else {
    alert('Email ou senha incorretos!');
  }
});

// Redirecionar para cadastro (vamos criar a tela de cadastro depois)
cadastrarLink.addEventListener('click', (e) => {
  e.preventDefault();
  alert('Tela de cadastro ainda será implementada.');
});
