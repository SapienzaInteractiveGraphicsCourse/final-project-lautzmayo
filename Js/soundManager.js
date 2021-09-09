import { Audio, AudioListener, AudioLoader } from "../build/three.module.js"
import { addListener } from "../main.js"
export const PlayableSounds = { bgm: "bgm", gameOver: "gameOver", trashDump: "trashDump", stopwatch: "stopwatch", pickup: "pickup" }
export class soundManager {
	#bgm = new SoundItem("/final-project-lautzmayo/Audio/CityLife.mp3", "bgm", 0.5, true)

	#gameOver = new SoundItem("/final-project-lautzmayo/Audio/Game over!.mp3", "gameOver", 0.5, true)

	#trashDump = new SoundItem("/final-project-lautzmayo/Audio/Trash.mp3", "trashDump", 0.25, false)

	#stopwatch = new SoundItem("/final-project-lautzmayo/Audio/stopwatch.mp3", "stopwatch", 0.25, false)

	#pickup = new SoundItem("/final-project-lautzmayo/Audio/pickUp.mp3", "pickup", 0.5, false)

	#loadAudio(s) {
		// create an AudioListener and add it to the camera
		let listener = new THREE.AudioListener()
		addListener(listener)
		// create a global audio source
		s.sound = new THREE.Audio(listener)

		let audioLoader = new AudioLoader()
		audioLoader.load(s.clipSrc, function (buffer) {
			s.sound.setBuffer(buffer)
		})
		this.#prepareSound(s)
	}

	#prepareSound(s) {
		s.sound.setLoop(s.loopable)
		s.sound.setVolume(s.volume)
	}

	toggleSound(name, isPlaying = null) {
		let s = eval(`this.#${name}.sound`)
		if (s.buffer == null) {
			setTimeout(() => this.toggleSound(name, isPlaying), 250)
			return
		}
		if (isPlaying) {
			s.play()
		}
		if (!isPlaying) {
			s.pause()
		}
		if (isPlaying == null) {
			s.stop()
		}
	}

	constructor() {
		this.#loadAudio(this.#bgm)
		this.#loadAudio(this.#gameOver)
		this.#loadAudio(this.#trashDump)
		this.#loadAudio(this.#stopwatch)
		this.#loadAudio(this.#pickup)
	}
}

class SoundItem {
	clipSrc
	sound
	name
	volume
	loopable
	constructor(src, name, vol, loop) {
		this.clipSrc = src
		this.name = name
		this.volume = vol
		this.loopable = loop
	}
}
