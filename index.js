"use strict"
// This page and my own icons are CC BY-SA 4.0 licensed @ Jelmer van Arnhem,
// see ./LICENSE or https://creativecommons.org/licenses/by-sa/4.0/
// Vieb and the Vieb logo are GPL-3.0+ licensed @ Jelmer van Arnhem,
// see ./LICENSE.GPL-3.0-or-later or http://gnu.org/licenses/gpl.html
// The brand logos, screenshots and github badges are public domain via CC0 1.0,
// see ./LICENSE.CC0-1.0 or https://creativecommons.org/publicdomain/zero/1.0/

window.addEventListener("DOMContentLoaded", () => {
    const toggle = () => {
        let lightTheme = document.getElementById("light-theme")
        if (lightTheme) {
            document.head.removeChild(lightTheme)
            localStorage.clear()
        } else {
            lightTheme = document.createElement("style")
            lightTheme.id = "light-theme"
            lightTheme.textContent = `:root {
                --text: #333;
                --background: #eee;
                --subtext: #555;
                --link: #08f;
                --menu-background: #ddd;
                --code-background: #fff;
                --img-border: #fff;
                --button-text: #fff;
                --button-primary: #f02;
                --button-secondary: #fff;
                --button-accents: #aaa;
            }
            #toggle-theme, .action-buttons img, footer img[src*=svg] {
                filter: invert(.8);
            }
            .third-party-downloads img {
                filter: contrast(.5) invert() contrast(4)
                hue-rotate(180deg) saturate(4);
            }
            .download-button img {filter: none;}
            .cheatsheet img {filter: none;}`
            document.head.appendChild(lightTheme)
            localStorage.setItem("theme", "light")
        }
    }
    document.getElementById("toggle-theme").addEventListener("click", toggle)
    if (localStorage.getItem("theme") === "light") {
        toggle()
    }
})
