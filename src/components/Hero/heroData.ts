type HeroData = {
  id: number;
  label: string;
  summary: string;
  imagePath: string;
  imageDesc: string;
  imageSet: string;
  imageSizes: string;
  buttonText: string;
  buttonLink: string;
};
export const heroData: HeroData[] = [
  {
    id: 1,
    label: "Slide 1",
    summary: "A summary of the hero",
    imagePath: require("../../assets/images/AdobeStock_731454678-1280x720.jpg"),
    imageSet: `${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 576w,
      ${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 768w,
      ${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 992w,
      ${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 1200w,
      ${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 1280w`,
    imageSizes:
      "(max-width: 576px) 100vw," +
      "(min-width: 768px) 100vw," +
      "(min-width: 992px) 100vw," +
      "(min-width: 1200px) 100vw)," +
      "100vw",
    imageDesc: "Description of de image",
    buttonText: "Saiba Mais",
    buttonLink: "#",
  },
  {
    id: 2,
    label: "Slide 2",
    summary: "A summary of the hero",
    imagePath: require("../../assets/images/AdobeStock_731454678-1280x720.jpg"),
    imageSet: `${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 576w,
      ${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 768w,
      ${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 992w,
      ${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 1200w,
      ${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 1280w`,
    imageSizes:
      "(max-width: 576px) 100vw," +
      "(min-width: 768px) 100vw," +
      "(min-width: 992px) 100vw," +
      "(min-width: 1200px) 100vw)," +
      "100vw",
    imageDesc: "Description of de image",
    buttonText: "Saiba Mais",
    buttonLink: "#",
  },
  {
    id: 3,
    label: "Slide 3",
    summary: "A summary of the hero",
    imagePath: require("../../assets/images/AdobeStock_731454678-1280x720.jpg"),
    imageSet: `${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 576w,
      ${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 768w,
      ${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 992w,
      ${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 1200w,
      ${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 1280w`,
    imageSizes:
      "(max-width: 576px) 100vw," +
      "(min-width: 768px) 100vw," +
      "(min-width: 1200px) 100vw," +
      "(min-width: 1200px) 100vw)," +
      "100vw",
    imageDesc: "Description of de image",
    buttonText: "Saiba Mais",
    buttonLink: "#",
  },
  {
    id: 4,
    label: "Slide 4",
    summary: "A summary of the hero",
    imagePath: require("../../assets/images/AdobeStock_731454678-1280x720.jpg"),
    imageSet: `${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 576w,
      ${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 768w,
      ${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 992w,
      ${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 1200w,
      ${require("../../assets/images/AdobeStock_731454678-1280x720.jpg")} 1280w`,
    imageSizes:
      "(max-width: 576px) 100vw," +
      "(min-width: 768px) 100vw," +
      "(min-width: 1200px) 100vw," +
      "(min-width: 1400px) 100vw)," +
      "100vw",
    imageDesc: "Description of de image",
    buttonText: "Saiba Mais",
    buttonLink: "#",
  },
];
