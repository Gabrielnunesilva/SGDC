# 🏕️ Sistema GCD — Gerenciamento Clube de Desbravadores

Projeto acadêmico de **Sistema de Gerenciamento para o Clube de Desbravadores (GCD)**.  
Criado para auxiliar na organização de **membros, atas, finanças, relatórios e patrimônio** do clube.  

---

## 🚀 Funcionalidades

- 🔑 Login e cadastro de usuários  
- 📝 Cadastro e gerenciamento de **desbravadores**  
- 📂 Controle de **atas e atos administrativos**  
- 📊 Relatórios financeiros e administrativos  
- 💰 Gestão de **plano de contas** e **caixa**  
- 🏠 Registro de **patrimônio**  
- 🎨 Interface simples em HTML, CSS e JavaScript  

---

## 📂 Estrutura do Projeto

```
📁 Sistema-GCD/
├── index.html              # Página inicial
├── login.html              # Página de login
├── cadastro.html           # Cadastro de usuários
├── sistema.html            # Painel principal
│
├── css/                    # Estilos por módulo
│   ├── style.css
│   ├── desbravadores.css
│   ├── planoContas.css
│   ├── controleCaixa.css
│   └── ...
│
├── js/                     # Lógica em JavaScript
│   ├── login-cadastro.js
│   ├── desbravadores.js
│   ├── especialidades.js
│   ├── planosContas.js
│   ├── patrimonios.js
│   ├── relatorios.js
│   └── script.js
│
├── atas/                   # Atas e Atos
│   ├── atas.js
│   ├── atos-atas.css
│   ├── atos.js
│
└── outros arquivos estáticos (imagens, fontes, etc)
```

---

## 🖥️ Tecnologias Utilizadas

- **HTML5** → estrutura das páginas  
- **CSS3** → estilos e responsividade  
- **JavaScript (puro)** → manipulação do DOM e validações  
- *(Opcional)* Backend ou banco de dados pode ser integrado futuramente  

---

## ⚙️ Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/Gabrielnunesilva/Sistema-GCD.git
   cd Sistema-GCD
   ```

2. Abra o arquivo `index.html` no navegador  
   *(ou utilize um servidor local, como o `http-server` do Node.js ou `Live Server` do VSCode)*

3. Navegue pelas funcionalidades: login, cadastro, módulos, relatórios etc.

---

## 📘 Como Usar o Sistema

O fluxo recomendado de uso do sistema é o seguinte:

1️⃣ **Configurações iniciais**  
   - Cadastre as **Unidades** do clube.  
   - Cadastre também as **Classes** e **Especialidades** disponíveis.  

2️⃣ **Cadastro de desbravadores**  
   - Acesse a aba **Desbravadores**.  
   - Cadastre cada membro do clube, vinculando a sua **Unidade**, **Classes** e **Especialidades** já cadastradas.  
   - O sistema facilita o vínculo, garantindo organização e clareza.  

3️⃣ **Financeiro — Plano de Contas**  
   - Crie os **Planos de Contas** principais.  
   - Em seguida, adicione os **Subplanos** relacionados a cada plano.  
   - Isso permite organizar entradas, saídas e controle de caixa do clube.  

4️⃣ **Relatórios**  
   - Acesse a aba **Relatórios** para visualizar informações consolidadas:  
     - **Financeiros:** totais de receitas e despesas por período, plano e subplano.  
     - **Administrativos:** listagem de desbravadores com suas respectivas classes, especialidades e unidades.  
     - **Patrimônio:** registro de bens e situação atual.  
   - Os relatórios ajudam a acompanhar a evolução do clube e a manter a prestação de contas organizada.  

5️⃣ **Atas e Atos**  
   - Registre atas de reuniões e atos administrativos para manter o histórico organizacional do clube.  

---

## 📊 Melhorias Futuras

- Integração com banco de dados real (MySQL, MongoDB, etc)  
- Sistema de autenticação seguro (JWT, bcrypt, etc)  
- Exportação de relatórios em PDF/Excel  
- Controle de permissões por tipo de usuário (admin, membro, etc)  
- Interface responsiva para dispositivos móveis 📱  
- Integração com frameworks modernos (React, Vue, Angular)  

---

## 📌 Observações

- Atualmente o sistema é **100% front-end**, armazenando e manipulando dados apenas no navegador  
- Para uso real em produção, recomenda-se adicionar backend + banco de dados  

---

## 📜 Licença

Este projeto é de uso acadêmico e pessoal.  
