import * as THREE from "../build/three.module.js"
var camera
export function init(map, man) {
	var scene, camera
	scene = new THREE.Scene()
	scene.background = new THREE.Color(0x00ccff)

	// add hemi lights

	var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.05 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 500, 0 );
    scene.add( hemiLight );

    // this is the Sun
    var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -1, 0.75, 1 );
    dirLight.position.multiplyScalar( 50 );
    scene.add( dirLight );

    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = dirLight.shadow.mapSize.height = 1024*2;

    var d = 30;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.000001;
    scene.add( dirLight );

	//street lamps
	var lights = []
	lights[0] = new THREE.PointLight(0xffffbf,0.4)
	lights[1] = new THREE.PointLight(0xffffbf,0.4)
	lights[2] = new THREE.PointLight(0xffffbf,0.4)
    lights[3] = new THREE.PointLight(0xffffbf,0.4)

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

	var geo = new THREE.PlaneGeometry(10000, 10000)
	var mat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505 } );
    mat.color.setHSL( 0.095, 1, 0.75 );
	var box = new THREE.Mesh(geo, mat)
	box.rotation.set(-1.57, 0, 0)
	box.position.set(0, -2, 0)
	scene.add(box)
	box.receiveShadow = true;

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

	return [scene, camera, map, man, helper, dirLight, hemiLight, lights]
}

function changeMaterial(model) {
	model.traverse((child) => {
		if (!child.isMesh) return

		var prevMaterial = child.material

		child.material = new THREE.MeshPhongMaterial()

		THREE.MeshBasicMaterial.prototype.copy.call(child.material, prevMaterial)
	})
}
