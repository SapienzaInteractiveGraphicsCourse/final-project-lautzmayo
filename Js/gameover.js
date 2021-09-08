export class gameover {
	#gameOverDiv

	constructor() {
		this.#gameOverDiv = document.createElement("div")
		this.#gameOverDiv.setAttribute("id", "gameoverDiv")
		this.#gameOverDiv.setAttribute("class", "gameover")
		// this.#gameOverDiv.hidden = true
		document.body.appendChild(this.#gameOverDiv)

		let documentItem = document.createElement("h1")
		documentItem.innerText = "GAME OVER"
		this.#gameOverDiv.append(documentItem)

		this.#gameOverDiv.append(document.createElement("br"))

		let totalPoints = document.getElementById("total").getAttribute("value")

		documentItem = document.createElement("h2")
		documentItem.innerText = "You reached to score " + totalPoints + " points"
		this.#gameOverDiv.append(documentItem)

		this.#gameOverDiv.append(document.createElement("br"))

		documentItem = document.createElement("button")
		documentItem.setAttribute("class", "animToolLogBtn")
		documentItem.style.fontSize = "36px"
		documentItem.innerText = "TRY AGAIN"
		documentItem.addEventListener("click", () => {
			location.reload()
		})
		this.#gameOverDiv.append(documentItem)
	}
}
