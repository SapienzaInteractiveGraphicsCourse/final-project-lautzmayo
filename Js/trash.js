import * as THREE from "https://threejs.org/build/three.module.js"
var pos = []

export function locatePaper(nObject, objectMesh, scene) {
	var trashArray = []
	for (var i = 0; i < nObject; i++) {
		//trashArray is a local copy of the array of objects
		trashArray.push(objectMesh.clone())
	}
	//for every object it's calculated an (x,z) position that is inside the road, if not it's rejected
	for (var i = 0; i < nObject; i++) {
		var maxx = 900
		var minx = -900
		var maxz = 900
		var minz = -900
		//take a random number in the range min - max
		var x = Math.random() * (maxx - minx) + minx
		var z = Math.random() * (maxz - minz) + minz
		while (
			pos.includes([x, z]) ||
			(x < -180 && z < -180) ||
			(x < -180 && z > 180) ||
			(x > 180 && z < -180) ||
			(x > 180 && z > 180)
		) {
			var x = Math.random() * (maxx - minx) + minx
			var z = Math.random() * (maxz - minz) + minz
		}
		//once it's ok the position is added to another vector that contains all the previous position
		pos.push([x, z])
		trashArray[i].position.set(x, 3, z)
	}
	//changeMaterial is a function in order to avoid the material problem
	//scene.add add the object in the scene
	//return the array to main.js for other actions
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
		var maxx = 900
		var minx = -900
		var maxz = 900
		var minz = -900
		var x = Math.random() * (maxx - minx) + minx
		var z = Math.random() * (maxz - minz) + minz
		while (
			pos.includes([x, z]) ||
			(x < -180 && z < -180) ||
			(x < -180 && z > 180) ||
			(x > 180 && z < -180) ||
			(x > 180 && z > 180)
		) {
			var x = Math.random() * (maxx - minx) + minx
			var z = Math.random() * (maxz - minz) + minz
		}
		pos.push([x, z])
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
		var maxx = 900
		var minx = -900
		var maxz = 900
		var minz = -900
		var x = Math.random() * (maxx - minx) + minx
		var z = Math.random() * (maxz - minz) + minz
		while (
			pos.includes([x, z]) ||
			(x < -180 && z < -180) ||
			(x < -180 && z > 180) ||
			(x > 180 && z < -180) ||
			(x > 180 && z > 180)
		) {
			var x = Math.random() * (maxx - minx) + minx
			var z = Math.random() * (maxz - minz) + minz
		}
		pos.push([x, z])
		trashArray[i].position.set(x, 6.5, z)
	}
	for (var i = 0; i < nObject; i++) {
		changeMaterial(trashArray[i])
		scene.add(trashArray[i])
	}

	return [trashArray]
}

var trashcanpos = [new THREE.Vector3(190, 25, -350), new THREE.Vector3(-190, 25, 350), new THREE.Vector3(-190, 25, -350)]
var trashmaterial = [
	new THREE.MeshStandardMaterial({ color: 0xffe600 }),
	new THREE.MeshStandardMaterial({ color: 0x002193 }),
	new THREE.MeshStandardMaterial({ color: 0x009321 })
]

export function locateTrashCollector(nObject, objectMesh, scene) {
	var trashArray = []
	for (var i = 0; i < nObject; i++) {
		trashArray.push(objectMesh.clone())
	}

	for (var i = 0; i < nObject; i++) {
		trashArray[i].position.set(trashcanpos[i].x, trashcanpos[i].y, trashcanpos[i].z)
		//change rotation of last 2 so that they face the street
		if (i > 0) {
			trashArray[i].rotation.set(0, 3.14, 0)
		}
		//set the color material of the object to green,yellow,blue
		trashArray[i].children[0].children[0].children[0].children[0].material = trashmaterial[i]
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
