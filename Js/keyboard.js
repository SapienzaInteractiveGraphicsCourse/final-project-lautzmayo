export function init() {
	var enabled = {
		q: false,
		w: false,
		e: false,
		a: false,
		s: false,
		d: false,
		escape: false,
		r: 1,
		l: false,
		z: false,
		old: 1,
		scale: 2,
		stato: 0
	}
	return enabled
}
export function keypressedAgent(event, enabled) {
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
			enabled[event.key]++
			if (enabled[event.key] == 2) enabled[event.key] = 0
			break
		case "l":
			enabled[event.key] = true
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
		case "l":
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
	}
	return enabled
}
