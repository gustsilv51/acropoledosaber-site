# Recomeçar a Rezar — página de vendas

Página estática da Acropole do Saber. Oferta inicial: R$ 19,90 pelo devocional e dois bônus.

## Estrutura

- `index.html`: conteúdo e metadados da página.
- `estilo.css`: layout responsivo.
- `pagina.js`: amostras, ampliação, FAQ nativo e links de compra.
- `config.js`: preço e URL do checkout.
- `assets/`: capas e páginas de amostra; não contém os PDFs completos.

## Ativar a compra

Em `config.js`, preencha `hotmartCheckoutUrl` com o endereço HTTPS do checkout real deste produto. Enquanto estiver vazio, a compra fica identificada como disponível em breve e não há redirecionamento fictício. Os parâmetros de campanha permitidos são preservados ao encaminhar ao checkout.

O preço está em `config.js`; ao mudá-lo, atualize também o preço no texto das perguntas frequentes e na descrição de compartilhamento do `index.html`.

## Hospedagem

Copiar esta pasta como `recomecar-a-rezar/` na raiz do site. Os caminhos dos arquivos são relativos. Endereço planejado: `https://acropoledosaber.com.br/recomecar-a-rezar/`.

Meta Pixel 1323893266191840: mesma identificação e verificação de domínio do Mente Ativa. PageView no carregamento; InitiateCheckout ao clicar em checkout Hotmart válido e ativo. O botão indisponível não dispara esse evento. A confirmação Purchase depende da integração do produto na Hotmart e não é disparada pela página de vendas. O rodapé utiliza o e-mail de contato já existente no site.


Depoimentos: preencher `testimonials` no config.js com objetos `{name: "Nome autorizado", text: "Relato real"}`. A seção fica oculta enquanto a lista estiver vazia. Não inserir dados fictícios.
Amostras: alternam a cada 8 segundos enquanto a seção está visível; pausa com foco, ponteiro, janela oculta, ampliação ou preferência por menos movimento.
Oferta: R$ 99,00 como preço regular informado, R$ 19,90 promocional. Confirmar preço regular real e configurar garantia de 7 dias e pagamentos no produto Hotmart antes da abertura das vendas. Acesso vitalício refere-se aos PDFs baixados.

Faixas: `offerEndsAt` recebe a data real de encerramento com fuso horário. Os textos “apenas hoje” e “termina hoje” só aparecem nesse dia, no fuso America/Sao_Paulo, antes do encerramento. O prazo não se renova automaticamente. O preço no checkout deve seguir a mesma campanha.

SEO: imagem compartilhar.jpg 1200×630, canonical, Open Graph e Twitter Card. JSON-LD Product e FAQPage; Offer é adicionado quando o checkout está ativo. Atualizar a versão ?v= ao alterar arquivos publicados. ViewContent adicionado conforme confirmação explícita: um evento no carregamento, sem parâmetros pessoais. Purchase permanece responsabilidade da integração Hotmart; nenhuma Conversions API foi configurada.
