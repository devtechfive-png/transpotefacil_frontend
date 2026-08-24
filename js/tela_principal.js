document.addEventListener("DOMContentLoaded", () => {

    const btnMenu = document.getElementById("btnMenu");
    const menu = document.getElementById("menu");

    const btnVoltar = document.getElementById("btnVoltar");

    const btnLogin = document.getElementById("btnLogin");
    const btnCompartilhar = document.getElementById("btnCompartilhar");
    const btnSair = document.getElementById("btnSair");

    const campoBusca = document.getElementById("campoBusca");
    const btnLimpar = document.getElementById("btnLimpar");

    const listaRotas = document.getElementById("listaRotas");
    const cardsRotas = document.querySelectorAll(".card-rota");

    const quantidadeRotas =
        document.getElementById("quantidadeRotas");

    const semResultados =
        document.getElementById("semResultados");


   

    btnMenu.addEventListener("click", (event) => {

        event.stopPropagation();

        menu.classList.toggle("aberto");

    });


    /* Fecha o menu quando clicar fora */

    document.addEventListener("click", (event) => {

        if (
            !menu.contains(event.target) &&
            !btnMenu.contains(event.target)
        ) {

            menu.classList.remove("aberto");

        }

    });


   
    btnVoltar.addEventListener("click", () => {

        window.history.back();

    });


    

    btnLogin.addEventListener("click", () => {

        /*
         * Por enquanto deixamos apontando para a tela
         * de login que será criada posteriormente.
         */

        window.location.href = "login.html";

    });


    

    btnCompartilhar.addEventListener("click", async () => {

        const texto =
            "Confira o Transporte Fácil! Consulte linhas e informações de transporte.";

        try {

            if (navigator.share) {

                await navigator.share({
                    title: "Transporte Fácil",
                    text: texto
                });

            } else {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                alert(
                    "Link do Transporte Fácil copiado!"
                );

            }

        } catch (erro) {

            console.log(
                "Compartilhamento cancelado."
            );

        }

        menu.classList.remove("aberto");

    });


   

    btnSair.addEventListener("click", () => {

        const confirmar = confirm(
            "Deseja realmente sair?"
        );

        if (!confirmar) {
            return;
        }

        /*
         * Limpa possíveis dados de sessão.
         */

        localStorage.removeItem("usuario");
        sessionStorage.clear();

        /*
         * Volta para a tela inicial.
         */

        window.location.href = "tela_inicial.html";

    });


   

    campoBusca.addEventListener("input", () => {

        const termo =
            campoBusca.value
                .trim()
                .toLowerCase();

        let quantidadeEncontrada = 0;


        cardsRotas.forEach((card) => {

            const textoCard =
                card.innerText.toLowerCase();

            const encontrou =
                textoCard.includes(termo);


            if (encontrou) {

                card.style.display = "block";

                quantidadeEncontrada++;

            } else {

                card.style.display = "none";

            }

        });


        atualizarQuantidade(
            quantidadeEncontrada
        );


        if (quantidadeEncontrada === 0) {

            semResultados.classList.add(
                "mostrar"
            );

        } else {

            semResultados.classList.remove(
                "mostrar"
            );

        }

    });


   

    btnLimpar.addEventListener("click", () => {

        campoBusca.value = "";

        cardsRotas.forEach((card) => {

            card.style.display = "block";

        });

        atualizarQuantidade(
            cardsRotas.length
        );

        semResultados.classList.remove(
            "mostrar"
        );

        campoBusca.focus();

    });


    

    const botoesDetalhes =
        document.querySelectorAll(
            ".btn-detalhes"
        );


    botoesDetalhes.forEach((botao) => {

        botao.addEventListener("click", () => {

            const rota =
                botao.dataset.rota;

            /*
             * A tela de informações da rota
             * será criada na próxima etapa.
             */

            window.location.href =
                `informacoes_rota.html?rota=${encodeURIComponent(rota)}`;

        });

    });


   

    function atualizarQuantidade(quantidade) {

        quantidadeRotas.textContent =
            `${quantidade} ${
                quantidade === 1
                    ? "linha"
                    : "linhas"
            }`;

    }


    
    atualizarQuantidade(
        cardsRotas.length
    );

});