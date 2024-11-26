window.onload = function (e) {

    var btnEntrar = document.getElementById("enter");
    var txtEmail = document.getElementById("email");
    var txtSenha = document.getElementById("senha");

    txtEmail.focus();

    function fazerLogin(email, senha) {
        fetch("/app/Login")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error, status = ${response.status}`);
          }
          return response.json();
        })
        // var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
        // var usuario = usuarios.find(function(usuario) {
        //     return usuario.email === email;
        // });
    
        // if (usuario && usuario.senha === senha) {
        //     return { sucesso: true, mensagem: "Login bem-sucedido.", usuario: usuario};
        // } else {
        //     exibirMensagemErro("Email ou senha incorretos");
        // }
    }
    

    btnEntrar.onclick = async function (e) {
        var btnEntrar = document.getElementById("enter");
        var txtEmail = document.getElementById("email");
        var txtSenha = document.getElementById("senha");
        e.preventDefault();

        var email = txtEmail.value;
        var senha = txtSenha.value;

        if (email == "") {
            exibirMensagemErro("Campo E-mail obrigatório.");
        }
        else if (senha == "") {
            exibirMensagemErro("Campo Senha obrigatório.");
        }
        else {
            var resultado = fazerLogin(email, senha);
            if (resultado) {
                window.location.href = "http://localhost:5501/front-end/html/perfil_ong.html";
            } else {
                alert(resultado.mensagem);
            }
        }
    };

    //função pra exibir o erro na caixa de login
    function exibirMensagemErro(mensagem) {
        alert(mensagem)
        // var spnErro = document.getElementById("spnErro");

        // spnErro.innerText = mensagem;
        // spnErro.style.display = "block";
        // setTimeout(function () {
        //     spnErro.style.display = "none";
        // }, 5000);
        
    }

    document.getElementById("formLogin").onsubmit = async function(e) {
        e.preventDefault();
    
        var email = document.getElementById("email").value;
        var senha = document.getElementById("senha").value;
    
        var resultado = await fazerLogin(email, senha);
    
        if (resultado) {
            // Login bem-sucedido, redirecione para a página de tarefas
            window.location.href = "/front-end/html/perfil_ong.html";
        } else {
            // Exiba mensagem de erro
            alert(resultado.mensagem);
        }
        
    };

    var pageSign = document.getElementById("sign");
    var pagelogin = document.getElementById("login");

    pagelogin.onclick = function(){
        window.location.href = '/front-end/html/login.html'
    }
    pageSign.onclick = function(){
        window.location.href = '/front-end/html/cadastro.html'
    }
}
