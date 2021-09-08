import { pauseGame } from "../main.js"

var buttons = document.getElementById("Buttons")
export function init() {
	var enabled = {
		q: false,
		w: false,
		e: false,
		a: false,
		s: false,
		d: false,
		escape: false,
		r: false,
		f: false,
		l: false,
		z: false,
		old: 1,
		scale: 2,
		stato: 0
	}
	return enabled
}
export function keypressedAgent(event, enabled, game) {
	switch (event.key) {
		case "q":
			enabled[event.key] = true
			break
		case "w":
			enabled[event.key] = true
			break
		case "e":
			enabled[event.key] = true
			break
		case "a":
			enabled[event.key] = true
			break
		case "s":
			enabled[event.key] = true
			break
		case "d":
			enabled[event.key] = true
			break
		case "r":
			enabled[event.key] = true
			break
		case "f":
			enabled[event.key] = true
			break
		case "p":
			enabled[event.key] = !enabled[event.key]
			pauseGame()
			break
		case "z":
			enabled[event.key] = true
			break
		case "x":
			enabled[event.key] = true
			break
		case "c":
			enabled[event.key] = true
			break
		case "escape":
			enabled[event.key] = true
			break
	}
	return [enabled]
}

export function keyreleasedAgent(event, enabled) {
	switch (event.key) {
		case "q":
			enabled[event.key] = false
			break
		case "w":
			enabled[event.key] = false
			break
		case "e":
			enabled[event.key] = false
			break
		case "a":
			enabled[event.key] = false
			break
		case "s":
			enabled[event.key] = false
			break
		case "d":
			enabled[event.key] = false
			break
		case "z":
			enabled[event.key] = false
			break
		case "x":
			enabled[event.key] = false
			break
		case "c":
			enabled[event.key] = false
			break
		case "r":
			enabled[event.key] = false
			break
		case "f":
			enabled[event.key] = false
			break
		case "escape":
			enabled[event.key] = false
			break
	}
	return enabled
}
