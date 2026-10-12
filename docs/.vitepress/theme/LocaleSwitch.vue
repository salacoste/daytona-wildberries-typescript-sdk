<script setup lang="ts">
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';

const props = defineProps<{
  display: 'desktop' | 'mobile';
}>();

const { page, theme } = useData();

const target = computed(() => {
  const relativePath = page.value.relativePath;
  const isRussian = relativePath.startsWith('ru/');
  const rootPath = isRussian ? relativePath.slice('ru/'.length) : relativePath;
  const hasCounterpart = (theme.value.localeCounterparts as string[] | undefined)?.includes(rootPath) ?? false;
  const targetPath = hasCounterpart
    ? (isRussian ? rootPath : `ru/${rootPath}`)
    : (isRussian ? 'index.md' : 'ru/index.md');

  const route = targetPath === 'index.md'
    ? '/'
    : targetPath === 'ru/index.md'
      ? '/ru/'
      : `/${targetPath.replace(/\.md$/, '.html')}`;

  return {
    href: withBase(route),
    label: isRussian ? 'English' : 'Русский',
  };
});
</script>

<template>
  <a
    class="locale-switch"
    :class="`locale-switch--${props.display}`"
    :href="target.href"
    :aria-label="`Change language to ${target.label}`"
  >
    <span aria-hidden="true">🌐</span>
    <span>{{ target.label }}</span>
  </a>
</template>

<style scoped>
.locale-switch {
  align-items: center;
  gap: 0.4rem;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
}

.locale-switch:hover {
  color: var(--vp-c-brand-1);
}

.locale-switch--desktop {
  display: none;
  margin-left: 0.75rem;
}

.locale-switch--mobile {
  display: flex;
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .locale-switch--desktop {
    display: flex;
  }

  .locale-switch--mobile {
    display: none;
  }
}
</style>
