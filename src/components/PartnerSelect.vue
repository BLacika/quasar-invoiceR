<template>
  <div class="row items-center q-py-sm q-my-sm">
    <div class="col-3">Partner</div>
    <div class="col-9">
      <q-select
        clearable
        dense
        class="q-pb-none"
        ref="partnerSelect"
        :readonly="!props.editable"
        :options="partners"
        v-model="selectedPartner"
        @update:model-value="onChangePartner"
        :rules="[(val) => !!val || 'Please select a Partner']"
        lazy-rules="ondemand"
      />
    </div>
  </div>
  <q-card-section v-if="selectedPartner != null">
    <div class="row items-center">
      <div class="col-3">VAT Number</div>
      <div class="col-9">{{ selectedPartner.vatnumber }}</div>
    </div>
    <div class="row items-center">
      <div class="col-3">Address</div>
      <div class="col-9">
        {{ selectedPartner.addresses[0].country }},
        {{ selectedPartner.addresses[0].zip }}
        {{ selectedPartner.addresses[0].city }},
        {{ selectedPartner.addresses[0].street }}
      </div>
    </div>
    <div class="row items-center">
      <div class="col-3">Bank</div>
      <div class="col-9">
        <q-select
          clearable
          dense
          ref="bankSelect"
          :readonly="!editable"
          :options="selectedPartner.bankAccounts"
          v-model="selectedBank"
          :rules="[(val) => !!val || 'Please select a Bank Account']"
          lazy-rules="ondemand"
        />
      </div>
    </div>
  </q-card-section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getPartners } from "../store/partner";

const props = defineProps({
  editable: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const emit = defineEmits(["updatePartner", "updateBank"]);

const partners = ref(null);
const partnerSelect = ref(null);
const bankSelect = ref(null);
const selectedPartner = ref(null);
const selectedBank = ref(null);

onMounted(() => {
  partners.value = getPartners();
});

const onChangePartner = () => {
  selectedBank.value =
    selectedPartner.value == null
      ? null
      : selectedPartner.value.bankAccounts[0];

  updatePartner(selectedPartner);
  updateBank(selectedBank);
};

const updatePartner = (val) => {
  emit("updatePartner", val);
};
const updateBank = (val) => {
  emit("updateBank", val);
};

const isValid = () => {
  return partnerSelect.value.validate() && bankSelect.value.validate();
};

defineExpose({ isValid });
</script>
