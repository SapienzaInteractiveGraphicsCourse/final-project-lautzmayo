import * as THREE from './build/three.module.js';
import * as GAME from "./Js/game.js";
import * as MODEL from "./Js/models.js";
import * as MENU from "./Js/menu.js";
import * as CONTROL from "./Js/keyboard.js";
import * as PLAYER from "./Js/player.js";
import * as ANIMATION from "./Js/animation.js";
import * as TRASH from "./Js/trash.js";
import { OrbitControls } from './jsm/controls/OrbitControls.js';


var man,map,trashcan;
var paper = [];
var plastic = [];
var glass = [];
var trashcollector = [];
var npaper,nplastic,nglass,ntrashcollector;
var manmodel,mapmodel,trashcanmodel,papermodel,plasticmodel,glassmodel;
//for camera
var goal,follow;
var Distance = 200;
var camera, scene, renderer;
//for keyboard
var enabled;
//skeleton of player
var helper;
//for animation
var mixer,animaction,clock;
var clip;
var dir;

loadmodel();


function loadmodel(){
  //models are loaded 
  var manload = MODEL.getCharacter();
  var mapload = MODEL.getMap();
  var trashcanload = MODEL.getTrashCan();
  var paperload = MODEL.getPaper();
  var plasticload = MODEL.getPlastic();
  var glassload = MODEL.getGlass();
  //models are saved
  Promise.all([manload,mapload,trashcanload,paperload,plasticload,glassload]).then(
    data => {
    manmodel = data[0];
    mapmodel = data[1];
    trashcanmodel = data[2];
    papermodel = data[3];
    plasticmodel = data[4];
    glassmodel = data[5];
    init();
    doStuff();
  },error => {
    console.log( 'An error happened:',error );
  });
}


function init() {

  enabled=CONTROL.init();

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);
  var temp = GAME.init(mapmodel,manmodel);
  //updated data option of scene,camera,map and man 
  scene = temp[0];
  camera = temp [1];
  map = temp[2]
  man = temp[3];
  helper = temp[4];

  //setup camera orientation
  goal = new THREE.Object3D;
  follow = new THREE.Object3D;
  follow.position.z = -Distance;
  man.add(follow);
  goal.add(camera);

  //added animation (not working yet)
  /* temp = ANIMATION.getAnimation(man,helper);
  mixer = temp[0];
  animaction = temp[1];
  clock = temp[2]; */

  //locate trash and trash collector 
  npaper = 3;
  paper = TRASH.locatePaper(npaper,papermodel,scene);
  nplastic = 3;
  plastic = TRASH.locatePlastic(nplastic,plasticmodel,scene);
  nglass = 3;
  glass = TRASH.locateGlass(nglass,glassmodel,scene); 

  ntrashcollector = 3;
  trashcollector = TRASH.locateTrashCollector(ntrashcollector,trashcanmodel,scene);
     
 /* 
  // instantiate a listener
  const audioListener = new THREE.AudioListener();

  AmbientSound = new THREE.Audio( audioListener );

  camera.add( audioListener );
  scene.add( AmbientSound );

  AmbientSound.setBuffer( HeartBeat );
  AmbientSound.setLoop(true);
 */
  var slider1 = document.getElementById("slider1");
  slider1.addEventListener("input", rotatebone);
  var slider2 = document.getElementById("slider2");
  slider2.addEventListener("input", rotatebone);
  var slider3 = document.getElementById("slider3");
  slider3.addEventListener("input", rotatebone);

  window.addEventListener( 'resize', onWindowResize, false );

  //listeners for keyboard event
  window.addEventListener('keydown',function(event){
    temp=CONTROL.keypressedAgent(event,enabled);
    enabled=temp[0];
    
  }, false);
  window.addEventListener('keyup',function(event){enabled=CONTROL.keyreleasedAgent(event,enabled);}, false);
 

  window.requestAnimationFrame(animate);
}

function animate() {
   setTimeout( function() {
       requestAnimationFrame( animate );
       update();
       render();
   }, 1000 / 60 );
   
 }

function render(){
  
    renderer.render( scene, camera );
   // mixer.update(clock.getDelta());
    
}

function update(){
  //update man and camera position 
  dir = PLAYER.getPlayerDirection(man,camera,enabled,goal,follow);
  /* if (dir.equals(new THREE.Vector3(0,0,0))){
        animaction.stop();
      }
      else{
        animaction.play();
      } */

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
  window.requestAnimationFrame(animate);
}

 function doStuff() {
   console.log(helper.bones[76].quaternion);
   //console.log(dir);
   setTimeout(doStuff, 3000);
}
setTimeout(doStuff, 3000); 

function rotatebone(){
	var target1 = document.getElementById("slider1");
  var target2 = document.getElementById("slider2");
  var target3 = document.getElementById("slider3");
  helper.bones[76].quaternion.setFromEuler(new THREE.Euler( target1.value, target2.value, target3.value, 'XYZ' ));
}
