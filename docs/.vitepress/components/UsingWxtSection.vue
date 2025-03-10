<script lang="ts" setup>
import { computed } from 'vue';
import useListExtensionDetails, {
  ChromeExtension,
} from '../composables/useListExtensionDetails';

// Add extension IDs here. Order doesn't matter, will be sorted by weekly active users
const chromeExtensionIds = [
  'ocfdgncpifmegplaglcnglhioflaimkd', // GitHub: Better Line Counts
  'mgmdkjcljneegjfajchedjpdhbadklcf', // Anime Skip Player
];

const { data } = useListExtensionDetails(chromeExtensionIds);
const sortedExtensions = computed(() =>
  !data.value
    ? undefined
    : [...data.value].sort((l, r) => r.weeklyActiveUsers - l.weeklyActiveUsers),
);

function getStoreUrl(extension: ChromeExtension) {
  const url = new URL(extension.storeUrl);
  url.searchParams.set('utm_source', 'wxt.dev');
  return url.href;
}
</script>

<template>
  <section class="vp-doc">
    <div class="container">
      <h2>Who's Using WXT?</h2>
      <p>
        Battle tested and ready for production. Explore chrome extensions made
        with WXT.
      </p>
      <ul>
        <li v-for="extension of sortedExtensions">
          <img
            :src="extension.iconUrl"
            :alt="`${extension.name} icon`"
            referrerpolicy="no-referrer"
          />
          <div>
            <a
              :href="getStoreUrl(extension)"
              target="_blank"
              :title="extension.name"
              >{{ extension.name }}</a
            >
            <p class="description" :title="extension.shortDescription">
              {{ extension.shortDescription }}
            </p>
            <p class="user-count">
              {{ extension.weeklyActiveUsers.toLocaleString() }} users
            </p>
          </div>
        </li>
      </ul>
      <p class="centered pr">
        <a
          href="https://github.com/wxt-dev/wxt/edit/main/docs/.vitepress/components/UsingWxtSection.vue"
          target="_blank"
          >Open a PR</a
        >
        to add your extension to the list!
      </p>
    </div>
  </section>
</template>

<style scoped>
.vp-doc {
  padding: 0 24px;
}

@media (min-width: 640px) {
  .vp-doc {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .vp-doc {
    padding: 0 64px;
  }
}

.container {
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

li img {
  width: 116px;
  height: 116px;
  padding: 16px;
  border-radius: 8px;
  background-color: var(--vp-c-default-soft);
}

ul {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-items: stretch;
  gap: 16px;
  list-style: none;
  margin: 16px 0;
  padding: 0;
}
@media (min-width: 960px) {
  ul {
    grid-template-columns: repeat(2, 1fr);
  }
}

li {
  margin: 0 !important;
  padding: 16px;
  display: flex;
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  flex: 1;
  gap: 16px;
}

.centered {
  text-align: center;
}

li a,
li .user-count,
li .description {
  padding: 0;
  margin: 0;
}
li .user-count {
  opacity: 70%;
  text-align: right;
  width: 100%;
  font-size: small;
}

li a {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  margin: 0;
  text-decoration: none;
}
li a:hover {
  text-decoration: underline;
}

li div {
  flex: 1;
  display: flex;
  flex-direction: column;
}

li .description {
  opacity: 90%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.pr {
  opacity: 70%;
}
</style>
