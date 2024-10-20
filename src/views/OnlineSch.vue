<script setup>
import { ref } from 'vue';
import { STATIONS } from '@/constant';
import { onlyAllowNumber } from '@/utils';

const optionsStation = STATIONS.map((v, i) => ({ label: v, value: i }));
const currentStart = ref(null);
const currentEnd = ref(null);
const targetStart = ref(null);
const targetEnd = ref(null);

const failedTime = ref([null, null]);
const loadingCount = ref(false);
const count = ref('-');

const calculateCount = () => {
  loadingCount.value = true;
  count.value = '-';
  setTimeout(() => {
    loadingCount.value = false;
    count.value = 3;
  }, 1000);
};
</script>

<template>
  <div>
    <!-- 故障车站 -->
    <n-h2 prefix="bar">交路调整</n-h2>
    <n-flex vertical>
      <n-flex>
        <n-flex>
          <n-h3>现有起点站</n-h3>
          <n-select v-model:value="currentStart" :options="optionsStation" />
        </n-flex>
        <n-flex>
          <n-h3>现有终点站</n-h3>
          <n-select v-model:value="currentEnd" :options="optionsStation" />
        </n-flex>
      </n-flex>
      <n-flex>
        <n-flex>
          <n-h3>目标起点站</n-h3>
          <n-select v-model:value="targetStart" :options="optionsStation" />
        </n-flex>
        <n-flex>
          <n-h3>目标终点站</n-h3>
          <n-select v-model:value="targetEnd" :options="optionsStation" />
        </n-flex>
      </n-flex>
    </n-flex>
    <!-- 故障时分 -->
    <n-h2 prefix="bar">行车间隔</n-h2>
    <n-input-group>
      <n-input-group-label>行车间隔</n-input-group-label>
      <n-input
        autosize
        placeholder="分"
        :allow-input="onlyAllowNumber"
        v-model:value="failedTime[0]"
      />
      <n-input
        autosize
        placeholder="秒"
        :allow-input="onlyAllowNumber"
        v-model:value="failedTime[1]"
      />
      <n-button type="primary" ghost @click="calculateCount"> 提交 </n-button>
    </n-input-group>
    <n-h3>
      <n-flex align="center">
        备车需上线
        <n-spin :show="loadingCount">
          <n-text type="error"> {{ count }} </n-text>
        </n-spin>
        列
        <n-button type="primary" ghost @click="showModal = true" disabled>
          预览
        </n-button>
      </n-flex>
    </n-h3>
  </div>
</template>

<style scoped>
.n-select {
  width: 200px;
}
.n-input {
  min-width: 56px;
}
</style>