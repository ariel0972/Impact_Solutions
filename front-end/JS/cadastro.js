window.onload = function (e) {
    var btnCadastrar = document.getElementById("regis");
    var txtNome = document.getElementById("nome");
    //var txtSobrenome = document.getElementById("txtSobrenome");
    var txtEmail = document.getElementById("email");
    var txtTelefone = document.getElementById("telefone");
    //var slcGenero = document.getElementById("slcGenero");
    var txtSenha = document.getElementById("senha");

    txtNome.focus();

    btnCadastrar.onclick = function (e) {
        var btnCadastrar = document.getElementById("regis");
        var txtNome = document.getElementById("nome");
        //var txtSobrenome = document.getElementById("txtSobrenome");
        var txtEmail = document.getElementById("email");
        var txtTelefone = document.getElementById("telefone");
        //var slcGenero = document.getElementById("slcGenero");
        var txtSenha = document.getElementById("senha");
        e.preventDefault();
        var nome = txtNome.value;
        //var sobrenome = txtSobrenome.value;
        var senha = txtSenha.value;
        var telefone = txtTelefone.value;
        var email = txtEmail.value;
        //var genero = slcGenero.value;
    
        if (nome == "" || senha == "" || telefone == "" || email == "") {
            var mensagem = "Todos os campos são obrigatórios.";
            alert(mensagem);
        } else {
            var resultado = criarConta(nome, email, telefone, senha);
            if (resultado) {
                alert(resultado);
                window.location.href = "http://localhost:5501/front-end/html/login.html";
                // Redirecionar para página de login ou qualquer outra ação necessária
            } else {
                alert(resultado.mensagem);
            }
        }
    };
    

    // Função para criar uma nova conta de usuário
  async function criarConta(nome, email, telefone, senha) {

     await fetch("/app/userSignIn",
    {body:JSON.stringify({user:nome, password:senha}),  method:"POST", headers:{"Content-Type":"application/json"}}).then(v => {return v.ok})


    /* fetch("/app/userSignIn", {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
        },
        body:JSON.stringify({
            user: nome,
            passaword: senha
            })
        }).then(res => {
            return res.json()
            })
    não sei isso aqui ta certo mas a gente aceita que sim
    */

    // var usuarioExistente = usuarios.find(function(usuario) {
    //     return usuario.email === email;
    // });

    // if (usuarioExistente) {
    //     return { sucesso: false, mensagem: "O email já está em uso." };
    // } else {
    //     var novoUsuario = {
    //         nome: nome,
    //         email: email,
    //         telefone: telefone,
    //         senha: senha
    //     };
    //     usuarios.push(novoUsuario);
    //     localStorage.setItem("usuarios", JSON.stringify(usuarios));

    //     return { sucesso: true, mensagem: "Conta criada com sucesso." };
    // }
}

document.getElementById("formCadastro").onsubmit = function(e) {
    e.preventDefault();

    var nome = document.getElementById("nome").value;
    //var sobrenome = document.getElementById("txtSobrenome").value;
    var email = document.getElementById("email").value;
    var telefone = document.getElementById("telefone").value;
    //var genero = document.getElementById("slcGenero").value;
    var senha = document.getElementById("senha").value;

    var resultado = criarConta(nome, email, telefone, senha);

    if (resultado.sucesso) {
        alert(resultado.mensagem);
    } else {
        alert(resultado.mensagem);
    }
};
}

// Exibe campos específicos com base no tipo de usuário selecionado
document.getElementById('tipo-usuario').addEventListener('change', function () {
    var tipo = this.value;
    if (tipo === 'voluntario') {
        document.getElementById('dados-voluntario').style.display = 'block';
        document.getElementById('dados-ong').style.display = 'none';
    } else if (tipo === 'ong') {
        document.getElementById('dados-ong').style.display = 'block';
        document.getElementById('dados-voluntario').style.display = 'none';
    } else {
        document.getElementById('dados-voluntario').style.display = 'none';
        document.getElementById('dados-ong').style.display = 'none';
    }
});

// Supondo que esteja usando Node.js com Express
// A* - apenas supondo mesmo
