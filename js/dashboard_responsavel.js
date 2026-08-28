/* =========================================================
   DASHBOARD DO RESPONSÁVEL
   Transporte Fácil
   =========================================================
   
   TEMPORARIAMENTE:
   - Os dados são armazenados no localStorage.
   - A integração com a API será feita posteriormente.
   - O código de acesso não é exibido nem editado aqui.
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const btnVoltar = document.getElementById("btnVoltar");
const btnSair = document.getElementById("btnSair");
const btnEditar = document.getElementById("btnEditar");
const btnExcluir = document.getElementById("btnExcluir");

const modalExcluir = document.getElementById("modalExcluir");
const btnCancelarExclusao =
    document.getElementById("btnCancelarExclusao");

const btnConfirmarExclusao =
    document.getElementById("btnConfirmarExclusao");


/* =========================================================
   CHAVE TEMPORÁRIA DO LOCALSTORAGE
========================================================= */

const CHAVE_ROTA = "transporte_facil_rota_responsavel";


/* =========================================================
   ELEMENTOS DA ROTA
========================================================= */

const empresaNome =
    document.getElementById("empresaNome");

const origem =
    document.getElementById("origem");

const destino =
    document.getElementById("destino");

const via =
    document.getElementById("via");

const tipoTransporte =
    document.getElementById("tipoTransporte");

const diasFuncionamento =
    document.getElementById("diasFuncionamento");

const informacoesAdicionais =
    document.getElementById("informacoesAdicionais");


/* =========================================================
   DADOS INICIAIS
========================================================= */

const rotaInicial = {

    empresa: empresaNome
        ? empresaNome.textContent.trim()
        : "",

    origem: origem
        ? origem.textContent.trim()
        : "",

    destino: destino
        ? destino.textContent.trim()
        : "",

    via: via
        ? via.textContent.trim()
        : "",

    paradas: [],

    tipoTransporte: tipoTransporte
        ? tipoTransporte.textContent.trim()
        : "Ônibus",

    dias: diasFuncionamento
        ? Array.from(
            diasFuncionamento.querySelectorAll("span")
        ).map(item => item.textContent.trim())
        : [],

    horarios: [],

    informacoes: informacoesAdicionais
        ? informacoesAdicionais.textContent.trim()
        : ""

};


/* =========================================================
   CARREGAR ROTA
========================================================= */

function carregarRota() {

    const dadosSalvos =
        localStorage.getItem(CHAVE_ROTA);

    if (!dadosSalvos) {

        salvarRota(rotaInicial);

        return rotaInicial;
    }

    try {

        const rota =
            JSON.parse(dadosSalvos);

        return rota;

    } catch (erro) {

        console.error(
            "Erro ao carregar rota:",
            erro
        );

        salvarRota(rotaInicial);

        return rotaInicial;
    }
}


/* =========================================================
   SALVAR ROTA
========================================================= */

function salvarRota(rota) {

    localStorage.setItem(
        CHAVE_ROTA,
        JSON.stringify(rota)
    );

}


/* =========================================================
   ROTA ATUAL
========================================================= */

let rotaAtual = carregarRota();


/* =========================================================
   RENDERIZAR ROTA
========================================================= */

function renderizarRota() {

    if (!rotaAtual) {
        return;
    }


    /* EMPRESA */

    if (empresaNome) {

        empresaNome.textContent =
            rotaAtual.empresa || "Empresa";

    }


    /* ORIGEM */

    if (origem) {

        origem.textContent =
            rotaAtual.origem || "Não informado";

    }


    /* DESTINO */

    if (destino) {

        destino.textContent =
            rotaAtual.destino || "Não informado";

    }


    /* VIA */

    if (via) {

        via.textContent =
            rotaAtual.via || "Não informado";

    }


    /* TIPO */

    if (tipoTransporte) {

        tipoTransporte.textContent =
            rotaAtual.tipoTransporte || "Ônibus";

    }


    /* DIAS */

    if (diasFuncionamento) {

        diasFuncionamento.innerHTML = "";

        if (
            rotaAtual.dias &&
            rotaAtual.dias.length > 0
        ) {

            rotaAtual.dias.forEach(
                function (dia) {

                    const span =
                        document.createElement("span");

                    span.textContent = dia;

                    diasFuncionamento.appendChild(
                        span
                    );

                }
            );

        } else {

            const span =
                document.createElement("span");

            span.textContent =
                "Nenhum dia informado";

            diasFuncionamento.appendChild(
                span
            );

        }

    }


    /* INFORMAÇÕES */

    if (informacoesAdicionais) {

        informacoesAdicionais.textContent =
            rotaAtual.informacoes ||
            "Nenhuma informação adicional.";

    }


    /* HORÁRIOS */

    renderizarHorarios();

}


/* =========================================================
   RENDERIZAR HORÁRIOS
========================================================= */

function renderizarHorarios() {

    const blocoHorarios =
        document.querySelector(".bloco-informacao .horarios");

    if (!blocoHorarios) {
        return;
    }

    blocoHorarios.innerHTML = "";


    if (
        !rotaAtual.horarios ||
        rotaAtual.horarios.length === 0
    ) {

        const vazio =
            document.createElement("div");

        vazio.className = "horario";

        vazio.innerHTML = `
            <span>Nenhum horário informado.</span>
        `;

        blocoHorarios.appendChild(vazio);

        return;
    }


    rotaAtual.horarios.forEach(
        function (horario, index) {

            const div =
                document.createElement("div");

            div.className = "horario";

            div.innerHTML = `
                <span>Horário ${index + 1}</span>

                <strong>
                    ${horario.saida || "--:--"}
                </strong>

                <span class="seta-horario">
                    →
                </span>

                <strong>
                    ${horario.chegada || "--:--"}
                </strong>
            `;

            blocoHorarios.appendChild(div);

        }
    );

}


/* =========================================================
   VOLTAR
========================================================= */

if (btnVoltar) {

    btnVoltar.addEventListener(
        "click",
        function () {

            window.location.href =
                "area_responsavel.html";

        }
    );

}


/* =========================================================
   SAIR
========================================================= */

if (btnSair) {

    btnSair.addEventListener(
        "click",
        function () {

            const confirmar =
                confirm(
                    "Deseja realmente sair da área do responsável?"
                );

            if (!confirmar) {
                return;
            }

            window.location.href =
                "tela_principal.html";

        }
    );

}


/* =========================================================
   EDITAR ROTA
========================================================= */

if (btnEditar) {

    btnEditar.addEventListener(
        "click",
        function () {

            abrirModalEdicao();

        }
    );

}


/* =========================================================
   CRIAR MODAL DE EDIÇÃO
========================================================= */

function abrirModalEdicao() {

    const modalExistente =
        document.getElementById(
            "modalEditarRota"
        );

    if (modalExistente) {

        modalExistente.remove();

    }


    const modal =
        document.createElement("div");

    modal.id =
        "modalEditarRota";

    modal.className =
        "modal-overlay aberto";


    modal.innerHTML = `

        <div class="modal modal-edicao">

            <div class="modal-topo">

                <div>

                    <span class="rota-label">
                        GERENCIAR ROTA
                    </span>

                    <h3>
                        Editar informações da rota
                    </h3>

                </div>

                <button
                    type="button"
                    class="btn-fechar-edicao"
                    id="btnFecharEdicao"
                >
                    ×
                </button>

            </div>


            <div class="form-edicao">


                <!-- EMPRESA -->

                <div class="campo-edicao">

                    <label for="editarEmpresa">
                        Empresa / Agência
                    </label>

                    <input
                        type="text"
                        id="editarEmpresa"
                        value="${escaparHTML(
                            rotaAtual.empresa || ""
                        )}"
                    >

                </div>


                <!-- ORIGEM -->

                <div class="campo-edicao">

                    <label for="editarOrigem">
                        Origem
                    </label>

                    <input
                        type="text"
                        id="editarOrigem"
                        value="${escaparHTML(
                            rotaAtual.origem || ""
                        )}"
                    >

                </div>


                <!-- DESTINO -->

                <div class="campo-edicao">

                    <label for="editarDestino">
                        Destino
                    </label>

                    <input
                        type="text"
                        id="editarDestino"
                        value="${escaparHTML(
                            rotaAtual.destino || ""
                        )}"
                    >

                </div>


                <!-- VIA -->

                <div class="campo-edicao">

                    <label for="editarVia">
                        Via
                    </label>

                    <input
                        type="text"
                        id="editarVia"
                        value="${escaparHTML(
                            rotaAtual.via || ""
                        )}"
                        placeholder="Ex.: União"
                    >

                </div>


                <!-- PARADAS -->

                <div class="campo-edicao">

                    <label>
                        Paradas
                    </label>

                    <div
                        id="listaParadasEdicao"
                        class="lista-paradas-edicao"
                    ></div>

                    <button
                        type="button"
                        id="btnAdicionarParada"
                        class="btn-adicionar-campo"
                    >
                        + Adicionar parada
                    </button>

                </div>


                <!-- TIPO -->

                <div class="campo-edicao">

                    <label for="editarTipo">
                        Tipo de transporte
                    </label>

                    <select id="editarTipo">

                        <option value="Ônibus">
                            Ônibus
                        </option>

                        <option value="Van">
                            Van
                        </option>

                    </select>

                </div>


                <!-- DIAS -->

                <div class="campo-edicao">

                    <label>
                        Dias de funcionamento
                    </label>

                    <div class="dias-edicao">

                        ${criarCheckboxDia(
                            "Segunda",
                            rotaAtual.dias
                        )}

                        ${criarCheckboxDia(
                            "Terça",
                            rotaAtual.dias
                        )}

                        ${criarCheckboxDia(
                            "Quarta",
                            rotaAtual.dias
                        )}

                        ${criarCheckboxDia(
                            "Quinta",
                            rotaAtual.dias
                        )}

                        ${criarCheckboxDia(
                            "Sexta",
                            rotaAtual.dias
                        )}

                        ${criarCheckboxDia(
                            "Sábado",
                            rotaAtual.dias
                        )}

                        ${criarCheckboxDia(
                            "Domingo",
                            rotaAtual.dias
                        )}

                    </div>

                </div>


                <!-- HORÁRIOS -->

                <div class="campo-edicao">

                    <div class="titulo-horarios-edicao">

                        <label>
                            Horários
                        </label>

                        <button
                            type="button"
                            id="btnAdicionarHorario"
                            class="btn-adicionar-campo"
                        >
                            + Adicionar horário
                        </button>

                    </div>


                    <div
                        id="listaHorariosEdicao"
                        class="lista-horarios-edicao"
                    ></div>

                </div>


                <!-- INFORMAÇÕES -->

                <div class="campo-edicao">

                    <label for="editarInformacoes">
                        Informações adicionais
                    </label>

                    <textarea
                        id="editarInformacoes"
                        rows="4"
                        placeholder="Informações adicionais sobre a rota..."
                    >${escaparHTML(
                        rotaAtual.informacoes || ""
                    )}</textarea>

                </div>


            </div>


            <div class="modal-acoes">

                <button
                    type="button"
                    class="btn-cancelar"
                    id="btnCancelarEdicao"
                >
                    Cancelar
                </button>

                <button
                    type="button"
                    class="btn-salvar-edicao"
                    id="btnSalvarEdicao"
                >
                    Salvar alterações
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    /* TIPO */

    const selectTipo =
        document.getElementById(
            "editarTipo"
        );

    if (selectTipo) {

        selectTipo.value =
            rotaAtual.tipoTransporte ||
            "Ônibus";

    }


    /* PARADAS */

    renderizarParadasEdicao();


    /* HORÁRIOS */

    renderizarHorariosEdicao();


    /* EVENTOS */

    const btnFechar =
        document.getElementById(
            "btnFecharEdicao"
        );

    const btnCancelar =
        document.getElementById(
            "btnCancelarEdicao"
        );

    const btnSalvar =
        document.getElementById(
            "btnSalvarEdicao"
        );

    const btnAdicionarParada =
        document.getElementById(
            "btnAdicionarParada"
        );

    const btnAdicionarHorario =
        document.getElementById(
            "btnAdicionarHorario"
        );


    if (btnFechar) {

        btnFechar.addEventListener(
            "click",
            fecharModalEdicao
        );

    }


    if (btnCancelar) {

        btnCancelar.addEventListener(
            "click",
            fecharModalEdicao
        );

    }


    if (btnSalvar) {

        btnSalvar.addEventListener(
            "click",
            salvarEdicao
        );

    }


    if (btnAdicionarParada) {

        btnAdicionarParada.addEventListener(
            "click",
            function () {

                adicionarParadaEdicao();

            }
        );

    }


    if (btnAdicionarHorario) {

        btnAdicionarHorario.addEventListener(
            "click",
            function () {

                adicionarHorarioEdicao();

            }
        );

    }


    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {

                fecharModalEdicao();

            }

        }
    );

}


/* =========================================================
   CHECKBOX DOS DIAS
========================================================= */

function criarCheckboxDia(
    dia,
    diasSelecionados
) {

    const selecionado =
        diasSelecionados &&
        diasSelecionados.includes(dia)
            ? "checked"
            : "";

    return `

        <label class="dia-checkbox">

            <input
                type="checkbox"
                value="${dia}"
                ${selecionado}
            >

            <span>
                ${dia}
            </span>

        </label>

    `;

}


/* =========================================================
   PARADAS
========================================================= */

function renderizarParadasEdicao() {

    const lista =
        document.getElementById(
            "listaParadasEdicao"
        );

    if (!lista) {
        return;
    }

    lista.innerHTML = "";


    const paradas =
        rotaAtual.paradas || [];


    paradas.forEach(
        function (parada) {

            adicionarParadaEdicao(
                parada
            );

        }
    );

}


function adicionarParadaEdicao(
    valor = ""
) {

    const lista =
        document.getElementById(
            "listaParadasEdicao"
        );

    if (!lista) {
        return;
    }


    const linha =
        document.createElement("div");

    linha.className =
        "linha-parada-edicao";


    linha.innerHTML = `

        <input
            type="text"
            class="input-parada-edicao"
            placeholder="Nome da parada"
            value="${escaparHTML(valor)}"
        >

        <button
            type="button"
            class="btn-remover-campo"
            title="Remover parada"
        >
            ×
        </button>

    `;


    const btnRemover =
        linha.querySelector(
            ".btn-remover-campo"
        );


    if (btnRemover) {

        btnRemover.addEventListener(
            "click",
            function () {

                linha.remove();

            }
        );

    }


    lista.appendChild(linha);

}


/* =========================================================
   HORÁRIOS
========================================================= */

function renderizarHorariosEdicao() {

    const lista =
        document.getElementById(
            "listaHorariosEdicao"
        );

    if (!lista) {
        return;
    }

    lista.innerHTML = "";


    const horarios =
        rotaAtual.horarios || [];


    horarios.forEach(
        function (horario) {

            adicionarHorarioEdicao(
                horario.saida || "",
                horario.chegada || ""
            );

        }
    );


    if (horarios.length === 0) {

        adicionarHorarioEdicao();

    }

}


function adicionarHorarioEdicao(
    saida = "",
    chegada = ""
) {

    const lista =
        document.getElementById(
            "listaHorariosEdicao"
        );

    if (!lista) {
        return;
    }


    const linha =
        document.createElement("div");

    linha.className =
        "linha-horario-edicao";


    linha.innerHTML = `

        <div>

            <label>
                Saída
            </label>

            <input
                type="time"
                class="input-saida-edicao"
                value="${saida}"
            >

        </div>


        <div>

            <label>
                Chegada
            </label>

            <input
                type="time"
                class="input-chegada-edicao"
                value="${chegada}"
            >

        </div>


        <button
            type="button"
            class="btn-remover-campo"
            title="Remover horário"
        >
            ×
        </button>

    `;


    const btnRemover =
        linha.querySelector(
            ".btn-remover-campo"
        );


    if (btnRemover) {

        btnRemover.addEventListener(
            "click",
            function () {

                linha.remove();

            }
        );

    }


    lista.appendChild(linha);

}


/* =========================================================
   SALVAR EDIÇÃO
========================================================= */

function salvarEdicao() {

    const novoNome =
        document.getElementById(
            "editarEmpresa"
        );

    const novaOrigem =
        document.getElementById(
            "editarOrigem"
        );

    const novoDestino =
        document.getElementById(
            "editarDestino"
        );

    const novaVia =
        document.getElementById(
            "editarVia"
        );

    const novoTipo =
        document.getElementById(
            "editarTipo"
        );

    const novasInformacoes =
        document.getElementById(
            "editarInformacoes"
        );


    /* VALIDAR */

    if (
        !novoNome ||
        !novoNome.value.trim()
    ) {

        alert(
            "Informe o nome da empresa ou agência."
        );

        novoNome?.focus();

        return;

    }


    if (
        !novaOrigem ||
        !novaOrigem.value.trim()
    ) {

        alert(
            "Informe a origem da rota."
        );

        novaOrigem?.focus();

        return;

    }


    if (
        !novoDestino ||
        !novoDestino.value.trim()
    ) {

        alert(
            "Informe o destino da rota."
        );

        novoDestino?.focus();

        return;

    }


    /* PARADAS */

    const inputsParadas =
        document.querySelectorAll(
            ".input-parada-edicao"
        );


    const paradas =
        Array.from(inputsParadas)
            .map(
                input =>
                    input.value.trim()
            )
            .filter(
                valor => valor !== ""
            );


    /* DIAS */

    const checkboxesDias =
        document.querySelectorAll(
            ".dia-checkbox input"
        );


    const dias =
        Array.from(checkboxesDias)
            .filter(
                checkbox =>
                    checkbox.checked
            )
            .map(
                checkbox =>
                    checkbox.value
            );


    /* HORÁRIOS */

    const linhasHorarios =
        document.querySelectorAll(
            ".linha-horario-edicao"
        );


    const horarios = [];


    for (
        const linha of linhasHorarios
    ) {

        const inputSaida =
            linha.querySelector(
                ".input-saida-edicao"
            );

        const inputChegada =
            linha.querySelector(
                ".input-chegada-edicao"
            );


        const saida =
            inputSaida
                ? inputSaida.value
                : "";

        const chegada =
            inputChegada
                ? inputChegada.value
                : "";


        if (
            !saida &&
            !chegada
        ) {

            continue;

        }


        if (
            !saida ||
            !chegada
        ) {

            alert(
                "Preencha a saída e a chegada de todos os horários."
            );

            return;

        }


        horarios.push({

            saida: saida,

            chegada: chegada

        });

    }


    /* ATUALIZAR */

    rotaAtual = {

        ...rotaAtual,

        empresa:
            novoNome.value.trim(),

        origem:
            novaOrigem.value.trim(),

        destino:
            novoDestino.value.trim(),

        via:
            novaVia
                ? novaVia.value.trim()
                : "",

        paradas:
            paradas,

        tipoTransporte:
            novoTipo
                ? novoTipo.value
                : "Ônibus",

        dias:
            dias,

        horarios:
            horarios,

        informacoes:
            novasInformacoes
                ? novasInformacoes.value.trim()
                : ""

    };


    /* SALVAR */

    salvarRota(
        rotaAtual
    );


    /* ATUALIZAR TELA */

    renderizarRota();


    /* FECHAR */

    fecharModalEdicao();


    alert(
        "Rota atualizada com sucesso!"
    );

}


/* =========================================================
   FECHAR MODAL DE EDIÇÃO
========================================================= */

function fecharModalEdicao() {

    const modal =
        document.getElementById(
            "modalEditarRota"
        );

    if (modal) {

        modal.remove();

    }

}


/* =========================================================
   EXCLUSÃO
========================================================= */

if (btnExcluir) {

    btnExcluir.addEventListener(
        "click",
        function () {

            if (modalExcluir) {

                modalExcluir.classList.add(
                    "aberto"
                );

            }

        }
    );

}


/* =========================================================
   CANCELAR EXCLUSÃO
========================================================= */

if (btnCancelarExclusao) {

    btnCancelarExclusao.addEventListener(
        "click",
        function () {

            fecharModal();

        }
    );

}


/* =========================================================
   CONFIRMAR EXCLUSÃO
========================================================= */

if (btnConfirmarExclusao) {

    btnConfirmarExclusao.addEventListener(
        "click",
        function () {

            excluirRota();

        }
    );

}


/* =========================================================
   EXCLUIR ROTA
========================================================= */

function excluirRota() {

    localStorage.removeItem(
        CHAVE_ROTA
    );


    fecharModal();


    alert(
        "Rota excluída com sucesso!"
    );


    window.location.href =
        "area_responsavel.html";

}


/* =========================================================
   FECHAR MODAL DE EXCLUSÃO
========================================================= */

function fecharModal() {

    if (modalExcluir) {

        modalExcluir.classList.remove(
            "aberto"
        );

    }

}


/* =========================================================
   CLICAR FORA DO MODAL
========================================================= */

if (modalExcluir) {

    modalExcluir.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modalExcluir
            ) {

                fecharModal();

            }

        }
    );

}


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            fecharModal();

            fecharModalEdicao();

        }

    }
);


/* =========================================================
   ESCAPAR HTML
========================================================= */

function escaparHTML(valor) {

    return String(valor)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

renderizarRota();