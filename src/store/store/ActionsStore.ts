// import { toast } from "vue3-toastify";
// import router from "@/router";
import serviceStore from "./serviceStore";

const actionsStore = {
    async search({commit}: any, text: any){
        try{
            const { data } = await serviceStore.search(text);

            commit("Set_ResultSearch", data.result)
        } catch (err:any){
            console.log(err.messagee)
        }
    },
    async getProducts({commit}: any){
        try{
            const { data } = await serviceStore.getProducts();
            commit("Set_Products", data.products)
        } catch(err){
            console.error(err)
        }
    }
}

export default actionsStore