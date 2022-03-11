<template>
  <div class="row items-center q-py-sm">
    <div class="col-3">Language</div>
    <div class="col-9">
      <q-select
        clearable
        class="q-pb-none"
        dense
        ref="langSelect"
        :readonly="!props.editable"
        :options="languages"
        @update:model-value="onChangeLanguage"
        v-model="selectedLang"
        :rules="[(val) => !!val || 'Please select a Language']"
        lazy-rules="ondemand"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getLanguages } from "../store/language";

const props = defineProps({
  editable: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const emit = defineEmits(["updateLanguage"]);

const languages = ref(null);
const langSelect = ref(null);
const selectedLang = ref(null);

onMounted(() => {
  languages.value = getLanguages();
  selectedLang.value = languages.value.find((l) => l.shortCode == "hu");
});

const onChangeLanguage = () => {
  updateLanguage(selectedLang);
};

const updateLanguage = (val) => {
  emit("updateLanguage", val);
}

const isValid = () => {
  return langSelect.value.validate();
};

defineExpose({ isValid })
</script>
