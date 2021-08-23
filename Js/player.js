import * as THREE from '../build/three.module.js';

export function getPlayerDirection(player,camera,controls,enabled){
  
  var direction = new THREE.Vector3(0,0,-2);
  
  direction.applyQuaternion(player.quaternion);
  if (enabled.w) {
    
    player.position.x-= direction.x;
    player.position.z-=direction.z; 
    camera.position.sub( direction );
    controls.target.copy( player.position );
  }
  if (enabled.a) {
    player.rotation.y-= Math.PI/60;
  }
  if (enabled.s) {
    
    player.position.x+= direction.x;
    player.position.z+=direction.z; 
    camera.position.add( direction );
    controls.target.copy( player.position );
  }
  if (enabled.d) {
    player.rotation.y+= Math.PI/60;
  } 
 
} 