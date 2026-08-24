const btnEntrar = document.getElementById("btnEntrar");

btnEntrar.addEventListener("click", () => {

    btnEntrar.disabled = true;

    btnEntrar.style.transform = "scale(0.97)";

    setTimeout(() => {

        window.location.href = "tela_principal.html";

    }, 200);

});