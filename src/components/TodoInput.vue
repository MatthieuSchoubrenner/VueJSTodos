<template>
  <div class="flex">
    <input class="mr-2 w-full" placeholder="Ajouter une tâche" @keyup.enter="addTodo" v-model="description">
    <button class="bg-blue-500 hover:bg-gray-100 hover:text-black text-white font-bold py-2 px-4 border border-blue-700 rounded" @click="addTodo">
        <span v-if="!loading">Ajouter</span>
        <span v-else>Création...</span>
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TodoInput",
  data(){
    return {
      description: '',
      loading: false,
    };
  },
  methods: {
    addTodo(){
      if(this.description.trim()){
        const todosURI = 'http://localhost:3000/api/v1/todos/';
        const newTodo = {description: this.description, done: false};

        this.loading = true;

        axios.post(todosURI, {
          newTodo
        })
            .then(({data:todo}) => {
              this.description = '';
              this.loading = false;
              this.$store.dispatch('addTodo', {
                todo
              });
            })
            .catch(error => console.log('Error when adding todo: ', error));
      }
    }
  }
}
</script>

<style scoped>

</style>