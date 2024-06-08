const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME || "Your Cloud Name",
  api_key: process.env.API_KEY || "Your API Key",
  api_secret: process.env.API_SECRET || "Your API Secret",
});

const images = [
  "public/images/ball-track-CT.jpeg",
  "public/images/biscuit-DT.jpeg",
  "public/images/cat-food-2-CF.jpeg",
  "public/images/cat-food-CF.jpeg",
  "public/images/chew-DT.jpg",
  "public/images/crunchy-bites-CT.jpeg",
  "public/images/dental-chew-DT.jpg",
  "public/images/dental-CT.jpeg",
  "public/images/featch-ball-DT.jpg",
  "public/images/feather-wand-CT.jpeg",
  "public/images/freeze-dried-DT.jpeg",
  "public/images/hairball-CT.jpg",
  "public/images/indoor-CF.jpeg",
  "public/images/interactive-DT.jpg",
  "public/images/jerky-DT.jpeg",
  "public/images/laser-CT.jpeg",
  "public/images/mice-CT.jpeg",
  "public/images/no-grain-CF.jpeg",
  "public/images/nutrient-CT.jpeg",
  "public/images/organic-DF.jpeg",
  "public/images/puppy-chow-DF.jpg",
  "public/images/puzzle-DT.jpeg",
  "public/images/rawhide-DT.jpeg",
  "public/images/rubber-DT.jpg",
  "public/images/salmon-tuna-chicken-CT.jpeg",
  "public/images/scratch-CT.jpeg",
  "public/images/senior-cat-CF.jpeg",
  "public/images/senior-DF.webp",
  "public/images/soft-CT.jpg",
  "public/images/soft-DT.jpeg",
  "public/images/squeaky-DT.jpg",
  "public/images/teaser-CT.jpeg",
  "public/images/tug-of-war-DT.jpg",
  "public/images/tunnel-CT.jpeg",
  "public/images/variety-DF.jpeg",
  "public/images/vegetable-DT.jpeg",
  "public/images/weight-management-DF.jpeg",
  "public/images/wet-DF.webp",
  "public/images/wet-food-CF.jpeg",
];

const imagesToUpload = async (image) => {
  const matched = image.match(/([^/]+?)(?=\.[^/.]*$)/);
  const fileName = matched ? matched[0] : null;
  if (!fileName) {
    throw new Error("No file name found");
  }

  return await cloudinary.uploader.upload(image, {
    folder: "pet-store",
    public_id: fileName,
    transformation: [{ width: 500, height: 500 }, { quality: "auto" }],
  });
};

(async () => {
  try {
    const uploads = await Promise.all(images.map(imagesToUpload));
    console.log(uploads);
  } catch (error) {
    console.error("Error uploading images:", error);
  }
})();
