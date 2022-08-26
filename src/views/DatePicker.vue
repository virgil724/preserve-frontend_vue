<template>
  <pre>{{ formattedValue }}</pre>
  <n-date-picker
    v-model:formatted-value="formattedValue"
    value-format="yyyy.MM.dd HH:mm:ss"
    type="datetime"
    clearable
  />
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {
      formattedValue: ref("2007.06.30 12:08:55")
    };
  }
});
</script>
