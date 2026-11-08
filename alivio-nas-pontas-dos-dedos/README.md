# Alívio nas Pontas dos Dedos — página de venda

Página estática integrada à estrutura da Acrópole do Saber.
Endereço previsto: https://acropoledosaber.com.br/alivio-nas-pontas-dos-dedos/

## Oferta e abertura das vendas

Editar `oferta.js` após cadastrar o produto:
- `hotmartUrl`: checkout HTTPS real deste ebook.
- `precoEmReais`: número ou null para informar o valor só no checkout.
- `garantiaDias`: confirmar o prazo configurado na Hotmart (7, 15, 21 ou 30). Sem confirmação, não se anuncia uma garantia configurada.

Sem checkout, a oferta apresenta “Pedir aviso por e-mail”, abrindo uma mensagem para acropolesaber@gmail.com. A pessoa precisa enviar a mensagem pelo aplicativo de e-mail; não há formulário, cadastro automático ou servidor de newsletter. Quando o checkout é configurado, esse contato é substituído pelo botão de compra. Não direcionar tráfego pago antes de conferir a oferta real.

Não foram presumidos preços, descontos, depoimentos, prazos comerciais, credenciais ou revisão clínica. Os dois bônus anunciados já estão incluídos: não foram transformados em order bump cobrado à parte.

## Medição e privacidade

O aviso de privacidade foi removido a pedido do responsável, mantendo somente o link de privacidade no rodapé. O HTML não carrega `medicao.js`, o Pixel está desativado em `oferta.js` e o arquivo de medição não carrega recursos externos nem envia eventos. Não há popup, botão de preferências ou armazenamento de uma escolha de cookies nesta página.

As chamadas opcionais de evento no código da página ficam inativas. Não basta mudar a flag da oferta para reativar a medição: a implementação de consentimento e o carregamento precisam ser tratados antes de retomar o Pixel. O histórico da implementação anterior permanece no backup e no registro de auditoria.

## Visual, fontes e compartilhamento

- Nome do produto no H1; slogan preservado como destaque visual.
- Títulos com espaços antes de quebras ocultas no celular.
- Etiqueta do hero abaixo do livro, sem cobrir a faixa da capa.
- Textos pequenos com mínimo de 12 px nas regras do site.
- DM Sans e Fredoka locais em `assets/fonts/`, com licenças OFL; sem requisição ao Google Fonts.
- `assets/compartilhamento.jpg`: JPG 1200×630 com capa e título para Open Graph e Twitter.
- Capa conferida com os materiais da V4, que retomou a composição da V2.

## Conteúdo e publicação

O ebook integral e os PDFs completos dos bônus não estão na pasta pública: somente amostras selecionadas e imagens. Links de marca, favicon, privacidade e termos usam os recursos existentes na raiz do domínio.

A alteração está salva localmente. Não houve commit, push, publicação, anúncio ou envio de mensagens em nome do autor.

Para conferir localmente, iniciar um servidor na raiz do repositório e abrir `/alivio-nas-pontas-dos-dedos/`. Publicar pelo fluxo habitual do GitHub Pages quando a oferta estiver pronta.

## Ajuste da primeira dobra — 08/11/2026

Os exemplos em destaque agora incluem dor de cabeça ocasional, tensão nos ombros, cólicas menstruais, desconforto muscular leve e cansaço nas mãos e nos pés. O texto fala em buscar alívio, sem garantir resultado individual; os cuidados e limites do guia continuam na página.

“A4” foi retirado da seção da oferta e do texto da oferta ativada pelo JavaScript. A informação de formato foi mantida nas descrições dos arquivos para impressão.

## Checkout cadastrado — 08/11/2026

Link fornecido pelo responsável: https://pay.hotmart.com/H108398770F?bid=1794169745982
Preço informado: R$ 29,90, incluindo ebook e dois bônus.
Botão, preço e FAQ atualizados. O parâmetro bid foi preservado. A garantia não foi presumida e o Pixel permanece desativado. Não houve alteração de preço na conta Hotmart ou publicação do repositório.
