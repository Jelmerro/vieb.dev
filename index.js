"use strict"
// This page and my own icons are CC BY-SA 4.0 licensed @ Jelmer van Arnhem,
// see ./LICENSE or https://creativecommons.org/licenses/by-sa/4.0/
// Vieb and the Vieb logo are GPL-3.0+ licensed @ Jelmer van Arnhem,
// see ./LICENSE.GPL-3.0-or-later or http://gnu.org/licenses/gpl.html
// The brand logos, screenshots and github badges are public domain via CC0 1.0,
// see ./LICENSE.CC0-1.0 or https://creativecommons.org/publicdomain/zero/1.0/

/**
 * Toggle the main website theme between dark and light.
 */
const toggle = () => {
    let newTheme = "light"
    if (document.documentElement.getAttribute("data-theme") === "light") {
        newTheme = "dark"
    }
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
}

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("toggle-theme").addEventListener("click", toggle)
    let theme = "dark"
    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") === "light") {
            theme = "light"
        }
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        theme = "light"
    }
    document.documentElement.setAttribute("data-theme", theme)
})
