import axios from "../axios";
import { imageUpload } from "./imageUpload";

const handleSubmitEdit = async (
  mediaUrls,
  setMediaUrls,
  medias,
  setProductUploaded,
  productUploadedTime,
  id,
  productType,
  name,
  sellingPrice,
  description,
  mrp,
  color,
  smartWatchStyle,
  quantity,
  displayProduct,
  materialType,
  brand,
  productName
) => {
  const handleMediaUrls = async (mediaUrl, index) => {
    let tempMediaUrls = [...mediaUrls];
    tempMediaUrls[index].url = mediaUrl;
    setMediaUrls(tempMediaUrls);
  };
  if (medias[0].media) {
    const imageUrl1 = await imageUpload(medias[0].media);
    handleMediaUrls(imageUrl1, 0);
  }
  if (medias[1].media) {
    const imageUrl2 = await imageUpload(medias[1].media);
    handleMediaUrls(imageUrl2, 1);
  }
  if (medias[2].media) {
    const imageUrl3 = await imageUpload(medias[2].media);
    handleMediaUrls(imageUrl3, 2);
  }
  if (medias[3].media) {
    const imageUrl4 = await imageUpload(medias[3].media);
    handleMediaUrls(imageUrl4, 3);
  }
  if (medias[4].media) {
    const imageUrl5 = await imageUpload(medias[4].media);
    handleMediaUrls(imageUrl5, 4);
  }

  const res = await axios.put("/edit", {
    pid: id,
    productType,
    name,
    sellingPrice,
    mrp,
    description,
    mediaUrl1: mediaUrls[0].url,
    mediaUrl2: mediaUrls[1].url,
    mediaUrl3: mediaUrls[2].url,
    mediaUrl4: mediaUrls[3].url,
    mediaUrl5: mediaUrls[4].url,
    color,
    style: smartWatchStyle,
    quantity,
    displayProduct,
    materialType,
    brand,
    productName,
  });
  console.log(res);
  if (res.error) {
    console.log("ERROR:", res.error);
  } else {
    setProductUploaded(true);
    productUploadedTime();
  }
};

export default handleSubmitEdit;
