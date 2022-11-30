<template>
  <header class="header">
    <div class="content">
      <h1 class="header--title">
        Secret Chat
        <a-tooltip>
          <template #title
            >There is no encryption on this application. Please, do not provide
            any sensitive information here
          </template>
          <exclamation-circle-outlined :style="{ fontSize: '16px' }" />
        </a-tooltip>
      </h1>
      <theme-switch />
    </div>
  </header>
  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import ThemeSwitch from './components/ThemeSwitch.vue';
</script>

<style lang="scss">
body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

.container {
  width: calc(100% - 32px);
  max-width: 760px;
  margin: 0 auto;
  display: flex;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.header {
  &--title {
    text-align: center;
    color: var(--text-color);
  }
}
</style>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}
</style>
