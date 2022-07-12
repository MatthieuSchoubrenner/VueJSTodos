<template>
  <div>
    <div class="flex items-center">
      <button :class="['flex', 'justify-center', 'py-1', 'px-2', 'mr-2', 'rounded', 'w-8', 'text-white', 'border-2', 'border-green-800', todo.done ? 'bg-green-500' : '']" @click="toggleTodoState(todo._id)">
        <i :class="['h-4', todo.done ? 'fa fa-check' : '']"></i>
      </button>
      <p>{{ todo.description }}</p>
    </div>
    <div class="flex">
      <router-link :to="{name: 'todo', params: {id: todo._id}}" class="py-1 px-6 ml-2 rounded text-white bg-blue-500 hover:text-white hover:bg-blue-700">
        <p>Modifier</p>
      </router-link>
      <button class="py-1 px-3 ml-2 rounded text-white bg-red-500 hover:text-white hover:bg-red-700" @click="deleteTodo(todo._id)">
        <p>Supprimer</p>
      </button>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "TaskField",
  props: {
    todo: Object,
  },
  data(){
    return {

    }
  },
  methods:{
    deleteTodo(id){
      const todosURI =`http://localhost:3000/api/v1/todos/${id}`;

      axios.delete(todosURI)
          .then(() => {
            this.$store.dispatch('deleteTodo', {
              id
            });
          })
          .catch(error => console.log('Error when deleting todo: ', error));
    },
    toggleTodoState(id){
      const todosURI =`http://localhost:3000/api/v1/todos/${id}`;
      const modifiedTodo = {
        _id: this.$props.todo._id,
        description: this.$props.todo.description,
        done: !this.$props.todo.done
      };

      axios.patch(todosURI, {
              modifiedTodo
          })
          .then(({data:todo}) => {
            this.$store.dispatch('editTodo', {
                todo
            });
          })
          .catch(error => console.log('Error when toggle todo state: ', error));
    }
  }
}
</script>