<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> invoiceR </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer width="225" v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> </q-item-label>

        <q-item to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Home</q-item-label>
            <q-item-label caption>Home page</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/invoices" exact>
          <q-item-section avatar>
            <q-icon name="receipt" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Invoices</q-item-label>
            <q-item-label caption>List of invoices</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
