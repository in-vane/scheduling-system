<script setup>
import { h, onMounted, ref, watchEffect } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { SparklesOutline as ISpark } from '@vicons/ionicons5';
import { renderIcon } from '@/utils';

import school_badge from '@/assets/school_badge.jpg';

import InitialSch from '@/views/InitialSch.vue';
import OnlineSch from '@/views/OnlineSch.vue';

const renderLabel = (path, label) => () =>
  h(RouterLink, { to: { path } }, { default: () => label });

const menuOptions = [
  {
    label: renderLabel('/initial_scheduling', '初期列车调整'),
    key: 'initial_scheduling',
    name: '初期列车调整',
    icon: renderIcon(ISpark),
  },
  {
    label: renderLabel('/online_scheduling', '备车上线调整'),
    key: 'online_scheduling',
    name: '备车上线调整',
    icon: renderIcon(ISpark),
  },
];

const routeName = ref('');
const route = useRoute();
const router = useRouter();

const show = ref(false);

const currentTab = ref('');
const panels = ref([]);

const LAYOUT_STYLE = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

const onCloseTab = (key) => {
  const p = panels.value;
  const index = p.findIndex((_) => _.key == key);
  p.splice(index, 1);
  if (p.length > 0) {
    if (index == 0) {
      currentTab.value = p[0].key;
      router.push(p[0].key);
    }
    if (currentTab.value === key) {
      currentTab.value = p[index - 1].key;
      router.push(p[index - 1].key);
    }
  }
};

const onUpdateTab = (key) => {
  router.push(key);
};

const onUpdateMenu = (key, item) => {
  const p = panels.value;
  const i = p.findIndex((_) => _.key == key);
  if (i == -1) {
    p.push({ key: key, name: item.name });
    currentTab.value = key;
  }
};

const getComponent = (key) => {
  switch (key) {
    case 'initial_scheduling':
      return InitialSch;
    case 'online_scheduling':
      return OnlineSch;

    default:
      break;
  }
};

watchEffect(() => {
  routeName.value = route.name;
  currentTab.value = route.name;
});

onMounted(() => {
  const key = route.name;
  const name = menuOptions.find((item) => item.key == key)?.name;
  panels.value.push({ key, name });
});
</script>

<template>
  <n-layout :content-style="LAYOUT_STYLE">
    <!-- <n-layout-header bordered>
      <n-flex justify="space-between" align="center">
        <n-image :src="school_badge" />
        <n-flex :size="24" align="center">
          <n-text>欢迎使用</n-text>
          <n-button @click="show = true"> 使用文档 </n-button>
          <n-button @click="logoutHanlder"> 登出 </n-button>
        </n-flex>
      </n-flex>
    </n-layout-header> -->
    <n-layout has-sider>
      <n-layout-sider
        bordered
        :default-collapsed="false"
        collapse-mode="width"
        :collapsed-width="64"
        :width="200"
        show-trigger="arrow-circle"
        :native-scrollbar="false"
      >
        <n-menu
          :options="menuOptions"
          :value="routeName"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :on-update:value="onUpdateMenu"
        />
      </n-layout-sider>
      <n-layout-content
        content-style="padding: 24px;"
        :native-scrollbar="false"
      >
        <n-tabs
          v-model:value="currentTab"
          type="card"
          :closable="panels.length > 1"
          tab-style="min-width: 80px;"
          @close="onCloseTab"
          @update:value="onUpdateTab"
        >
          <n-tab-pane
            display-directive="show"
            v-for="panel in panels"
            :key="panel.key"
            :tab="panel.name"
            :name="panel.key"
          >
            <component :is="getComponent(panel.key)" :key="panel.key" />
          </n-tab-pane>
        </n-tabs>
        <!-- <router-view /> -->
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.n-layout-header {
  padding: 0 24px;
}
.n-layout-footer {
  padding: 8px;
  color: rgb(118, 124, 130);
  background: none;
  text-align: center;
}
.n-image {
  height: 40px;
  padding: 8px;
}
</style>