import { Audio, AudioListener, AudioLoader, LoadingManager } from "../build/three.module.js"
import { addListener, resetTimer } from "../main.js"
export const PlayableSounds = { bgm: "bgm", gameOver: "gameOver", trashDump: "trashDump", stopwatch: "stopwatch", pickup: "pickup" }
export class soundManager {
	started = false

	#bgm = new SoundItem("/Audio/CityLife.mp3", "bgm", 0.5, true)

	#gameOver = new SoundItem("/Audio/Game over!.mp3", "gameOver", 0.5, true)

	#trashDump = new SoundItem("/Audio/Trash.mp3", "trashDump", 0.25, false)

	#stopwatch = new SoundItem("/Audio/stopwatch.mp3", "stopwatch", 0.25, false)

	#pickup = new SoundItem("/Audio/pickUp.mp3", "pickup", 0.5, false)

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
		if (!this.started) {
			resetTimer()
			this.started = true
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
		this.threeMan = new LoadingManager()
		this.threeMan.onLoad = () => console.log("loaded") //removeLoadingScreen()
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
