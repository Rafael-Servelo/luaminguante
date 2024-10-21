import actionsSocket from "./actionsSocket";
import mutationsSocket from "./mutationsSocket";

const socket = {
  state() {
    return {
        isConnected: false
    };
  },
  actions: actionsSocket,
  mutations: mutationsSocket,
};

export default socket;
