import * as THREE from "../build/three.module.js"

var time = 0;
var newPosition = new THREE.Vector3();
var matrix = new THREE.Matrix4();

var stop = 1;
var DEGTORAD = 0.01745327;
var temp = new THREE.Vector3;
var dir = new THREE.Vector3;
var a = new THREE.Vector3;
var b = new THREE.Vector3;
var Distance = 200;
var velocity = 0.0;
var speed = 0.0;


export function getPlayerDirection(man, camera, enabled,goal,follow) {
	
    
    speed = 0.0;
  
  if ( enabled.w )
    speed = 2;
  else if ( enabled.s )
    speed = -2;

  velocity += ( speed - velocity ) * .3;
  man.translateZ( velocity );

  if ( enabled.a )
    man.rotateY(0.05);
  else if ( enabled.d )
    man.rotateY(-0.05);
		
  
  a.lerp(man.position, 0.1);
  b.copy(goal.position);
  
    dir.copy( a ).sub( b ).normalize();
    const dis = a.distanceTo( b ) - Distance;
    goal.position.addScaledVector( dir, dis );
    goal.position.lerp(temp, 0.3);
    temp.setFromMatrixPosition(follow.matrixWorld);
    
    camera.lookAt( man.position );
}

