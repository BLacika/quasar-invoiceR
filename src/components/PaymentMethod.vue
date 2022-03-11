<template>
  <div class="row items-center">
    <div class="col-3">Payment Method</div>
    <div class="col-9">
      <q-select
        clearable
        dense
        ref="paymentMethodField"
        :readonly="!props.editable"
        :options="paymentModes"
        v-model="selectedPaymentMode"
        @udpate:model-value="onChangeMethod"
        :rules="[(val) => !!val || 'Please select a Payment']"
        lazy-rules="ondemand"
      />
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const paymentModes = ["transfer", "credit", "card", "cash", "voucher"];
const selectedPaymentMode = ref(null);
const paymentMethodField = ref(null);
const props = defineProps({
  editable: {
    type: Boolean,
    required: false,
    default: true,
  }
});
const emit = defineEmits(["updatePaymentMethod"]);

const onChangeMethod = () => {
  emit("updatePaymentMethod", selectedPaymentMode.value)
}

const isValid = () => {
  return paymentMethodField.value.validate();
};

defineExpose({ isValid })
</script>
