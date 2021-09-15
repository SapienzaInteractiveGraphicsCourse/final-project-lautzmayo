import { AnimationMixer, Clock, LoopOnce, LoopPingPong, QuaternionKeyframeTrack, VectorKeyframeTrack } from "../build/three.module.js"
import { animationClips } from "../main.js"

import { idleData, idlePositions } from "./animationData/idleAnimation.js"
import { walkData, walkPositions } from "./animationData/walkAnimation.js"
import { disposeData, disposePositions } from "./animationData/disposeAnimation.js"
import { collectData, collectPositions } from "./animationData/collectAnimation.js"

import { bones } from "./animationTool.js"

export class animationExec {
	idle
	idleTimescale = 40
	idlePositions
	
	walk
	walkTimescale = 40
	walkPositions
	
	dispose
	disposeTimescale = 15
	disposePositions
	
	collect
	collectTimescale = 15
	collectPositions
	

	getAnimation(skeleton, clip, mixer) {
		//this should recognize if clip is not a wrong string
		return eval(`this.#${clip}Animation(skeleton, mixer)`)
	}

	#idleAnimation(skeleton, mixer) {
		let keyframeComponentsArray = this.#prepareArrays(this.idle)
		let keyframePositionsArray = this.#preparePositions(this.idlePositions)
		let timeSteps = []
		for (let i = 0; i <= this.idle.length; i++) {
			timeSteps.push(i * (50 / this.idle.length + 1))
		}

		let tracks = this.#prepareQuaternionKeyframeTrack(skeleton, keyframeComponentsArray, timeSteps)
		tracks.push(this.#prepareVectorKeyframeTrack(keyframePositionsArray, timeSteps))

		// return this.#prepareClip(mixer, animationClips.idle, timeSteps, tracks, this.idleTimescale)
		let aa = this.#prepareClip(mixer, animationClips.idle, timeSteps, tracks, this.idleTimescale)
		aa.setLoop(LoopPingPong)
		return aa
	}

	#walkAnimation(skeleton, mixer) {
		let keyframeComponentsArray = this.#prepareArrays(this.walk)
		let keyframePositionsArray = this.#preparePositions(this.walkPositions)
		let timeSteps = []
		for (let i = 0; i <= this.walk.length; i++) {
			timeSteps.push(i * (50 / this.walk.length + 1))
		}

		let tracks = this.#prepareQuaternionKeyframeTrack(skeleton, keyframeComponentsArray, timeSteps)
		tracks.push(this.#prepareVectorKeyframeTrack(keyframePositionsArray, timeSteps))

		return this.#prepareClip(mixer, animationClips.walk, timeSteps, tracks, this.walkTimescale)
	}

	#disposeAnimation(skeleton, mixer) {
		let keyframeComponentsArray = this.#prepareArrays(this.dispose)
		let keyframePositionsArray = this.#preparePositions(this.disposePositions)
		let timeSteps = []
		for (let i = 0; i <= this.dispose.length; i++) {
			timeSteps.push(i * (50 / this.dispose.length + 1))
		}

		let tracks = this.#prepareQuaternionKeyframeTrack(skeleton, keyframeComponentsArray, timeSteps)
		tracks.push(this.#prepareVectorKeyframeTrack(keyframePositionsArray, timeSteps))

		// console.log(this.#prepareClip(mixer, animationClips.dispose, timeSteps, tracks, 5))
		let aa = this.#prepareClip(mixer, animationClips.dispose, timeSteps, tracks, this.disposeTimescale)
		aa.setLoop(LoopPingPong, 1)
		return aa
	}

	#collectAnimation(skeleton, mixer) {
		let keyframeComponentsArray = this.#prepareArrays(this.collect)
		let keyframePositionsArray = this.#preparePositions(this.collectPositions)
		let timeSteps = []
		for (let i = 0; i <= this.collect.length; i++) {
			timeSteps.push(i * (50 / this.collect.length + 1))
		}

		let tracks = this.#prepareQuaternionKeyframeTrack(skeleton, keyframeComponentsArray, timeSteps)
		tracks.push(this.#prepareVectorKeyframeTrack(keyframePositionsArray, timeSteps))

		let aa = this.#prepareClip(mixer, animationClips.collect, timeSteps, tracks, this.collectTimescale)
		aa.setLoop(LoopPingPong, 1)
		return aa
		// return this.#prepareClip(mixer, animationClips.collect, timeSteps, tracks, 10)
	}

	#prepareClip(mixer, clipName, timesteps, tracks, timescale) {
		var clip = new THREE.AnimationClip(clipName, timesteps[timesteps.length - 1], tracks)
		var AnimationAction = mixer.clipAction(clip)
		AnimationAction.timeScale = timescale
		AnimationAction.currentClip = clipName
		// console.log(AnimationAction.currentClip)
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
	#prepareVectorKeyframeTrack(array, timesteps) {
		return new VectorKeyframeTrack(`man.children[0].position`, timesteps, array)
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

	#preparePositions(clipArray) {
		let ret = []
		clipArray.forEach((e) => {
			ret.push(e.x)
			ret.push(e.y)
			ret.push(e.z)
		})
		ret.push(clipArray[0].x)
		ret.push(clipArray[0].y)
		ret.push(clipArray[0].z)
		return ret
	}

	constructor() {
		this.idle = idleData
		this.idlePositions = idlePositions
		this.walk = walkData
		this.walkPositions = walkPositions
		this.dispose = disposeData
		this.disposePositions = disposePositions
		this.collect = collectData
		this.collectPositions = collectPositions
	}
}
