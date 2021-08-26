import * as THREE from "./build/three.module.js"
import * as GAME from "./Js/game.js"
import * as MODEL from "./Js/models.js"
import * as MENU from "./Js/menu.js"
import * as CONTROL from "./Js/keyboard.js"
import * as PLAYER from "./Js/player.js"
import * as ANIMATION from "./Js/animation.js"
import * as TRASH from "./Js/trash.js"
import { OrbitControls } from "./jsm/controls/OrbitControls.js"

var man, map, trashcan
var paper = []
var plastic = []
var glass = []
var trashcollector = []
var npaper, nplastic, nglass, ntrashcollector
var manmodel, mapmodel, trashcanmodel, papermodel, plasticmodel, glassmodel
//for camera
var goal, follow
var Distance = 200
var camera, scene, renderer
//for keyboard
var enabled
//skeleton of player
var helper
//for animation
var mixer, animaction, clock
var clip
var dir

//for raycaster (to be finished)
var pointer = new THREE.Vector2();
var raycaster;
var intersectable=[]
var toCollect=false;
var arrow = new THREE.Vector3();

loadmodel()

function loadmodel() {
	//models are loaded
	var manload = MODEL.getCharacter()
	var mapload = MODEL.getMap()
	var trashcanload = MODEL.getTrashCan()
	var paperload = MODEL.getPaper()
	var plasticload = MODEL.getPlastic()
	var glassload = MODEL.getGlass()
	//models are saved
	Promise.all([manload, mapload, trashcanload, paperload, plasticload, glassload]).then(
		(data) => {
			manmodel = data[0]
			mapmodel = data[1]
			trashcanmodel = data[2]
			papermodel = data[3]
			plasticmodel = data[4]
			glassmodel = data[5]
			init()
			periodicLogger()
		},
		(error) => {
			console.log("An error happened:", error)
		}
	)
}

function init() {

	const PaperDiv = document.createElement("div1");
    PaperDiv.setAttribute("id", "paper");
    PaperDiv.innerText = "PAPER:0";
    document.body.appendChild(PaperDiv);

    const PlasticDiv = document.createElement("div2");
    PlasticDiv.setAttribute("id", "plastic");
    PlasticDiv.innerText = "PLASTIC:0";
    document.body.appendChild(PlasticDiv);

    const GlassDiv = document.createElement("div3");
    GlassDiv.setAttribute("id", "glass");
    GlassDiv.innerText = "GLASS:0";
    document.body.appendChild(GlassDiv);

	enabled = CONTROL.init()

	renderer = new THREE.WebGLRenderer({ antialias: true })
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)
	var temp = GAME.init(mapmodel, manmodel)
	//updated data option of scene,camera,map and man
	scene = temp[0]
	camera = temp[1]
	map = temp[2]
	man = temp[3]
	helper = temp[4]

	//setup camera orientation
	//ORBIT :
	goal = new THREE.Object3D()
	follow = new THREE.Object3D()
	follow.position.z = -Distance
	man.add(follow)
	goal.add(camera)

	//added animation (not working yet)
	//ANIM :
	temp = ANIMATION.getAnimation(man, helper)
	mixer = temp[0]
	animaction = temp[1]
	clock = temp[2]

	//locate trash and trash collector
	npaper = 3;
    paper = TRASH.locatePaper(npaper,papermodel,scene,intersectable);
    nplastic = 3;
    plastic = TRASH.locatePlastic(nplastic,plasticmodel,scene,intersectable);
    nglass = 3;
    glass = TRASH.locateGlass(nglass,glassmodel,scene,intersectable); 

	ntrashcollector = 3
	trashcollector = TRASH.locateTrashCollector(ntrashcollector, trashcanmodel, scene)

	/* 
  // instantiate a listener
  const audioListener = new THREE.AudioListener();

  AmbientSound = new THREE.Audio( audioListener );

  camera.add( audioListener );
  scene.add( AmbientSound );

  AmbientSound.setBuffer( HeartBeat );
  AmbientSound.setLoop(true);
 */
 /*
	var slider1 = document.getElementById("slider1")
	slider1.addEventListener("input", rotatebone)
	var slider2 = document.getElementById("slider2")
	slider2.addEventListener("input", rotatebone)
	var slider3 = document.getElementById("slider3")
	slider3.addEventListener("input", rotatebone)
*/
	window.addEventListener("resize", onWindowResize, false)

	//listeners for keyboard event
	window.addEventListener(
		"keydown",
		function (event) {
			temp = CONTROL.keypressedAgent(event, enabled)
			enabled = temp[0]
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
	renderer.domElement.addEventListener(
		"pointerdown",
		 function(event) {
        // find intersections
      		clicked(event);
      		camera.updateMatrixWorld();
    	}
	)

  window.requestAnimationFrame(animate);
}

function animate() {
	setTimeout(function () {
		requestAnimationFrame(animate)
		//COMMENTO BRUTALE
		update()
		render()
	}, 1000 / 60)
}

function render() {
	renderer.render(scene, camera)
	//ANIM :
	mixer.update(clock.getDelta())
}

function update() {
	//update man and camera position
	//ORBIT :
	//commenta
	dir = PLAYER.getPlayerDirection(man, camera, enabled, goal, follow)
	//ANIM :
	if (dir.equals(new THREE.Vector3(0, 0, 0))) {
		animaction.stop()
	} else {
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
	console.log(helper.bones[76].quaternion)
	//console.log(dir);
	setTimeout(periodicLogger, 3000)
}
setTimeout(periodicLogger, 3000)

function rotatebone() {
	var target1 = document.getElementById("slider1")
	var target2 = document.getElementById("slider2")
	var target3 = document.getElementById("slider3")
	helper.bones[76].quaternion.setFromEuler(new THREE.Euler(target1.value, target2.value, target3.value, "XYZ"))
}

function clicked( event ) {
    //set x and y value from the screen
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    //ray from camera to the point clicked
    raycaster.setFromCamera( pointer, camera );
    
    var intersects = raycaster.intersectObjects(intersectable, true);
      //if there is intersection enable collect 
    if (intersects.length > 0) {
    //DO SOMETHING
    	console.log(intersects[0])
        
    }
}