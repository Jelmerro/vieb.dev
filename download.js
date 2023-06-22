"use strict"
// This page and my own icons are CC BY-SA 4.0 licensed @ Jelmer van Arnhem,
// see ./LICENSE or https://creativecommons.org/licenses/by-sa/4.0/
// Vieb and the Vieb logo are GPL-3.0+ licensed @ Jelmer van Arnhem,
// see ./LICENSE.GPL-3.0-or-later or http://gnu.org/licenses/gpl.html
// The brand logos, screenshots and github badges are public domain via CC0 1.0,
// see ./LICENSE.CC0-1.0 or https://creativecommons.org/publicdomain/zero/1.0/

const latestRelease = "10.1.0"
const releasesList = [
    {
        "name": "Windows",
        "options": [
            {"name": "Setup x64 (exe)", "url": "Vieb.Setup.{}.exe"},
            {"name": "Portable x64 (exe)", "url": "Vieb.{}.exe"},
            {"name": "Portable x64 (zip)", "url": "Vieb-{}-win.zip"},
            {"name": "Portable ARM64 (zip)", "url": "Vieb-{}-arm64-win.zip"},
            {"name": "Chocolatey", "cmd": "choco install vieb"},
            {
                "name": "Scoop",
                "cmd": [
                    "scoop bucket add extras",
                    "scoop install vieb"
                ]
            },
            {"name": "Winget", "cmd": "winget  install vieb"}
        ]
    },
    {
        "name": "Fedora",
        "options": [
            {"name": "RPM x64", "url": "vieb-{}.x86_64.rpm"},
            {"name": "RPM arm64", "url": "vieb-{}.aarch64.rpm"},
            {
                "name": "DNF repository",
                "cmd": [
                    "sudo dnf config-manager --add-repo https://jelmerro.nl/fedora/jelmerro.repo",
                    "sudo dnf install vieb"
                ]
            }
        ]
    },
    {
        "name": "Debian/Ubuntu/Mint",
        "options": [
            {"name": "Deb x64", "url": "vieb_{}_amd64.deb"},
            {"name": "Deb arm64", "url": "vieb_{}_arm64.deb"},
            {"name": "Snap x64", "url": "vieb_{}_amd64.snap"}
        ]
    },
    {
        "name": "Arch",
        "options": [
            {"name": "Pacman x64", "url": "vieb-{}.pacman"},
            {"name": "Pacman arm64", "url": "vieb-{}-aarch64.pacman"},
            {
                "name": "Arch user repository",
                "link": "https://aur.archlinux.org/packages/vieb-bin"
            }
        ]
    },
    {
        "name": "Mac",
        "options": [
            {"name": "Unsigned x64 App", "url": "Vieb-{}-mac.zip"},
            {"name": "Unsigned Silicon App", "url": "vieb-{}-arm64-mac.zip"},
            {
                "name": "Apps must be manually signed",
                "link": "https://github.com/Jelmerro/Vieb/blob/master/FAQ.md#mac",
                "linktitle": "See the FAQ"
            },
            {"name": "Homebrew", "cmd": "brew install --cask vieb"}
        ]
    },
    {
        "name": "Other Linux",
        "options": [
            {"name": "AppImage x64", "url": "Vieb-{}.AppImage"},
            {"name": "AppImage arm64", "url": "Vieb-{}-arm64.AppImage"},
            {"name": "tar.gz x64", "url": "vieb-{}.tar.gz"},
            {"name": "tar.gz arm64", "url": "vieb-{}-arm64.tar.gz"},
            {"name": "Alpine Edge", "cmd": "apk add vieb"}
        ]
    }
]

const addInstall = release => {
    if (release.url) {
        const button = document.createElement("a")
        button.classList.add("download-button")
        button.style.display = "inline-block"
        button.style.width = "16em"
        button.href = `https://github.com/Jelmerro/Vieb/releases/download/${
            latestRelease}/${release.url.replace("{}", latestRelease)}`
        button.textContent = release.name
        return button
    }
    if (release.link) {
        const container = document.createElement("div")
        container.textContent = `${release.name}: `
        container.classList.add("download-command")
        const link = document.createElement("a")
        link.href = release.link
        link.textContent = release.linktitle ?? release.link.split("/").at(-1)
        link.target = "_blank"
        container.append(link)
        return container
    }
    const container = document.createElement("div")
    container.textContent = `${release.name}: `
    container.classList.add("download-command")
    if (typeof release.cmd === "string") {
        const command = document.createElement("kbd")
        command.textContent = release.cmd
        container.append(command)
    } else {
        container.classList.add("multiline")
        for (const cmd of release.cmd) {
            const command = document.createElement("kbd")
            command.textContent = cmd
            container.append(command)
        }
    }
    if (release.note) {
        container.append(release.note)
    }
    return container
}

const addLinks = () => {
    document.querySelector(".release-number").textContent = latestRelease
    const downloadList = document.querySelector(".download-button-list")
    downloadList.textContent = ""
    for (const release of releasesList) {
        const container = document.createElement("div")
        container.classList.add("os-downloads")
        const h2 = document.createElement("h2")
        h2.textContent = release.name
        container.append(h2)
        release.options.forEach(r => container.append(addInstall(r)))
        downloadList.append(container)
    }
    const container = document.createElement("div")
    container.classList.add("os-downloads")
    const h2 = document.createElement("h2")
    h2.textContent = "Third-Party"
    container.append(h2)
    const thirdParty = document.createElement("a")
    thirdParty.style.width = "22.5em"
    thirdParty.href = "https://repology.org/project/vieb/versions"
    thirdParty.setAttribute("target", "_blank")
    const thirdPartyImg = document.createElement("img")
    thirdPartyImg.src = "https://repology.org/badge/vertical-allrepos/vieb.svg"
        + `?minversion=${latestRelease}&exclude_unsupported=1`
    thirdPartyImg.setAttribute("alt", "Third-party Vieb releases table")
    thirdParty.append(thirdPartyImg)
    container.append(thirdParty)
    downloadList.append(container)
}

window.addEventListener("DOMContentLoaded", addLinks)
