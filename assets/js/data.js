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
        { id: "aba", label: "Aba nasal", x: 27.5, y: 75, text: "O famoso brilhinho no nariz: ponto de luz ou argola delicada.", from: "R$ 60 (aço) · R$ 80 (titânio)" },
        { id: "high", label: "High nostril", x: 70, y: 67.5, text: "Mais alto na aba — perfeito para compor com o brilhinho clássico." },
        { id: "septo", label: "Septo", x: 50, y: 83, text: "No centro do nariz, com argola ou clicker. Dá para deixar discreto quando precisar." },
        { id: "bridge", label: "Bridge", x: 50, y: 20, text: "Na ponte do nariz, entre os olhos. Visual marcante — depende da anatomia." },
      ],
    },
    {
      id: "boca",
      label: "Boca",
      map: "mouth",
      text: "Labret, laterais de baixo e de cima, medusa… a boca tem muita opção. Toque nos pontos e descubra a sua.",
      from: "Perfurações a partir de R$ 60",
      spots: [
        { id: "labret", label: "Labret", x: 50, y: 74, text: "Centralizado abaixo do lábio. Clássico, com ponto de luz ou argola." },
        { id: "laterais-baixo", label: "Laterais de baixo", pts: [[30.7, 71], [69.3, 71]], text: "Um de cada lado do lábio inferior (snake bites). Lindo com argolinhas." },
        { id: "laterais-cima", label: "Laterais de cima", pts: [[27.3, 44], [72.7, 44]], text: "Monroe e Madonna: a “pintinha” acima do lábio, de um lado ou dos dois." },
        { id: "medusa", label: "Medusa", x: 50, y: 39.5, text: "No centro, logo acima do lábio superior. Delicado e cheio de personalidade." },
      ],
    },
    {
      id: "umbigo",
      label: "Umbigo",
      map: "navel",
      text: "Clássico que nunca sai de moda, com joias pensadas para a sua anatomia.",
      from: "Perfurações a partir de R$ 60",
      spots: [
        { id: "superior", label: "Superior", x: 50, y: 47.5, text: "O tradicional: a joia fica na borda de cima do umbigo." },
        { id: "inferior", label: "Inferior", x: 50, y: 60.5, text: "Na borda de baixo, para um visual diferente. Depende da anatomia — a Fran avalia." },
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
      text: "Especialidade da Fran. Microdermal é um ponto de brilho único, com base por baixo da pele; surface é uma barrinha sob a pele com duas pontas aparentes. Toque nos pontos e veja onde cada um fica.",
      from: "Surface a partir de R$ 150",
      spots: [
        { id: "rosto", label: "Microdermal no rosto", x: 61.3, y: 33, text: "Um ponto de brilho na maçã do rosto. Delicado e cheio de personalidade.", draw: '<circle cx="184" cy="132" r="7" fill="url(#g-gem)" stroke="#cfcac4"/>' },
        { id: "pescoco", label: "Surface no pescoço", pts: [[56.7, 48], [57.3, 56]], text: "Na lateral do pescoço (ou na nuca): barrinha sob a pele com duas pontas de brilho.", draw: '<path d="M170 192 L172 224" stroke="#b9a59a" stroke-width="3" stroke-dasharray="4 4"/><circle cx="170" cy="192" r="6" fill="url(#g-gem)" stroke="#cfcac4"/><circle cx="172" cy="224" r="6" fill="url(#g-gem)" stroke="#cfcac4"/>' },
        { id: "clavicula", label: "Surface na clavícula", pts: [[19.3, 66], [31.3, 64.5]], text: "Acompanha a linha da clavícula, com duas pontas aparentes.", draw: '<path d="M58 264 L94 258" stroke="#b9a59a" stroke-width="3" stroke-dasharray="4 4"/><circle cx="58" cy="264" r="7" fill="url(#g-gem)" stroke="#cfcac4"/><circle cx="94" cy="258" r="7" fill="url(#g-gem)" stroke="#cfcac4"/>' },
        { id: "colo", label: "Microdermal no colo", x: 50, y: 83.5, text: "Um ponto de luz no centro do colo. Fica lindo com decote.", draw: '<circle cx="150" cy="334" r="9" fill="url(#g-gem)" stroke="#cfcac4"/>' },
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
  // scene: ilustração de "como fica" (ver SCENES em main.js). photo (opcional): foto real.
  // credit: "catalogo" (catálogo do WhatsApp da Fran), "fran" (foto da própria Fran: trabalho ou joia) ou "pexels" (foto ilustrativa).
  jewelry: [
    { id: "argola", name: "Argola", material: "Titânio", price: 60, from: true, icon: "ring", scene: "ear-ring", where: "no helix", credit: "joia", photo: "assets/img/joias/argola.webp" },
    { id: "dring", name: "D ring aba nasal", material: "Titânio", price: 45, from: false, icon: "dring", scene: "nose-dring", where: "na aba nasal", credit: "joia", photo: "assets/img/joias/dring.webp" },
    { id: "basica", name: "Joia básica", material: "Titânio", price: 40, from: true, icon: "stud", scene: "ear-studs", where: "no lóbulo", credit: "joia", photo: "assets/img/joias/pontos-de-luz.webp" },
    { id: "labret", name: "Labret", material: "Titânio", price: 50, from: true, icon: "labret", scene: "lip-labret", where: "pino reto com bolinha", credit: "pexels", photo: "assets/img/joias/labret.webp" },
    { id: "mamilo", name: "Joia de mamilo", material: "Titânio", price: 60, from: true, icon: "barbell", scene: "barbell", where: "barbell reto", credit: "joia", photo: "assets/img/joias/barbell-pedras.webp" },
    { id: "bolinha", name: "Bolinha", material: "Titânio", price: 40, from: true, icon: "stud", scene: "ear-studs", where: "lisa, em 2 tamanhos", credit: "joia", photo: "assets/img/joias/bolinhas.webp" },
    { id: "pontoluz", name: "Ponto de luz", material: "Titânio · só a joia", price: 40, from: true, icon: "gem", scene: "nose-gem", where: "no nariz", credit: "joia", photo: "assets/img/joias/ponto-de-luz.webp" },
  ],


  // Vitrine de joias da Fran (fotos do catálogo dela, em assets/img/vitrine/<id>.webp).
  // price (opcional): número em reais; sem price aparece "Valor sob consulta".
  // Para remover a vitrine: apagar este bloco e a seção "Vitrine" do index.html.
  shop: {
    categories: [
      { id: "tops", label: "Tops e brilhos" },
      { id: "argolas", label: "Argolas e clickers" },
      { id: "umbigo", label: "Umbigo" },
      { id: "mamilo", label: "Mamilo" },
      { id: "dourados", label: "Dourados" },
      { id: "bioflex", label: "Bioflex" },
    ],
    products: [
      { id: "argola-dupla-cravejada", name: "Argola dupla cravejada", cat: "argolas" },
      { id: "argola-dupla-pedra", name: "Argola dupla com pedra", cat: "argolas" },
      { id: "argola-dupla-meia", name: "Argola dupla meia-cravejada", cat: "argolas" },
      { id: "argola-dupla-fina", name: "Argola dupla fina cravejada", cat: "argolas" },
      { id: "umbigo-gota", name: "Umbigo com gota", cat: "umbigo" },
      { id: "umbigo-rosa", name: "Umbigo com pedras rosa", cat: "umbigo" },
      { id: "flor", name: "Flor de zircônias", cat: "tops" },
      { id: "clicker-duplo", name: "Clicker cravejado duplo", cat: "argolas" },
      { id: "asas", name: "Asas vazadas", cat: "tops" },
      { id: "ramo-azul", name: "Ramo azul", cat: "tops" },
      { id: "opala", name: "Opala", cat: "tops" },
      { id: "estrela-4", name: "Estrela de quatro pontas", cat: "tops" },
      { id: "estrelas-duplas", name: "Estrelas duplas", cat: "tops" },
      { id: "flor-folha", name: "Flor com folha", cat: "tops" },
      { id: "ramo-zirconias", name: "Ramo de zircônias", cat: "tops" },
      { id: "clicker-cravejado", name: "Clicker cravejado", cat: "argolas" },
      { id: "clicker-corrente", name: "Clicker com corrente", cat: "argolas" },
      { id: "estrela-8", name: "Estrela de oito pontas", cat: "tops" },
      { id: "clicker-espinhos", name: "Clicker com espinhos", cat: "argolas" },
      { id: "borboleta", name: "Borboleta de zircônias", cat: "tops" },
      { id: "clicker-leque", name: "Clicker leque cravejado", cat: "argolas" },
      { id: "folhas", name: "Três folhas", cat: "tops" },
      { id: "fileira-5", name: "Fileira de cinco pedras", cat: "tops" },
      { id: "barbell-mamilo", name: "Barbell com garras", cat: "mamilo" },
      { id: "leque-navetes", name: "Leque de navetes", cat: "tops" },
      { id: "trio-dourado", name: "Trio com detalhe dourado", cat: "tops" },
      { id: "trio-mini", name: "Trio mini", cat: "tops" },
      { id: "umbigo-opala", name: "Umbigo com opala", cat: "umbigo" },
      { id: "arco-cravejado", name: "Arco cravejado", cat: "tops" },
      { id: "meia-lua", name: "Meia-lua lisa", cat: "tops" },
      { id: "estrelinha-dourada", name: "Estrelinha dourada", cat: "dourados" },
      { id: "coracao-dourado", name: "Coração dourado", cat: "dourados" },
      { id: "anel-navete", name: "Anel com navete", cat: "argolas" },
      { id: "aviao-dourado", name: "Avião dourado", cat: "dourados" },
      { id: "infinito-dourado", name: "Infinito dourado", cat: "dourados" },
      { id: "raio-dourado", name: "Raio dourado", cat: "dourados" },
      { id: "lua-pedra", name: "Lua com pedra", cat: "tops" },
      { id: "gatinho-dourado", name: "Gatinho dourado", cat: "dourados" },
      { id: "folhas-pingente", name: "Folhas com pingente", cat: "tops" },
      { id: "arco-pedras", name: "Arco de pedras", cat: "tops" },
      { id: "raio-cravejado", name: "Raio cravejado", cat: "tops" },
      { id: "flor-bolinhas", name: "Flor de bolinhas", cat: "tops" },
      { id: "borboleta-vazada", name: "Borboleta vazada", cat: "tops" },
      { id: "umbigo-pedras-brilho", name: "Umbigo com pedras", cat: "umbigo" },
      { id: "argola-meia-cravejada", name: "Argola meia-cravejada", cat: "argolas" },
      { id: "argolas-tamanhos", name: "Argolas em 4 tamanhos", cat: "argolas" },
      { id: "raio-liso", name: "Raio liso", cat: "tops" },
      { id: "barbell-garras", name: "Barbell com garras e pedras", cat: "mamilo" },
      { id: "bioflex-1", name: "Bioflex (silicone)", cat: "bioflex" },
      { id: "bioflex-2", name: "Argolas de bioflex", cat: "bioflex" },
    ],
  },

  // Galeria "Feitos pela Fran" (fotos do trabalho dela). cat: orelha | nariz | boca | umbigo | microdermal | sobrancelha
  piercingGalleryCats: [
    { id: "orelha", label: "Orelha" },
    { id: "nariz", label: "Nariz" },
    { id: "boca", label: "Boca" },
    { id: "umbigo", label: "Umbigo" },
    { id: "microdermal", label: "Microdermal" },
    { id: "sobrancelha", label: "Sobrancelha" },
  ],
  piercingGallery: [
    { src: "assets/img/trabalhos/ramo-dourado-helix.webp", alt: "Joia de ramo dourado com zircônias no helix", title: "Ramo dourado no helix", cat: "orelha" },
    { src: "assets/img/trabalhos/aba-nasal.webp", alt: "Ponto de luz na aba nasal", title: "Aba nasal", cat: "nariz" },
    { src: "assets/img/trabalhos/medusa-pedra.webp", alt: "Medusa com joia de pedra e laterais de baixo", title: "Medusa com pedra", cat: "boca" },
    { src: "assets/img/trabalhos/umbigo-pedras.webp", alt: "Umbigo com duas pedras grandes", title: "Umbigo com pedras", cat: "umbigo" },
    { src: "assets/img/trabalhos/microdermal-colo.webp", alt: "Microdermal no colo entre tatuagens", title: "Microdermal no colo", cat: "microdermal" },
    { src: "assets/img/trabalhos/sobrancelha.webp", alt: "Piercing de sobrancelha com duas bolinhas", title: "Sobrancelha", cat: "sobrancelha" },
    { src: "assets/img/trabalhos/opala-helix.webp", alt: "Joia de opalas azuis no helix com argola cravejada", title: "Opala e argola no helix", cat: "orelha" },
    { src: "assets/img/trabalhos/argolinha-nariz.webp", alt: "Argolinha cravejada na aba nasal", title: "Argolinha na aba", cat: "nariz" },
    { src: "assets/img/trabalhos/medusa-labret.webp", alt: "Medusa e labret centralizado", title: "Medusa e labret", cat: "boca" },
    { src: "assets/img/trabalhos/umbigo-flor.webp", alt: "Joia de flor no umbigo", title: "Umbigo com flor", cat: "umbigo" },
    { src: "assets/img/trabalhos/microdermal-rosto.webp", alt: "Dois microdermais no rosto", title: "Microdermal no rosto", cat: "microdermal" },
    { src: "assets/img/trabalhos/bridge-sobrancelhas.webp", alt: "Bridge com microdermal e sobrancelhas", title: "Bridge e sobrancelhas", cat: "sobrancelha" },
    { src: "assets/img/trabalhos/borboleta-conch.webp", alt: "Joia de borboleta de zircônias no conch", title: "Borboleta no conch", cat: "orelha" },
    { src: "assets/img/trabalhos/septo-clicker.webp", alt: "Septo com clicker cravejado", title: "Septo com clicker", cat: "nariz" },
    { src: "assets/img/trabalhos/laterais-septo.webp", alt: "Laterais de baixo e septo com argola", title: "Laterais e septo", cat: "boca" },
    { src: "assets/img/trabalhos/umbigo-argola.webp", alt: "Argolinha cravejada no umbigo", title: "Argolinha no umbigo", cat: "umbigo" },
    { src: "assets/img/trabalhos/microdermal-simples.webp", alt: "Microdermal de zircônia", title: "Microdermal", cat: "microdermal" },
    { src: "assets/img/trabalhos/sobrancelhas.webp", alt: "Perfurações de sobrancelha", title: "Sobrancelhas", cat: "sobrancelha" },
    { src: "assets/img/trabalhos/borboleta-helix.webp", alt: "Borboleta de zircônias no helix", title: "Borboleta no helix", cat: "orelha" },
    { src: "assets/img/trabalhos/argola-nariz.webp", alt: "Argola fina na aba nasal", title: "Argola fina no nariz", cat: "nariz" },
    { src: "assets/img/trabalhos/laterais-spikes.webp", alt: "Laterais de cima e de baixo com spikes", title: "Laterais com spikes", cat: "boca" },
    { src: "assets/img/trabalhos/microdermal-roxo.webp", alt: "Microdermal roxo na maçã do rosto", title: "Microdermal roxo", cat: "microdermal" },
    { src: "assets/img/trabalhos/bridge.webp", alt: "Bridge com barras de bolinhas", title: "Bridge", cat: "sobrancelha" },
    { src: "assets/img/trabalhos/clicker-corrente.webp", alt: "Clicker com corrente e pingente na orelha", title: "Clicker com corrente", cat: "orelha" },
    { src: "assets/img/trabalhos/bolinha-nariz.webp", alt: "Piercing de bolinha no nariz", title: "Bolinha no nariz", cat: "nariz" },
    { src: "assets/img/trabalhos/laterais-spikes-2.webp", alt: "Laterais de cima com bolinhas e de baixo com spikes", title: "Laterais", cat: "boca" },
    { src: "assets/img/trabalhos/microdermal-azul.webp", alt: "Microdermal na maçã do rosto", title: "Microdermal azul", cat: "microdermal" },
    { src: "assets/img/trabalhos/ponto-de-luz-orelha.webp", alt: "Ponto de luz de zircônia na orelha", title: "Ponto de luz no helix", cat: "orelha" },
    { src: "assets/img/trabalhos/argola-labio.webp", alt: "Argola no lábio inferior", title: "Argola no lábio", cat: "boca" },
    { src: "assets/img/trabalhos/microdermal-peito.webp", alt: "Dois microdermais no peito", title: "Microdermais no peito", cat: "microdermal" },
    { src: "assets/img/trabalhos/industrial.webp", alt: "Piercing industrial com barra cravejada roxa", title: "Industrial", cat: "orelha" },
    { src: "assets/img/trabalhos/microdermal-braco.webp", alt: "Microdermal no braço", title: "Microdermal no braço", cat: "microdermal" },
    { src: "assets/img/trabalhos/composicao-orelha.webp", alt: "Orelha com várias perfurações e corrente", title: "Composição na orelha", cat: "orelha" },
    { src: "assets/img/trabalhos/microdermal-testa.webp", alt: "Microdermais na testa", title: "Microdermais na testa", cat: "microdermal" },
    { src: "assets/img/trabalhos/curadoria-dourada.webp", alt: "Orelha com joias douradas e clicker cravejado", title: "Curadoria dourada", cat: "orelha" },
    { src: "assets/img/trabalhos/industrial-azul.webp", alt: "Piercing industrial com barras coloridas", title: "Industrial azul", cat: "orelha" }
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

  // Aviso de agenda do Italo (aparece ao lado do botão "Agendar com o Italo").
  // status: "open" (verde), "limited" (dourado) ou "closed" (cinza). enabled: false esconde o aviso.
  // Para atualizar: troque só status e text.
  agenda: { enabled: true, status: "open", text: "Agenda aberta" },

  // Estilos que o Italo tatua (old school é a especialidade).
  styles: [
    { id: "oldschool", name: "Old School", text: "Traço firme, cor chapada e clássicos atemporais.", icon: "star" },
    { id: "blackwork", name: "Blackwork", text: "Preto sólido, contraste e muita presença.", icon: "blackwork" },
    { id: "pontilhismo", name: "Pontilhismo", text: "Sombras feitas ponto a ponto, com textura única.", icon: "dots" },
    { id: "fineline", name: "Fineline", text: "Traço fino e delicado para peças discretas.", icon: "line" },
    { id: "lettering", name: "Lettering", text: "Nomes e frases com letra desenhada à mão.", icon: "letter" },
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
      q: "Tenho medo de agulha. E agora?",
      a: "Super normal — muita gente sente o mesmo. Marque “Tenho medo de agulha” no agendamento: a gente explica cada passo antes, respeita o seu tempo e você pode pedir pausa quando quiser.",
    },
    {
      q: "Tenho alguma restrição ou preciso de acessibilidade. Como faço?",
      a: "Conta pra gente no agendamento (alergia, condição de saúde, mobilidade ou qualquer outra necessidade). Assim a gente prepara o atendimento pra você com antecedência.",
    },
    {
      q: "Como é a higiene?",
      a: "Todo procedimento segue protocolo asséptico. Ficou com dúvida sobre o processo? Pergunte no atendimento — a gente explica tudo.",
    },
  ],
};
