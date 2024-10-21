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
  },
  disconnect() {
    socket.disconnect();
  },
};

export default actionsSocket;
