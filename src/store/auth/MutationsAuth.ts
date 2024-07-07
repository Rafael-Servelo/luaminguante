const mutationsAuth = {
    Set_User(state:any,payload: any){
        state.user = payload
    },
    Set_Load(state:any,payload: any){
        state.load = payload
    },
}

export default mutationsAuth