import * as THREE from "../build/three.module.js"
import { changeAnimation, animationClips, getCurrentAnimationClip } from "../main.js"

var time = 0
var newPosition = new THREE.Vector3()
var matrix = new THREE.Matrix4()

var stop = 1
var DEGTORAD = 0.01745327
var temp = new THREE.Vector3()
var dir = new THREE.Vector3()
var a = new THREE.Vector3()
var b = new THREE.Vector3()
var Distance = 200
var velocity = 0.0
var speed = 0.0
let rotationSpeed

let walkSpeedValue = 4
let rotationSpeedValue = 0.05

export function movePlayer(man, camera, enabled, goal, follow, isAnimTool) {
	var dirZ = new THREE.Vector3(0, 0, -2)
	var dirX = new THREE.Vector3(2, 0, 0)
	var dirAnimation = new THREE.Vector3(0, 0, 0)
	speed = 0.0
	rotationSpeed = 0.0

	if (!isAnimTool) {
		if (enabled.w) {
			speed = walkSpeedValue
			dirAnimation.sub(dirZ)
		}
		if (enabled.s) {
			speed = -walkSpeedValue
			dirAnimation.add(dirZ)
		}

		velocity += (speed - velocity) * 0.3
		man.translateZ(velocity)

		if (enabled.a) {
			rotationSpeed = rotationSpeedValue
			man.rotateY(rotationSpeed)
			dirAnimation.sub(dirX)
		}
		if (enabled.d) {
			rotationSpeed = -rotationSpeedValue
			man.rotateY(rotationSpeed)
			dirAnimation.add(dirX)
		}

		a.lerp(man.position, 0.1)
		b.copy(goal.position)

		dir.copy(a).sub(b).normalize()
		const dis = a.distanceTo(b) - Distance
		goal.position.addScaledVector(dir, dis)
		goal.position.lerp(temp, 0.3)
		temp.setFromMatrixPosition(follow.matrixWorld)
		camera.lookAt(man.position)

		if (enabled.r) {
			camera.position.y += 1
		}
		if (enabled.f) {
			camera.position.y -= 1
		}

		//se non vogliamo usare librerie per la fisica, questo controllo evita al personaggio di superare i bordi
		if (man.position.x < -170 && (man.position.z < -170 || man.position.z > 170)) man.position.x += 2
		if (man.position.x > 170 && (man.position.z < -170 || man.position.z > 170)) man.position.x -= 2
		if (man.position.z < -170 && (man.position.x < -170 || man.position.x > 170)) man.position.z += 2
		if (man.position.z > 170 && (man.position.x < -170 || man.position.x > 170)) man.position.z -= 2

		let walkThreshold = 0.3
		let rotationThreshold = 0.01
		if (
			(Math.abs(speed) >= walkThreshold || Math.abs(rotationSpeed) >= rotationThreshold) &&
			getCurrentAnimationClip != animationClips.walk
		) {
			changeAnimation(animationClips.walk)
		}
		if (
			Math.abs(speed) < walkThreshold &&
			Math.abs(rotationSpeed) < rotationThreshold &&
			getCurrentAnimationClip != animationClips.idle
		) {
			changeAnimation(animationClips.idle)
		}
	} else {
		let flySpeed = 2
		if (enabled.w) {
			
		}
		if (enabled.s) {
		}
	}

	return dirAnimation
}
