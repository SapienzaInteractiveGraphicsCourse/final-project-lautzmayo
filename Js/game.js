import * as THREE from "../build/three.module.js"
var camera
export function init(map, man) {
	var scene, camera

	scene = new Physijs.Scene()

	// scene.setGravity(new THREE.Vector3(0, -10, 0))
	scene.background = new THREE.Color(0x00ccff)

	// add hemi lights

	var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.05)
	hemiLight.color.setHSL(0.6, 1, 0.6)
	hemiLight.groundColor.setHSL(0.095, 1, 0.75)
	hemiLight.position.set(0, 500, 0)
	scene.add(hemiLight)

	// this is the Sun
	var dirLight = new THREE.DirectionalLight(0xffffff, 1)
	dirLight.color.setHSL(0.1, 1, 0.95)
	dirLight.position.set(-1, 0.75, 1)
	dirLight.position.multiplyScalar(50)
	scene.add(dirLight)

	dirLight.castShadow = true
	dirLight.shadow.mapSize.width = dirLight.shadow.mapSize.height = 1024 * 2

	var d = 30

	dirLight.shadow.camera.left = -d
	dirLight.shadow.camera.right = d
	dirLight.shadow.camera.top = d
	dirLight.shadow.camera.bottom = -d

	dirLight.shadow.camera.far = 3500
	dirLight.shadow.bias = -0.000001
	scene.add(dirLight)

	//street lamps
	var lights = []
	lights[0] = new THREE.PointLight(0xffffbf, 0.4)
	lights[1] = new THREE.PointLight(0xffffbf, 0.4)
	lights[2] = new THREE.PointLight(0xffffbf, 0.4)
	lights[3] = new THREE.PointLight(0xffffbf, 0.4)

	lights[0].position.set(-240, 100, -180)
	lights[1].position.set(100, 100, -290)
	lights[2].position.set(-50, 100, 250)
	lights[3].position.set(280, 100, 90)

	scene.add(lights[0])
	scene.add(lights[1])
	scene.add(lights[2])
	scene.add(lights[3])

	map.position.set(0, 0, 0)
	changeMaterial(map)
	scene.add(map)

	// insert a black plane underneath all the scene
	var underlainPlane = new THREE.PlaneGeometry(10000, 10000)

	var underlainPlaneMat = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x050505 })
	underlainPlaneMat.color.setHSL(0.095, 1, 0.75)

	var underlainPlaneBox = new Physijs.BoxMesh(underlainPlane, underlainPlaneMat)
	underlainPlaneBox.rotation.set(-1.57, 0, 0)
	underlainPlaneBox.position.set(0, -2, 0)

	underlainPlaneBox.setAngularFactor = new THREE.Vector3(0, 0, 0)
	underlainPlaneBox.setAngularVelocity = new THREE.Vector3(0, 0, 0)
	underlainPlaneBox.setLinearFactor = new THREE.Vector3(0, 0, 0)
	underlainPlaneBox.setLinearVelocity = new THREE.Vector3(0, 0, 0)

	scene.add(underlainPlaneBox)

	underlainPlaneBox.receiveShadow = true

	//borders se dobbiamo utilizzare qualche libreria per la fisica, sennò DELETE
	const g = new THREE.BoxGeometry(1600, 100, 1600)
	const m = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
	const border1 = new Physijs.BoxMesh(g, m, 0)

	border1.setAngularFactor = new THREE.Vector3(0, 0, 0)
	border1.setAngularVelocity = new THREE.Vector3(0, 0, 0)
	border1.setLinearFactor = new THREE.Vector3(0, 0, 0)
	border1.setLinearVelocity = new THREE.Vector3(0, 0, 0)

	const border2 = new Physijs.BoxMesh(g, m, 0)

	border2.setAngularFactor = new THREE.Vector3(0, 0, 0)
	border2.setAngularVelocity = new THREE.Vector3(0, 0, 0)
	border2.setLinearFactor = new THREE.Vector3(0, 0, 0)
	border2.setLinearVelocity = new THREE.Vector3(0, 0, 0)

	const border3 = new Physijs.BoxMesh(g, m, 0)

	border3.setAngularFactor = new THREE.Vector3(0, 0, 0)
	border3.setAngularVelocity = new THREE.Vector3(0, 0, 0)
	border3.setLinearFactor = new THREE.Vector3(0, 0, 0)
	border3.setLinearVelocity = new THREE.Vector3(0, 0, 0)

	const border4 = new Physijs.BoxMesh(g, m, 0)

	border4.setAngularFactor = new THREE.Vector3(0, 0, 0)
	border4.setAngularVelocity = new THREE.Vector3(0, 0, 0)
	border4.setLinearFactor = new THREE.Vector3(0, 0, 0)
	border4.setLinearVelocity = new THREE.Vector3(0, 0, 0)

	border1.position.set(980, 0, 980)
	border2.position.set(980, 0, -980)
	border3.position.set(-980, 0, 980)
	border4.position.set(-980, 0, -980)

	border1.material.transparent = true
	border2.material.transparent = true
	border3.material.transparent = true
	border4.material.transparent = true

	border1.material.opacity = 0
	border2.material.opacity = 0
	border3.material.opacity = 0
	border4.material.opacity = 0

	scene.add(border1)
	scene.add(border2)
	scene.add(border3)
	scene.add(border4)

	var borders = []
	borders.push(border1)
	borders.push(border2)
	borders.push(border3)
	borders.push(border4)

	man.position.set(0, 0, 0)
	man.rotation.set(0, 0, 0)
	changeMaterial(man)

	scene.add(man)

	let manCollisionBoxGeometry = new THREE.BoxGeometry(200, 200, 200)
	let manCollisionBoxMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 })

	let manCollisionBox = new Physijs.BoxMesh(manCollisionBoxGeometry, manCollisionBoxMaterial)

	manCollisionBox.setAngularFactor = new THREE.Vector3(0, 0, 0)
	manCollisionBox.setAngularVelocity = new THREE.Vector3(0, 0, 0)
	manCollisionBox.setLinearFactor = new THREE.Vector3(0, 0, 0)
	manCollisionBox.setLinearVelocity = new THREE.Vector3(0, 0, 0)

	manCollisionBox.mass = 0

	manCollisionBox.position.set(0, 0, 0)
	manCollisionBox.rotation.set(0, 0, 0)

	scene.add(manCollisionBox)
	console.log(manCollisionBox)

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
	//Cancellare Borders se non utilizziamo librerie per la fisica ( anche in main.js aggiornare indici di temp)

	return [scene, camera, map, borders, man, helper, dirLight, hemiLight, lights]
}

function changeMaterial(model) {
	model.traverse((child) => {
		if (!child.isMesh) return

		var prevMaterial = child.material

		child.material = new THREE.MeshLambertMaterial()

		THREE.MeshBasicMaterial.prototype.copy.call(child.material, prevMaterial)
	})
}
