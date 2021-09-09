import { Audio, AudioListener, AudioLoader } from "../build/three.module.js"
import { addListener } from "../main.js"
export class soundManager {
	#camera

	loadAudio() {
		// create an AudioListener and add it to the camera
		let listener = new THREE.AudioListener()
		addListener(listener)
		// create a global audio source
		let sound = new THREE.Audio(listener)

		let audioLoader = new AudioLoader()
		audioLoader.load("/Audio/CityLife.mp3", function (buffer) {
			sound.setBuffer(buffer)
			sound.setLoop(true)
			sound.setVolume(0.5)
			sound.play()
		})
	}

	constructor(camera) {
		this.#camera = camera
		this.loadAudio()
	}
}
