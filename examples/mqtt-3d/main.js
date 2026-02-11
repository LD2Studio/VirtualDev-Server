import * as THREE from 'three';
import VDEV from 'virtualdev';
import mqtt from 'mqtt';

const app = VDEV.init(THREE, {
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

const hostname = window.location.hostname;
const uuid = crypto.randomUUID();
const topic = 'cube';

const client = mqtt.connect(`wss://${hostname}/mqtt`,{
    clientId: uuid
});

client.on('connect', () => {
    if (client.connected) {
        client.subscribe(topic, (err, granted) => {
            if (err) {
                console.log(err);
            }
        });
        console.log('[MQTT] Subscribed to ' + topic);
    }
});

client.on('message', (topic, message) => {
    console.log(message.toString());
    const json = JSON.parse(message.toString());
    console.log(json);
    cube.position.set(json.x, json.y, json.z);
});

/*
Pour tester, saisir la commande suivante dans un terminal :

docker exec vdev-server mosquitto_pub -t 'cube' -m '{"x":1, "y":0, "z":0}'

*/

