import { trashTypes } from "../main.js"

export class userInterface {
	#rootNode = null

	#activeDiv = null
	#paperDiv = null
	#plasticDiv = null
	#glassDiv = null

	#paperCounter = 0
	#plasticCounter = 0
	#glassCounter = 0

	constructor() {
		this.#init()
	}

	#init() {
		if (this.#rootNode == null) {
			this.#rootNode = document.createElement("div")
			this.#rootNode.setAttribute("id", "rootUserInterface")
			document.body.appendChild(this.#rootNode)
		}
	}

	makeCounter(type) {
		//create div for each trash counter ( TO BE UPDATE WITH COLLECTION OF TRASH)
		if (type == null) {
			type = ""
		}
		//TODO: retrieve type and how to bound to a single type interaction
		if (this.#activeDiv == null) {
			eval(
				`if (this.#${type}Div == null) {
                
                this.#${type}Div = document.createElement("div")
                this.#${type}Div.setAttribute("id", "${type}")
                
                let span = document.createElement("p")
                span.innerText = " Type: ${type.toUpperCase()}"
                this.#${type}Div.appendChild(span)
                
                span = document.createElement("p")
                span.innerText = this.#${type}Counter + "/10"
                this.#${type}Div.appendChild(span)
                
                this.#rootNode.appendChild(this.#${type}Div)
    
                this.#activeDiv = this.#${type}Div
            }`
			)
		}
	}

	incrementCounter(type) {
		if (type != null) {
			eval(`this.#${type}Counter++`)
		}
		this.#updateCounterVisualization()
	}

	resetCounters() {
		this.#paperCounter = 0
		this.#glassCounter = 0
		this.#plasticCounter = 0
		this.#updateCounterVisualization()
	}

	#updateCounterVisualization() {
		if (this.#paperDiv != null) {
			this.#paperDiv.innerText = `PAPER: ${this.#paperCounter}`
		}

		if (this.#plasticDiv != null) {
			this.#plasticDiv.innerText = `PLASTIC: ${this.#plasticCounter}`
		}

		if (this.#glassDiv != null) {
			this.#glassDiv.innerText = `GLASS: ${this.#glassCounter}`
		}
	}

	getCounter(type) {
		if (type != null) {
			eval(`return this.#${type}Counter`)
		} else {
			return null
		}
	}
}
