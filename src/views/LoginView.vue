<script setup>
import axios from "axios";
import { ref } from "vue";

const modelRef = ref({
  username: null,
  password: null,
});
const login = () => {
  const options = {
    method: "POST",
    url: "http://127.0.0.1:8000/api/token/",
    data: modelRef.value
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
</script>

<template>
  <n-card style="align-items: center">
    <n-form>
      <n-space vertical>
        <n-form-item label="帳號">
          <n-input v-model:value="modelRef.username" />
        </n-form-item>
        <n-form-item label="密碼">
          <n-input v-model:value="modelRef.password" type="password" />
        </n-form-item>
        <div style="display: flex; justify-content: flex-end">
          <n-button @click="login">登入 </n-button>
        </div>
      </n-space>
    </n-form>
  </n-card>
  {{ JSON.stringify(modelRef, null, 2) }}
</template>
