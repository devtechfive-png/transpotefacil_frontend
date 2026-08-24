

const formResponsavel =
    document.getElementById("formResponsavel");

const emailInput =
    document.getElementById("email");

const codigoInput =
    document.getElementById("codigo");

const btnVoltar =
    document.getElementById("btnVoltar");

const btnAcessar =
    document.getElementById("btnAcessar");

const erroEmail =
    document.getElementById("erroEmail");

const erroCodigo =
    document.getElementById("erroCodigo");


btnVoltar.addEventListener("click", function () {

    window.location.href =
        "login.html";

});


codigoInput.addEventListener("input", function () {

    let codigo =
        codigoInput.value
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "");

    codigoInput.value =
        codigo.substring(0, 6);

});


function limparErros() {

    document
        .querySelectorAll(".campo")
        .forEach(function (campo) {

            campo.classList.remove("erro");

        });

    erroEmail.textContent = "";

    erroCodigo.textContent = "";

}


function validarEmail() {

    const email =
        emailInput.value.trim();

    if (!email) {

        emailInput
            .closest(".campo")
            .classList.add("erro");

        erroEmail.textContent =
            "Informe o e-mail cadastrado.";

        return false;
    }

    const formatoEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(email)) {

        emailInput
            .closest(".campo")
            .classList.add("erro");

        erroEmail.textContent =
            "Informe um e-mail válido.";

        return false;
    }

    return true;
}


function validarCodigo() {

    const codigo =
        codigoInput.value.trim();

    if (!codigo) {

        codigoInput
            .closest(".campo")
            .classList.add("erro");

        erroCodigo.textContent =
            "Informe o código de acesso.";

        return false;
    }

    if (codigo.length !== 6) {

        codigoInput
            .closest(".campo")
            .classList.add("erro");

        erroCodigo.textContent =
            "O código deve possuir 6 caracteres.";

        return false;
    }

    return true;
}


formResponsavel.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        limparErros();

        const emailValido =
            validarEmail();

        const codigoValido =
            validarCodigo();


        if (!emailValido || !codigoValido) {
            return;
        }


        /*
         * ==================================================
         * FUTURO API
         * ==================================================
         *
         * Aqui será feita a consulta ao banco através
         * da API.
         *
         * Exemplo futuro:
         *
         * const resposta = await fetch(
         *     "/api/responsavel/acesso",
         *     {
         *         method: "POST",
         *         headers: {
         *             "Content-Type":
         *                 "application/json"
         *         },
         *         body: JSON.stringify({
         *             email: emailInput.value,
         *             codigo: codigoInput.value
         *         })
         *     }
         * );
         *
         * Somente depois da API validaremos se o
         * responsável realmente possui acesso à rota.
         *
         * ==================================================
         */


        btnAcessar.disabled = true;

        btnAcessar.textContent =
            "Verificando acesso...";


        /*
         * TEMPORÁRIO
         *
         * Enquanto o API ainda não existe, apenas
         * simulamos o acesso para testar o fluxo
         * entre as telas.
         */

        setTimeout(function () {

            window.location.href =
                "dashboard_responsavel.html";

        }, 500);

    }
);


/* =========================================
   VALIDAÇÃO AO SAIR DOS CAMPOS
========================================= */

emailInput.addEventListener(
    "blur",
    function () {

        if (emailInput.value.trim()) {
            validarEmail();
        }

    }
);


codigoInput.addEventListener(
    "blur",
    function () {

        if (codigoInput.value.trim()) {
            validarCodigo();
        }

    }
);