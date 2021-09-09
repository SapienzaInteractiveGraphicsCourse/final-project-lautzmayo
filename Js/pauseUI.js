import { pauseGame } from "../main.js"
export class pauseUI {
	#pauseDiv

	toggleVisibility(isPaused) {
		this.#pauseDiv.hidden = !isPaused
	}
	constructor() {
		this.#pauseDiv = document.createElement("div")
		this.#pauseDiv.setAttribute("id", "pauseDiv")
		this.#pauseDiv.setAttribute("class", "pause")
		this.#pauseDiv.hidden = true
		document.body.appendChild(this.#pauseDiv)

		let documentItem = document.createElement("h1")
		documentItem.innerText = "PAUSE"
		this.#pauseDiv.append(documentItem)

		this.#pauseDiv.append(document.createElement("br"))

		documentItem = document.createElement("img")
		documentItem.setAttribute("src", "/final-project-lautzmayo/buttons_menu.png")
		documentItem.setAttribute("onerror", "this.src='/buttons_menu.png'")
		this.#pauseDiv.append(documentItem)

		this.#pauseDiv.append(document.createElement("br"))

		documentItem = document.createElement("button")
		documentItem.setAttribute("class", "animToolLogBtn")
		documentItem.style.fontSize = "36px"
		documentItem.innerText = "RESET GAME"
		documentItem.addEventListener("click", () => {
			location.reload()
		})
		this.#pauseDiv.append(documentItem)

		this.#pauseDiv.append(document.createElement("br"))

		documentItem = document.createElement("button")
		documentItem.setAttribute("class", "animToolLogBtn")
		documentItem.style.fontSize = "36px"
		documentItem.innerText = "CONTINUE PLAYING"
		documentItem.addEventListener("click", () => {
			pauseGame()
		})
		this.#pauseDiv.append(documentItem)
	}
}
