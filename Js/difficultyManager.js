export const difficultyColors = [
	"rgba(138, 255, 148, 0.8)",
	"rgba(255, 245, 100, 0.8)",
	"rgba(255, 138, 138, 0.8)",
	"rgba(75, 1, 1, 0.8)",
	`rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.8)`
]
export class difficultyManager {
	#difficultyLevels = ["easy", "medium", "hard", "hell", "debugTest"]
	get difficultyLevels() {
		return this.#difficultyLevels
	}

	#itemCount = [10, 5, 3, 1, 10]
	get itemCount() {
		return this.#itemCount
	}

	#time = [180000, 120000, 60000, 30000, 5000] //millisec
	// #time = [1000, 1000, 1000, 1000, 1000] //millisec
	get time() {
		return this.#time
	}

	#bonusTime = [5000, 10000, 15000, 5000, 180000] //millisec
	get bonusTime() {
		return this.#bonusTime
	}

	constructor() {
		this.#makeUi()
	}
	#makeUi() {
		const root = document.getElementById("mainPageItems").appendChild(document.createElement("div"))
		root.className = "pause"
		root.style.width = "auto"
		root.style.height = "auto"
		root.style.zIndex = "20"
		root.style.position = ""
		root.style.removeProperty("bottom")
		root.style.top = "10px"

		const label = document.createElement("label")
		label.innerText = "select difficulty :"
		root.appendChild(label)

		const listContainer = document.createElement("select")
		listContainer.setAttribute("id", "difficultyLevel")
		root.appendChild(listContainer)

		let a
		for (let i = 0; i < this.#difficultyLevels.length; i++) {
			a = document.createElement("option")
			a.innerText = this.#difficultyLevels[i]
			a.setAttribute("value", i)
			listContainer.appendChild(a)
		}
	}
}
