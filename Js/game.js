import * as THREE from "../build/three.module.js"
var camera
export function init(map, man) {
	var scene, camera
	scene = new THREE.Scene()
	scene.background = new THREE.Color(0x00ccff)

	var lights = []
	lights[0] = new THREE.PointLight(0xffffff, 0.4, 0)
	lights[1] = new THREE.PointLight(0xffffff, 0.3, 0)
	lights[2] = new THREE.PointLight(0xffffff, 0.8, 0)

	lights[0].position.set(0, 200, 0, 100)
	lights[1].position.set(100, 200, 100)
	lights[2].position.set(-100, -200, -100, 100)

	scene.add(lights[0])
	scene.add(lights[1])
	scene.add(lights[2])
	const light = new THREE.AmbientLight(0x404040) // soft white light
	scene.add(light)
	map.position.set(0, 0, 0)
	changeMaterial(map)
	scene.add(map)

	var geo = new THREE.PlaneGeometry(10000, 10000)
	var mat = new THREE.MeshBasicMaterial({ color: 0x000000 })
	var box = new THREE.Mesh(geo, mat)
	box.rotation.set(-1.57, 0, 0)
	box.position.set(0, -2, 0)
	scene.add(box)

	man.position.set(0, 0, 0)
	man.rotation.set(3.14, 0, 3.14)
	changeMaterial(man)
	scene.add(man)
	//added skeleton helper to the character
	var helper = new THREE.SkeletonHelper(man)
	helper.material.linewidth = 5
	helper.visible = false
	scene.add(helper)
	//set arms rotation from T-position to A-position
	helper.bones[15].rotation.set(1.6290887780319951, 0.25, -1.3)
	helper.bones[47].rotation.set(1.6290887780319951, -0.25, 1.3)

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10000)
	camera.position.set(0, 75, 0)
	camera.lookAt(scene.position)

	return [scene, camera, map, man, helper]
}

function changeMaterial(model) {
	model.traverse((child) => {
		if (!child.isMesh) return

		var prevMaterial = child.material

		child.material = new THREE.MeshPhongMaterial()

		THREE.MeshBasicMaterial.prototype.copy.call(child.material, prevMaterial)
	})
}
