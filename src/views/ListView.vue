<script setup>
import { onBeforeMount, reactive } from "vue";
import { ref } from "vue";
import axios from "axios";
import { isValid, parseISO, parse } from "date-fns";
import html2canvas from "html2canvas";
import canvas2image from "canvas2image-2";
import apiRoot from "../main";
const list = ref([]);
const selectlist = ref([]);
const columns = [
  { type: "selection" },
  {
    title: "建立時間",
    key: "created",
    sortOrder: true,
    sorter(rowA, rowB) {
      return (
        parse(rowA.created, "yyyy-MM-dd HH:mm:ss", new Date()) -
        parse(rowB.created, "yyyy-MM-dd HH:mm:ss", new Date())
      );
    },
  },
  {
    title: "預約時間",
    key: "preserve_time",
    sortOrder: true,
    sorter: "default",
    filterOptions: [
      {
        label: "一",
        value: "1",
      },
      {
        label: "二",
        value: "2",
      },
      {
        label: "三",
        value: "3",
      },
      {
        label: "四",
        value: "4",
      },
      {
        label: "五",
        value: "5",
      },
      {
        label: "六",
        value: "6",
      },

      {
        label: "日",
        value: "0",
      },
    ],
    filter(value, row) {
      var day = parse(row.preserve_time, "yyyy-MM-dd", new Date()).getDay();
      return day == value ? -1 : 0;
    },
  },
  {
    title: "預約者",
    key: "who",
  },
  {
    title: "遊戲",
    key: "game",
  },
  {
    title: "主播",
    key: "streamer",
    sortOrder: true,
    sorter: "default",
  },
];
const selColumns = [
  {
    title: "預約時間",
    key: "preserve_time",
    sortOrder: true,
    sorter: "default",
  },
  {
    title: "預約者",
    key: "who",
  },
  {
    title: "遊戲",
    key: "game",
  },
  {
    title: "主播",
    key: "streamer",
  },
];
const rowKey = (row) => row.id;

const checkedRowKeysRef = ref([]);
function handleCheck(rowKeys) {
  checkedRowKeysRef.value = rowKeys;
  selectlist.value = list.value.filter((item) =>
    checkedRowKeysRef.value.includes(item.id)
  );
}
const loading = ref(true);

const options = {
  method: "GET",

  url: apiRoot + "/api/preserve/",
};
const fetchDatafunc = () => {
  loading.value = true;
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      var result = response.data.filter(
        (item) =>
          parse(item.preserve_time, "yyyy-MM-dd", new Date()) > new Date()
      );
      console.log(result);
      list.value = result;
    })
    .catch(function (error) {
      console.error(error);
    });
  loading.value = false;
};
const pagination = reactive({
  pageSize: 5,
});

const dataTableInstRef = ref(null);

const capture = () => {
  html2canvas(document.querySelector("#capture")).then((canvas) => {
    return canvas2image.saveAsPNG(canvas);
  });
};
onBeforeMount(() => {
  fetchDatafunc();
});
</script>

<template>
  <n-space vertical>
    <div v-if="!loading">
      <n-data-table
        ref="dataTableInstRef"
        :columns="columns"
        :row-key="rowKey"
        :data="list"
        :pagination="pagination"
        @update:checked-row-keys="handleCheck"
      />
    </div>
    <n-button @click="capture"> 截圖 </n-button>
    <div id="capture" style="padding: 10px">
      <n-data-table
        :columns="selColumns"
        :row-key="rowKey"
        :data="selectlist"
      />
    </div>
  </n-space>
</template>
