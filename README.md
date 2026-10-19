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
| Hero "Bad \| Luck" | Divisão diagonal clara/escura; o lado em foco cresce no hover |
| Fran — piercing | Mapa interativo da orelha (helix, tragus, conch, rook, daith…), regiões do corpo, catálogo de joias com "sacolinha", vale-presente, galeria com lightbox |
| Italo — tattoo | Portfólio em mural com filtro (colorido / blackwork / fineline), "Tire sua sorte" (baralho que revela um flash), flashes com "Quero esse" |
| Agendamento | Passo a passo que monta a mensagem e abre o WhatsApp **de quem vai atender** (piercing → Fran, tattoo → Italo, os dois → duas mensagens) |
| Extras | Botão flutuante do WhatsApp, cabeçalho que muda de tema por seção, menu mobile, FAQ |

Nenhum dado é enviado ou guardado pelo site: a mensagem é montada no navegador e o cliente envia pelo próprio WhatsApp.

## Como editar o conteúdo

Quase tudo fica em **`assets/js/data.js`**:

- `artists` — WhatsApp, Instagram e nomes da Fran e do Italo
- `piercingAreas` / `earSpots` — regiões e pontos do mapa da orelha
- `jewelry` — catálogo de joias e preços
- `portfolio` — trabalhos do Italo (`tags`: `colorido`, `blackwork`, `fineline`; `link` opcional para o post)
- `flashes` — flashes disponíveis
- `faq` — perguntas frequentes

Para adicionar um trabalho ao portfólio: coloque a foto em `assets/img/tattoo/` e adicione uma linha em `portfolio`.

## Pendências antes de publicar

- [ ] **Fotos em alta resolução.** As imagens atuais foram recortadas de prints do Instagram (≈500 px) só para a demonstração. Pedir os originais à Fran e ao Italo.
- [ ] **Flashes reais.** Os flashes usam fotos do portfólio como exemplo; trocar pelas artes disponíveis do Italo.
- [ ] **Revisar textos** (biografias, FAQ, descrições das regiões) com a Fran e o Italo.
- [ ] **Confirmar preços** — vieram do catálogo do WhatsApp da Fran e não está claro se incluem perfuração + joia.
- [ ] **Logo em alta** (arquivo original, de preferência SVG ou PNG transparente).
- [ ] Horário de funcionamento (não informado).
- [ ] Domínio próprio.
