const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/invoices", name: "invoices", component: () => import("src/pages/invoice/Invoices.vue") },
      { path: "/invoice/new", name: "createInvoice", component: () => import("src/pages/invoice/NewEditInvoice.vue") },
      { path: "/invoice/:id", name: "invoice", component: () => import("src/pages/invoice/InvoiceDetails.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
