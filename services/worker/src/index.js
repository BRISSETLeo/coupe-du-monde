const express = require('express');
const cors = require('cors');
const mqtt = require('mqtt');
const {generateScore} = require("./utils/generateScore");
require('dotenv').config();

const mqttAddress = process.env.MQTT_ADDRESS;

if (!mqttAddress) throw new Error('cannot connect to mqtt: no address provided')

let client = mqtt.connect(mqttAddress);

client.on("connect", () => {
    console.log("connected to broker");
    client.subscribe("match", (err) => {
        if (!err) {
            console.log("subscribed to topic match");
        }
    });
});

client.on("message", (topic, message) => {
    if (topic === "match") {
        const contenu = message.toString();
        console.log("received match", contenu);
        // Return if there is no team 1 or team 2
        if (!contenu.team1_id || !contenu.team2_id || contenu.id) return;
        const resultat = generateScore(contenu.team1_id, contenu.team2_id)
        const buildResponse = {
            ...resultat,
            id: contenu.id
        };
        client.publish("match/resultat", buildResponse);
        console.log("res of the match send");
    }
});

