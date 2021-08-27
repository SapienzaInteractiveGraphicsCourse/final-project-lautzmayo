import * as THREE from "./build/three.module.js"
import * as GAME from "./Js/game.js"
import * as MODEL from "./Js/models.js"
import * as MENU from "./Js/menu.js"
import * as CONTROL from "./Js/keyboard.js"
import * as PLAYER from "./Js/player.js"
import * as ANIMATION from "./Js/animation.js"
import * as TRASH from "./Js/trash.js"
import { OrbitControls } from "./jsm/controls/OrbitControls.js"

var times = 0
var game;

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
//for light
var dirLight;
var hemiLight;
var lights;
var sky;
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

//MENU. ONCE CLICK ON START, all the stuffs are loaded
window.onclick = function() {
    var btn = document.getElementById("START");
	
	if(times==0){
		btn.onclick = start();
		btn.style.display = 'none';
		times++
		document.getElementById("Buttons").style.display = 'none';
	}
    
}

function start(){
	loadmodel()
}


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
	game=renderer.domElement;
	document.body.appendChild(renderer.domElement)
	renderer.shadowMap.enabled = true;
    renderer.shadowSide = THREE.CullFaceBack;
	var temp = GAME.init(mapmodel, manmodel)
	//updated data option of scene,camera,map and man
	scene = temp[0]
	camera = temp[1]
	map = temp[2]
	man = temp[3]
	helper = temp[4]
	dirLight = temp[5];
    hemiLight = temp[6];
    lights = temp[7];

	//add fog to the scene
    scene.fog = new THREE.Fog(0x222233, 0, 20000);
    renderer.setClearColor( scene.fog.color, 1 );

	var vertexShader = document.getElementById( 'vertexShader' ).textContent;
    var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
    var uniforms = {
      topColor:    { type: "c", value: new THREE.Color( 0x0077ff ) },
      bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
      offset:      { type: "f", value: 33 },
      exponent:    { type: "f", value: 0.6 }
    }
    uniforms.topColor.value.copy( hemiLight.color );
    scene.fog.color.copy( uniforms.bottomColor.value );
  
    var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
    var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );
    sky = new THREE.Mesh( skyGeo, skyMat );
    scene.add( sky );
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
	raycaster = new THREE.Raycaster();

	window.addEventListener("resize", onWindowResize, false)

	//listeners for keyboard event
	window.addEventListener(
		"keydown",
		function (event) {
			temp = CONTROL.keypressedAgent(event, enabled, game)
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
		//console.log(enabled.l)
		//console.log(enabled.stato)
		/* if(enabled.l){
		//console.log(enabled.escape)
		document.getElementById("Buttons").style.display = 'flex';
		}else{
		//console.log(enabled.escape)
		document.getElementById("Buttons").style.display = 'none';
		} */
		
	}, 1000 / 60)
}

function render() {
	renderer.render(scene, camera)
	//ANIM :
	mixer.update(clock.getDelta())
	daynightcycle();
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
	//console.log(helper.bones[76].quaternion)
	//console.log(dir);
	setTimeout(periodicLogger, 3000)
}


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

function daynightcycle(){
    var time = new Date().getTime() * 0.0002;
    // var time = 2.1;

    var nsin = Math.sin(time);
    var ncos = Math.cos(time);

    // set the sun
    dirLight.position.set( 1500*nsin, 2000*nsin, 2000*ncos);

    if (nsin > 0.2 ){
    //day
      sky.material.uniforms.topColor.value.setRGB(0.25,0.55,1);
      sky.material.uniforms.bottomColor.value.setRGB(1,1,1);
      var f = 1;
      dirLight.intensity = f;
      for(var i=0;i<lights.length;i++){
        lights[i].intensity = 0.1;
      }
    }
    else if (nsin < 0.2 && nsin > 0.0 ){
      var f = nsin/0.2;
      dirLight.intensity = f;
      for(var i=0;i<lights.length;i++){
        lights[i].intensity = 0.2;
      }
      sky.material.uniforms.topColor.value.setRGB(0.25*f,0.55*f,1*f);
      sky.material.uniforms.bottomColor.value.setRGB(1*f,   1*f,1*f);
    }
    else{
    //night
      var f = 0;
      dirLight.intensity = f;
      for(var i=0;i<lights.length;i++){
        lights[i].intensity = 0.4;
      }
      sky.material.uniforms.topColor.value.setRGB(0,0,0);
      sky.material.uniforms.bottomColor.value.setRGB(0,0,0);
    }
  }