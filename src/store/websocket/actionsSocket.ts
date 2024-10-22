import { socket } from "@/socket";

const actionsSocket = {
  bindEvents({commit}:any) {
    socket.on("connect", () => {
      commit("Set_isConnected", true);
    });
    
    socket.on("disconnect", () => {
      commit("Set_isConnected", false);
    });
  },
  connect() {
    socket.connect();
    console.debug("[websocket] Connected!")
  },
  disconnect() {
    socket.disconnect();
    console.debug("[websocket] Disconnected!")
  },
};

export default actionsSocket;
