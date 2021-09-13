import * as THREE from "./build/three.module.js"
import * as GAME from "./Js/game.js"
import * as MODEL from "./Js/models.js"
import * as CONTROL from "./Js/keyboard.js"
import * as PLAYER from "./Js/player.js"
import * as TRASH from "./Js/trash.js"
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js"
import { userInterface } from "./Js/userInterface.js"
import { animationTool } from "./Js/animationTool.js"
import { animationExec } from "./Js/animationExec.js"
import { countDown } from "./Js/countDown.js"
import { pauseUI } from "./Js/pauseUI.js"
import { difficultyManager } from "./Js/difficultyManager.js"
import { PlayableSounds, soundManager } from "./Js/soundManager.js"
export const isLocal = true
export let isGameRunning = false

export const trashTypes = { none: null, plastic: "plastic", paper: "paper", glass: "glass" }
export let currentTrash = trashTypes.none

//ANCHOR: animatin clips struct
export const animationClips = { none: null, walk: "walk", idle: "idle", collect: "collect", dispose: "dispose" }
let currentAnimationClip = animationClips.none

let aniExec

export function getCurrentAnimationClip() {
	return currentAnimationClip
}
export function changeAnimation(clip) {
	return (currentAnimationClip = clip)
}

//ANCHOR: ui
let ui = new userInterface()
let pauseVisual = null

let animTool = new animationTool()

let diffMan = new difficultyManager()

let soundMan = null

var times = 0
var game

let timer

//MESH
export var man
var map, trashcan

//borders se vogliamo usare librerie per la fisica in modo tale da associare un body per ogni bordo (da controllare, dipende dalla libreria)
var borders
var bordersbody = ["", "", "", ""]

//array and vars models
// arrays for collectables
var paper = []
var plastic = []
var glass = []
let stopwatch = []

// array for trash collectors
var trashcollector = []

var nPaper, nPlastic, nGlass, nStopwatch, nTrashcollector
var manModel, mapModel, trashcanModel, paperModel, plasticModel, glassModel, stopwatchModel

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
export var helper

//for animation
var mixer, animaction, clock
var clip
var dir

// for raycaster (to be finished)  N.B.:SE VOGLIAMO UTILIZZARLO, altrimenti DELETE
var pointer = new THREE.Vector2()
var raycaster
var intersectable = []
let trashbinIntersectable = []
var toCollect = false
var arrow = new THREE.Vector3()

// Element and Callback function for initialization of game
var btn = document.getElementById("START")
let animToolBtn = document.getElementById("animToolBtn")

btn.addEventListener("click", () => begin())

//after loading models, init game
function begin() {
	if (times == 0) {
		ui.setMainPageVisibility(false)
		loadModelsAndInit()
		btn.style.display = "none"
		animToolBtn.style.display = "none"
		times++
		// document.getElementById("buttons").style.display = "none"
	}
}

//ANCHOR: ANIMATION TOOL BUTTON CALLBACK
animToolBtn.addEventListener("click", () => activateAnimTool())

function activateAnimTool() {
	if (confirm("you're going to activate a dev tool")) {
		console.log("Opening animation tool")
		animTool.toggleAnimationTool(true)
		begin()
	} else {
		console.log("Click Start to play")
	}
}

// called by start button
// import gltf models and calls init function
function loadModelsAndInit() {
	//ANCHOR SET DIFFICULTY
	const numItems =
		diffMan.itemCount[document.getElementById("difficultyLevel").options[document.getElementById("difficultyLevel").selectedIndex].value]
	nGlass = numItems
	nPaper = numItems
	nPlastic = numItems
	nStopwatch = Math.floor(numItems / 2)

	//models are loaded
	var manLoad = MODEL.getCharacter()
	var mapLoad = MODEL.getMap()
	var trashcanLoad = MODEL.getTrashCan()
	var paperLoad = MODEL.getPaper()
	var plasticLoad = MODEL.getPlastic()
	var glassLoad = MODEL.getGlass()
	let stopwatch = MODEL.getStopWatch()
	//models are saved
	Promise.all([manLoad, mapLoad, trashcanLoad, paperLoad, plasticLoad, glassLoad, stopwatch]).then(
		(data) => {
			manModel = data[0]
			mapModel = data[1]
			trashcanModel = data[2]
			paperModel = data[3]
			plasticModel = data[4]
			glassModel = data[5]
			stopwatchModel = data[6]

			init()
			// periodicLogger()
		},
		(error) => {
			console.log("An error happened:", error)
		}
	)
}

function init() {
	// ANCHOR: what is enabled?
	enabled = CONTROL.init()

	// ANCHOR: what do this stuff does?
	renderer = new THREE.WebGLRenderer({ antialias: true })
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(window.innerWidth, window.innerHeight)
	game = renderer.domElement
	document.body.appendChild(renderer.domElement)
	renderer.shadowMap.enabled = true
	//renderer.shadowMap.type = THREE.PCFSoftShadowMap
	renderer.shadowSide = THREE.CullFaceBack
	renderer.domElement.id = "game"

	// requested and updated data option of
	// scene, camera, map(with borders), man and lights
	var gameInitAssets = GAME.init(mapModel, manModel, animTool)
	scene = gameInitAssets[0]
	camera = gameInitAssets[1]
	map = gameInitAssets[2]
	borders = gameInitAssets[3]
	man = gameInitAssets[4]
	helper = gameInitAssets[5]
	dirLight = gameInitAssets[6]
	//hemiLight = gameInitAssets[7]
	lights = gameInitAssets[7]

	//ANCHOR audio
	if (!animTool.isAnimToolActive) {
		soundMan = new soundManager()
	}

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
	//uniforms.topColor.value.copy(hemiLight.color)
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
	if (!animTool.isAnimToolActive) {
		aniExec = new animationExec()
		gameInitAssets = aniExec.prepareEnvironment(man, helper) //ANIMATION.getAnimation(man, helper)
		mixer = gameInitAssets[0]
		animaction = gameInitAssets[1]
		clock = gameInitAssets[2]
	}

	let orbitController
	//ANCHOR:  ANIM TOOL
	if (animTool.isAnimToolActive) {
		orbitController = new OrbitControls(camera, renderer.domElement)
		orbitController.minDistance = 50
		orbitController.maxDistance = 500
		orbitController.enablePan = true
		orbitController.mouseButtons = {
			LEFT: THREE.MOUSE.ROTATE,
			MIDDLE: THREE.MOUSE.DOLLY,
			RIGHT: THREE.MOUSE.PAN
		}
	}

	//locate trash and trash collector
	//intersectable è un array contenente gli oggetti che possono essere castati dal ray,
	// se non vogliamo utilizzarlo ->Delete
	//ANCHOR: ANIM TOOL TRIGGER
	if (!animTool.isAnimToolActive) {
		paper = TRASH.locatePaper(nPaper, paperModel, scene, intersectable)
		plastic = TRASH.locatePlastic(nPlastic, plasticModel, scene, intersectable)
		glass = TRASH.locateGlass(nGlass, glassModel, scene, intersectable)

		const diffLvl = document.getElementById("difficultyLevel").options[document.getElementById("difficultyLevel").selectedIndex].value
		const t = diffMan.time[diffLvl]
		const xtra = diffMan.bonusTime[diffLvl]
		if (nStopwatch == 0) {
			nStopwatch = 1
		}
		timer = new countDown(nStopwatch, stopwatchModel, scene, intersectable, t, xtra)

		nTrashcollector = 3
		trashcollector = TRASH.locateTrashCollector(nTrashcollector, trashcanModel, scene, trashbinIntersectable)
	} else {
		timer = { isPlaying: true }
	}

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

	window.addEventListener("resize", () => onWindowResize(), false)

	//listeners for keyboard event
	window.addEventListener(
		"keydown",
		(event) => {
			gameInitAssets = CONTROL.keypressedAgent(event, enabled, game)
			enabled = gameInitAssets[0]
		},
		false
	)
	window.addEventListener(
		"keyup",
		(event) => {
			enabled = CONTROL.keyreleasedAgent(event, enabled)
		},
		false
	)
	renderer.domElement.addEventListener("pointerdown", (event) => {
		// find intersections
		raycastToTrashCollectables(event)
		camera.updateMatrixWorld()
	})

	//ANCHOR: ANIM TOOL TRIGGER
	if (!animTool.isAnimToolActive) {
		ui.toggleCounter("total", true)
	} else {
		//ANCHOR: wrong placement but native javascript is inefficent
		// set default for bone rotation
		animTool.changeBone()
	}
	isGameRunning = true
	// setStartingTime()

	if (soundMan != null) {
		//ANCHOR BGM
		soundMan.toggleSound(PlayableSounds.bgm, true)
	}

	window.requestAnimationFrame(animate)
}

function animate() {
	setTimeout(function () {
		requestAnimationFrame(animate)

		if (isGameRunning) {
			if (timer.isPlaying || animTool.isAnimToolActive) {
				update()
				render()
			}
		}
	}, 1000 / 60)
}

function render() {
	renderer.render(scene, camera)

	//ANIM :
	if (!animTool.isAnimToolActive) {
		mixer.update(clock.getDelta())

		dayNightCycle(0.01)
	}
}

function update() {
	//update man and camera position
	//ORBIT :
	//commenta

	PLAYER.movePlayer(man, camera, enabled, goal, follow, animTool.isAnimToolActive)

	//ANIM :
	// if (currentAnimationClip == animationClips.idle) {
	// 	animaction.stop()
	// } else if (currentAnimationClip == animationClips.walk) {
	// 	animaction.play()
	// }
	if (!animTool.isAnimToolActive) {
		if (animaction.currentClip != currentAnimationClip) {
			animaction.stop()
			animaction = aniExec.getAnimation(helper, currentAnimationClip, mixer)
		}
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
	let trashbinIntersects = raycaster.intersectObjects(trashbinIntersectable, true)
	//if there is intersection
	if (trashbinIntersects.length > 0) {
		// console.log(trashbinIntersects[0].object)
		trashbinInteraction(trashbinIntersects[0].object, trashbinIntersects[0].point)
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
		if (selectedObject.trashType == "stopwatch") {
			timer.stopwatchInteraction(selectedObject)
			//ANCHOR STOPWATCH
			soundMan.toggleSound(PlayableSounds.stopwatch, true)
			return
		}
		if (isTrashCollectable(selectedObject.trashType)) {
			man.lookAt(new THREE.Vector3(trashPos.x, man.position.y, trashPos.y))

			// TODO: many calculations have to be done, but this is not the time
			// let worldDirection = new THREE.Vector3()
			// man.getWorldDirection(worldDirection)
			// let target = new THREE.Vector3().copy(man.position).add(worldDirection.multiplyScalar(manPos.distanceTo(trashPos)))

			trashDisposal(selectedObject)
		}
	}
}

// called when interacting with a trashbin
function trashbinInteraction(obj, pos) {
	while (obj.parent.name != "OSG_Scene") {
		obj = obj.parent
	}

	let selectedObject = obj.parent

	let manPos = new THREE.Vector2(man.position.x, man.position.z)
	let trashPos = new THREE.Vector2(pos.x, pos.z)

	if (manPos.distanceTo(trashPos) <= maxDistanceToInteract) {
		man.lookAt(new THREE.Vector3(trashPos.x, man.position.y, trashPos.y))
		disposeCollectedTrash(selectedObject.trashType)
	}
}

//ANCHOR: animation callback
//mixer.addEventListener( 'finished', function( e ) { …} ); // properties of e: type, action and direction
function trashDisposal(obj) {
	//ANCHOR pickup
	soundMan.toggleSound(PlayableSounds.pickup, true)
	ui.incrementCounter(obj.trashType)
	spawnRandomTrash()
	scene.remove(obj)
}

function spawnRandomTrash() {
	let types = [trashTypes.paper, trashTypes.plastic, trashTypes.glass]
	let whatToSpawn = types[Math.floor(Math.random() * types.length)]
	eval(`TRASH.locate${whatToSpawn[0].toUpperCase() + whatToSpawn.substring(1)}(1, ${whatToSpawn}Model, scene, intersectable)`)
}

function isTrashCollectable(type) {
	if (ui.getActiveCounter() == type) {
		if (ui.getIntCounter(ui.getActiveCounter()) >= ui.getMaxItemPerDelivery()) {
			alert("You are carrying too much items, dispose of them before collecting more")
			return false
		}
		return true
	} else if (ui.getActiveCounter() == trashTypes.none) {
		ui.toggleCounter(type, true)
		return true
	} else {
		alert(`You are collecting ${ui.getActiveCounter()}, so you can't take any ${type}`)
		return false
	}
}

// called when interacting with a trashbin close enough
function disposeCollectedTrash(type) {
	let increment = ui.getIntCounter(ui.getActiveCounter())
	if (increment > 0) {
		if (type == ui.getActiveCounter()) {
			increment *= 2
			//ANCHOR TRASHDUMP
			soundMan.toggleSound(PlayableSounds.trashDump, true)
			alert("Trash disposed in the correct trashbin. DOUBLE POINTS!")
		} else {
			//ANCHOR TRASHDUMP
			soundMan.toggleSound(PlayableSounds.trashDump, true)
			alert("Wrong trashbin. Green is for glass, White for paper and Yellow for plastic. Preserve your environment")
		}
		ui.incrementCounter("total", increment)
		ui.toggleCounter(trashTypes.none)
		ui.resetCounters(false)
	} else {
		alert("You must first collect some trash, then come back to dispose of it")
	}
}

//day 0.12 | night 4.1
var time = 4.1
function dayNightCycle(dt) {
	time += dt / 15
	// console.log(time)
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
			lights[i].intensity = 0.0
		}
	} else if (nSin < 0.2 && nSin > 0.0) {
		var f = nSin / 0.2
		dirLight.intensity = f
		for (var i = 0; i < lights.length; i++) {
			lights[i].intensity = 0.4
		}
		sky.material.uniforms.topColor.value.setRGB(0.25 * f, 0.55 * f, 1 * f)
		sky.material.uniforms.bottomColor.value.setRGB(1 * f, 1 * f, 1 * f)
	} else {
		//night
		var f = 0.2
		dirLight.intensity = f
		for (var i = 0; i < lights.length; i++) {
			lights[i].intensity = 0.8
		}
		sky.material.uniforms.topColor.value.setRGB(0, 0, 0)
		sky.material.uniforms.bottomColor.value.setRGB(0, 0, 0)
	}
}

export function pauseGame() {
	if (!animTool.isAnimToolActive) {
		if (pauseVisual == null) {
			pauseVisual = new pauseUI()
		}
		//TODO disable input
		isGameRunning = !isGameRunning
		// ui.setMainPageVisibility(isPaused)
		pauseVisual.toggleVisibility(!isGameRunning)
		//ANCHOR PAUSE
		soundMan.toggleSound(PlayableSounds.bgm, isGameRunning)
	}
}

export function gameOver() {
	if (!animTool.isAnimToolActive) {
		isGameRunning = false
		soundMan.toggleSound(PlayableSounds.bgm, null)
		soundMan.toggleSound(PlayableSounds.gameOver, true)
	}
}

export function addListener(lis) {
	camera.add(lis)
}
