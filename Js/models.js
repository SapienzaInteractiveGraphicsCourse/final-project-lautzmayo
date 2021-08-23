import * as THREE from '../build/three.module.js';
import {GLTFLoader} from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';
import { BufferGeometryUtils } from '../jsm/utils/BufferGeometryUtils.js';

export function getCharacter () {
  const myPromise = new Promise((resolve, reject) => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./Model/John/john.gltf',
    function ( gltf ) {
      let scale=0.4;
      const playerMesh = gltf.scene;
      playerMesh.scale.set(playerMesh.scale.x * scale, playerMesh.scale.y * scale, playerMesh.scale.z * scale);
      resolve(playerMesh);
    },
    function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
      console.log( 'An error happened' );
      reject(error);
    });
  });
  return myPromise;
}

export function getMap () {
  const myPromise = new Promise((resolve, reject) => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./Model/city/scene.gltf',
    function ( gltf ) {
      const mapMesh = gltf.scene;
      resolve(mapMesh);
    },
    function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
      console.log( 'An error happened' );
      reject(error);
    });
  });
  return myPromise;
}

export function getTrashCan () {
  const myPromise = new Promise((resolve, reject) => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./Model/Trash_collector/scene.gltf',
    function ( gltf ) {
      let scale=0.4;
      const trashcanMesh = gltf.scene;
      trashcanMesh.scale.set(trashcanMesh.scale.x * scale, trashcanMesh.scale.y * scale, trashcanMesh.scale.z * scale);
      resolve(trashcanMesh);
    },
    function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
      console.log( 'An error happened' );
      reject(error);
    });
  });
  return myPromise;
}

export function getPlastic () {
  const myPromise = new Promise((resolve, reject) => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./Model/Plastic/scene.gltf',
    function ( gltf ) {
      let scale=4.5;
      var newMaterial = new THREE.MeshStandardMaterial({color: 0xffe600});
      const plasticMesh = gltf.scene;
      plasticMesh.children[0].children[0].children[0].children[0].children[0].children[0].children[0].material = newMaterial;
      plasticMesh.scale.set(plasticMesh.scale.x * scale, plasticMesh.scale.y * scale, plasticMesh.scale.z * scale);
      resolve(plasticMesh);
    },
    function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
      console.log( 'An error happened' );
      reject(error);
    });
  });
  return myPromise;
}

export function getPaper () {
  const myPromise = new Promise((resolve, reject) => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./Model/Paper/scene.gltf',
    function ( gltf ) {
      let scale=4.0;
      var newMaterial = new THREE.MeshStandardMaterial({color: 0x002193});
      const paperMesh = gltf.scene;
      paperMesh.children[0].children[0].children[0].children[0].material = newMaterial;
      paperMesh.scale.set(paperMesh.scale.x * scale, paperMesh.scale.y * scale, paperMesh.scale.z * scale);
      resolve(paperMesh);
    },
    function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
      console.log( 'An error happened' );
      reject(error);
    });
  });
  return myPromise;
}

export function getGlass () {
  const myPromise = new Promise((resolve, reject) => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./Model/Glass/scene.gltf',
    function ( gltf ) {
      let scale=0.3;
      var newMaterial = new THREE.MeshStandardMaterial({color: 0x009321});
      const glassMesh = gltf.scene;
      glassMesh.children[0].children[0].children[0].children[1].material = newMaterial;
      glassMesh.scale.set(glassMesh.scale.x * scale, glassMesh.scale.y * scale, glassMesh.scale.z * scale);
      
      resolve(glassMesh);
    },
    function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
      console.log( 'An error happened' );
      reject(error);
    });
  });
  return myPromise;
}

