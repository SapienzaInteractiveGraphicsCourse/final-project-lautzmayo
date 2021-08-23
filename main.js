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
var npaper,nplastic,nglass;
var manmodel,mapmodel,trashcanmodel,papermodel,plasticmodel,glassmodel;
var camera, scene, renderer;
var enabled;
var pointer;
var controls;
var helper;
var elements;
var mixer,animaction;
var clip;
loadmodel();


function loadmodel(){
  var manload = MODEL.getCharacter();
  var mapload = MODEL.getMap();
  var trashcanload = MODEL.getTrashCan();
  var paperload = MODEL.getPaper();
  var plasticload = MODEL.getPlastic();
  var glassload = MODEL.getGlass();
  Promise.all([manload,mapload,trashcanload,paperload,plasticload,glassload]).then(
    data => {
    manmodel = data[0];
    mapmodel = data[1];
    trashcanmodel = data[2];
    papermodel = data[3];
    plasticmodel = data[4];
    glassmodel = data[5];
    init();
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
  var temp = GAME.init(mapmodel,manmodel,trashcanmodel);
  scene = temp[0];
  camera = temp [1];
  map = temp[2]
  man = temp[3];
  helper = temp[4];
  trashcan = temp[5];
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 150;
  controls.maxDistance = 500;
  controls.enablePan=false;
  temp = ANIMATION.getAnimation(man,helper);
  mixer = temp[0];
  animaction = temp[1];
   
  npaper = 3;
  paper = TRASH.locatePaper(npaper,papermodel,scene);
  nplastic = 3;
  plastic = TRASH.locatePlastic(nplastic,plasticmodel,scene);
  nglass = 3;
  glass = TRASH.locateGlass(nglass,glassmodel,scene); 
  
     
 /* 
  // instantiate a listener
  const audioListener = new THREE.AudioListener();

  AmbientSound = new THREE.Audio( audioListener );

  camera.add( audioListener );
  scene.add( AmbientSound );

  AmbientSound.setBuffer( HeartBeat );
  AmbientSound.setLoop(true);
 */
 
  window.addEventListener( 'resize', onWindowResize, false );
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
       render();
       update();
   }, 1000 / 60 );
 }

function render(){
    renderer.render( scene, camera );
}

function update(){
  PLAYER.getPlayerDirection(man,camera,controls,enabled);
  
  console.log
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
  window.requestAnimationFrame(animate);
}


