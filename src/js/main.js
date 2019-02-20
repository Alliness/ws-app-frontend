import {Socket} from "./socket";
import jQuery from "jquery";
import * as Phaser from "phaser";
import * as scenes from "./scenes";

window.$ = jQuery;
const GAME = new Phaser.Game(800, 480, Phaser.AUTO);


function run(){


   let socket = new Socket();
   let storage = {};
   socket.ready(()=>{

      socket.addMessageHandler("exit", (msg)=>{
         socket.websocket.close(msg.code, msg.reason);
      });

      Object.keys(scenes).forEach(scene => GAME.scene.add(scene, scenes[scene]));
      GAME.scene.start('Boot', storage);

   });

}

run();