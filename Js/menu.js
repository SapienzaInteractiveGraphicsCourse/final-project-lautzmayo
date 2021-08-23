import * as THREE from "../build/three.module.js"

export function init(font, roomTexture, playerMesh) {
	var scene, camera

	scene = new THREE.Scene()
	scene.background = new THREE.Color("white")

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)

	camera.position.y = 0
	camera.position.z = 0

	return [scene, camera]
}
