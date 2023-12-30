import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', {
  state: ()=>{
    return{
      token: ""
    }
  },
  actions: {
    isLogin(){
      if (this.token === null || this.token === '' || this.token === undefined){
        return false
      }
      else {
        return this.token
      }
    }
  },
  persist:{
    storage: localStorage
  }
})
