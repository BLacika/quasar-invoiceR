import data from "./data.json";

export function getProducts() {
  return data.products;
}

export function getProductById(id) {
  return data.products.find(inv => inv.id == id);
}