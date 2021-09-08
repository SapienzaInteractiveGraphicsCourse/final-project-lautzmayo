import { gameOver, isGameRunning } from "../main.js"
import { gameover } from "./gameover.js"
import { locateStopwatch } from "./trash.js"
export class countDown {
	#isPlaying
	get isPlaying() {
		return this.#isPlaying
	}

	#timerDiv
	#timerText

	#timerInt
	#extraTimeInt = 5 //seconds

	#stopwatchArray = []
	#stopwatchModel
	#nStopwatch
	#sceneRef
	#intersectablesRef

	#createTimer() {
		if (this.#timerDiv != null) {
			this.#deleteTimer()
			this.#createTimer()
		}
		this.#timerDiv = document.createElement("div")
		this.#timerDiv.setAttribute("id", "timerDiv")
		this.#timerDiv.setAttribute("class", "timer")
		document.body.appendChild(this.#timerDiv)

		this.#timerText = document.createElement("h1")
		this.#timerText.setAttribute("id", "timerText")
		this.#timerText.innerText = "TIMER: 5.00"
		this.#timerDiv.appendChild(this.#timerText)

		this.#isPlaying = true

		this.#updateTimer()
		this.#passTime()
	}

	stopwatchInteraction(obj) {
		this.#timerInt += this.#extraTimeInt * 1000
		this.#sceneRef.remove(obj)
		this.#updateTimer()
		alert("More Time")
		let h = Math.floor(Math.random() * (20000 - 5000 + 1) + 5000)
		h = h * (this.#stopwatchArray.length + 1)
		setTimeout(() => this.#instanciateStopwatch(), h)
	}

	#passTime() {
		let repeat = false
		if (this.#timerInt >= 1000) {
			if (isGameRunning) {
				this.#timerInt -= 1000
			}
			this.#updateTimer()
			repeat = true
		}
		if (this.#timerInt <= 0 && isGameRunning) {
			this.#isPlaying = false
			gameOver()
			this.#deleteTimer()
			let go = new gameover()
		}
		if (repeat) {
			setTimeout(() => {
				this.#passTime()
			}, 1000)
		}
	}

	#deleteTimer() {
		document.body.removeChild(this.#timerDiv)
		this.#timerDiv = null
	}

	#instanciateStopwatch() {
		this.#stopwatchArray = locateStopwatch(this.#nStopwatch, this.#stopwatchModel, this.#sceneRef, this.#intersectablesRef)
		this.#nStopwatch = 1
	}

	#updateTimer() {
		this.#timerText.innerText = "Timer: " + this.#timerInt / 1000
	}

	constructor(nStopwatch, stopwatchModel, scene, intersectable) {
		this.#timerDiv = null

		this.#nStopwatch = nStopwatch
		this.#stopwatchModel = stopwatchModel
		this.#sceneRef = scene
		this.#intersectablesRef = intersectable

		this.#timerInt = 5000 * 60

		this.#createTimer()
		this.#instanciateStopwatch()
	}
}
