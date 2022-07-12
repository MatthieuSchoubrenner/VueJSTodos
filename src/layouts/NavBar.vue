<template>
  <nav class="fixed w-full bg-blue-700 text-white px-2 b py-2">
    <div class="container flex flex-wrap justify-center items-center mx-auto">
      <router-link to="/" class="flex items-center">
        <span class="text-xl justify-center text-center">Todos</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

