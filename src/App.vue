<script setup>
import { RouterLink, RouterView } from "vue-router";
RouterLink;
</script>

<template>
  <n-message-provider>
    <n-layout>
      <n-layout-content content-style="padding: 24px;">
        <router-view></router-view
      ></n-layout-content>
      <n-layout-header>
        <n-space justify="center">
          <n-button-group size="large">
            <!-- https://github.com/tusen-ai/naive-ui/issues/2321#issuecomment-1178485622 -->
            <router-link v-slot="{ navigate }" :to="{ name: 'home' }" custom>
              <n-button @click="navigate">預約</n-button>
            </router-link>
            <router-link v-slot="{ navigate }" :to="{ name: 'list' }" custom>
              <n-button @click="navigate">list</n-button>
            </router-link>
            <router-link v-slot="{ navigate }" :to="{ name: 'login' }" custom>
              <n-button @click="navigate">登入</n-button>
            </router-link>
          </n-button-group>
        </n-space>
      </n-layout-header>
    </n-layout>
  </n-message-provider>
</template>
