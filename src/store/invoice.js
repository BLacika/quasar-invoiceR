import data from "./data.json";
import { v4 as uuid } from "uuid";

export function getInvoices() {
  return data.invoices;
}

export function getInvoiceById(id) {
  return data.invoices.find(inv => inv.id == id);
}

export function getEmptyInvoice() {
  return {
    id: uuid(),
    name: "",
    number: "",
    partner: {},
    invoiceDate: null,
    deliveryDate: null,
    dueDate: null,
    paymentTherm: null,
    paymentMode: "",
    currency: "",
    exchangeRate: 1,
    invoiceLanguage: "hungarian",
    netAmount: 0,
    vatAmount: 0,
    totalAmount: 0,
    rounding: 0,
    invoiceLines: []
  }
}

function getNextNumber() {
  const invoices = getInvoices();
  const numbers = invoices.map(inv => parseInt(inv.number.slice(-4)));
  let biggest = Math.max(numbers);
  let next = biggest + 1;
  return next;
}

export function getNextInvoiceNumber() {
  let date = new Date();
  let year = date.getFullYear();
  let invoiceDigits = pad(getNextNumber(), 5);
  return `INV-${year}/${invoiceDigits}`;
}

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}