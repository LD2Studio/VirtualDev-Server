import * as THREE from 'three';
import { App } from 'virtualdev';

const app = new App(THREE, null, {
    interactive: true
});

app.camera.position.set(2.57, 2.18, 4.98);

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()
);

app.scene.add(cube);

const grid = new THREE.GridHelper(10, 10);
app.scene.add(grid);

const axes = new THREE.AxesHelper(5);
axes.material.depthTest = false;
app.scene.add(axes);



