import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupNaive } from '@/plugins';

async function bootstrap() {
  const app = createApp(App);

  // 注册全局常用的 naive-ui 组件
  setupNaive(app);

  // 挂载路由
  setupRouter(app);

  // 路由准备就绪后挂载 APP 实例
  // https://router.vuejs.org/api/interfaces/router.html#isready
  await router.isReady();

  app.mount('#app');
}

bootstrap();
