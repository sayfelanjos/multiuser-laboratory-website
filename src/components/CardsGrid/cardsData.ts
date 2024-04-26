type Card = {
  id: number;
  image: string;
  title: string;
  link: string;
};
export const cardsData: Card[] = [
  {
    id: 1,
    image: require("../../assets/images/istockphoto-1220425228-286x180.jpg"),
    title: "Ensaio de Tenacidade",
    link: "/service/tenacity-test",
  },
  {
    id: 2,
    image: require("../../assets/images/istockphoto-1220425228-286x180.jpg"),
    title: "Ensaio de Compressão",
    link: "/service/compression-test",
  },
  {
    id: 3,
    image: require("../../assets/images/istockphoto-1220425228-286x180.jpg"),
    title: "Ensaio de Tração",
    link: "/service/tensile-test",
  },
  {
    id: 4,
    image: require("../../assets/images/istockphoto-1220425228-286x180.jpg"),
    title: "Ensaio de Fadiga",
    link: "/service/fatigue-test",
  },
  {
    id: 5,
    image: require("../../assets/images/istockphoto-1220425228-286x180.jpg"),
    title: "Ensaio de Flexão",
    link: "/service/flexion-test",
  },
  {
    id: 6,
    image: require("../../assets/images/istockphoto-1220425228-286x180.jpg"),
    title: "Ensaio de Impacto Charpy",
    link: "/service/charpy-impact-test",
  },
];
