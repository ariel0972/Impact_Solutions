window.onload = function (e) {
    var btnCadastrar = document.getElementById("btnCadastrar");
    var txtNome = document.getElementById("txtNome");
    var txtSobrenome = document.getElementById("txtSobrenome");
    var txtEmail = document.getElementById("txtEmail");
    var txtTelefone = document.getElementById("txtTelefone");
    var slcGenero = document.getElementById("slcGenero");
    var txtSenha = document.getElementById("txtSenha");

    txtNome.focus();

    btnCadastrar.onclick = function (e) {
        e.preventDefault();
        var nome = txtNome.value;
        var sobrenome = txtSobrenome.value;
        var senha = txtSenha.value;
        var telefone = txtTelefone.value;
        var email = txtEmail.value;
        var genero = slcGenero.value;
    
        if (nome == "" || sobrenome == "" || senha == "" || telefone == "" || email == "" || genero == "") {
            var mensagem = "Todos os campos são obrigatórios.";
            alert(mensagem);
        } else {
            var resultado = criarConta(nome, sobrenome, email, telefone, genero, senha);
            if (resultado.sucesso) {
                alert(resultado.mensagem);
                window.location.href = "http://localhost:5501/src/login.html";
                // Redirecionar para página de login ou qualquer outra ação necessária
            } else {
                alert(resultado.mensagem);
            }
        }
    };
    

    // Função para criar uma nova conta de usuário
function criarConta(nome, sobrenome, email, telefone, genero, senha) {
    var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    var usuarioExistente = usuarios.find(function(usuario) {
        return usuario.email === email;
    });

    if (usuarioExistente) {
        return { sucesso: false, mensagem: "O email já está em uso." };
    } else {
        var novoUsuario = {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            telefone: telefone,
            genero: genero,
            senha: senha
        };
        usuarios.push(novoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        return { sucesso: true, mensagem: "Conta criada com sucesso." };
    }
}

document.getElementById("formCadastro").onsubmit = function(e) {
    e.preventDefault();

    var nome = document.getElementById("txtNome").value;
    var sobrenome = document.getElementById("txtSobrenome").value;
    var email = document.getElementById("txtEmail").value;
    var telefone = document.getElementById("txtTelefone").value;
    var genero = document.getElementById("slcGenero").value;
    var senha = document.getElementById("txtSenha").value;

    var resultado = criarConta(nome, sobrenome, email, telefone, genero, senha);

    if (resultado.sucesso) {
        alert(resultado.mensagem);
    } else {
        alert(resultado.mensagem);
    }
};


}