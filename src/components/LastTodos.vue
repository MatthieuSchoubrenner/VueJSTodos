<template>
  <div>
    <h2 class="text-xl font-extrabold mb-4 text-center">TODOS :</h2>
      <div v-for="(todo, index) of getLastTodos" :key="index">
        <div>
          {{ todo.description }}
        </div>
      </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "LastTodos",
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
      'getLastTodos',
    ])
  }
}
</script>