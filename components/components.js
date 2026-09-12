/* =========================================================
   COMPONENTS.JS
   Sistema de componentes de la página Japón
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadNavigation();

});


/* =========================================================
   CARGAR NAVEGACIÓN
========================================================= */

async function loadNavigation() {

    const navigationContainer =
        document.getElementById("navbar");


    /*
        Si la página no tiene un elemento #navbar,
        simplemente no hacemos nada.
    */

    if (!navigationContainer) {
        return;
    }


    try {

        const response =
            await fetch(getComponentPath("nav.html"));


        if (!response.ok) {

            throw new Error(
                `No se pudo cargar nav.html: ${response.status}`
            );

        }


        const navigationHTML =
            await response.text();


        navigationContainer.innerHTML =
            navigationHTML;


        /*
            Una vez cargado el HTML,
            inicializamos todas las funciones.
        */

        initializeNavigation();


    } catch (error) {

        console.error(
            "Error cargando el componente de navegación:",
            error
        );

    }

}


/* =========================================================
   DETERMINAR RUTA DE COMPONENTES
========================================================= */

function getComponentPath(fileName) {

    /*
        components.js está dentro de:

            /components/components.js

        Por eso nav.html está en:

            /components/nav.html

        Como el script se ejecuta desde cualquier página,
        utilizamos la ubicación del propio script.
    */

    const scripts =
        document.querySelectorAll(
            'script[src*="components.js"]'
        );


    if (scripts.length > 0) {

        const scriptURL =
            scripts[scripts.length - 1].src;


        const scriptDirectory =
            scriptURL.substring(
                0,
                scriptURL.lastIndexOf("/") + 1
            );


        return scriptDirectory + fileName;

    }


    /*
        Ruta alternativa
    */

    return "components/" + fileName;

}


/* =========================================================
   INICIALIZAR NAVEGACIÓN
========================================================= */

function initializeNavigation() {

    const nav =
        document.getElementById("mainNav");


    const navToggle =
        document.getElementById("navToggle");


    const navMenu =
        document.getElementById("navMenu");


    if (!nav || !navToggle || !navMenu) {

        console.warn(
            "No se encontraron los elementos de navegación."
        );

        return;
    }


    /*
        Configurar enlaces
    */

    configureNavigationLinks();


    /*
        Estado del scroll
    */

    handleNavigationScroll();


    window.addEventListener(
        "scroll",
        handleNavigationScroll,
        { passive: true }
    );


    /*
        Menú móvil
    */

    navToggle.addEventListener(
        "click",
        () => {

            toggleMobileMenu(
                navToggle,
                navMenu
            );

        }
    );


    /*
        Cerrar al hacer clic en un enlace
    */

    const navLinks =
        navMenu.querySelectorAll(".nav-link");


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu(
                    navToggle,
                    navMenu
                );

            }
        );

    });


    /*
        Cerrar haciendo clic fuera
    */

    document.addEventListener(
        "click",
        event => {

            const clickedInsideMenu =
                navMenu.contains(event.target);


            const clickedToggle =
                navToggle.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                closeMobileMenu(
                    navToggle,
                    navMenu
                );

            }

        }
    );


    /*
        Cerrar con Escape
    */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMobileMenu(
                    navToggle,
                    navMenu
                );

            }

        }
    );


    /*
        Cerrar menú si cambiamos a una pantalla grande
    */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 700) {

                closeMobileMenu(
                    navToggle,
                    navMenu
                );

            }

        }
    );

}


/* =========================================================
   CONFIGURAR ENLACES
========================================================= */

function configureNavigationLinks() {

    const links =
        document.querySelectorAll(
            "[data-route]"
        );


    links.forEach(link => {

        const route =
            link.dataset.route;


        link.href =
            resolveRoute(route);


    });


    /*
        Marcar página actual
    */

    setActiveNavigationLink();

}


/* =========================================================
   RESOLVER RUTAS
========================================================= */

function resolveRoute(route) {

    /*
        Detectamos si actualmente estamos dentro
        de una carpeta de sección.

        Ejemplo:

        /japon_web/index.html

        /japon_web/sitios_cultura/sitios_cultura.html

        /japon_web/cultura_general/cultura_general.html
    */

    const currentPath =
        window.location.pathname;


    const isInsideSection =
        currentPath.includes(
            "/sitios_cultura/"
        ) ||
        currentPath.includes(
            "/cultura_general/"
        );


    switch (route) {

        case "home":

            if (isInsideSection) {

                return "../index.html";

            }

            return "index.html";


        case "sites":

            if (isInsideSection) {

                return "../sitios_cultura/sitios_cultura.html";

            }

            return "sitios_cultura/sitios_cultura.html";


        case "culture":

            if (isInsideSection) {

                return "../cultura_general/cultura_general.html";

            }

            return "cultura_general/cultura_general.html";


        default:

            return "#";

    }

}


/* =========================================================
   PÁGINA ACTIVA
========================================================= */

function setActiveNavigationLink() {

    const links =
        document.querySelectorAll(
            ".nav-link[data-route]"
        );


    const currentPath =
        window.location.pathname;


    let currentRoute =
        "home";


    if (
        currentPath.includes(
            "/sitios_cultura/"
        )
    ) {

        currentRoute =
            "sites";

    } else if (
        currentPath.includes(
            "/cultura_general/"
        )
    ) {

        currentRoute =
            "culture";

    }


    links.forEach(link => {

        const route =
            link.dataset.route;


        if (route === currentRoute) {

            link.classList.add(
                "active"
            );

            link.setAttribute(
                "aria-current",
                "page"
            );

        } else {

            link.classList.remove(
                "active"
            );

            link.removeAttribute(
                "aria-current"
            );

        }

    });

}


/* =========================================================
   SCROLL NAVIGATION
========================================================= */

function handleNavigationScroll() {

    const nav =
        document.getElementById("mainNav");


    if (!nav) {
        return;
    }


    if (window.scrollY > 40) {

        nav.classList.add(
            "scrolled"
        );

    } else {

        nav.classList.remove(
            "scrolled"
        );

    }

}


/* =========================================================
   ABRIR / CERRAR MENÚ
========================================================= */

function toggleMobileMenu(
    navToggle,
    navMenu
) {

    const isOpen =
        navMenu.classList.contains("open");


    if (isOpen) {

        closeMobileMenu(
            navToggle,
            navMenu
        );

    } else {

        openMobileMenu(
            navToggle,
            navMenu
        );

    }

}


/* =========================================================
   ABRIR MENÚ
========================================================= */

function openMobileMenu(
    navToggle,
    navMenu
) {

    navMenu.classList.add(
        "open"
    );


    navToggle.classList.add(
        "active"
    );


    navToggle.setAttribute(
        "aria-expanded",
        "true"
    );


    navToggle.setAttribute(
        "aria-label",
        "Cerrar menú"
    );


    document.body.classList.add(
        "menu-open"
    );

}


/* =========================================================
   CERRAR MENÚ
========================================================= */

function closeMobileMenu(
    navToggle,
    navMenu
) {

    if (!navMenu || !navToggle) {
        return;
    }


    navMenu.classList.remove(
        "open"
    );


    navToggle.classList.remove(
        "active"
    );


    navToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    navToggle.setAttribute(
        "aria-label",
        "Abrir menú"
    );


    document.body.classList.remove(
        "menu-open"
    );

}