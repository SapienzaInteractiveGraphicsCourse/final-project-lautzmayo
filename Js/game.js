import * as THREE from '../build/three.module.js';

export function init(map,man,trashcan){
  var scene,camera;
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x00ccff);

  var lights = [];
		lights[ 0 ] = new THREE.PointLight( 0xffffff, .4, 0 );
		lights[ 1 ] = new THREE.PointLight( 0xffffff, .3, 0 );
		lights[ 2 ] = new THREE.PointLight( 0xffffff, .8, 0 );

		lights[ 0 ].position.set( 0, 200, 0,100 );
		lights[ 1 ].position.set( 100, 200, 100 );
		lights[ 2 ].position.set( - 100, - 200, - 100, 100 );

		scene.add( lights[ 0 ] );
		scene.add( lights[ 1 ] );
		scene.add( lights[ 2 ] );
    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );
    map.position.set(0,0,0);
    changeMaterial(map);
    scene.add(map);
    
    man.position.set(0,0,0);
    man.rotation.set(3.14,0,3.14);
    changeMaterial(man);
    scene.add(man);
 
    var helper = new THREE.SkeletonHelper( man );
	  helper.material.linewidth = 5;
	  helper.visible = false;
    scene.add(helper);
  
  helper.bones[15].rotation.set(1.6290887780319951,0.25,-1.3);
  helper.bones[47].rotation.set(1.6290887780319951,-0.25,1.3);
	
  trashcan.position.set(190,5,-350);
  changeMaterial(trashcan);
  scene.add(trashcan);

  camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 2000 );
  camera.position.set(0,40,200);

  return [scene, camera, map, man, helper, trashcan];
}


function changeMaterial(model){
  model.traverse((child) => {

  if ( ! child.isMesh ) return;

  var prevMaterial = child.material;

  child.material = new THREE.MeshPhongMaterial();

  THREE.MeshBasicMaterial.prototype.copy.call( child.material, prevMaterial );

});
}