




const formCadastro =
    document.getElementById("formCadastro");

const nome =
    document.getElementById("nome");

const email =
    document.getElementById("email");

const senha =
    document.getElementById("senha");

const confirmarSenha =
    document.getElementById("confirmarSenha");

const mostrarSenha =
    document.getElementById("mostrarSenha");

const mostrarConfirmarSenha =
    document.getElementById("mostrarConfirmarSenha");

const mensagem =
    document.getElementById("mensagem");

const btnVoltar =
    document.getElementById("btnVoltar");

const btnCadastrar =
    document.querySelector(".btn-cadastrar");




function mostrarMensagem(texto, tipo) {

    if (!mensagem) {
        return;
    }

    mensagem.textContent = texto;

    mensagem.className = "mensagem";

    if (tipo) {
        mensagem.classList.add(tipo);
    }
}




function limparErros() {

    if (nome) {
        nome.classList.remove("erro");
    }

    if (email) {
        email.classList.remove("erro");
    }

    if (senha) {
        senha.classList.remove("erro");
    }

    if (confirmarSenha) {
        confirmarSenha.classList.remove("erro");
    }
}




if (mostrarSenha) {

    mostrarSenha.addEventListener(
        "click",
        function () {

            if (senha.type === "password") {

                senha.type = "text";

                mostrarSenha.textContent = "🙈";

            } else {

                senha.type = "password";

                mostrarSenha.textContent = "👁";

            }

        }
    );

}




if (mostrarConfirmarSenha) {

    mostrarConfirmarSenha.addEventListener(
        "click",
        function () {

            if (confirmarSenha.type === "password") {

                confirmarSenha.type = "text";

                mostrarConfirmarSenha.textContent = "🙈";

            } else {

                confirmarSenha.type = "password";

                mostrarConfirmarSenha.textContent = "👁";

            }

        }
    );

}




function normalizarEmail(valor) {

    return valor
        .trim()
        .toLowerCase();

}




function obterUsuarios() {

    try {

        const dados =
            localStorage.getItem(
                "transporteFacilUsuarios"
            );

        if (!dados) {
            return [];
        }

        const usuarios =
            JSON.parse(dados);

        if (!Array.isArray(usuarios)) {
            return [];
        }

        return usuarios;

    } catch (erro) {

        console.error(
            "Erro ao carregar usuários:",
            erro
        );

        return [];
    }

}




function salvarUsuarios(usuarios) {

    localStorage.setItem(
        "transporteFacilUsuarios",
        JSON.stringify(usuarios)
    );

}




if (formCadastro) {

    formCadastro.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            limparErros();

            mostrarMensagem("", "");




            const nomeValor =
                nome.value.trim();

            const emailValor =
                normalizarEmail(
                    email.value
                );

            const senhaValor =
                senha.value;

            const confirmarSenhaValor =
                confirmarSenha.value;




            if (nomeValor.length < 3) {

                nome.classList.add("erro");

                mostrarMensagem(
                    "Digite seu nome completo.",
                    "erro"
                );

                nome.focus();

                return;
            }




            const emailValido =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailValido.test(emailValor)) {

                email.classList.add("erro");

                mostrarMensagem(
                    "Digite um e-mail válido.",
                    "erro"
                );

                email.focus();

                return;
            }




            if (senhaValor.length < 6) {

                senha.classList.add("erro");

                mostrarMensagem(
                    "A senha deve possuir pelo menos 6 caracteres.",
                    "erro"
                );

                senha.focus();

                return;
            }




            if (
                senhaValor !==
                confirmarSenhaValor
            ) {

                senha.classList.add("erro");

                confirmarSenha.classList.add("erro");

                mostrarMensagem(
                    "As senhas não são iguais.",
                    "erro"
                );

                confirmarSenha.focus();

                return;
            }




            const usuarios =
                obterUsuarios();




            const emailExiste =
                usuarios.some(
                    function (usuario) {

                        return (
                            usuario.email ===
                            emailValor
                        );

                    }
                );


            if (emailExiste) {

                email.classList.add("erro");

                mostrarMensagem(
                    "Este e-mail já possui uma conta.",
                    "erro"
                );

                email.focus();

                return;
            }




            const novoUsuario = {

                id:
                    Date.now(),

                nome:
                    nomeValor,

                email:
                    emailValor,

                senha:
                    senhaValor,

                criadoEm:
                    new Date().toISOString()

            };




            usuarios.push(
                novoUsuario
            );

            salvarUsuarios(
                usuarios
            );




            mostrarMensagem(
                "Conta criada com sucesso! Redirecionando...",
                "sucesso"
            );


            if (btnCadastrar) {

                btnCadastrar.disabled = true;

            }




            setTimeout(
                function () {

                    window.location.href =
                        "login.html";

                },
                1200
            );

        }
    );

}




if (btnVoltar) {

    btnVoltar.addEventListener(
        "click",
        function () {

            window.location.href =
                "login.html";

        }
    );

}