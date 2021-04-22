import ippis from "../../../Api/ippis"

export const createMiniIppis=async ({commit},user)=>{
    commit("CREATING_MINI_IPPIS",true)
    try{
        const response=await ippis.createMiniIppis(user)
        commit("CREATING_MINI_IPPIS",false)
        return Promise.resolve(response)
    }catch(e){
        commit("CREATING_MINI_IPPIS",false)
        return Promise.reject(e)
    }
}

export const getAllIppis= async({commit})=>{
    try{
        const response= await ippis.getAllIppis()
        commit("ALL_IPPIS",response.data)
        return Promise.resolve(response.data)
    }
    catch(e){
        return Promise.reject(e)
    }
}