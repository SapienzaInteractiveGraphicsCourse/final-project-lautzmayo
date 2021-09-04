import * as THREE from "./build/three.module.js"
import * as GAME from "./Js/game.js"
import * as MODEL from "./Js/models.js"
import * as CONTROL from "./Js/keyboard.js"
import * as PLAYER from "./Js/player.js"
import * as ANIMATION from "./Js/animation.js"
import * as TRASH from "./Js/trash.js"
import { OrbitControls } from "./jsm/controls/OrbitControls.js"
import { userInterface } from "./Js/userInterface.js"

export const trashTypes = { none: null, plastic: "plastic", paper: "paper", glass: "glass" }

//ANCHOR: animatin clips struct
export const animationClips = { none: null, walk: "walk", idle: "idle", collect: "collect", dispose: "dispose" }

let currentAnimationClip = animationClips.none
export function getCurrentAnimationClip() {
	return currentAnimationClip
}
export function changeAnimation(clip) {
	return (currentAnimationClip = clip)
}

//ANCHOR: ui
let ui = new userInterface()

var times = 0
var game

//MESH
var man, map, trashcan

//borders se vogliamo usare librerie per la fisica in modo tale da associare un body per ogni bordo (da controllare, dipende dalla libreria)
var borders
var bordersbody = ["", "", "", ""]

//array and vars models
// arrays for collectables
var paper = []
var plastic = []
var glass = []

// array for trash collectors
var trashcollector = []

var nPaper, nPlastic, nGlass, nTrashcollector
var manModel, mapModel, trashcanModel, paperModel, plasticModel, glassModel

//for camera
var goal, follow
var distance = 200
var camera, scene, renderer

//for light
var dirLight
var hemiLight
var lights
var sky

//for keyboard
var enabled

//skeleton of player
var helper

//for animation
var mixer, animaction, clock
var clip
var dir

// for raycaster (to be finished)  N.B.:SE VOGLIAMO UTILIZZARLO, altrimenti DELETE
var pointer = new THREE.Vector2()
var raycaster
var intersectable = []
var toCollect = false
var arrow = new THREE.Vector3()

// Element and Callback function for initialization of game
var btn = document.getElementById("START")

btn.addEventListener("click", begin)

//after loading models, init game
function begin() {
	if (times == 0) {
		loadModelsAndInit()
		btn.style.display = "none"
		times++
		document.getElementById("Buttons").style.display = "none"
	}
}

// called by start button
// import gltf models and calls init function
function loadModelsAndInit() {
	//models are loaded
	var manLoad = MODEL.getCharacter()
	var mapLoad = MODEL.getMap()
	var trashcanLoad = MODEL.getTrashCan()
	var paperLoad = MODEL.getPaper()
	var plasticLoad = MODEL.getPlastic()
	var glassLoad = MODEL.getGlass()
	//models are saved
	Promise.all([manLoad, mapLoad, trashcanLoad, paperLoad, plasticLoad, glassLoad]).then(
		(data) => {
			manModel = data[0]
			mapModel = data[1]
			trashcanModel = data[2]
			paperModel = data[3]
			plasticModel = data[4]
			glassModel = data[5]

			init()
			// periodicLogger()
		},
		(error) => {
			console.log("An error happened:", error)
		}
	)
}

function init() {
	// TODO:
	ui.makeCounter(trashTypes.paper)

	// ANCHOR: what is enabled?
	enabled = CONTROL.init()

	// ANCHOR: what do this stuff does?
	renderer = new THREE.WebGLRenderer({ antialias: true })
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(window.innerWidth, window.innerHeight)
	game = renderer.domElement
	document.body.appendChild(renderer.domElement)
	renderer.shadowMap.enabled = true
	renderer.shadowSide = THREE.CullFaceBack

	// requested and updated data option of
	// scene, camera, map(with borders), man and lights
	var gameInitAssets = GAME.init(mapModel, manModel)
	scene = gameInitAssets[0]
	camera = gameInitAssets[1]
	map = gameInitAssets[2]
	borders = gameInitAssets[3]
	man = gameInitAssets[4]
	helper = gameInitAssets[5]
	dirLight = gameInitAssets[6]
	hemiLight = gameInitAssets[7]
	lights = gameInitAssets[8]

	//add fog to the scene
	scene.fog = new THREE.Fog(0x222233, 0, 20000)
	renderer.setClearColor(scene.fog.color, 1)

	//for sky rendering
	var vertexShader = document.getElementById("vertexShader").textContent
	var fragmentShader = document.getElementById("fragmentShader").textContent
	var uniforms = {
		topColor: { type: "c", value: new THREE.Color(0x0077ff) },
		bottomColor: { type: "c", value: new THREE.Color(0xffffff) },
		offset: { type: "f", value: 33 },
		exponent: { type: "f", value: 0.6 }
	}
	uniforms.topColor.value.copy(hemiLight.color)
	scene.fog.color.copy(uniforms.bottomColor.value)

	var skyGeo = new THREE.SphereGeometry(4000, 32, 15)
	var skyMat = new THREE.ShaderMaterial({
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		uniforms: uniforms,
		side: THREE.BackSide
	})
	sky = new THREE.Mesh(skyGeo, skyMat)
	scene.add(sky)

	//setup camera orientation (a questo punto la orbit non serve più in realtà, aggiungerla solo per animazioni e commentare qui)
	//ORBIT :
	goal = new THREE.Object3D()
	follow = new THREE.Object3D()
	follow.position.z = -distance
	man.add(follow)
	goal.add(camera)

	//added animation
	//ANIM :
	gameInitAssets = ANIMATION.getAnimation(man, helper)
	mixer = gameInitAssets[0]
	animaction = gameInitAssets[1]
	clock = gameInitAssets[2]

	//locate trash and trash collector
	//intersectable è un array contenente gli oggetti che possono essere castati dal ray,
	// se non vogliamo utilizzarlo ->Delete
	nPaper = 3
	paper = TRASH.locatePaper(nPaper, paperModel, scene, intersectable)
	nPlastic = 3
	plastic = TRASH.locatePlastic(nPlastic, plasticModel, scene, intersectable)
	nGlass = 3
	glass = TRASH.locateGlass(nGlass, glassModel, scene, intersectable)

	nTrashcollector = 3
	trashcollector = TRASH.locateTrashCollector(nTrashcollector, trashcanModel, scene)

	//AGGIUNGERE TRACCIA AUDIO, in teoria basta togliere il commento
	/* 
    // instantiate a listener
    const audioListener = new THREE.AudioListener();

    AmbientSound = new THREE.Audio( audioListener );

    camera.add( audioListener );
    scene.add( AmbientSound );

    AmbientSound.setBuffer( HeartBeat );
    AmbientSound.setLoop(true);
	*/

	//Attivarli solo per creare l'animazione( anche da html), altrimenti si può cancellare
	/*
	var slider1 = document.getElementById("slider1")
	slider1.addEventListener("input", rotatebone)
	var slider2 = document.getElementById("slider2")
	slider2.addEventListener("input", rotatebone)
	var slider3 = document.getElementById("slider3")
	slider3.addEventListener("input", rotatebone)
*/

	//creazione raycaster
	raycaster = new THREE.Raycaster()

	window.addEventListener("resize", onWindowResize, false)

	//listeners for keyboard event
	window.addEventListener(
		"keydown",
		function (event) {
			gameInitAssets = CONTROL.keypressedAgent(event, enabled, game)
			enabled = gameInitAssets[0]
		},
		false
	)
	window.addEventListener(
		"keyup",
		function (event) {
			enabled = CONTROL.keyreleasedAgent(event, enabled)
		},
		false
	)
	renderer.domElement.addEventListener("pointerdown", function (event) {
		// find intersections
		raycastToTrashCollectables(event)
		camera.updateMatrixWorld()
	})

	window.requestAnimationFrame(animate)
}

function animate() {
	setTimeout(function () {
		requestAnimationFrame(animate)

		update()
		render()
	}, 1000 / 60)
}

function render() {
	renderer.render(scene, camera)

	//ANIM :
	mixer.update(clock.getDelta())

	daynightcycle()
}

function update() {
	//update man and camera position
	//ORBIT :
	//commenta

	dir = PLAYER.getPlayerDirection(man, camera, enabled, goal, follow)

	//ANIM :
	if (currentAnimationClip == animationClips.idle) {
		animaction.stop()
	} else if (currentAnimationClip == animationClips.walk) {
		animaction.play()
	}
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

	renderer.setSize(window.innerWidth, window.innerHeight)
	window.requestAnimationFrame(animate)
}

// periodically log
function periodicLogger() {
	//console.log(helper.bones[76].quaternion)
	setTimeout(periodicLogger, 3000)
}

function rotatebone() {
	var target1 = document.getElementById("slider1")
	var target2 = document.getElementById("slider2")
	var target3 = document.getElementById("slider3")
	// helper.bones[76].quaternion.setFromEuler(new THREE.Euler(target1.value, target2.value, target3.value, "XYZ"))
}

function raycastToTrashCollectables(event) {
	//set x and y value from the screen
	pointer.x = (event.clientX / window.innerWidth) * 2 - 1
	pointer.y = -(event.clientY / window.innerHeight) * 2 + 1

	//ray from camera to the point clicked
	raycaster.setFromCamera(pointer, camera)

	var intersects = raycaster.intersectObjects(intersectable, true)
	//if there is intersection enable collect
	if (intersects.length > 0) {
		// console.log(intersects[0].object)
		trashInteraction(intersects[0].object, intersects[0].point)
	}
}

// ANCHOR: trash disposal
let maxDistanceToInteract = 50

function trashInteraction(obj, pos) {
	while (obj.parent.name != "OSG_Scene") {
		obj = obj.parent
	}

	let selectedObject = obj.parent

	let manPos = new THREE.Vector2(man.position.x, man.position.z)
	let trashPos = new THREE.Vector2(pos.x, pos.z)

	if (manPos.distanceTo(trashPos) <= maxDistanceToInteract) {
		man.lookAt(new THREE.Vector3(trashPos.x, man.position.y, trashPos.y))

		// TODO: many calculations have to be done, but this is not the time
		// let worldDirection = new THREE.Vector3()
		// man.getWorldDirection(worldDirection)
		// let target = new THREE.Vector3().copy(man.position).add(worldDirection.multiplyScalar(manPos.distanceTo(trashPos)))

		trashDisposal(selectedObject)
	}
}

//ANCHOR: animation callback
//mixer.addEventListener( 'finished', function( e ) { …} ); // properties of e: type, action and direction
function trashDisposal(obj) {
	ui.incrementCounter(obj.trashType)

	scene.remove(obj)
}

function daynightcycle() {
	var time = new Date().getTime() * 0.00002
	// var time = 2.1;

	var nSin = Math.sin(time)
	var nCos = Math.cos(time)

	// set the sun
	dirLight.position.set(1500 * nSin, 2000 * nSin, 2000 * nCos)

	if (nSin > 0.2) {
		//day
		sky.material.uniforms.topColor.value.setRGB(0.25, 0.55, 1)
		sky.material.uniforms.bottomColor.value.setRGB(1, 1, 1)
		var f = 1
		dirLight.intensity = f
		for (var i = 0; i < lights.length; i++) {
			lights[i].intensity = 0.1
		}
	} else if (nSin < 0.2 && nSin > 0.0) {
		var f = nSin / 0.2
		dirLight.intensity = f
		for (var i = 0; i < lights.length; i++) {
			lights[i].intensity = 0.2
		}
		sky.material.uniforms.topColor.value.setRGB(0.25 * f, 0.55 * f, 1 * f)
		sky.material.uniforms.bottomColor.value.setRGB(1 * f, 1 * f, 1 * f)
	} else {
		//night
		var f = 0
		dirLight.intensity = f
		for (var i = 0; i < lights.length; i++) {
			lights[i].intensity = 0.4
		}
		sky.material.uniforms.topColor.value.setRGB(0, 0, 0)
		sky.material.uniforms.bottomColor.value.setRGB(0, 0, 0)
	}
}
