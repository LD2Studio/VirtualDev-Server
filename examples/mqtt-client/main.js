import mqtt from 'mqtt';

const hostname = window.location.hostname;
console.log(`Hostname: ${hostname}`);
const uuid = crypto.randomUUID();
const topic = 'demo-mqtt';

const client = mqtt.connect(`wss://${hostname}/mqtt`,{
    clientId: uuid
});


client.on('connect', () => {
    console.log('connected '+ client.connected);
    if (client.connected) {
        document.getElementById("connection-status").textContent = "Connected";

        client.subscribe(topic, (err, granted) => {
            if (err) {
                console.log(err);
            }
            document.getElementById("sub-status").textContent = `Subscribed to ${topic}`;
        });
    }
});

client.on('message', (topic, message) => {
    // message is Buffer
    console.log(message.toString());
    document.getElementById("message").textContent += message.toString()+'\n';
});