
const formCriarRota =
    document.getElementById("formCriarRota");

const btnFechar =
    document.getElementById("btnFechar");

const btnCancelar =
    document.getElementById("btnCancelar");

const btnAdicionarParada =
    document.getElementById("btnAdicionarParada");

const listaParadas =
    document.getElementById("listaParadas");

const btnAdicionarHorario =
    document.getElementById("btnAdicionarHorario");

const listaHorarios =
    document.getElementById("listaHorarios");



function voltarDashboard() {

    window.location.href = "dashboard.html";

}


if (btnFechar) {

    btnFechar.addEventListener(
        "click",
        voltarDashboard
    );

}


if (btnCancelar) {

    btnCancelar.addEventListener(
        "click",
        voltarDashboard
    );

}



function adicionarParada() {

    const parada =
        document.createElement("div");

    parada.className =
        "parada-item";

    parada.innerHTML = `
        <input
            type="text"
            name="paradas[]"
            placeholder="Nome da cidade ou localidade"
        >

        <button
            type="button"
            class="btn-remover-parada"
            title="Remover parada"
        >
            ×
        </button>
    `;

    listaParadas.appendChild(parada);

    configurarRemoverParada(parada);

    const input =
        parada.querySelector("input");

    if (input) {
        input.focus();
    }

}



function configurarRemoverParada(parada) {

    const botao =
        parada.querySelector(
            ".btn-remover-parada"
        );

    if (!botao) {
        return;
    }

    botao.addEventListener(
        "click",
        function () {

            parada.remove();

        }
    );

}


if (btnAdicionarParada) {

    btnAdicionarParada.addEventListener(
        "click",
        adicionarParada
    );

}


document
    .querySelectorAll(".parada-item")
    .forEach(
        configurarRemoverParada
    );

function adicionarHorario() {

    const horario =
        document.createElement("div");

    horario.className =
        "horario-item";

    horario.innerHTML = `
        <div class="horario-campo">

            <label>
                Saída
            </label>

            <input
                type="time"
                name="saida[]"
                required
            >

        </div>

        <div class="horario-campo">

            <label>
                Chegada
            </label>

            <input
                type="time"
                name="chegada[]"
                required
            >

        </div>

        <button
            type="button"
            class="btn-remover-horario"
            title="Remover horário"
        >
            ×
        </button>
    `;

    listaHorarios.appendChild(horario);

    configurarRemoverHorario(horario);

}


function configurarRemoverHorario(horario) {

    const botao =
        horario.querySelector(
            ".btn-remover-horario"
        );

    if (!botao) {
        return;
    }

    botao.addEventListener(
        "click",
        function () {

            const quantidade =
                document.querySelectorAll(
                    ".horario-item"
                ).length;

            if (quantidade <= 1) {

                alert(
                    "A rota precisa ter pelo menos um horário."
                );

                return;

            }

            horario.remove();

        }
    );

}


if (btnAdicionarHorario) {

    btnAdicionarHorario.addEventListener(
        "click",
        adicionarHorario
    );

}


document
    .querySelectorAll(".horario-item")
    .forEach(
        configurarRemoverHorario
    );


function validarDias() {

    const diasSelecionados =
        document.querySelectorAll(
            'input[name="dias[]"]:checked'
        );

    return diasSelecionados.length > 0;

}


function obterParadas() {

    const campos =
        document.querySelectorAll(
            'input[name="paradas[]"]'
        );

    const paradas = [];

    campos.forEach(
        function (campo) {

            const valor =
                campo.value.trim();

            if (valor !== "") {

                paradas.push(valor);

            }

        }
    );

    return paradas;

}



function obterHorarios() {

    const saidas =
        document.querySelectorAll(
            'input[name="saida[]"]'
        );

    const chegadas =
        document.querySelectorAll(
            'input[name="chegada[]"]'
        );

    const horarios = [];

    for (
        let i = 0;
        i < saidas.length;
        i++
    ) {

        horarios.push({

            saida:
                saidas[i].value,

            chegada:
                chegadas[i].value

        });

    }

    return horarios;

}



function obterDias() {

    const campos =
        document.querySelectorAll(
            'input[name="dias[]"]:checked'
        );

    const dias = [];

    campos.forEach(
        function (campo) {

            dias.push(campo.value);

        }
    );

    return dias;

}


if (formCriarRota) {

    formCriarRota.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();



            if (!validarDias()) {

                alert(
                    "Selecione pelo menos um dia de funcionamento."
                );

                return;

            }


            const horarios =
                obterHorarios();


            const horarioInvalido =
                horarios.some(
                    function (horario) {

                        return (
                            !horario.saida ||
                            !horario.chegada
                        );

                    }
                );


            if (horarioInvalido) {

                alert(
                    "Preencha todos os horários da rota."
                );

                return;

            }

            const dadosRota = {

                empresa:
                    document
                        .getElementById("empresa")
                        .value
                        .trim(),

                emailResponsavel:
                    document
                        .getElementById(
                            "emailResponsavel"
                        )
                        .value
                        .trim(),

                origem:
                    document
                        .getElementById("origem")
                        .value
                        .trim(),

                destino:
                    document
                        .getElementById("destino")
                        .value
                        .trim(),

                via:
                    document
                        .getElementById("via")
                        .value
                        .trim(),

                paradas:
                    obterParadas(),

                tipoTransporte:
                    document
                        .getElementById(
                            "tipoTransporte"
                        )
                        .value,

                dias:
                    obterDias(),

                horarios:
                    horarios,

                informacoes:
                    document
                        .getElementById(
                            "informacoes"
                        )
                        .value
                        .trim()

            };



            let rotas =
                JSON.parse(
                    localStorage.getItem(
                        "rotasTransporteFacil"
                    )
                ) || [];



            const novoId =
                rotas.length > 0
                    ? Math.max(
                        ...rotas.map(
                            rota => Number(rota.id)
                        )
                    ) + 1
                    : 1;


            dadosRota.id =
                novoId;



            rotas.push(
                dadosRota
            );


            localStorage.setItem(
                "rotasTransporteFacil",
                JSON.stringify(rotas)
            );


            alert(
                "Rota cadastrada com sucesso!"
            );


            voltarDashboard();

        }
    );

}