const initDB = require("../../helpers/initDB");
const Product = require("../../models/dbProduct");

initDB();

async function products(req, res) {
  switch (req.method) {
    case "GET":
      await getAllProducts(req, res);
      break;
  }
}

const getAllProducts = async (req, res) => {
  const productType = req.query.productType;
  const brand = req.query.brand;
  let modelName = req.query.modelName;
  let materialType = req.query.materialType;
  let displayProduct = req.query.displayProduct;
  const productName = req.query.modelName;

  let style = req.query.style;

  if (style === undefined) {
    style = "";
  }

  if (JSON.parse(displayProduct) !== true) {
    displayProduct = false;
  } else {
    displayProduct = true;
  }

  try {
    if (productType === "Mobile Covers") {
      if (brand !== "" && displayProduct === true) {
        const products = await Product.find({
          productType: "Mobile Cover",
          brand,
          displayPage: displayProduct,
        });
        return res.status(200).json(products);
      }
      if (materialType !== "") {
        if (modelName !== "") {
          const products = await Product.find({
            productType: "Mobile Cover",
            productName: modelName,
            materialType,
          });
          return res.status(200).json(products);
        } else if (brand !== "") {
          const products = await Product.find({
            productType: "Mobile Cover",
            brand: brand,
            materialType,
          });
          return res.status(200).json(products);
        } else {
          const products = await Product.find({
            productType: "Mobile Cover",
            materialType,
          });
          return res.status(200).json(products);
        }
      } else {
        if (modelName !== "") {
          const products = await Product.find({
            productType: "Mobile Cover",
            productName: modelName,
          });
          return res.status(200).json(products);
        } else if (brand !== "") {
          const products = await Product.find({
            productType: "Mobile Cover",
            brand: brand,
          });
          return res.status(200).json(products);
        } else {
          const products = await Product.find({
            productType: "Mobile Cover",
          });
          return res.status(200).json(products);
        }
      }
    } else if (productType === "Airpod Cases") {
      if (brand !== "" && displayProduct === true) {
        const products = await Product.find({
          productType: "Airpod Cases",
          brand,
          displayPage: displayProduct,
        });
        return res.status(200).json(products);
      }
      if (materialType !== "") {
        if (modelName !== "") {
          const products = await Product.find({
            productType: "Airpod Cases",
            productName: modelName,
            materialType,
          });
          return res.status(200).json(products);
        } else if (brand !== "") {
          const products = await Product.find({
            productType: "Airpod Cases",
            brand: brand,
            materialType,
          });
          return res.status(200).json(products);
        } else {
          const products = await Product.find({
            productType: "Airpod Cases",
            materialType,
          });
          return res.status(200).json(products);
        }
      } else {
        if (modelName !== "") {
          const products = await Product.find({
            productType: "Airpod Cases",
            productName: modelName,
          });
          return res.status(200).json(products);
        } else if (brand !== "") {
          const products = await Product.find({
            productType: "Airpod Cases",
            brand: brand,
          });
          return res.status(200).json(products);
        } else {
          const products = await Product.find({
            productType: "Airpod Cases",
          });
          return res.status(200).json(products);
        }
      }
    } else if (productType === "Smart Watch") {
      if (brand !== "" && displayProduct === true) {
        const products = await Product.find({
          productType: "Smart Watch",
          brand,
          displayPage: displayProduct,
        });
        return res.status(200).json(products);
      }
      if (style !== "") {
        // let style = materialType;
        if (modelName !== "") {
          const products = await Product.find({
            productType: "Smart Watch",
            productName: modelName,
            style,
          });
          return res.status(200).json(products);
        } else if (brand !== "") {
          const products = await Product.find({
            productType: "Smart Watch",
            brand: brand,
            style,
          });
          return res.status(200).json(products);
        } else {
          const products = await Product.find({
            productType: "Smart Watch",
            style,
          });
          return res.status(200).json(products);
        }
      } else {
        if (modelName !== "") {
          const products = await Product.find({
            productType: "Smart Watch",
            productName: modelName,
          });
          return res.status(200).json(products);
        } else if (brand !== "") {
          const products = await Product.find({
            productType: "Smart Watch",
            brand: brand,
          });
          return res.status(200).json(products);
        } else {
          const products = await Product.find({
            productType: "Smart Watch",
          });
          return res.status(200).json(products);
        }
      }
    } else if (productType === "Tempered Glass") {
      // if (brand !== "") {
      //   const products = await Product.find({
      //     productType: "Tempered Glass",
      //     brand,
      //     displayPage: displayProduct,
      //   });
      //   return res.status(200).json(products);
      // }
      if (modelName !== "") {
        const products = await Product.find({
          productType: "Tempered Glass",
          productName: modelName,
        });
        return res.status(200).json(products);
      } else if (brand !== "") {
        const products = await Product.find({
          productType: "Tempered Glass",
          brand: brand,
        });
        return res.status(200).json(products);
      } else {
        const products = await Product.find({
          productType: "Tempered Glass",
        });
        return res.status(200).json(products);
      }

      //   if (brand === "") {
      //     const products = await Product.find({
      //       productType: "Tempered Glass",
      //     });
      //     res.status(200).json(products);
      //   } else {
      //     const products = await Product.find({
      //       productType: "Tempered Glass",
      //       brand: brand,
      //     });
      //     res.status(200).json(products);
      //   }
      // } else {
      //   const products = await Product.find();
      //   res.status(200).json(products);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).send();
  }
};

module.exports = products;
