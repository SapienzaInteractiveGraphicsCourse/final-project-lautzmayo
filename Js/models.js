import * as THREE from "../build/three.module.js"
import { GLTFLoader } from "https://threejs.org/examples/jsm/loaders/GLTFLoader.js"
import { BufferGeometryUtils } from "../jsm/utils/BufferGeometryUtils.js"

export function getCharacter() {
	const myPromise = new Promise((resolve, reject) => {
		const gltfLoader = new GLTFLoader()
		gltfLoader.load(
			"./Model/John/john.gltf",
			function (gltf) {
				let scale = 0.4
				const playerMesh = gltf.scene
				playerMesh.scale.set(playerMesh.scale.x * scale, playerMesh.scale.y * scale, playerMesh.scale.z * scale)
				playerMesh.castShadow = true
				playerMesh.receiveShadow = true
				// shadows(playerMesh)
				changeMaterial(playerMesh)
				resolve(playerMesh)
			},
			function (xhr) {
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
			},
			function (error) {
				console.log("An error happened")
				reject(error)
			}
		)
	})
	return myPromise
}

export function getMap() {
	const myPromise = new Promise((resolve, reject) => {
		const gltfLoader = new GLTFLoader()
		gltfLoader.load(
			"./Model/city/scene.gltf",
			function (gltf) {
				const mapMesh = gltf.scene
				mapMesh.castShadow = true
				mapMesh.receiveShadow = true
				// shadows(mapMesh)
				changeMaterial(mapMesh)
				resolve(mapMesh)
			},
			function (xhr) {
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
			},
			function (error) {
				console.log("An error happened")
				reject(error)
			}
		)
	})
	return myPromise
}

export function getTrashCan() {
	const myPromise = new Promise((resolve, reject) => {
		const gltfLoader = new GLTFLoader()
		gltfLoader.load(
			"./Model/Trash_Can/scene.gltf",
			function (gltf) {
				let scale = 35
				const trashcanMesh = gltf.scene
				trashcanMesh.scale.set(trashcanMesh.scale.x * scale, trashcanMesh.scale.y * scale, trashcanMesh.scale.z * scale)
				trashcanMesh.castShadow = true
				trashcanMesh.receiveShadow = true
				// shadows(trashcanMesh)
				changeMaterial(trashcanMesh)
				resolve(trashcanMesh)
			},
			function (xhr) {
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
			},
			function (error) {
				console.log("An error happened")
				reject(error)
			}
		)
	})
	return myPromise
}

export function getPlastic() {
	const myPromise = new Promise((resolve, reject) => {
		const gltfLoader = new GLTFLoader()
		gltfLoader.load(
			"./Model/Plastic/scene.gltf",
			function (gltf) {
				let scale = 4.5
				var newMaterial = new THREE.MeshStandardMaterial({ color: 0xffe600 })
				const plasticMesh = gltf.scene
				plasticMesh.children[0].children[0].children[0].children[0].children[0].children[0].children[0].material = newMaterial
				plasticMesh.children[0].children[0].children[0].children[0].children[0].children[0].children[0].material.side = THREE.DoubleSide
				plasticMesh.scale.set(plasticMesh.scale.x * scale, plasticMesh.scale.y * scale, plasticMesh.scale.z * scale)
				plasticMesh.castShadow = true
				plasticMesh.receiveShadow = true
				// shadows(plasticMesh)
				changeMaterial(plasticMesh)
				resolve(plasticMesh)
			},
			function (xhr) {
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
			},
			function (error) {
				console.log("An error happened")
				reject(error)
			}
		)
	})
	return myPromise
}

export function getPaper() {
	const myPromise = new Promise((resolve, reject) => {
		const gltfLoader = new GLTFLoader()
		gltfLoader.load(
			"./Model/Paper/scene.gltf",
			function (gltf) {
				let scale = 4.0
				var newMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
				const paperMesh = gltf.scene
				paperMesh.children[0].children[0].children[0].children[0].material = newMaterial
				paperMesh.children[0].children[0].children[0].children[0].material.side = THREE.DoubleSide
				paperMesh.scale.set(paperMesh.scale.x * scale, paperMesh.scale.y * scale, paperMesh.scale.z * scale)
				paperMesh.castShadow = true
				paperMesh.receiveShadow = true
				// shadows(paperMesh)
				changeMaterial(paperMesh)
				resolve(paperMesh)
			},
			function (xhr) {
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
			},
			function (error) {
				console.log("An error happened")
				reject(error)
			}
		)
	})
	return myPromise
}

export function getGlass() {
	const myPromise = new Promise((resolve, reject) => {
		const gltfLoader = new GLTFLoader()
		gltfLoader.load(
			"./Model/Glass/scene.gltf",
			function (gltf) {
				let scale = 0.3
				var newMaterial = new THREE.MeshStandardMaterial({ color: 0x009321 })
				const glassMesh = gltf.scene
				glassMesh.children[0].children[0].children[0].children[1].material = newMaterial
				glassMesh.children[0].children[0].children[0].children[1].material.side = THREE.DoubleSide
				glassMesh.scale.set(glassMesh.scale.x * scale, glassMesh.scale.y * scale, glassMesh.scale.z * scale)
				glassMesh.castShadow = true
				glassMesh.receiveShadow = true
				// shadows(glassMesh)
				changeMaterial(glassMesh)
				resolve(glassMesh)
			},
			function (xhr) {
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
			},
			function (error) {
				console.log("An error happened")
				reject(error)
			}
		)
	})
	return myPromise
}

export function getStopWatch() {
	const myPromise = new Promise((resolve, reject) => {
		const gltfLoader = new GLTFLoader()
		gltfLoader.load(
			"./Model/StepWatch/scene.gltf",
			function (gltf) {
				let scale = 12
				const StopWatchMesh = gltf.scene
				StopWatchMesh.scale.set(StopWatchMesh.scale.x * scale, StopWatchMesh.scale.y * scale, StopWatchMesh.scale.z * scale)
				StopWatchMesh.castShadow = true
				StopWatchMesh.receiveShadow = true
				// shadows(StopWatchMesh)
				changeMaterial(StopWatchMesh)
				resolve(StopWatchMesh)
			},
			function (xhr) {
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
			},
			function (error) {
				console.log("An error happened")
				reject(error)
			}
		)
	})
	return myPromise
}

function changeMaterial(model) {
	model.traverse((child) => {
		if (!child.isMesh) return

		var prevMaterial = child.material

		child.material = new THREE.MeshLambertMaterial()

		THREE.MeshBasicMaterial.prototype.copy.call(child.material, prevMaterial)
	})
}

function shadows(mesh) {
	mesh.castShadow = true
	mesh.receiveShadow = true
	if (mesh.children.length >= 0) {
		mesh.children.forEach((e) => {
			shadows(e)
		})
	}
}
