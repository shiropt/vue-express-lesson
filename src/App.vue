<template>
  <div id="app">
  <label for="name">Name</label>
   <input type="text" name="name" v-model="name"> 
  <label for="profile">Profile</label>
   <input type="text" name="profile" v-model="profile"> 
  <button @click="addUser">登録</button>
    <table>
      <thead>
        <th>ID</th>
        <th>ユーザー名</th>
        <th>プロフィール</th>
      </thead>
      <tbody>
        <template v-for="(user,index) in users" >
         <tr :key="index">
          <td>{{user.id}}</td>
          <td  v-if="user.nameValueChecker" @click="nameEdit(index)">{{user.name}}</td>
          <input v-else type="text" v-model="user.name" @blur="saveEditData(index)">
          <td  v-if="user.profileValueChecker" @click="profileEdit(index)">{{user.profile}}</td>
          <input v-else type="text" v-model="user.profile" @blur="saveEditData(index)">
          <fa-icon icon="trash-alt" @click="deleteUser(index)"></fa-icon>
         </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios"
export default {
  data(){
    return{
      users:[],
      name:null,
      profile:null,
    }
  },
  methods:{
    async fetchUsers(){
      try{
        const res = await axios.get('/api/v1/users')
        res.data.forEach(user => {
          return user.nameValueChecker = true,
                 user.profileValueChecker = true})
        this.users = res.data
      }catch(e){
        alert("ユーザー情報の読み込みに失敗しました");
        console.log(e);
      }
    },
    async addUser(){
      if(this.name === null){
        return
      }
      const name= this.name
      const profile = this.profile
      const body = {name,profile}
      try{
        const res = await axios.post('/api/v1/users', body)
        alert(res.data)
      }catch(e){
       alert("ユーザーの登録に失敗しました")
       console.log(e);
      }
      this.fetchUsers()
      this.name = null
      this.profile = null
    },
    nameEdit(index){
      this.users[index].nameValueChecker = false
    },
    profileEdit(index){
      this.users[index].profileValueChecker = false
    },
   async saveEditData(index){
     const id =  this.users[index].id
     const name =  this.users[index].name
     const profile = this.users[index].profile
     const body = {id,name,profile}
     try{
       const res = await axios.put("/api/v1/users/:" + id ,body)
     alert(res.data);
     this.users[index].nameValueChecker = true
     this.users[index].profileValueChecker = true
     }catch(e){
       alert(`${this.users[index].name}の更新に失敗しました`);
       console.log(e);
     }
    },
   async deleteUser(index){
     const userId = this.users[index].id
     if(window.confirm(`${this.users[index].name}を削除しますか？`)){
       try{
       const res = await axios.delete("/api/v1/users/:" + userId)
       alert(res.data)
       this.fetchUsers()
       }catch(e){
         alert("削除に失敗しました")
         console.log(e);
       }
     }
    }
  },
  created(){
    this.fetchUsers()
  }
}
</script>