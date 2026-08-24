

const btnUsuario = document.getElementById("btnUsuario");
const btnAdministrador = document.getElementById("btnAdministrador");

const areaCadastro = document.getElementById("areaCadastro");

const formLogin = document.getElementById("formLogin");

const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");

const mostrarSenha = document.getElementById("mostrarSenha");

const mensagem = document.getElementById("mensagem");

const btnVoltar = document.getElementById("btnVoltar");

const btnResponsavel = document.getElementById("btnResponsavel");



let tipoLogin = "usuario";



btnUsuario.addEventListener("click", () => {

    tipoLogin = "usuario";

    btnUsuario.classList.add("ativo");
    btnAdministrador.classList.remove("ativo");

    // Usuário pode criar conta
    areaCadastro.style.display = "block";

    limparMensagem();

});


btnAdministrador.addEventListener("click", () => {

    tipoLogin = "administrador";

    btnAdministrador.classList.add("ativo");
    btnUsuario.classList.remove("ativo");

    // Administrador NÃO pode criar conta
    areaCadastro.style.display = "none";

    limparMensagem();

});



mostrarSenha.addEventListener("click", () => {

    if (senhaInput.type === "password") {

        senhaInput.type = "text";

        mostrarSenha.textContent = "🙈";

    } else {

        senhaInput.type = "password";

        mostrarSenha.textContent = "👁";

    }

});



formLogin.addEventListener("submit", (event) => {

    event.preventDefault();

    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();



    if (tipoLogin === "administrador") {

        /*
         * CREDENCIAIS PROVISÓRIAS
         *
         * Posteriormente serão substituídas
         * pela validação através da API.
         */

        const emailAdmin = "admin@teste.com";
        const senhaAdmin = "admin123";


        if (
            email === emailAdmin &&
            senha === senhaAdmin
        ) {

            mostrarMensagem(
                "Login realizado com sucesso!",
                "sucesso"
            );

            // Pequeno atraso para mostrar a mensagem
            setTimeout(() => {

                window.location.href = "dashboard.html";

            }, 500);

        } else {

            mostrarMensagem(
                "E-mail ou senha do administrador incorretos.",
                "erro"
            );

        }

        return;
    }


    

    if (tipoLogin === "usuario") {

        /*
         * Nesta etapa ainda não temos API.
         *
         * Portanto, o login de usuário
         * será implementado posteriormente
         * junto com o cadastro e banco de dados.
         */

        mostrarMensagem(
            "O login de usuário será conectado ao cadastro e à API na próxima etapa.",
            "erro"
        );

    }

});




btnResponsavel.addEventListener("click", () => {

    mostrarMensagem(
        "A área do responsável será desenvolvida posteriormente.",
        "erro"
    );

});



btnVoltar.addEventListener("click", () => {

    window.location.href = "tela_principal.html";

});



function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className = "mensagem " + tipo;

}


function limparMensagem() {

    mensagem.textContent = "";

    mensagem.className = "mensagem";

}