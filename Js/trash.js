import * as THREE from "https://threejs.org/build/three.module.js"

export function locatePaper(nObject, objectMesh, scene) {
	var trashArray = []
	for (var i = 0; i < nObject; i++) {
		trashArray.push(objectMesh.clone())
	}

	for (var i = 0; i < nObject; i++) {
		var maxx = 180
		var minx = -180
		var maxz = 700
		var minz = -900
		var x = Math.random() * (maxx - minx) + minx
		var z = Math.random() * (maxz - minz) + minz

		trashArray[i].position.set(x, 3, z)
	}
	for (var i = 0; i < nObject; i++) {
		changeMaterial(trashArray[i])
		scene.add(trashArray[i])
	}

	return [trashArray]
}

export function locatePlastic(nObject, objectMesh, scene) {
	var trashArray = []
	for (var i = 0; i < nObject; i++) {
		trashArray.push(objectMesh.clone())
	}

	for (var i = 0; i < nObject; i++) {
		var maxx = 180
		var minx = -180
		var maxz = 700
		var minz = -900
		var x = Math.random() * (maxx - minx) + minx
		var z = Math.random() * (maxz - minz) + minz

		trashArray[i].position.set(x, -32, z)
	}
	for (var i = 0; i < nObject; i++) {
		changeMaterial(trashArray[i])
		scene.add(trashArray[i])
	}

	return [trashArray]
}

export function locateGlass(nObject, objectMesh, scene) {
	var trashArray = []
	for (var i = 0; i < nObject; i++) {
		trashArray.push(objectMesh.clone())
	}

	for (var i = 0; i < nObject; i++) {
		var maxx = 180
		var minx = -180
		var maxz = 700
		var minz = -900
		var x = Math.random() * (maxx - minx) + minx
		var z = Math.random() * (maxz - minz) + minz

		trashArray[i].position.set(x, 6.5, z)
	}
	for (var i = 0; i < nObject; i++) {
		changeMaterial(trashArray[i])
		scene.add(trashArray[i])
	}

	return [trashArray]
}

function changeMaterial(model) {
	model.traverse((child) => {
		if (!child.isMesh) return

		var prevMaterial = child.material

		child.material = new THREE.MeshPhongMaterial()

		THREE.MeshBasicMaterial.prototype.copy.call(child.material, prevMaterial)
	})
}