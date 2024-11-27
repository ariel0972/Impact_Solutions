window.onload = function (e) {

    var btnEntrar = document.getElementById("enter");
    var txtEmail = document.getElementById("email");
    var txtSenha = document.getElementById("senha");

    txtEmail.focus();

    async function fazerLogin(email, senha) {
        // const response = 
        return await fetch(`/app/Login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: email, password: senha }),
        }).then((response) => {
          if (!response.ok) {
            exibirMensagemErro("nao foi possivel realizar o login")
            throw new Error(`HTTP error, status = ${response.status}`);
          }
          return response.json();
        })
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
            var resultado = await fazerLogin(email, senha);
            if (resultado) {
                localStorage.setItem("userToken", resultado.token)
                localStorage.setItem("userType", resultado.userType)
                window.location.href = "/front-end/html/perfil_ong.html";
            } else {
                alert(resultado.mensagem);
            }
        }
    };

    //função pra exibir o erro na caixa de login
    function exibirMensagemErro(mensagem) {
        alert(mensagem)
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

    const loginbtnpage = document.querySelector('#login');
    const signbtnpage = document.querySelector('#sign');
    if (window.location.pathname == "/front-end/html/login.html"){
        signbtnpage.style.backgroundColor = "var(--color3)"
        loginbtnpage.style.backgroundColor = "var(--color1)"
        signbtnpage.style.opacity = "0.5"
    }
}
