import { reactive } from "vue";
import { io } from "socket.io-client";


export const state = reactive({
    connected: false,
    fooEvents: [] as Array<any>,
    barEvents: [] as Array<any>
  });
  
  // "undefined" means the URL will be computed from the `window.location` object
  const URL = import.meta.env.VITE_URL.split("/server")[0];
  
  export const socket = io(URL, {
    path: "/server/socket.io",
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