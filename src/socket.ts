import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
    connected: false,
    fooEvents: [] as Array<any>,
    barEvents: [] as Array<any>
  });
  
  // "undefined" means the URL will be computed from the `window.location` object
  const URL = 'http://192.168.18.7:3000';
  
  export const socket = io(URL, {
    autoConnect: false
  });
  
  socket.on("connect", () => {
    state.connected = true;
    console.info(`Websocket conectado com sucesso!`)
  });
  
  socket.on("disconnect", () => {
    state.connected = false;
  });
  
  socket.on("foo", (...args) => {
    state.fooEvents.push(args);
  });
  
  socket.on("bar", (...args) => {
    state.barEvents.push(args);
  });