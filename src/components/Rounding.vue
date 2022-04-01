<template>
  <div class="row items-center justify-end">
    <div class="col-3">Rounding</div>
    <div class="col-6">
      <q-select
        dense
        class="q-pb-none"
        ref="paymentMethodField"
        :readonly="!props.editable"
        :options="options"
        v-model="selectedRounding"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const options = [0, 1, 5, 10];
  const selectedRounding = computed({
    get() {
      return props.modelValue;
    },
    set(val) {
      emit("update:modelValue", val);
    }
  })
const props = defineProps({
  editable: {
    type: Boolean,
    required: true
  },
  modelValue: {
    type: Number,
    required: true
  }
});
const emit = defineEmits("update:modelValue");

</script>