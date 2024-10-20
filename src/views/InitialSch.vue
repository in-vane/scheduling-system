<script setup>
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { FAILED_STATION, FAILED_REASON } from '@/constant';
import { onlyAllowNumber } from '@/utils';
import IMG_BEFORE from '@/assets/before.png';
import IMG_AFTER from '@/assets/after.png';

const optionsStation = FAILED_STATION.map((v, i) => ({ label: v, value: i }));
const station = ref(null);
const optionsReason = FAILED_REASON.map((v, i) => ({ label: v, value: i }));
const reason = ref(null);
const loadingDuration = ref(false);
const duration = ref('-');

const failedTime = ref([null, null, null]);
const loadingCount = ref(false);
const count = ref('-');

const showModal = ref(false);

const calculateDuration = () => {
  if (station.value == null || reason.value == null) {
    return;
  }
  loadingDuration.value = true;
  duration.value = '-';
  setTimeout(() => {
    loadingDuration.value = false;
    duration.value = 450;
  }, 1000);
};

const calculateCount = () => {
  loadingCount.value = true;
  count.value = '-';
  setTimeout(() => {
    loadingCount.value = false;
    count.value = 4;
  }, 1000);
};
</script>

<template>
  <div>
    <!-- 故障车站 -->
    <n-h2 prefix="bar">故障车站</n-h2>
    <n-flex vertical>
      <n-flex>
        <n-h3>故障车站</n-h3>
        <n-select
          v-model:value="station"
          :options="optionsStation"
          @update:value="calculateDuration"
        />
      </n-flex>
      <n-flex>
        <n-h3>故障类型</n-h3>
        <n-select
          v-model:value="reason"
          :options="optionsReason"
          @update:value="calculateDuration"
        />
      </n-flex>
      <n-h3 class="m-t-0">
        <n-flex>
          预计受影响时长为
          <n-spin :show="loadingDuration">
            <n-text type="error"> {{ duration }} </n-text>
          </n-spin>
          秒
        </n-flex>
      </n-h3>
    </n-flex>
    <!-- 故障时分 -->
    <n-h2 prefix="bar">故障时分</n-h2>
    <n-input-group>
      <n-input-group-label>故障发生时间</n-input-group-label>
      <n-input
        autosize
        placeholder="时"
        :allow-input="onlyAllowNumber"
        v-model:value="failedTime[0]"
      />
      <n-input
        autosize
        placeholder="分"
        :allow-input="onlyAllowNumber"
        v-model:value="failedTime[1]"
      />
      <n-input
        autosize
        placeholder="秒"
        :allow-input="onlyAllowNumber"
        v-model:value="failedTime[2]"
      />
      <n-button type="primary" ghost @click="calculateCount"> 提交 </n-button>
    </n-input-group>
    <n-h3>
      <n-flex align="center">
        初期调整列车数为
        <n-spin :show="loadingCount">
          <n-text type="error"> {{ count }} </n-text>
        </n-spin>
        列
        <n-button type="primary" ghost @click="showModal = true">
          预览
        </n-button>
      </n-flex>
    </n-h3>
    <n-modal
      v-model:show="showModal"
      title="调整预览"
      preset="card"
      :style="{ width: '600px', height: '600px' }"
      size="huge"
      :bordered="false"
    >
      <template #default>
        <div class="container">
          <img class="image image-before" :src="IMG_BEFORE" />
          <img class="image image-after" :src="IMG_AFTER" />
        </div>
      </template>
    </n-modal>
  </div>
</template>

<style scoped>
.n-select {
  width: 200px;
}
.m-t-0 {
  margin-top: 0;
}
.n-input {
  min-width: 56px;
}
.container {
  position: relative;
}
.image {
  position: absolute;
  width: 100%;
  animation: fade 4s cubic-bezier(0.42, 0, 0.58, 1) infinite;
}
.image-before {
  animation-delay: 0s;
}
.image-after {
  animation-delay: 2s;
}
.container:hover .image {
  animation-play-state: paused; /* 动画暂停 */
}
@keyframes fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>