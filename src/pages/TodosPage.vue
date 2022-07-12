<template>
  <div>
    <NavBar></NavBar>
    <div class="flex items-center justify-center min-h-screen bg-blue-500">
      <div class="w-full flex items-center justify-evenly">
        <div class="bg-white p-10 m-4 w-full lg:w-3/4 lg:max-w-lg overflow-y-auto">
          <TodoInput class="mb-4"></TodoInput>
          <TaskField
              class="flex mb-4 items-center flex justify-between bg-gray-50 p-2"
              v-for="(todo, index) in this.$store.getters.getDisplayedTodos"
              :key="index"
              :todo="todo">
          </TaskField>
          <PaginationBar></PaginationBar>
        </div>
        <div class="bg-white p-10 m-4 w-full lg:w-3/4 lg:max-w-lg overflow-y-auto">
          <LastTodos></LastTodos>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TodoInput from "@/components/TodoInput";
import LastTodos from "@/components/LastTodos";
import TaskField from "@/components/TaskField";
import NavBar from "@/layouts/NavBar";
import axios from 'axios';

export default {
  name: 'TodosPage',
  components: {NavBar, TodoInput, TaskField, LastTodos},
  created(){
    const todosURI = 'http://localhost:3000/api/v1/todos/';
    axios.get(todosURI, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(({data:todos}) => {
      this.$store.dispatch('populateTodos', { todos });
    }).catch(error => console.log('Error when fetching todos: ', error));
  },
}
</script>