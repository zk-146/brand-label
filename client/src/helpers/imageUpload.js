export const imageUpload = async (media) => {
  const data = new FormData();
  data.append("file", media);
  data.append("upload_preset", "brandlabel");
  data.append("cloud_name", "zk146");
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/zk146/image/upload",
    { method: "POST", body: data }
  );
  const res2 = await res.json();
  return res2.url;
};
