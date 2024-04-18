type Card = {
  id: number;
  image: string;
  title: string;
  link: string;
};
export const cardsData: Card[] = [
  {
    id: 1,
    image: require("../../assets/images/istockphoto-682025038-1024x1024.jpg"),
    title: "Ensaio de Tenacidade a Fratura CTOD",
    link: "/service/tenacity-test",
  },
  {
    id: 2,
    image: require("../../assets/images/istockphoto-682025038-1024x1024.jpg"),
    title: "Ensaio de Tenacidade a Fratura K1C",
    link: "/service/tenacity-test",
  },
  {
    id: 3,
    image: require("../../assets/images/istockphoto-682025038-1024x1024.jpg"),
    title: "Ensaio de Tenacidade a Fratura J1C",
    link: "/service/tenacity-test",
  },
  {
    id: 4,
    image: require("../../assets/images/istockphoto-682025038-1024x1024.jpg"),
    title: "Ensaio de Compressão",
    link: "/service/compression-test",
  },
  {
    id: 5,
    image: require("../../assets/images/istockphoto-682025038-1024x1024.jpg"),
    title: "Ensaio de Tração",
    link: "/service/tensile-test",
  },
  {
    id: 6,
    image: require("../../assets/images/istockphoto-682025038-1024x1024.jpg"),
    title: "Ensaio de Fadiga de Alto Ciclo",
    link: "/service/fatigue-test",
  },
  {
    id: 7,
    image: require("../../assets/images/istockphoto-682025038-1024x1024.jpg"),
    title: "Ensaio de Fadiga de Baixo Ciclo",
    link: "/service/fatigue-test",
  },
  {
    id: 8,
    image: require("../../assets/images/istockphoto-682025038-1024x1024.jpg"),
    title: "Ensaio de Flexão",
    link: "/service/flexion-test",
  },
  {
    id: 9,
    image: require("../../assets/images/istockphoto-682025038-1024x1024.jpg"),
    title: "Ensaio de Impacto Charpy",
    link: "/service/charpy-impact-test",
  },
  {
    id: 10,
    image: require("../../assets/images/istockphoto-682025038-1024x1024.jpg"),
    title: "Ensaio de Fadiga Axial",
    link: "/service/fatigue-test",
  },
];
