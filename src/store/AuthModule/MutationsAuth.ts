const mutationsAuth = {
    Set_Response(state:any,payload: any){
        state.response = payload
    },
    Set_User(state:any,payload: any){
        state.user = payload
    },
    Set_IsLogged(state:any,payload: any){
        state.isLogged = payload
    },
    Set_Load(state:any,payload: any){
        state.load = payload
    },
}

export default mutationsAuth