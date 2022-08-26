<script setup>
import { onBeforeMount } from "vue";
import axios from "axios";
import { reactive, ref } from "vue";
import { tr } from "date-fns/locale";
import { useMessage } from "naive-ui";
import { computed } from "@vue/reactivity";
import format from "date-fns/format";
import apiRoot from "../main";

const message = useMessage();
const data = reactive({
  form: null,
});
const formdata = ref({
  preserve_time: computed(() => {
    return format(new Date(date.value), "yyyy-MM-dd");
  }),
  game: null,
  who: null,
  streamer: null,
});
const date = ref(Date.now());
function dateDisabled(ts) {
  const date = new Date(ts).getDate();
  const datenow = new Date(Date.now()).getDate();
  return date < datenow || date > datenow + 7;
}
function SubmitFunction(e) {
  e.preventDefault();
  message.info("HTTP Requesting");

  const options = {
    method: "POST",
    url: apiRoot + "/api/preserve/",
    data: formdata.value,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      successData.value = [response.data];
      showModal.value = true;
    })
    .catch(function (error) {
      message.error(error);
    });
}
const options = {
  method: "OPTIONS",
  url: apiRoot + "/api/preserve/",
};

onBeforeMount(() => {
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      var choices = response.data.actions.POST.streamer.choices;
      console.log(choices);
      choices.forEach((element) => {
        delete Object.assign(element, { label: element.display_name })[
          "display_name"
        ];
      });
      data.form = choices;
    })
    .catch(function (error) {
      console.error(error);
    });
});
const successData = ref([]);
const showModal = ref(false);
const modalClick = () => {
  showModal.value = true;
};
const modalCol = [
  {
    title: "日期",
    key: "preserve_time",
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

</script>

<template>
  <div id="parent">
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        title="預約成功"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <template #header-extra> 收到 {{ successData[0].who }} 的預約 </template>
        <n-data-table
          :columns="modalCol"
          :data="successData"
          :bordered="false"
          :row-key="rowKey"

        />
        <template #footer> 結果再至  <a href="https://discord.com/invite/YDZNhQP5bu">Discord</a>  群確認</template>
      </n-card>
    </n-modal>
    <n-space vertical
      ><n-card>
        <n-form :model="formdata" :rules="rules">
          <n-form-item label="預約日期" path="date">
            <n-date-picker
              placeholder="選擇日期"
              v-model:value="date"
              :is-date-disabled="dateDisabled"
              type="date"
            >
            </n-date-picker>
          </n-form-item>
          <n-form-item label="遊戲" path="game">
            <n-input
              v-model:value="formdata.game"
              placeholder="輸入遊戲"
            ></n-input>
          </n-form-item>
          <n-form-item label="預約者" path="who">
            <n-input
              v-model:value="formdata.who"
              placeholder="你是誰"
            ></n-input>
          </n-form-item>
          <n-form-item label="找誰玩" path="streamer">
            <n-select
              v-model:value="formdata.streamer"
              :options="data.form"
              placeholder="找誰"
            />
          </n-form-item>
          <n-form-item>
            <n-button @click="SubmitFunction"> 提交 </n-button>
          </n-form-item>
        </n-form>
      </n-card>
    </n-space>
  </div>

  <!-- {{ JSON.stringify(formdata, null, 2) }} -->
</template>
<style></style>
