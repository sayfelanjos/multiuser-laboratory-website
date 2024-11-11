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
    label: "Engenharia",
    summary:
      "Planejamento é a chave para o sucesso do seu projeto, mas antes que ele se torne realidade é preciso testá-lo",
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
    label: "Precisão",
    summary:
      "As vezes 1mm pode estar entre o sucesso e o fracasso do seu projeto",
    imagePath: require("../../assets/images/Pachymeter-1280x720.jpeg"),
    imageSet: `${require("../../assets/images/Pachymeter-1280x720.jpeg")} 576w,
      ${require("../../assets/images/Pachymeter-1280x720.jpeg")} 768w,
      ${require("../../assets/images/Pachymeter-1280x720.jpeg")} 992w,
      ${require("../../assets/images/Pachymeter-1280x720.jpeg")} 1200w,
      ${require("../../assets/images/Pachymeter-1280x720.jpeg")} 1280w`,
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
    label: "Academia",
    summary:
      "Seja para o seu trabalho da faculdade ou para sua pesquisa científica, estudantes podem obter relatórios de testes mais precisos e realísticos",
    imagePath: require("../../assets/images/students-researching-1280x717.jpg"),
    imageSet: `${require("../../assets/images/students-researching-1280x717.jpg")} 576w,
      ${require("../../assets/images/students-researching-1280x717.jpg")} 768w,
      ${require("../../assets/images/students-researching-1280x717.jpg")} 992w,
      ${require("../../assets/images/students-researching-1280x717.jpg")} 1200w,
      ${require("../../assets/images/students-researching-1280x717.jpg")} 1280w`,
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
    label: "P&D",
    summary:
      "Pesquisadores podem se beneficiar dos testes mecânicos para garantir o sucesso de trabalho",
    imagePath: require("../../assets/images/robotic-hand-1280x717.jpg"),
    imageSet: `${require("../../assets/images/robotic-hand-1280x717.jpg")} 576w,
      ${require("../../assets/images/robotic-hand-1280x717.jpg")} 768w,
      ${require("../../assets/images/robotic-hand-1280x717.jpg")} 992w,
      ${require("../../assets/images/robotic-hand-1280x717.jpg")} 1200w,
      ${require("../../assets/images/robotic-hand-1280x717.jpg")} 1280w`,
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
  {
    id: 5,
    label: "Empresas",
    summary:
      "Empresas podem contar com a expertise dos nossos professores e estudantes universitários para testar a qualidade dos seus produtos antes de colocá-los no mercado",
    imagePath: require("../../assets/images/industry-40-1280x853.jpg"),
    imageSet: `${require("../../assets/images/industry-40-1280x853.jpg")} 576w,
      ${require("../../assets/images/industry-40-1280x853.jpg")} 768w,
      ${require("../../assets/images/industry-40-1280x853.jpg")} 992w,
      ${require("../../assets/images/industry-40-1280x853.jpg")} 1200w,
      ${require("../../assets/images/industry-40-1280x853.jpg")} 1280w`,
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
  {
    id: 6,
    label: "Governo",
    summary:
      "Entidades governamentais podem utilizar de nossos serviços para perícias e outros trabalhos técnicos",
    imagePath: require("../../assets/images/closeup-of-geologist-examining-rock-1280x853.jpg"),
    imageSet: `${require("../../assets/images/closeup-of-geologist-examining-rock-1280x853.jpg")} 576w,
      ${require("../../assets/images/closeup-of-geologist-examining-rock-1280x853.jpg")} 768w,
      ${require("../../assets/images/closeup-of-geologist-examining-rock-1280x853.jpg")} 992w,
      ${require("../../assets/images/closeup-of-geologist-examining-rock-1280x853.jpg")} 1200w,
      ${require("../../assets/images/closeup-of-geologist-examining-rock-1280x853.jpg")} 1280w`,
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
