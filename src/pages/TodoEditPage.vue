<template>
  <div>
    <NavBar></NavBar>
    <div class="flex items-center justify-center min-h-screen bg-blue-500">
      <div class="w-full flex items-center justify-evenly font-sans">
        <div class="bg-white rounded shadow p-4 m-4 w-full lg:w-3/4 lg:max-w-lg overflow-y-auto flex">
          <input class="w-full mr-2" @keyup.enter="editTodo" v-model="description" :placeholder="getTodo(this.$route.params.id).description">
          <button @click="editTodo" class="bg-blue-500 hover:bg-gray-100 hover:text-black text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Modifier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import NavBar from "@/layouts/NavBar";
import axios from "axios";
import {mapGetters} from "vuex";

export default {
  name: "TodoEditPage",
  components: {NavBar},
  data(){
    return {
      description: ''
    }
  },
  methods:{
    editTodo(){
      const todosURI =`http://localhost:3000/api/v1/todos/${this.$route.params.id}`;

      const modifiedTodo = {
        _id: this.$route.params.id,
        description: this.description,
        done: false
      };

      axios.patch(todosURI, {
        modifiedTodo
      })
          .then(() => {
            this.$router.push('/');
          })
          .catch(error => console.log('Error when editing todo: ', error));
    },
  },
  created(){

    const todosURI = 'http://localhost:3000/api/v1/todos/';

    axios.get(todosURI, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
        .then(({data:todos}) => {
          this.$store.dispatch('populateTodos', {
            todos
          });
        })
        .catch(error => console.log('Error when fetching todos: ', error));
  },
  computed:{
    ...mapGetters([
      'getTodo'
    ])
  }
}
</script>

<style scoped>

</style>