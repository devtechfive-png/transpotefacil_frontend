
const btnAdicionarRota =
    document.getElementById("btnAdicionarRota");

const btnGerenciarRotas =
    document.getElementById("btnGerenciarRotas");

const btnSair =
    document.getElementById("btnSair");

const listaRotas =
    document.getElementById("listaRotas");

const secaoRotas =
    document.getElementById("secaoRotas");




const CHAVE_ROTAS = "transporteFacil_rotas";




if (btnAdicionarRota) {

    btnAdicionarRota.addEventListener("click", () => {

        window.location.href = "criar_rota.html";

    });

}




if (btnGerenciarRotas) {

    btnGerenciarRotas.addEventListener("click", () => {

        if (secaoRotas) {

            secaoRotas.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}




if (btnSair) {

    btnSair.addEventListener("click", () => {

        window.location.href = "login.html";

    });

}




function obterRotas() {

    const dados =
        localStorage.getItem(CHAVE_ROTAS);

    if (!dados) {

        return [];

    }

    try {

        return JSON.parse(dados);

    } catch (erro) {

        console.error(
            "Erro ao carregar as rotas:",
            erro
        );

        return [];

    }

}




function salvarRotas(rotas) {

    localStorage.setItem(
        CHAVE_ROTAS,
        JSON.stringify(rotas)
    );

}




function criarRotasTeste() {

    const rotas = obterRotas();

    // Se já existem rotas, não cria novamente
    if (rotas.length > 0) {

        return;

    }


    const rotasFicticias = [

        {

            empresa: "Sales",

            emailResponsavel:
                "responsavel@sales.com",

            origem:
                "Lagoa Alegre",

            destino:
                "Teresina",

            via:
                "União",

            paradas: [
                "União",
                "José de Freitas"
            ],

            tipoTransporte:
                "onibus",

            dias: [
                "segunda",
                "terca",
                "quarta",
                "quinta",
                "sexta"
            ],

            horarios: [

                {
                    saida: "06:00",
                    chegada: "08:00"
                },

                {
                    saida: "17:00",
                    chegada: "19:00"
                }

            ],

            informacoes:
                "Aos sábados e domingos funciona pela manhã."

        },


        {

            empresa:
                "Transporte Escolar",

            emailResponsavel:
                "responsavel@escolar.com",

            origem:
                "União",

            destino:
                "Teresina",

            via:
                "BR-343",

            paradas: [
                "Altos",
                "José de Freitas"
            ],

            tipoTransporte:
                "van",

            dias: [
                "segunda",
                "terca",
                "quarta",
                "quinta",
                "sexta"
            ],

            horarios: [

                {
                    saida: "07:00",
                    chegada: "08:30"
                },

                {
                    saida: "16:30",
                    chegada: "18:00"
                }

            ],

            informacoes:
                "Transporte disponível nos dias letivos."

        }

    ];


    salvarRotas(rotasFicticias);

}




function exibirRotas() {

    if (!listaRotas) {
        return;
    }


    const rotas =
        obterRotas();


    listaRotas.innerHTML = "";


    if (rotas.length === 0) {

        listaRotas.innerHTML = `

            <div class="rota-card">

                <div class="rota-topo">

                    <div>

                        <span class="rota-label">
                            ROTAS
                        </span>

                        <h3>
                            Nenhuma rota cadastrada
                        </h3>

                    </div>

                </div>

                <div class="informacoes">

                    <p>
                        As rotas cadastradas aparecerão aqui.
                    </p>

                </div>

            </div>

        `;

        atualizarResumo(rotas);

        return;

    }


    rotas.forEach((rota, indice) => {

        const card =
            criarCardRota(
                rota,
                indice
            );

        listaRotas.appendChild(card);

    });


    atualizarResumo(rotas);

}




function criarCardRota(rota, indice) {

    const card =
        document.createElement("article");

    card.className = "rota-card";




    const dias =
        Array.isArray(rota.dias)
            ? rota.dias
            : [];


    const diasHTML =
        dias.length > 0

            ? dias.map(dia => {

                return `
                    <b>
                        ${formatarDia(dia)}
                    </b>
                `;

            }).join("")

            : `
                <span>
                    Nenhum dia informado
                </span>
            `;




    const horarios =
        Array.isArray(rota.horarios)
            ? rota.horarios
            : [];


    const horariosHTML =
        horarios.length > 0

            ? horarios.map(horario => {

                return `
                    <div>
                        🕐
                        ${horario.saida || "--:--"}
                        →
                        ${horario.chegada || "--:--"}
                    </div>
                `;

            }).join("")

            : `
                <div>
                    Nenhum horário informado
                </div>
            `;




    const paradas =
        Array.isArray(rota.paradas)
            ? rota.paradas.filter(
                parada => parada.trim() !== ""
            )
            : [];


    const paradasHTML =
        paradas.length > 0

            ? paradas.map(parada => {

                return `
                    <span class="parada-item">
                        ${parada}
                    </span>
                `;

            }).join("")

            : `
                <span class="paradas-observacao">
                    Nenhuma parada informada.
                </span>
            `;




    card.innerHTML = `

        <div class="rota-topo">

            <div>

                <span class="rota-label">
                    ${formatarTipo(rota.tipoTransporte)}
                </span>

                <h3>
                    ${rota.empresa || "Empresa não informada"}
                </h3>

                <span class="status">
                    ● Ativa
                </span>

            </div>

            <span class="codigo-rota">
                #${String(indice + 1).padStart(2, "0")}
            </span>

        </div>


        <div class="linha-separadora"></div>


        <!-- TRAJETO -->

        <div class="trajeto">

            <div class="local">

                <span>
                    Origem
                </span>

                <strong>
                    ${rota.origem || "-"}
                </strong>

            </div>


            <div class="seta-trajeto">
                →
            </div>


            <div class="local">

                <span>
                    Destino
                </span>

                <strong>
                    ${rota.destino || "-"}
                </strong>

            </div>

        </div>


        <!-- VIA -->

        <div class="via">

            🛣️

            <strong>
                Via:
            </strong>

            ${rota.via || "Não informada"}

        </div>


        <!-- DIAS E HORÁRIOS -->

        <div class="rota-detalhes">


            <div class="detalhe-box">

                <span>
                    DIAS DE FUNCIONAMENTO
                </span>

                <div class="dias">

                    ${diasHTML}

                </div>

            </div>


            <div class="detalhe-box">

                <span>
                    HORÁRIOS
                </span>

                <div class="horarios">

                    ${horariosHTML}

                </div>

            </div>


        </div>


        <!-- PARADAS -->

        <div class="paradas-box">

            <div class="paradas-header">

                <span>
                    PARADAS
                </span>

            </div>

            <div class="paradas-lista">

                ${paradasHTML}

            </div>

        </div>


        <!-- RESPONSÁVEL -->

        <div class="responsavel-box">

            <div class="responsavel-header">

                <span>
                    RESPONSÁVEL
                </span>

            </div>


            <div class="responsavel-dados">


                <div class="responsavel-item">

                    <small>
                        Empresa / Agência
                    </small>

                    <strong>
                        ${rota.empresa || "-"}
                    </strong>

                </div>


                <div class="responsavel-item">

                    <small>
                        E-mail
                    </small>

                    <strong>
                        ${rota.emailResponsavel || "-"}
                    </strong>

                </div>


                <div class="responsavel-item">

                    <small>
                        Código de acesso
                    </small>

                    <div class="codigo-container">

                        <strong>
                            TF${String(indice + 1).padStart(2, "0")}-2026
                        </strong>

                    </div>

                </div>


            </div>

        </div>


        <!-- INFORMAÇÕES -->

        <div class="informacoes">

            <span>
                INFORMAÇÕES ADICIONAIS
            </span>

            <p>
                ${rota.informacoes ||
                "Nenhuma informação adicional."}
            </p>

        </div>


        <!-- AÇÕES -->

        <div class="rota-acoes">

            <button
                type="button"
                class="btn-editar"
                data-indice="${indice}"
            >
                ✏️ Editar
            </button>

            <button
                type="button"
                class="btn-excluir"
                data-indice="${indice}"
            >
                🗑️ Excluir
            </button>

        </div>

    `;





    const btnEditar =
        card.querySelector(".btn-editar");


    if (btnEditar) {

        btnEditar.addEventListener(
            "click",
            () => {

                editarRota(indice);

            }
        );

    }





    const btnExcluir =
        card.querySelector(".btn-excluir");


    if (btnExcluir) {

        btnExcluir.addEventListener(
            "click",
            () => {

                excluirRota(indice);

            }
        );

    }


    return card;

}




function editarRota(indice) {

    const rotas =
        obterRotas();


    if (!rotas[indice]) {

        return;

    }


    localStorage.setItem(
        "transporteFacil_rota_edicao",
        JSON.stringify({
            indice: indice,
            rota: rotas[indice]
        })
    );


    window.location.href =
        "criar_rota.html";

}




function excluirRota(indice) {

    const rotas =
        obterRotas();


    if (!rotas[indice]) {
        return;
    }


    const confirmar =
        confirm(
            `Deseja excluir a rota "${rotas[indice].empresa}"?`
        );


    if (!confirmar) {
        return;
    }


    rotas.splice(
        indice,
        1
    );


    salvarRotas(rotas);

    exibirRotas();

}




function atualizarResumo(rotas) {

    const totalRotas =
        document.getElementById("totalRotas");

    const totalVeiculos =
        document.getElementById("totalVeiculos");

    const totalHorarios =
        document.getElementById("totalHorarios");

    const totalAgencias =
        document.getElementById("totalAgencias");


    if (totalRotas) {

        totalRotas.textContent =
            rotas.length;

    }


    if (totalVeiculos) {

        totalVeiculos.textContent =
            rotas.length;

    }


    if (totalAgencias) {

        totalAgencias.textContent =
            rotas.length;

    }


    if (totalHorarios) {

        let quantidade = 0;


        rotas.forEach(rota => {

            if (Array.isArray(rota.horarios)) {

                quantidade +=
                    rota.horarios.length;

            }

        });


        totalHorarios.textContent =
            quantidade;

    }

}




function formatarDia(dia) {

    const dias = {

        segunda: "Segunda",

        terca: "Terça",

        quarta: "Quarta",

        quinta: "Quinta",

        sexta: "Sexta",

        sabado: "Sábado",

        domingo: "Domingo"

    };


    return dias[dia] || dia;

}




function formatarTipo(tipo) {

    if (tipo === "onibus") {

        return "ÔNIBUS";

    }


    if (tipo === "van") {

        return "VAN";

    }


    return tipo || "TRANSPORTE";

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

// Primeiro cria duas rotas fictícias
// para podermos testar o layout.

criarRotasTeste();


// Depois exibe as rotas
// no Dashboard.

exibirRotas();

