/* =========================================================
   SITIOS_CULTURA.JS
   Filtro de lugares populares de Japón
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializePlacesFilter();

    }
);


/* =========================================================
   INICIALIZAR FILTRO
========================================================= */

function initializePlacesFilter() {

    const buttons =
        document.querySelectorAll(
            ".place-button"
        );


    const sections =
        document.querySelectorAll(
            ".place-section"
        );


    const selectionMessage =
        document.getElementById(
            "selectionMessage"
        );


    if (
        buttons.length === 0 ||
        sections.length === 0
    ) {

        return;

    }


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const selectedPlace =
                    button.dataset.place;


                showPlace(
                    selectedPlace,
                    buttons,
                    sections,
                    selectionMessage
                );

            }
        );

    });

}


/* =========================================================
   MOSTRAR LUGAR
========================================================= */

function showPlace(
    selectedPlace,
    buttons,
    sections,
    selectionMessage
) {

    /*
        Ocultamos todos los lugares.
    */

    sections.forEach(section => {

        section.hidden = true;

        section.classList.remove(
            "visible"
        );

    });


    /*
        Quitamos estado activo
        de todos los botones.
    */

    buttons.forEach(button => {

        button.classList.remove(
            "active"
        );

        button.setAttribute(
            "aria-pressed",
            "false"
        );

    });


    /*
        Activamos el botón seleccionado.
    */

    const activeButton =
        document.querySelector(
            `.place-button[data-place="${selectedPlace}"]`
        );


    if (activeButton) {

        activeButton.classList.add(
            "active"
        );

        activeButton.setAttribute(
            "aria-pressed",
            "true"
        );

    }


    /*
        Buscamos la sección correspondiente.
    */

    const selectedSection =
        document.querySelector(
            `.place-section[data-place-content="${selectedPlace}"]`
        );


    if (!selectedSection) {

        return;

    }


    /*
        Ocultamos el mensaje inicial.
    */

    if (selectionMessage) {

        selectionMessage.hidden = true;

    }


    /*
        Mostramos el destino.
    */

    selectedSection.hidden = false;

    selectedSection.classList.add(
        "visible"
    );


    /*
        Movemos suavemente al contenido.
    */

    setTimeout(() => {

        selectedSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 80);

}