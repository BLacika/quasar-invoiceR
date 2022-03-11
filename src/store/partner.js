import data from "./data.json";

export function getPartners() {
  return data.partners;
}

export function getPartnersByType(type) {
  return data.partners.filter(partner => partner.type == type);
}

export function getPartnerById(id) {
  return data.partners.find(inv => inv.id == id);
}