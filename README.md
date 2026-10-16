# Acrópole do Saber - site institucional e páginas de produtos

Site estático pronto para GitHub Pages ou hospedagem convencional.

## Arquivos

- `index.html`: página institucional da Acrópole do Saber, sem links para ebooks;
- `mente-ativa/`: nova página do Mente Ativa 60+, com 120 atividades;
- `assets/`: imagens utilizadas pela página;
- `.nojekyll`: evita processamento desnecessário pelo Jekyll no GitHub Pages.

## Publicação

Envie todo o conteúdo desta pasta para a raiz do repositório ou para a pasta configurada como origem do GitHub Pages. Os caminhos são relativos e também funcionam quando o site é publicado em uma subpasta.

O botão de compra direciona para o checkout informado da Hotmart.

## Migração do Mente Ativa 60+

- Página institucional: `https://acropoledosaber.com.br/`
- Página de vendas: `https://acropoledosaber.com.br/mente-ativa/`
- Atualize os destinos dos anúncios, links de perfil e materiais de divulgação para `/mente-ativa/` depois de publicar.
- A raiz não redireciona para o produto: ela agora é institucional, conforme solicitado.
- As outras pastas de produtos, os arquivos compartilhados, o CNAME e a configuração do GitHub Pages foram preservados.
- O Pixel Meta `1323893266191840` permanece na página do Mente Ativa; `InitiateCheckout` dispara apenas nos links reais de checkout, pelo script compartilhado existente.
- A página preserva os dois preços e checkouts: completo por R$ 29,90 (120 atividades e três bônus) e básico por R$ 17,90 (e-book de 30 atividades, sem bônus). Confira essa distinção nas entregas da Hotmart antes de publicar.
- O visual e a sequência de seções seguem a página ativa, com amostras e capa das 120 atividades, sem comparações com edições anteriores. A razão social foi removida apenas da página institucional.
- Os destaques promocionais “hoje” e os valores individuais dos bônus foram restaurados por solicitação. Não há data renovada automaticamente: encerre ou atualize a promoção ao fim de sua validade. Os três depoimentos foram restaurados após confirmação expressa de autenticidade e autorização pelo responsável.
- A prévia do plano completo simula um livro aberto, com intervalo de 1,5 segundo entre viradas, mostrando as atividades 51 a 56 em sequência, pausa e navegação manual. A animação pausa quando fora da tela, durante ampliação, foco ou passagem do mouse; não inicia automaticamente com preferência de movimento reduzido.
- A razão social foi retirada também do rodapé do produto, conforme solicitado.
- Os 149 são as páginas do PDF principal, não o total com os bônus. As amostras públicas são apenas páginas selecionadas; o PDF completo não está neste repositório.

As alterações são locais; não foi feito commit, push ou publicação automática.
