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
  // map: ilustração (ver MAPS em main.js). spots: pontos clicáveis, x/y em % da ilustração.
  // pts: quando a perfuração é em par (ex.: laterais), cada item é um ponto [x, y].
  // from (opcional no spot): substitui o valor da região.
  piercingAreas: [
    {
      id: "orelha",
      label: "Orelha",
      map: "ear",
      text: "Lóbulo, helix, tragus, conch, rook e composições — dá pra montar uma curadoria inteira na orelha.",
      from: "Perfurações a partir de R$ 60",
      spots: [
        { id: "helix", label: "Helix", x: 86, y: 30, text: "Na borda superior da orelha. Fica lindo com argola ou ponto de luz." },
        { id: "forward", label: "Forward helix", x: 42, y: 21, text: "Pertinho do rosto, perfeito para composições delicadas." },
        { id: "flat", label: "Flat", x: 67, y: 25, text: "A área lisa do topo: tela perfeita para joias maiores, com pedras." },
        { id: "rook", label: "Rook", x: 56, y: 36, text: "Na dobra interna superior. Depende da anatomia — a Fran avalia com você." },
        { id: "daith", label: "Daith", x: 52, y: 46, text: "A dobra mais interna, geralmente com argola." },
        { id: "conch", label: "Conch", x: 66, y: 56, text: "No centro da orelha: espaço para joias com desenho e brilho." },
        { id: "tragus", label: "Tragus", x: 37, y: 60, text: "A cartilagem em frente ao canal auditivo. Discreto e elegante." },
        { id: "lobulo", label: "Lóbulo", x: 55, y: 88, text: "O clássico. Ideal para o primeiro furo ou para compor várias joias." },
      ],
    },
    {
      id: "nariz",
      label: "Nariz",
      map: "nose",
      text: "Do brilhinho clássico na aba nasal ao septo. Toque nos pontos e veja cada opção.",
      from: "Perfurações a partir de R$ 60",
      spots: [
        { id: "aba", label: "Aba nasal", x: 32, y: 74, text: "O famoso brilhinho no nariz: ponto de luz ou argola delicada.", from: "R$ 60 (aço) · R$ 80 (titânio)" },
        { id: "high", label: "High nostril", x: 62, y: 67.5, text: "Mais alto na aba — perfeito para compor com o brilhinho clássico." },
        { id: "septo", label: "Septo", x: 50, y: 80.5, text: "No centro do nariz, com argola ou clicker. Dá para deixar discreto quando precisar." },
        { id: "bridge", label: "Bridge", x: 50, y: 21, text: "Na ponte do nariz, entre os olhos. Visual marcante — depende da anatomia." },
      ],
    },
    {
      id: "boca",
      label: "Boca",
      map: "mouth",
      text: "Labret, laterais, medusa, smile, língua… a boca tem muita opção. Toque e descubra a sua.",
      from: "Perfurações a partir de R$ 60",
      spots: [
        { id: "labret", label: "Labret", x: 50, y: 81.5, text: "Centralizado abaixo do lábio. Clássico, com ponto de luz ou argola." },
        { id: "laterais-baixo", label: "Laterais de baixo", pts: [[29.3, 74], [70.7, 74]], text: "Um de cada lado do lábio inferior (snake bites). Lindo com argolinhas." },
        { id: "laterais-cima", label: "Laterais de cima", pts: [[28.7, 31], [71.3, 31]], text: "Monroe e Madonna: a “pintinha” acima do lábio, de um lado ou dos dois." },
        { id: "medusa", label: "Medusa", x: 50, y: 25, text: "No centro, logo acima do lábio superior. Delicado e cheio de personalidade." },
        { id: "smile", label: "Smile", x: 50, y: 45.5, text: "No freio do lábio superior — só aparece quando você sorri." },
        { id: "lingua", label: "Língua", x: 50, y: 56, text: "Barbell no centro da língua. Um clássico que nunca sai de moda." },
      ],
    },
    {
      id: "umbigo",
      label: "Umbigo",
      map: "navel",
      text: "Clássico que nunca sai de moda, com joias pensadas para a sua anatomia.",
      from: "Perfurações a partir de R$ 60",
      spots: [
        { id: "superior", label: "Superior", x: 50, y: 49, text: "O tradicional: a joia fica na borda de cima do umbigo." },
        { id: "inferior", label: "Inferior", x: 50, y: 59.5, text: "Na borda de baixo, para um visual diferente. Depende da anatomia — a Fran avalia." },
      ],
    },
    {
      id: "mamilo",
      label: "Mamilo",
      map: "nipple",
      text: "Feito com cuidado, privacidade e joia em titânio.",
      from: "Joia em titânio a partir de R$ 60",
      spots: [
        { id: "horizontal", label: "Horizontal", pts: [[28, 50], [72, 50]], text: "Barbell reto atravessando na horizontal — o mais pedido.", draw: '<rect x="84" y="196" width="132" height="8" rx="4" fill="url(#g-metal)"/><circle cx="84" cy="200" r="11" fill="url(#g-metal)"/><circle cx="216" cy="200" r="11" fill="url(#g-metal)"/>' },
        { id: "vertical", label: "Vertical", pts: [[50, 33.5], [50, 66.5]], text: "Na vertical, para quem quer algo diferente. Depende da anatomia.", draw: '<rect x="146" y="134" width="8" height="132" rx="4" fill="url(#g-metal)"/><circle cx="150" cy="134" r="11" fill="url(#g-metal)"/><circle cx="150" cy="266" r="11" fill="url(#g-metal)"/>' },
      ],
    },
    {
      id: "surface",
      label: "Surface / Microdermal",
      map: "surface",
      text: "Especialidade da Fran: pontos de luz direto na pele, no colo, clavícula, pescoço ou onde a anatomia permitir.",
      from: "Surface a partir de R$ 150",
      spots: [
        { id: "colo", label: "Microdermal no colo", x: 50, y: 78.5, text: "Um ponto de luz único, fixo na pele. Delicado e marcante.", draw: '<circle cx="150" cy="314" r="9" fill="url(#g-gem)" stroke="#cfcac4"/>' },
        { id: "clavicula", label: "Surface na clavícula", pts: [[20.7, 56.5], [32.7, 55.5]], text: "Barra por baixo da pele com duas pontas aparentes, acompanhando a clavícula.", draw: '<path d="M62 226 L98 222" stroke="#b9a59a" stroke-width="3" stroke-dasharray="4 4"/><circle cx="62" cy="226" r="7" fill="url(#g-gem)" stroke="#cfcac4"/><circle cx="98" cy="222" r="7" fill="url(#g-gem)" stroke="#cfcac4"/>' },
        { id: "pescoco", label: "Pescoço / nuca", pts: [[60.7, 23], [61.3, 33]], text: "Surface na lateral do pescoço ou na nuca. Visual ousado e elegante.", draw: '<path d="M182 92 L184 132" stroke="#b9a59a" stroke-width="3" stroke-dasharray="4 4"/><circle cx="182" cy="92" r="7" fill="url(#g-gem)" stroke="#cfcac4"/><circle cx="184" cy="132" r="7" fill="url(#g-gem)" stroke="#cfcac4"/>' },
      ],
    },
    {
      id: "intima",
      label: "Perfuração íntima",
      map: "intimate",
      text: "Atendimento reservado e acolhedor. A conversa vem antes: a Fran explica tudo, tira suas dúvidas e passa todos os cuidados, com total privacidade.",
      from: "Valor sob consulta",
      spots: [],
    },
  ],

  // Catálogo de joias (valores de referência do catálogo do WhatsApp da Fran).
  // scene: ilustração de "como fica" (ver SCENES em main.js). photo (opcional): foto real; credit "fran" ou "pexels".
  jewelry: [
    { id: "argola", name: "Argola", material: "Titânio", price: 60, from: true, icon: "ring", scene: "ear-ring", where: "no helix", credit: "pexels", photo: "https://images.pexels.com/photos/18597841/pexels-photo-18597841.jpeg?auto=compress&cs=tinysrgb&w=640" },
    { id: "dring", name: "D ring aba nasal", material: "Titânio", price: 45, from: false, icon: "dring", scene: "nose-dring", where: "na aba nasal", credit: "pexels", photo: "https://images.pexels.com/photos/3269683/pexels-photo-3269683.jpeg?auto=compress&cs=tinysrgb&w=640" },
    { id: "basica", name: "Joia básica", material: "Titânio", price: 40, from: true, icon: "stud", scene: "ear-studs", where: "no lóbulo", credit: "pexels", photo: "https://images.pexels.com/photos/19875392/pexels-photo-19875392.jpeg?auto=compress&cs=tinysrgb&w=640" },
    { id: "labret", name: "Labret", material: "Titânio", price: 50, from: true, icon: "labret", scene: "lip-labret", where: "abaixo do lábio" },
    { id: "mamilo", name: "Joia de mamilo", material: "Titânio", price: 60, from: true, icon: "barbell", scene: "barbell", where: "barbell reto" },
    { id: "pontoluz", name: "Ponto de luz", material: "Titânio · só a joia", price: 40, from: true, icon: "gem", scene: "nose-gem", where: "na pele ou no nariz", credit: "fran", photo: "assets/img/piercing/dermal.webp" },
  ],

  // PRÉVIA da lojinha de semi-joias da Fran (renders ilustrativos — trocar pelas fotos do catálogo dela).
  // Se ela não aprovar: apagar este bloco e a seção "Lojinha" do index.html.
  shop: {
    metals: [
      { id: "dourado", label: "Dourado" },
      { id: "prateado", label: "Prateado" },
      { id: "rose", label: "Rosé" },
    ],
    stones: [
      { id: "cristal", label: "Cristal" },
      { id: "rosa", label: "Rosa" },
      { id: "verde", label: "Verde" },
      { id: "azul", label: "Azul" },
    ],
    categories: [
      { id: "orelha", label: "Orelha" },
      { id: "nariz", label: "Nariz" },
      { id: "umbigo", label: "Umbigo" },
      { id: "corpo", label: "Corpo" },
    ],
    // photo: foto do card. credit "fran" = trabalho real da Fran; "pexels" = foto ilustrativa gratuita (pexels.com).
    // Se a foto externa não carregar, o card mostra o render da joia.
    products: [
      { id: "clicker", name: "Argola cravejada", cat: "orelha", shape: "clicker", stones: true, credit: "pexels", photo: "https://images.pexels.com/photos/19875392/pexels-photo-19875392.jpeg?auto=compress&cs=tinysrgb&w=640" },
      { id: "borboleta", name: "Borboleta", cat: "orelha", shape: "butterfly", stones: true, credit: "fran", photo: "assets/img/piercing/orelha-borboleta.webp" },
      { id: "ramo", name: "Ramo de folhas", cat: "orelha", shape: "branch", stones: true, credit: "fran", photo: "assets/img/piercing/orelha-ramo.webp" },
      { id: "estrela", name: "Estrela", cat: "orelha", shape: "star", stones: true, credit: "pexels", photo: "https://images.pexels.com/photos/9671580/pexels-photo-9671580.jpeg?auto=compress&cs=tinysrgb&w=640" },
      { id: "argolinha", name: "Argolinha de nariz", cat: "nariz", shape: "hoop", stones: false, credit: "pexels", photo: "https://images.pexels.com/photos/6644163/pexels-photo-6644163.jpeg?auto=compress&cs=tinysrgb&w=640" },
      { id: "septo", name: "Clicker de septo", cat: "nariz", shape: "clicker", stones: true, credit: "pexels", photo: "https://images.pexels.com/photos/19588725/pexels-photo-19588725.jpeg?auto=compress&cs=tinysrgb&w=640" },
      { id: "umbigo", name: "Joia de umbigo", cat: "umbigo", shape: "navel", stones: true, credit: "fran", photo: "assets/img/piercing/umbigo.webp" },
      { id: "pontoluz", name: "Ponto de luz", cat: "corpo", shape: "stud", stones: true, credit: "fran", photo: "assets/img/piercing/dermal.webp" },
    ],
  },

  piercingGallery: [
    { src: "assets/img/piercing/orelha-ramo.webp", alt: "Joia de ramo com zircônias no helix", title: "Helix · ramo" },
    { src: "assets/img/piercing/surface-colo.webp", alt: "Microdermal no colo entre tatuagens", title: "Microdermal no colo" },
    { src: "assets/img/piercing/umbigo.webp", alt: "Piercing de umbigo com duas pedras", title: "Umbigo" },
    { src: "assets/img/piercing/orelha-borboleta.webp", alt: "Joia de borboleta com pedras na orelha", title: "Orelha · borboleta" },
    { src: "assets/img/piercing/dermal.webp", alt: "Surface com duas pedras", title: "Surface" },
  ],

  // Portfólio do Italo.
  // tags: "colorido" | "blackwork"
  // link (opcional): post no Instagram ou qualquer página externa.
  portfolio: [
    { src: "assets/img/tattoo/dragao.webp", alt: "Dragão old school colorido no antebraço", title: "Dragão", tags: ["colorido"], link: "https://www.instagram.com/itallo.ttt/" },
    { src: "assets/img/tattoo/pantera-isp.webp", alt: "Cabeça de pantera old school com boné vermelho", title: "Pantera", tags: ["colorido"] },
    { src: "assets/img/tattoo/gato.webp", alt: "Gato preto old school com flor colorida", title: "Gato & flor", tags: ["colorido"] },
    { src: "assets/img/tattoo/pantera-coracoes.webp", alt: "Pantera preta com corações vermelhos", title: "Pantera de corações", tags: ["colorido"] },
    { src: "assets/img/tattoo/prisoner.webp", alt: "Mão verde com máquina de tattoo e banner Prisoner of the Grind", title: "Prisoner of the Grind", tags: ["colorido"] },
    { src: "assets/img/tattoo/adaga-caveira.webp", alt: "Caveira atravessada por adaga em pontilhismo", title: "Adaga & caveira", tags: ["blackwork"] },
    { src: "assets/img/tattoo/rosa.webp", alt: "Rosa com teia de aranha em tons de azul", title: "Rosa & teia", tags: ["colorido"] },
    { src: "assets/img/tattoo/morcego-demonio.webp", alt: "Cabeça de morcego demoníaco em blackwork", title: "Morcego", tags: ["blackwork"] },
  ],

  // Estilos que o Italo tatua (old school é a especialidade).
  styles: [
    { id: "oldschool", name: "Old School", note: "Especialidade", text: "Traço firme, cor chapada e clássicos atemporais.", icon: "star" },
    { id: "blackwork", name: "Blackwork", text: "Preto sólido, contraste e muita presença.", icon: "blackwork" },
    { id: "pontilhismo", name: "Pontilhismo", text: "Sombras feitas ponto a ponto, com textura única.", icon: "dots" },
    { id: "fineline", name: "Fineline", text: "Traço fino e delicado para peças discretas.", icon: "line" },
    { id: "lettering", name: "Lettering", text: "Nomes e frases com letra desenhada à mão.", icon: "letter" },
    { id: "pretocinza", name: "Preto & cinza", text: "Degradês suaves em tons de cinza.", icon: "gradient" },
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
