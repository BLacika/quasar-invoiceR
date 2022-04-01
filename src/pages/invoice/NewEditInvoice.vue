<template>
  <q-page class="q-pa-sm">
    <div class="row q-pa-sm justify-between shadow-2">
      <div class="q-gutter-xs">
        <q-btn color="primary" icon="add" label="New" />
        <q-btn
          style="background: goldenrod; color: white"
          icon="edit"
          @click="onEditSave"
          >{{ editable ? "Save" : "Edit" }}</q-btn
        >
        <q-btn color="secondary" icon="done" label="Approve" />
        <q-btn-dropdown label="Actions">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Print</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="print" />
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Delete</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="delete" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
    <div class="q-pa-sm shadow-2">
      <h4 class="q-px-sm q-py-none q-my-xs">Draft</h4>
      <div class="row q-gutter-xs">
        <q-card bordered class="col">
          <q-card-section>
            <partner-select
              ref="partnerSelect"
              :editable="editable"
              :partner="state.partnerId"
              @update:partner="(newValue) => onChangePartner(newValue)"
              :bank="state.invoiceBankId"
              @update:bank="(newValue) => state.invoiceBankId = newValue"
            ></partner-select>
            <language-select
              ref="languageSelect"
              :language="state.invoiceLangId"
              @update:language="(newValue) => state.invoiceLangId = newValue"
              :editable="editable"
            ></language-select>
          </q-card-section>
        </q-card>
        <q-card bordered class="col">
          <q-card-section>
            <date-invoice
              ref="dateField"
              label="Date"
              :editable="editable"
              v-model="state.invoiceDate"
              @updateDate="state.invoiceDate = $event.value"
              @update:model-value="onChangeInvoiceDate"
            ></date-invoice>
            <date-invoice
              ref="deliveryDateField"
              label="Delivery Date"
              :editable="editable"
              v-model="state.deliveryDate"
              @updateDate="state.deliveryDate = $event.value"
            ></date-invoice>
            <div class="row items-center q-gutter-sm">
              <div class="col-3">Payment Term</div>
              <div class="col">
                <q-select
                  label="Days"
                  clearable
                  dense
                  :readonly="!editable"
                  :options="terms"
                  v-model="state.paymentTherm"
                  @update:model-value="onChangeTerm"
                />
              </div>
              <div class="col">
                <date-invoice
                  ref="dueDateField"
                  :editable="editable"
                  v-model="state.dueDate"
                >
                </date-invoice>
              </div>
            </div>
            <payment-method
              ref="paymentMethodField"
              :editable="editable"
              v-model="state.paymentMode"
              @update:model-value="(newValue) => state.paymentMode = newValue"
            >
            </payment-method>
            <div class="row items-center q-gutter-sm">
              <div class="col-3">Currency</div>
              <div class="col">
                <q-select
                  clearable
                  dense
                  :readonly="!editable"
                  :options="currencies"
                  v-model="state.currencyId"
                  @update:model-value="onChangeCurrency"
                />
              </div>
              <div class="col">
                <q-input
                  label="Rate"
                  clearable
                  dense
                  readonly
                  v-model="state.exchangeRate"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-pa-sm shadow-2">
      <invoice-lines
        :invoiceId="state.id"
        :lines="state.invoiceLines"
        @addNewLine="onAddNewLine($event)"
        @modifyLine="onModifyLine($event)"
      >
      </invoice-lines>
    </div>
    <div class="q-pa-sm shadow-2">
      <pre>{{ state }}</pre>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { date } from "quasar";
import { getCurrencies } from "../../store/currency";
import { v4 as uuid } from "uuid";

import PartnerSelect from "../../components/PartnerSelect.vue";
import LanguageSelect from "../../components/LanguageSelect.vue";
import DateInvoice from "../../components/DateInvoice.vue";
import PaymentMethod from "../../components/PaymentMethod.vue";
import InvoiceLines from "../../components/InvoiceLines.vue";

const editable = ref(true);
const currencies = ref(null);

const partnerSelect = ref(null);
const languageSelect = ref(null);
const dateField = ref(null);
const deliveryDateField = ref(null);
const dueDateField = ref(null);
const paymentMethodField = ref(null);
const invoiceLines = ref([]);

const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, "YYYY-MM-DD");
const terms = [0, 1, 5, 8, 10, 15, 20, 30];

const state = reactive({
  id: uuid(),
  name: "",
  number: "",
  partnerId: "",
  invoiceDate: "",
  invoiceLangId: "",
  invoiceBankId: "",
  currencyId: "",
  exchangeRate: 1,
  netAmount: 0,
  vatAmount: 0,
  totalAmount: 0,
  rounding: 0,
  invoiceLines: [],
  paymentTherm: 0,
  dueDate: "",
  paymentMode: ""
})

onMounted(() => {
  currencies.value = getCurrencies();
  state.invoiceDate = formattedString;
  state.deliveryDate = formattedString;
  state.currencyId = currencies.value[0];
  onChangeCurrency();
});

const onChangeTerm = () => {
  if (state.invoiceDate !== "") {
    const newDate = new Date(state.invoiceDate);
    newDate.setDate(newDate.getDate() + state.paymentTherm);
    state.dueDate = date.formatDate(newDate, "YYYY-MM-DD");
  }
}

const onChangeInvoiceDate = () => {
  onChangeTerm();
}

const onChangeCurrency = () => {
  state.exchangeRate = state.currencyId.rates[0].exchange;
};

const hasAnyError = () => {
  let anyError = false;
  if (!partnerSelect.value.isValid()) anyError = true;
  if (!languageSelect.value.isValid()) anyError = true;
  if (!dateField.value.isValid()) anyError = true;
  if (!deliveryDateField.value.isValid()) anyError = true;
  if (!dueDateField.value.isValid()) anyError = true;
  if (!paymentMethodField.value.isValid()) anyError = true;

  return anyError;
};

const onEditSave = () => {
  if (!hasAnyError()) {
    editable.value = !editable.value;
  }
};

const onAddNewLine = (event) => {
  const newLine = JSON.parse(event);
  state.invoiceLines.push(newLine);
}

const onModifyLine = (event) => {
  const modifiedLine = JSON.parse(event);
  const lineIndex = state.invoiceLines.findIndex(l => l.id === modifiedLine.id);
  if (lineIndex >= 0) {
    state.invoiceLines[lineIndex] = modifiedLine;
  }
}
</script>
