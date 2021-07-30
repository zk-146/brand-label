const express = require("express");
const router = new express.Router();
const edit = require("../apis/edit/edit");
const allProducts = require("../apis/product/allProducts");
const similarProducts = require("../apis/product/similarProducts");
const product = require("../apis/product/product");

router.get("/", (req, res) => {
  allProducts(req, res);
});

router.post("/", (req, res) => {
  product(req, res);
});

router.delete("/", (req, res) => {
  product(req, res);
});

router.get("/getProduct", (req, res) => {
  product(req, res);
});

router.get("/similarProducts", (req, res) => {
  similarProducts(req, res);
});

router.put("/edit", (req, res) => {
  edit(req, res);
});

module.exports = router;
