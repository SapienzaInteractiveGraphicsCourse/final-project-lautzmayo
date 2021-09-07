import { AnimationMixer, Clock, QuaternionKeyframeTrack } from "../build/three.module.js"
import { animationClips } from "../main.js"
import { idleData } from "./animationData/idleAnimation.js"
import { walkData } from "./animationData/walkAnimation.js"
import { bones } from "./animationTool.js"

export class animationExec {
	idle
	walk

	getAnimation(skeleton, clip, mixer) {
		return eval(`this.#${clip}Animation(skeleton, mixer)`)
	}

	#idleAnimation(skeleton, mixer) {
		let keyframeComponentsArray = this.#prepareArrays(this.idle)
		let timeSteps = [2, 8, 14, 20]

		let tracks = this.#prepareQuaternionKeyframeTrack(skeleton, keyframeComponentsArray, timeSteps)

		return this.#prepareClip(mixer, animationClips.idle, timeSteps, tracks, 10)
	}
	#walkAnimation(skeleton, mixer) {
		let keyframeComponentsArray = this.#prepareArrays(this.walk)
		let timeSteps = [2, 8, 14, 20, 26, 32, 38, 44, 50]

		let tracks = this.#prepareQuaternionKeyframeTrack(skeleton, keyframeComponentsArray, timeSteps)

		return this.#prepareClip(mixer, animationClips.walk, timeSteps, tracks, 40)
	}

	#prepareClip(mixer, clipName, timesteps, tracks, timescale) {
		var clip = new THREE.AnimationClip(clipName, timesteps[timesteps.length - 1], tracks)
		var AnimationAction = mixer.clipAction(clip)
		AnimationAction.timeScale = timescale
		AnimationAction.currentClip = clipName
		return AnimationAction
	}
	//infine viene creata la clip definendo la durata totale dell'animazione (in questo caso 50) e tutti i keyframe (arti coinvolti) dell'animazione
	// var clip = new THREE.AnimationClip(clipName, timesteps[timesteps.length - 1], tracks)
	// var mixer = new THREE.AnimationMixer(player.children[0])
	// var AnimationAction = mixer.clipAction(clip)
	// AnimationAction.timeScale = timescale
	// var clock = new THREE.Clock()
	// return [mixer, AnimationAction, clock]

	prepareEnvironment(player, skeleton) {
		var mixer = new AnimationMixer(player.children[0])
		var AnimationAction = this.getAnimation(skeleton, animationClips.idle, mixer)
		var clock = new Clock()
		return [mixer, AnimationAction, clock]
	}

	#prepareQuaternionKeyframeTrack(skeleton, keyframeComponentsArray, timesteps) {
		let tracks = []

		for (let i = 0; i < bones.length; i++) {
			const track = new QuaternionKeyframeTrack(`${skeleton.bones[bones[i].boneId].name}.quaternion`, timesteps, keyframeComponentsArray[i])
			tracks.push(track)
		}
		return tracks
	}

	#prepareArrays(clipArray) {
		let keyframePerBoneArray = []
		let numberOfBones = clipArray[0].length

		let boneArray = []
		for (let i = 0; i < numberOfBones; i++) {
			boneArray = []
			clipArray.forEach((kframe) => {
				boneArray.push(kframe[i])
			})
			keyframePerBoneArray.push(boneArray)
		}
		let keyframeComponentsPerBoneArray = []
		keyframePerBoneArray.forEach((b) => {
			boneArray = []
			b.forEach((q) => {
				boneArray.push(q.x)
				boneArray.push(q.y)
				boneArray.push(q.z)
				boneArray.push(q.w)
			})
			boneArray.push(b[0].x)
			boneArray.push(b[0].y)
			boneArray.push(b[0].z)
			boneArray.push(b[0].w)
			keyframeComponentsPerBoneArray.push(boneArray)
		})
		return keyframeComponentsPerBoneArray
	}

	constructor() {
		this.idle = idleData
		this.walk = walkData
	}
}
