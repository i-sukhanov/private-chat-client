<template>
  <header class="header">
    <div class="container">
      <h1 class="header--title">Secret Chat</h1>
    </div>
  </header>
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header {
  &--title {
    text-align: center;
  }
}

.container {
  max-width: 760px;
  margin: 0 auto;
}
</style>
