export interface Card {
  id: number;
  image: string;
  title: string;
  text: string;
  link: string;
}

export enum laboratoryCardEnum {
  LMU,
  LEM,
  Metallography,
  ScanningMicroscopy,
  TermoAnalysis,
  TransmissionMicroscopy
}

export interface CardsLaboratory {
  laboratory: laboratoryCardEnum
}

export const cardsData = (laboratory: laboratoryCardEnum): Card[] => {
  switch(laboratory){
    case laboratoryCardEnum.LMU:
      return [ 
        {
          id: 1,
          image: require("../../assets/images/lmu-images/ens.tenacity.1.jpeg"),
          title: "Laboratório de Ensaios Mecânicos",
          text: `O Laboratório de Ensaios Mecânicos realiza análises e testes que avaliam o comportamento e as 
                  propriedades de materiais e componentes sob diferentes condições de carga. Atuando em ensino,
                  pesquisa e extensão, o LEM oferece suporte técnico e científico para o desenvolvimento de novos materiais, controle de qualidade, inovação tecnológica 
                  e investigação de falhas,garantindo segurança, confiabilidade e desempenho em aplicações industriais e acadêmicas.`,
          link: "/laboratories/mechanical-testing-laboratory",
        },
      ];
    case laboratoryCardEnum.LEM:
      return [
        {
          id: 1,
          image: require("../../assets/images/lmu-images/ens.tenacity.1.jpeg"),
          title: "Ensaio de Tenacidade",
          text: `Ensaio de tenacidade a fratura CTOD
          O ensaio consiste em avaliar um corpo de prova com um entalhe de tamanho especificado de acordo com as normas (BS 7448-1, ASTM E1290 e ASTM E1820), verificando o quanto ele resiste até sua fratura total ocorrer. Em resumo, o ensaio de CTOD consiste no carregamento de um corpo de prova, em tração ou flexão, dependendo do tipo de corpo de prova, confeccionado com um entalhe e uma pré-trinca obtida por fadiga. É utilizado o controle de deslocamento com taxa constante. O objetivo é determinar o valor de CTOD característico associado ao material. Este ensaiado é apropriado para materiais que apresentem transição de comportamento dúctil-frágil, como os aços de estrutura ferrítica
          Ensaio de tenacidade a fratura K1C
          O fator de intensidade de tensão crítico K1C descreve a resistência do material ao crescimento da trinca. O fator de intensidade de tensão também é chamado de tenacidade da trinca ou tenacidade da fratura. A ASTM E399 descreve a determinação do valor característico do material da mecânica da fratura com carga cíclica e amplitude constante. O crescimento da fissura de uma material é descrito na curva de crescimento da fissura. Essa curva é subdivida em três segmentos: Segmento I: baixa velocidade de crescimento da trinca, valor inicial dKth onde o crescimento da trinca acabou de começar Segmento II: velocidade constante de crescimento da trinca, é descrita matematicamente por meio da reta de Paris, Crescimento da trinca por fadiga da/dN Segmento III: alta velocidade de crescimento da trinca, termina com a ruptura forçada, fator crítico de intensidade de tensão K1C A ASTM E399 para determinação do fator de intensidade de tensão crítico K1C se refere ao segmento III da curva de crescimento da trinca. A determinação K1C é normalmente feita com materiais quebradiços. Primeiramente é produzida uma trinca definida na amostra por meio de alimentação elétrica conforme ASTM E399. 2,5% antes de alcançar o comprimento de trinca definido a intensidade de tensão será reduzida. No passo subsequente, a amostra será puxada constantemente até a ruptura e até alcançar o valor KQ. Após o ensaio, o valor KQ apurado é colocado em relação à largura da amostra, ao comprimento da trinca e ao limite de elasticidade do material. Quando a relação está em conformidade com o critério de validade mínimo definido na norma, o valor KQ será declarado um valor K1C válido. O crescimento da trinca será determinado com o auxílio de um extensômetro de propagação de trinca adequado e com o método matemático de compliance. Além das amostras compactas (CT) muito utilizadas também poderão ser utilizadas amostras de flexão (SEB) para determinar a intensidade de tensão crítica K1C.`,
          link: "/service/tenacity-test",
        },
        {
          id: 2,
          image: require("../../assets/images/lmu-images/ens.cmprss-osso.3.jpeg"),
          title: "Ensaio de Compressão",
          text: `Ensaios de compressão são executados para caracterizar o comportamento de um material quando exposto à pressão. Durante o ensaio, uma amostra é submetida a uma carga de compressão com o auxílio de placas de compressão ou ferramentas específicas montadas sobre uma máquina universal para ensaios para determinar diferentes características do material sendo testado. Os dados do ensaio fornecem resultados em forma de um diagrama tensão-deformação o qual demonstra, entre outros o limite de elasticidade, o limite de proporcionalidade, o limite de escoamento e, em alguns casos, a resistência à compressão. Um ensaio de compressão no qual a amostra é comprimida é no fundo o oposto de um ensaio de tração, no qual a amostra é puxada pela força até a ruptura. Os ensaios podem ser feitos em amostras de materiais preparadas ou nos próprios componentes de tamanho original e/ou componentes feitos à escala. Tipos comuns de ensaios de compressão são o ensaio de recalcamento, o ensaio de flexão e o ensaio de mola.`,
          link: "/service/compression-test",
        },
        {
          id: 3,
          image: require("../../assets/images/lmu-images/ens.trac-cpr.prov.cilindr-extens.jpg"),
          title: "Ensaio de Tração",
          text: `O ensaio de tração é um método de ensaio para ensaios mecânicos de materiais para a determinação de valores característicos de materiais. Ele é usado - dependendo do material - como método padrão em conformidade com a respectiva norma respectiva norma (ASTM, ABNT, DIN etc.) para determinação do limite de escoamento, da resistência à tração, da deformação na ruptura e outros valores característicos de materiais. Os ensaios de tração fazem parte no ensaio mecânico de materiais, ao lado da medição da dureza, dos ensaios mais frequentemente executados. Eles são utilizados para a caracterização do comportamento de resistência e de deformação quando exposto ao estresse por tração. No ensaio de tração uma amostra de material é esticada até a ruptura. Durante o ensaio de tração é feita a medição da força e da extensão da amostra, sendo plotados em um software para análises posteriores ou para comparações entre as amostras.`,
          link: "/service/tensile-test",
        },
        {
          id: 4,
          image: require("../../assets/images/tensile-test.png"),
          title: "Ensaio de Fadiga",
          text: `Ensaio de Fadiga de baixo ciclo
          O ensaio de Low Cycle Fatigue (LCF) conforme ISO 12106 e ASTM E606 é um ensaio de fadiga no qual uma carga cíclica é simulada até a falha. O estresse no ensaio de Low Cycle Fatigue é composto por uma fase de deformação elástica e uma fase de deformação plástica. Enquanto na faixa elástica existe uma correlação linear entre tensão e deformação (Lei de Hook), na faixa plástica ela não é linear. A consequência disso é um loop de histerese. Os ensaios de Low Cycle Fatigue conforme ISO 12106 / ASTM E606 são realizados com amplitude constante. Adicionalmente, tempos de espera podem ser inseridos para analisar também processos de fluência/ de relaxação. Como valor definido é utilizado um triângulo ou ou trapézio para tempos de espera. Para a simulação de cargas operacionais específicas também outros intervalos de deformação são possíveis. Dessa forma, também ensaios de Low Cycle Fatigue são realizados com uma vibração superimposta de frequência maior. A frequência do ensaio é normalmente inferior a / igual a 1 Hz.
          Ensaio de Fadiga de Alto ciclo
          No ensaio de fadiga são determinados o limite de fadiga e a resistência à fadiga de materiais ou componentes. Para tal, várias amostras são expostas à carga cíclica. O ensaio Wöhler é executado até que ocorra uma falha definida da amostra (ruptura, trinca). No ensaio Wöhler um número de ciclos (número limite de ciclos) é definido. Quando uma amostra alcança o número de ciclos limite sem falha detectável, ela será considerada como durável ou como amostra aprovada. Tensão média, tensão máxima e tensão mínima da carga cíclica são constantes para todos os ensaios de fadiga. Nos ensaios com a mesma curva de Wöhler é modificada apenas a tensão média ou apenas a relação entre a tensão máxima e a tensão mínima. Flexão`,
          link: "/service/fatigue-test",
        },
        {
          id: 5,
          image: require("../../assets/images/lmu-images/ens.fadg-cel.crg-150-fletido.jpg"),
          title: "Ensaio de Flexão",
          text: `Dependendo do material podem ser detectadas diferentes características de material. Os resultados e/ou valores característicos do ensaio de flexão demonstram especialmente o comportamento do material junto à superfície da amostra. Em comparação aos ensaios de tração, as deflexões medidas são cerca de quatro vezes maiores que as mudanças de comprimento registradas no ensaio de tração. Distinguem-se 3 tipos de ensaios de flexão: Ensaios de flexão de 2 pontos Ensaios de flexão de 3 pontos Ensaios de flexão de 4 pontos No ensaio de flexão de 2 pontos, a amostra é fixada em uma extremidade e no lado livre, ela é submetida à carga de um pistão de ensaio. O dispositivo de flexão de 2 pontos é adequado para o ensaio de papel, papelão e películas. Desta forma, a rigidez à flexão é determinada de acordo com o método de barras e/ou da resistência à flexão em papel, papelão e caixa de papelão, por ex. conforme DIN 53121,ISO 5628 e DIN 19304, películas de plástico conforme DIN 53350 e têxteis revestidos. Dispositivo de flexão de 3 pontos O dispositivo de carga consiste de dois apoios paralelos para a amostra e um cutelo que aplica a carga sobre a amostra de forma centralizada entre os apoios. Tanto os apoios quanto o cutelo devem ser alojados em mancais de forma fixa, giratória ou basculante, dependendo do requisito de ensaio (norma) de modo que o respectivo ensaio pode ser executado em conformidade com os requisitos. O ensaio é utilizado principalmente para materiais viscosos e elásticos. Para minimizar no ensaio as influências por fricção, os apoios podem ser alojados de forma giratória ao redor de seu eixo longitudinal. Para assegurar o paralelismo do cutelo e do apoio de flexão com a amostra, eles podem ser alojados de forma basculante.`,
          link: "/service/flexion-test",
        },
        {
          id: 6,
          image: require("../../assets/images/lmu-images/charpy.2.jpg"),
          title: "Ensaio de Impacto Charpy",
          text: `O ensaio mede a quantidade de energia absorvida pelo impacto de um martelo/pêndulo de energia total conhecida, contra um corpo de prova padronizado em determinada temperatura. A energia absorvida até o rompimento do corpo de prova está relacionada à tenacidade do material e pode ser medida em diferentes temperaturas. A posição do corpo de prova e do entalhe devem ser criticamente avaliadas, para que o ensaio forneça resultados adequados e condizentes com a aplicação do componente. O ensaio de resistência ao impacto, além de determinar a energia absorvida, pode ser utilizado para se obter a curva de transição frágil-dúctil em materiais que apresentam esse fenômeno. Também pode ser utilizado para se obter estimativas indiretas da tenacidade do material.`,
          link: "/service/charpy-impact-test",
        },
      ];
    default:
      return [];  
  }  
};
