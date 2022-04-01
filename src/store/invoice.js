import data from "./data.json";
import { getUomById } from "./uom";
import { getTaxById } from "./taxes";
import { getProductById } from "./product";
import { getPartnerById } from "./partner";
import { getLangById } from "./language";
import { getCurrencyById } from "./currency";
import { getBankAccountById } from "./bank";

export function getInvoices() {
  return data.invoices.map(inv => getInvoiceById(inv.id));
}

export function getInvoiceById(id) {
  const invoice = data.invoices.find(inv => inv.id === id);
  return {
    ...invoice,
    partnerId: getPartnerById(invoice.partnerId),
    currencyId: getCurrencyById(invoice.currencyId),
    invoiceLangId: getLangById(invoice.invoiceLangId),
    invoiceLines: getInvoiceLinesByInvoice(invoice.id),
    invoiceBankId: getBankAccountById(invoice.invoiceBankId)
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

/**************** Invoice Lines *************************/
export function getInvoiceLines() {
  return data.invoicelines.map(l => getInvoiceLineById(l.id));
}

export function getInvoiceLinesByInvoice(invoiceId) {
  const found = data.invoicelines.filter(line => line.invoiceId === invoiceId);
  return found.map(f => getInvoiceLineById(f.id));
}

export function getInvoiceLineById(id) {
  const found = data.invoicelines.find(line => line.id === id);
  return {
    ...found,
    uomId: getUomById(found.uomId),
    taxesIds: found.taxesIds.map(id => getTaxById(id)),
    productId:  getProductById(found.productId)
  }
}