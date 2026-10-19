/*
 * Conteúdo editável do site.
 * Para atualizar preços, portfólio ou flashes, edite apenas este arquivo.
 * Imagens podem ser caminhos locais (assets/img/...) ou URLs externas.
 */
window.SITE = {
  studio: {
    name: "Bad Luck Tattoo & Piercing",
    since: 2021,
    address: "Rua Monsenhor Costa, 56 — sala 101",
    district: "Centro, Barra Mansa — RJ",
    cep: "27330-390",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rua+Monsenhor+Costa+56+Centro+Barra+Mansa+RJ+27330-390",
    instagram: "https://www.instagram.com/badlucktattoepiercing/",
    instagramHandle: "@badlucktattoepiercing",
  },

  artists: {
    fran: {
      name: "Fran",
      role: "Piercer",
      service: "piercing",
      whatsapp: "5524999860188",
      phoneLabel: "(24) 99986-0188",
      instagram: "https://www.instagram.com/piercer_fraan/",
      instagramHandle: "@piercer_fraan",
    },
    italo: {
      name: "Italo Nogueira",
      role: "Tatuador",
      service: "tattoo",
      whatsapp: "5524999297145",
      phoneLabel: "(24) 99929-7145",
      instagram: "https://www.instagram.com/itallo.ttt/",
      instagramHandle: "@itallo.ttt",
      externalPortfolio: "https://contate.me/itallotattoo",
    },
  },

  // Onde furar — usado no explorador e no formulário de agendamento.
  piercingAreas: [
    {
      id: "orelha",
      label: "Orelha",
      ear: true,
      text: "Lóbulo, helix, tragus, conch, rook e composições — dá pra montar uma curadoria inteira na orelha.",
      from: "Perfurações a partir de R$ 60",
    },
    {
      id: "nariz",
      label: "Nariz",
      icon: "dring",
      text: "Aba nasal com joia em aço cirúrgico ou titânio, e D ring pra quem quer um visual delicado.",
      from: "Aba nasal: R$ 60 (aço) · R$ 80 (titânio)",
    },
    {
      id: "boca",
      label: "Boca",
      icon: "labret",
      text: "Labret e variações com joias em titânio, do ponto de luz minimalista às peças com pedras.",
      from: "Perfurações a partir de R$ 60",
    },
    {
      id: "umbigo",
      label: "Umbigo",
      img: "assets/img/piercing/umbigo.webp",
      text: "Clássico que nunca sai de moda, com joias pensadas pra sua anatomia.",
      from: "Perfurações a partir de R$ 60",
    },
    {
      id: "mamilo",
      label: "Mamilo",
      icon: "barbell",
      text: "Feito com cuidado, privacidade e joia em titânio.",
      from: "Joia em titânio a partir de R$ 60",
    },
    {
      id: "surface",
      label: "Surface / Microdermal",
      img: "assets/img/piercing/surface-colo.webp",
      text: "Especialidade da Fran: pontos de luz na pele, no colo, rosto ou onde a anatomia permitir.",
      from: "Surface a partir de R$ 150",
    },
    {
      id: "intima",
      label: "Perfuração íntima",
      icon: "gem",
      text: "Atendimento reservado e acolhedor, com toda a orientação antes e depois.",
      from: "Valor sob consulta",
    },
  ],

  // Pontos do mapa da orelha (x/y em % da ilustração).
  earSpots: [
    { id: "helix", label: "Helix", x: 86, y: 30, text: "Na borda superior da orelha. Fica lindo com argola ou ponto de luz." },
    { id: "forward", label: "Forward helix", x: 42, y: 21, text: "Pertinho do rosto, perfeito para composições delicadas." },
    { id: "flat", label: "Flat", x: 67, y: 25, text: "A área lisa do topo: tela perfeita para joias maiores, com pedras." },
    { id: "rook", label: "Rook", x: 56, y: 36, text: "Na dobra interna superior. Depende da anatomia — a Fran avalia com você." },
    { id: "daith", label: "Daith", x: 52, y: 46, text: "A dobra mais interna, geralmente com argola." },
    { id: "conch", label: "Conch", x: 66, y: 56, text: "No centro da orelha: espaço para joias com desenho e brilho." },
    { id: "tragus", label: "Tragus", x: 37, y: 60, text: "A cartilagem em frente ao canal auditivo. Discreto e elegante." },
    { id: "lobulo", label: "Lóbulo", x: 55, y: 88, text: "O clássico. Ideal para o primeiro furo ou para compor várias joias." },
  ],

  // Catálogo de joias (valores de referência do catálogo do WhatsApp da Fran).
  jewelry: [
    { id: "argola", name: "Argola", material: "Titânio", price: 60, from: true, icon: "ring" },
    { id: "dring", name: "D ring aba nasal", material: "Titânio", price: 45, from: false, icon: "dring" },
    { id: "basica", name: "Joia básica", material: "Titânio", price: 40, from: true, icon: "stud" },
    { id: "labret", name: "Labret", material: "Titânio", price: 50, from: true, icon: "labret" },
    { id: "mamilo", name: "Joia de mamilo", material: "Titânio", price: 60, from: true, icon: "barbell" },
    { id: "pontoluz", name: "Ponto de luz", material: "Titânio · só a joia", price: 40, from: true, icon: "gem" },
  ],

  piercingGallery: [
    { src: "assets/img/piercing/orelha-ramo.webp", alt: "Joia de ramo com zircônias no helix", title: "Helix · ramo" },
    { src: "assets/img/piercing/surface-colo.webp", alt: "Microdermal no colo entre tatuagens", title: "Microdermal no colo" },
    { src: "assets/img/piercing/umbigo.webp", alt: "Piercing de umbigo com duas pedras", title: "Umbigo" },
    { src: "assets/img/piercing/orelha-borboleta.webp", alt: "Joia de borboleta com pedras na orelha", title: "Orelha · borboleta" },
    { src: "assets/img/piercing/dermal.webp", alt: "Surface com duas pedras", title: "Surface" },
  ],

  // Portfólio do Italo.
  // tags: "colorido" | "blackwork" | "fineline"
  // link (opcional): post no Instagram ou qualquer página externa.
  portfolio: [
    { src: "assets/img/tattoo/dragao.webp", alt: "Dragão old school colorido no antebraço", title: "Dragão", tags: ["colorido"], link: "https://www.instagram.com/itallo.ttt/" },
    { src: "assets/img/tattoo/pantera-isp.webp", alt: "Cabeça de pantera old school com boné vermelho", title: "Pantera", tags: ["colorido"] },
    { src: "assets/img/tattoo/prisoner.webp", alt: "Mão verde com máquina de tattoo e banner Prisoner of the Grind", title: "Prisoner of the Grind", tags: ["colorido"] },
    { src: "assets/img/tattoo/gato.webp", alt: "Gato preto old school com flor colorida", title: "Gato & flor", tags: ["colorido"] },
    { src: "assets/img/tattoo/pantera-coracoes.webp", alt: "Pantera preta com corações vermelhos", title: "Pantera de corações", tags: ["colorido"] },
    { src: "assets/img/tattoo/rosa.webp", alt: "Rosa com teia de aranha em tons de azul", title: "Rosa & teia", tags: ["colorido"] },
    { src: "assets/img/tattoo/adaga-caveira.webp", alt: "Caveira atravessada por adaga em pontilhismo", title: "Adaga & caveira", tags: ["blackwork"] },
    { src: "assets/img/tattoo/ceifador.webp", alt: "Ceifador em preto e cinza", title: "Ceifador", tags: ["blackwork"] },
    { src: "assets/img/tattoo/morcego-demonio.webp", alt: "Cabeça de morcego demoníaco em blackwork", title: "Morcego", tags: ["blackwork"] },
    { src: "assets/img/tattoo/morcego-braco.webp", alt: "Asa de morcego em blackwork no braço", title: "Asa", tags: ["blackwork"] },
    { src: "assets/img/tattoo/flor.webp", alt: "Flor pequena em traço preto", title: "Flor", tags: ["blackwork", "fineline"] },
    { src: "assets/img/tattoo/borboleta.webp", alt: "Borboleta em preto e cinza no ombro", title: "Borboleta", tags: ["blackwork", "fineline"] },
    { src: "assets/img/tattoo/escrita.webp", alt: "Frase em letra cursiva no antebraço", title: "Lettering", tags: ["fineline"] },
  ],

  // Flashes prontos para tatuar.
  // DEMO: imagens do portfólio usadas como exemplo — trocar pelas artes reais do Italo.
  flashes: [
    { id: "pantera", name: "Pantera de corações", size: "≈ 12 cm", price: "Sob consulta", src: "assets/img/tattoo/pantera-coracoes.webp" },
    { id: "adaga", name: "Adaga & caveira", size: "≈ 15 cm", price: "Sob consulta", src: "assets/img/tattoo/adaga-caveira.webp" },
    { id: "gato", name: "Gato & flor", size: "≈ 12 cm", price: "Sob consulta", src: "assets/img/tattoo/gato.webp" },
    { id: "rosa", name: "Rosa & teia", size: "≈ 10 cm", price: "Sob consulta", src: "assets/img/tattoo/rosa.webp" },
    { id: "morcego", name: "Morcego", size: "≈ 10 cm", price: "Sob consulta", src: "assets/img/tattoo/morcego-demonio.webp" },
  ],

  faq: [
    {
      q: "Preciso agendar?",
      a: "Sim. O atendimento é com hora marcada, assim cada cliente tem o tempo e a atenção que merece. Use o agendamento do site e a mensagem já chega pronta no WhatsApp certo.",
    },
    {
      q: "Quero tattoo e piercing. Falo com quem?",
      a: "Com os dois! No agendamento escolha “Os dois” e o site prepara uma mensagem para a Fran (piercing) e outra para o Italo (tattoo).",
    },
    {
      q: "As joias são de quê?",
      a: "Trabalhamos com joias em titânio e aço cirúrgico. A Fran te ajuda a escolher a melhor opção para o seu piercing.",
    },
    {
      q: "Posso levar minha própria ideia de tattoo?",
      a: "Pode e deve. O Italo faz projetos autorais e também tattoos a partir da sua referência — além dos flashes prontos.",
    },
    {
      q: "Como é a higiene?",
      a: "Todo procedimento segue protocolo asséptico. Ficou com dúvida sobre o processo? Pergunte no atendimento — a gente explica tudo.",
    },
  ],
};
