// ===== LOGIN =====
const loginForm = document.getElementById('loginForm');

if(loginForm){
  const mensagemErro = document.getElementById('mensagemErro');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);

    if(usuarioEncontrado){
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
      window.location.href = "sistema.html";
    } else {
      // Mostra a mensagem de erro na tela
      mensagemErro.textContent = 'Email ou senha inválido';
    }
  });

}

// ===== CADASTRO =====
const cadastroForm = document.getElementById('cadastroForm');

if(cadastroForm){
  cadastroForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if(senha !== confirmarSenha){
      alert('As senhas não coincidem!');
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se email já está cadastrado
    const existe = usuarios.some(u => u.email === email);
    if(existe){
      alert('Este email já está cadastrado!');
      return;
    }

    // Adiciona novo usuário
    usuarios.push({nome, email, senha});
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado com sucesso!');
    // Redireciona para login
    window.location.href = "login.html";
  });
}



