// import { toast } from "vue3-toastify";
// import router from "@/router";
import store from "../index";
import serviceStore from "./serviceStore";

const actionsStore = {
    async search({commit}: any, text: any){
        try{
            const { data } = await serviceStore.search(text);

            commit("Set_ResultSearch", data.result)

            console.log(store.state.store.resultSearch)
        } catch (err:any){
            console.log(err.messagee)
        }
    }
}

export default actionsStore