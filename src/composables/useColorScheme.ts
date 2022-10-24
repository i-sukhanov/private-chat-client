import { ref } from 'vue';

type Theme = 'light' | 'dark' | 'system' | null;

export const useColorScheme = () => {
  const themes: ['light', 'system', 'dark'] = ['light', 'system', 'dark'];
  const currentTheme = ref<Theme>('system');
  const systemTheme: Theme = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light';

  const setTheme = (theme: Theme | null) => {
    const valueTheme = theme && theme !== 'system' ? theme : systemTheme;

    if (theme) {
      currentTheme.value = theme;
      if (theme !== 'system') localStorage.setItem('color-scheme', theme);
      else localStorage.removeItem('color-scheme');
    }

    document.body.setAttribute('color-scheme', valueTheme);
  };

  const init = () => {
    const colorScheme = localStorage.getItem('color-scheme');
    setTheme(colorScheme as Theme);
  };

  return {
    themes,
    currentTheme,
    setTheme,
    init,
  };
};
