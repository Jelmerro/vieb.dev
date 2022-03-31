"use strict"
// This page and my own icons are CC BY-SA 4.0 licensed @ Jelmer van Arnhem,
// see ./LICENSE or https://creativecommons.org/licenses/by-sa/4.0/
// Vieb and the Vieb logo are GPL-3.0+ licensed @ Jelmer van Arnhem,
// see ./LICENSE.GPL-3.0-or-later or http://gnu.org/licenses/gpl.html
// The brand logos, screenshots and github badges are public domain via CC0 1.0,
// see ./LICENSE.CC0-1.0 or https://creativecommons.org/publicdomain/zero/1.0/

const latestRelease = "7.2.0"
const linuxReleases = [
    {"name": "AppImage", "url": "Vieb-{}.AppImage"},
    {"name": "Fedora (rpm)", "url": "vieb-{}.x86_64.rpm"},
    {"name": "Debian/Ubuntu/Mint (deb)", "url": "vieb_{}_amd64.deb"},
    {"name": "Arch (pacman)", "url": "vieb-{}.pacman"},
    {"name": "Snap", "url": "vieb_{}_amd64.snap"},
    {"name": "Linux binary (tar.gz)", "url": "vieb-{}.tar.gz"}
]
const armReleases = [
    {"name": "AppImage", "url": "Vieb-{}-arm64.AppImage"},
    {"name": "Fedora (rpm)", "url": "vieb-{}.aarch64.rpm"},
    {"name": "Debian/Ubuntu/Mint (deb)", "url": "vieb_{}_arm64.deb"},
    {"name": "Arch (pacman)", "url": "vieb-{}-aarch64.pacman"},
    {"name": "Linux binary (tar.gz)", "url": "vieb-{}-arm64.tar.gz"}
]
const windowsReleases = [
    {"name": "Setup x64 (exe)", "url": "Vieb.Setup.{}.exe"},
    {"name": "Portable x64 (exe)", "url": "Vieb.{}.exe"},
    {"name": "Portable x64 (zip)", "url": "Vieb-{}-win.zip"},
    {"name": "Portable ARM64 (zip)", "url": "Vieb-{}-arm64-win.zip"}
]
const macReleases = [
    {"name": "Unsigned x64 App", "url": "Vieb-{}-mac.zip"},
    {"name": "Unsigned Silicon App", "url": "vieb-{}-arm64-mac.zip"}
]

const addButton = release => {
    const button = document.createElement("a")
    button.className = "download-button"
    button.style.display = "inline-block"
    button.style.width = "15em"
    button.href = `https://github.com/Jelmerro/Vieb/releases/download/${
        latestRelease}/${release.url.replace("{}", latestRelease)}`
    button.textContent = release.name
    return button
}

const addLinks = () => {
    document.querySelector(".release-number").textContent = latestRelease
    const linux = document.querySelector(".linux-downloads")
    const arm = document.querySelector(".arm-downloads")
    const windows = document.querySelector(".windows-downloads")
    const mac = document.querySelector(".mac-downloads")
    linux.textContent = ""
    arm.textContent = ""
    windows.textContent = ""
    mac.textContent = ""
    linuxReleases.forEach(release => linux.appendChild(addButton(release)))
    armReleases.forEach(release => arm.appendChild(addButton(release)))
    windowsReleases.forEach(release => windows.appendChild(addButton(release)))
    macReleases.forEach(release => mac.appendChild(addButton(release)))
    const note = document.createElement("a")
    note.href = "https://github.com/Jelmerro/Vieb/blob/master/FAQ.md#mac"
    note.textContent = "Signing it yourself isn't hard"
    note.target = "_blank"
    mac.appendChild(note)
    const thirdParty = document.createElement("a")
    thirdParty.href = "https://repology.org/project/vieb/versions"
    thirdParty.setAttribute("target", "_blank")
    const thirdPartyImg = document.createElement("img")
    thirdPartyImg.src = "https://repology.org/badge/vertical-allrepos/vieb.svg"
        + `?minversion=${latestRelease}`
    thirdPartyImg.setAttribute("alt", "Third-party Vieb releases table")
    thirdParty.appendChild(thirdPartyImg)
    document.querySelector(".third-party-downloads").textContent = ""
    document.querySelector(".third-party-downloads").appendChild(thirdParty)
}

window.addEventListener("DOMContentLoaded", addLinks)
