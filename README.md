# Bad Luck Tattoo & Piercing

Site do estúdio Bad Luck (Barra Mansa — RJ): piercing com a **Fran** e tattoo com o **Italo Nogueira**.

Site estático (HTML + CSS + JavaScript puro), sem build e sem dependências. Abre direto no navegador e pode ser hospedado de graça (GitHub Pages, Vercel, Netlify).

## Rodar localmente

```bash
npx http-server -p 8080
# ou simplesmente abrir index.html no navegador
```

## O que tem no site

| Seção | Interação |
| --- | --- |
| Hero | Dois mundos (claro/escuro) divididos na diagonal; o letreiro "Bad Luck" inverte de cor sozinho ao cruzar a divisão |
| Fran — piercing | Explorador com mapas ilustrados e pontos clicáveis (orelha, nariz, boca, umbigo, mamilo, surface/microdermal; íntima com cartão discreto), catálogo de joias em titânio (foto ⇄ "como fica"), **vitrine com 43 joias (filtro, zoom e "Separar"), vale-presente, galeria |
| Italo — tattoo | Letreiro dourado + peça emoldurada, cards de estilos (abrem o agendamento já com o estilo), portfólio sobre "folha de papel" com filtro, flashes com "Quero esse" e o baralho "deixa a sorte escolher" |
| Agendamento | Passo a passo com dias em botões e um celular que mostra a mensagem sendo montada ao vivo; envia para o WhatsApp **de quem vai atender** (piercing → Fran, tattoo → Italo, os dois → duas mensagens) |
| Estúdio | Endereço, mapa do Google embutido, FAQ |
| Extras | Botão flutuante do WhatsApp, cabeçalho que muda de tema por seção, menu mobile |

Nenhum dado é enviado ou guardado pelo site: a mensagem é montada no navegador e o cliente envia pelo próprio WhatsApp.

## Como editar o conteúdo

Quase tudo fica em **`assets/js/data.js`**:

- `artists` — WhatsApp, Instagram e nomes da Fran e do Italo
- `piercingAreas` — regiões do explorador; cada uma tem `map` (ilustração) e `spots` (pontos clicáveis, em % da ilustração)
- `styles` — estilos do Italo (um item pode ter `note: "texto"` para ganhar uma faixa de destaque)
- `shop` — vitrine de joias (categorias e produtos)
- `jewelry` — catálogo de joias e preços (`scene` escolhe a ilustração de "como fica", definidas em `SCENES` no `main.js`)
- `portfolio` — trabalhos do Italo (`tags`: `colorido` ou `blackwork`; `link` opcional para o post). Os 8 primeiros aparecem direto, o resto em "Ver mais trabalhos"
- `agenda` — aviso de agenda do Italo (`status`: `open`, `limited` ou `closed`; troque só `status` e `text`)
- `flashes` — flashes disponíveis
- `faq` — perguntas frequentes

Para adicionar um trabalho ao portfólio: coloque a foto em `assets/img/tattoo/` e adicione uma linha em `portfolio`.

## Fotos

As fotos vieram de prints do Instagram e do catálogo do WhatsApp da Fran (miniaturas de ~80 a ~250 px). Para a demonstração elas foram **ampliadas com IA (Real-ESRGAN)**, o que deixa tudo nítido, mas pode suavizar texturas e alterar levemente detalhes. Antes de publicar de verdade, trocar pelas fotos originais.

Selos nos cards: **"Feito pela Fran"** (trabalho dela, do Instagram) e **"Catálogo da Fran"** (foto do catálogo do WhatsApp dela).

## Vitrine de joias

43 joias com as fotos de produto enviadas pela Fran (`assets/img/vitrine/`), em 5 categorias, com filtro, zoom e botão "Separar" (a joia vai junto na mensagem de agendamento). Sem preço por enquanto: aparece "Valor sob consulta".

- **Adicionar/trocar uma joia:** coloque a foto em `assets/img/vitrine/<id>.webp` e adicione `{ id, name, cat, price? }` em `shop.products` no `data.js`.
- **Preço:** `price: 80` mostra "R$ 80,00".
- **Remover a vitrine:** apagar o bloco `shop` em `data.js` e o bloco `Vitrine de joias` no `index.html`.

## Pendências antes de publicar

- [ ] **Fotos originais em alta resolução** (ideal ≥ 1200 px) da Fran e do Italo — as atuais são prints ampliados com IA.
- [ ] **Depoimentos reais** (a Fran tem destaque "Feedback" no Instagram) — não foram inventados no site.
- [ ] `og:image` precisa de URL absoluta depois que houver domínio.
- [ ] **Foto original da Fran** para a seção dela (a atual é um print ampliado com IA).
- [ ] **Confirmar estilos do Italo** (old school, blackwork, pontilhismo, fineline, lettering).
- [ ] **Flashes reais.** Os flashes usam fotos do portfólio como exemplo; trocar pelas artes disponíveis do Italo.
- [ ] **Italo revisar a seção "Cuidados pós-tatuagem"** (texto genérico; ajustar ao que ele orienta: tempo da proteção, pomada indicada etc.).
- [ ] **Revisar textos** (biografias, FAQ, descrições das regiões) com a Fran e o Italo.
- [ ] **Confirmar preços** — vieram do catálogo do WhatsApp da Fran e não está claro se incluem perfuração + joia.
- [ ] **Logo em alta** (arquivo original, de preferência SVG ou PNG transparente).
- [ ] Horário de funcionamento (não informado).
- [ ] Domínio próprio.
