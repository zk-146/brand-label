const pattern = /^[0-9]*$/;

export const priceChange = (event, setSellingPrice) => {
  if (pattern.test(event.target.value)) {
    setSellingPrice(event.target.value);
  } else {
    setSellingPrice("");
  }
};

export const mrpChange = (event, setMrp) => {
  if (pattern.test(event.target.value)) {
    setMrp(event.target.value);
  } else {
    setMrp("");
  }
};

export const quantityChange = (event, setQuantity) => {
  if (pattern.test(event.target.value)) {
    setQuantity(event.target.value);
  } else {
    setQuantity("");
  }
};
