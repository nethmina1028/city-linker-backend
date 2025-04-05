const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", // Change to "live" in production
  client_id: "AbZ8war5zbVMujP3o0CSmJOs7R6eoEoBo-3JBEOMWpZo6rjdSKXM-G9lfCR-TSooQ0aDYDs8JNH_Z57F",
  client_secret: "EJAwD1Wsm3XyPOlOI939StVc_25j23KtEzkPEwa9VXskJqLj6gXU6mJrBSZ6pdTvGJT8A2b229RMcOjI",
});

module.exports = paypal;
