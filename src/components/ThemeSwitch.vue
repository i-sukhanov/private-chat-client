<template>
  <div class="theme_switch">
    <button
      v-for="(theme, $i) in themes"
      :key="$i"
      class="theme_switch--switcher"
      :class="{ 'theme_switch--switcher-active': theme === currentTheme }"
      :style="{ color: theme === currentTheme ? '#fff' : 'unset' }"
      :tabindex="$i + 1"
      @click="setTheme(theme)"
    >
      <bulb-filled v-if="theme === 'light'" />
      <setting-filled v-else-if="theme === 'system'" />
      <bulb-outlined v-else />
    </button>
    <div class="theme_switch--underlay"></div>
  </div>
</template>

<script lang="ts" setup>
import { SettingFilled, BulbFilled, BulbOutlined } from '@ant-design/icons-vue';
import { useColorScheme } from '@composables/useColorScheme';

const { setTheme, init, themes, currentTheme } = useColorScheme();

init();
</script>

<style lang="scss" scoped>
.theme_switch {
  display: flex;
  position: relative;
  border: 1px solid var(--border-color);
  background-color: var(--lighter-bg);
  border-radius: var(--space-lg);
  overflow: hidden;

  &--underlay {
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--space-lg);
    height: var(--space-lg);
    background-color: var(--action-blue);
    z-index: 1;
    border-radius: 2px;
    transition: 100ms all;
    border-radius: var(--space-lg);
    box-shadow: 0 0 3px var(--action-blue);
  }

  &--switcher {
    background-color: transparent;
    border: none;
    position: relative;
    width: var(--space-lg);
    height: var(--space-lg);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 2;

    &-active {
      &:nth-of-type(1) {
        & ~ .theme_switch--underlay {
          transform: translateX(0);
        }
      }
      &:nth-of-type(2) {
        & ~ .theme_switch--underlay {
          transform: translateX(var(--space-lg));
        }
      }

      &:nth-of-type(3) {
        & ~ .theme_switch--underlay {
          transform: translateX(calc(var(--space-lg) * 2));
        }
      }
    }
  }
}
</style>
