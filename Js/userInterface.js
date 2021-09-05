import { trashTypes } from "../main.js"

export class userInterface {
	#rootNode

	#selectedTrash

	#paperDiv
	#plasticDiv
	#glassDiv

	#totalDiv

	#paperCounter
	#plasticCounter
	#glassCounter

	#totalCounter

	constructor() {
		this.#rootNode = null

		this.#selectedTrash = trashTypes.none

		this.#paperDiv = null
		this.#plasticDiv = null
		this.#glassDiv = null

		this.#totalDiv = null

		this.#paperCounter = 0
		this.#plasticCounter = 0
		this.#glassCounter = 0

		this.#totalCounter = 0

		this.#init()
	}

	#init() {
		if (this.#rootNode != null) {
			document.removeChild(this.#rootNode)
			this.#rootNode = null
		}
		this.#rootNode = document.createElement("div")
		this.#rootNode.setAttribute("id", "rootUserInterface")
		this.#rootNode.setAttribute("width", "100%")
		this.#rootNode.setAttribute("border", "0")
		document.body.appendChild(this.#rootNode)

		this.#makeCounter(trashTypes.paper)
		this.#makeCounter(trashTypes.plastic)
		this.#makeCounter(trashTypes.glass)

		this.#makeTotalCounter()
	}

	#makeCounter(type) {
		//create div for each trash counter ( TO BE UPDATE WITH COLLECTION OF TRASH)
		if (type == null) {
			type = ""
			return false
		}
		//TODO: retrieve type and how to bound to a single type interaction
		eval(
			`if (this.#${type}Div == null) {
			
				this.#${type}Div = document.createElement("div")
				this.#${type}Div.setAttribute("id", "${type}")

				this.#toggleCounterVisualization(type, false)
				
				let span = document.createElement("p")
				span.innerText = " Type: ${type.toUpperCase()}"
				this.#${type}Div.appendChild(span)
				
				span = document.createElement("p")
				span.innerText = this.#${type}Counter + "/10"
				this.#${type}Div.appendChild(span)
				
				this.#rootNode.appendChild(this.#${type}Div)

				// this.#selectedTrash = type
			}`
		)
	}

	#makeTotalCounter() {
		if (this.#totalDiv == null) {
			this.#totalDiv = document.createElement("div")
			this.#totalDiv.setAttribute("id", "total")

			this.#toggleCounterVisualization("total", false)

			let span = document.createElement("p")
			span.innerText = " Total Points: " + this.#totalCounter
			this.#totalDiv.appendChild(span)

			this.#rootNode.appendChild(this.#totalDiv)
		}
	}

	// increments by one (or many if total) the selected counter
	incrementCounter(type, points = 1) {
		if (type != null) {
			if (type == "total") {
				this.#totalCounter += points
			} else {
				eval(`this.#${type}Counter++`)
			}
		}
		this.#updateCounterVisualization()
	}

	// reset the counters and update the visualization
	resetCounters(resetTotal = false) {
		this.#paperCounter = 0
		this.#glassCounter = 0
		this.#plasticCounter = 0
		if (resetTotal) {
			this.#totalCounter = 0
		}
		this.#updateCounterVisualization()
	}

	// update counter visualizations
	#updateCounterVisualization() {
		if (this.#paperDiv != null) {
			this.#paperDiv.children[1].innerText = `${this.#paperCounter} / 10`
		}

		if (this.#plasticDiv != null) {
			this.#plasticDiv.children[1].innerText = `${this.#plasticCounter} / 10`
		}

		if (this.#glassDiv != null) {
			this.#glassDiv.children[1].innerText = `${this.#glassCounter} / 10`
		}

		if (this.#totalDiv != null) {
			this.#totalDiv.children[0].innerText = `Total Points: ${this.#totalCounter}`
		}
	}

	// return the integer of the choosen counter
	getIntCounter(type) {
		if (type != null) {
			return eval(`this.#${type}Counter`)
		} else {
			return null
		}
	}
	// returns the trashType selected
	getActiveCounter() {
		return this.#selectedTrash
	}

	// disabilita o attiva i div per i vari contatori
	toggleCounter(type, isActive = false) {
		if (type == trashTypes.none) {
			this.#toggleCounterVisualization(trashTypes.glass, false)
			this.#toggleCounterVisualization(trashTypes.paper, false)
			this.#toggleCounterVisualization(trashTypes.plastic, false)
			this.#selectedTrash = trashTypes.none
		} else if (type == "total") {
			this.#toggleCounterVisualization(type, isActive)
		} else {
			if (this.#selectedTrash == trashTypes.none) {
				this.toggleCounter(this.#selectedTrash)
				this.#toggleCounterVisualization(type, isActive)
				this.#selectedTrash = type
			}
		}
	}

	#toggleCounterVisualization(type, isActive) {
		eval(`this.#${type}Div.hidden = ${!isActive}`)
	}
}
