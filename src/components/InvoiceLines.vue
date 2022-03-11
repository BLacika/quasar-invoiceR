<template>
  <q-table
    title="Invoice Lines"
    :rows="rows"
    :columns="columns"
    row-key="id"
    :visible-columns="visibleColumns"
    :filter="filter"
    :loading="loading"
    :rows-per-page-options="[10, 20, 25, 50, 100]"
    :dense="$q.screen.lt.md"
    :hide-no-data="true"
    @row-click="handleRowSelect"
  >
    <template v-slot:top>
      <div class="q-gutter-xs">
        <q-btn color="primary" icon="add" label="Add" @click="onAddBtn" />
      </div>
      <q-space />
      <q-select
        v-model="visibleColumns"
        multiple
        outlined
        dense
        options-dense
        :display-value="$q.lang.table.columns"
        emit-value
        map-options
        :options="columns"
        option-value="name"
        options-cover
        style="min-width: 150px"
      />
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="product" :props="props">
          {{ props.row.product.label }}
          <q-popup-edit v-model="props.row.product.label" v-slot="scope">
            <q-select v-model="scope.value" :options="getProducts()" dense autofocus />
          </q-popup-edit>
        </q-td>
        <q-td key="description" :props="props">
          {{ props.row.description }}
          <q-popup-edit v-model="props.row.description" v-slot="scope">
            <q-input v-model="scope.value" dense autofocus />
          </q-popup-edit>
        </q-td>
        <q-td key="quantity" :props="props">
          {{ props.row.quantity }}
          <q-popup-edit v-model="props.row.quantity" v-slot="scope">
            <q-input type="number" v-model.number="scope.value" dense autofocus />
          </q-popup-edit>
        </q-td>
        <q-td key="uom" :props="props">
          {{ props.row.uom }}
          <q-popup-edit v-model="props.row.uom" v-slot="scope">
            <q-input v-model="scope.value" dense autofocus />
          </q-popup-edit>
        </q-td>
        <q-td key="unitPrice" :props="props">
          {{ props.row.unitPrice }}
          <q-popup-edit v-model="props.row.unitPrice" v-slot="scope">
            <q-input type="number" v-model.number="scope.value" dense autofocus />
          </q-popup-edit>
        </q-td>
      </q-tr>
    </template>
  </q-table>

  <pre>{{ rows }}</pre>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getProducts } from "src/store/product";

const columns = [
  {
    name: "product",
    required: true,
    label: "Product",
    align: "left",
    field: (row) => row.product,
    format: (val) => `${val.label}`,
    sortable: true,
  },
  {
    name: "description",
    label: "Description",
    field: "description",
    sortable: true,
  },
  {
    name: "quantity",
    label: "Quantity",
    field: "quantity",
    sortable: true,
  },
  {
    name: "uom",
    label: "Unit of Measure",
    field: "uom",
    sortable: true,
  },
  {
    name: "unitPrice",
    label: "Unit Price",
    field: "unitPrice",
    sortable: true,
    format: (val) => `${val.toLocaleString("hu-HU")}`,
  },
  {
    name: "netAmount",
    label: "Net Amount",
    field: "netAmount",
    sortable: true,
    format: (val) => `${val.toLocaleString("hu-HU")}`,
  },
  {
    name: "taxes",
    label: "Taxes",
    field: (row) => row.taxes,
    format: (val) => `${val.map((v) => v.display)}`,
    sortable: true,
  },
  {
    name: "taxAmount",
    label: "Tax Amount",
    field: "taxesAmount",
    sortable: true,
    format: (val) => `${val.toLocaleString("hu-HU")}`,
  },
  {
    name: "total",
    label: "Total",
    field: "total",
    sortable: true,
    format: (val) => `${val.toLocaleString("hu-HU")}`,
  },
];

let rows = reactive([
  {
    product: {
      id: "ab528c70-e3c2-446d-9fda-2a4066ac5e8d",
      name: "Asztal, fekete, 120x100",
      label: "Asztal, fekete, 120x100",
      active: true,
      type: "product",
      internalref: "ASZT-153518",
      unitprice: 1000,
      saletaxes: [{ id: "01e7188b-553a-40b8-9e57-bd6d84ddf873" }],
      purchasetaxes: [{ id: "01e7188b-553a-40b8-9e57-bd6d84ddf873" }],
      uom: { id: "fc91465d-40c5-455e-9306-c6d150d8df1d" },
      note: "",
    },
    description: "[ASZT-153518] Asztal, fekete, 120x100",
    quantity: 10,
    uom: "db",
    unitPrice: 1000,
    netAmount: 10000,
    taxes: ["01e7188b-553a-40b8-9e57-bd6d84ddf873"],
    taxesAmount: 2700,
    total: 12700,
  },
]);

const visibleColumns = ref([
  "product",
  "description",
  "quantity",
  "uom",
  "unitPrice",
  "netAmount",
  "taxes",
  "taxAmount",
  "total",
]);

const loading = ref(false);
const filter = ref("");

const onAddBtn = () => {};
</script>
