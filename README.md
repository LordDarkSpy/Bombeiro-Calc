# Calculadora de Venda — Corpo de Bombeiros Oasis RP

Site estático (HTML/CSS/JS puro, sem dependências) para calcular o valor de venda de Kit Médico, Atadura e Relógio.

## Estrutura

```
index.html          Página principal
css/style.css        Estilos (tema vermelho/bombeiro)
js/script.js          Lógica da calculadora
data/precos.json      Preços dos itens (editar aqui)
```

## Como alterar os preços

Edite `data/precos.json`. Cada item tem `id`, `nome`, `icone` (emoji) e `preco`. Você pode adicionar ou remover itens livremente — a página é gerada automaticamente a partir deste arquivo.

```json
{
  "moeda": "$",
  "itens": [
    { "id": "kit-medico", "nome": "Kit Médico", "icone": "🩹", "preco": 250 }
  ]
}
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie estes arquivos:
   ```
   git init
   git add .
   git commit -m "Calculadora de venda - Bombeiros Oasis RP"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```
2. No GitHub, vá em **Settings → Pages**.
3. Em "Source", selecione a branch `main` e a pasta `/root`.
4. Salve. O site ficará disponível em `https://SEU_USUARIO.github.io/SEU_REPOSITORIO/`.

## Testar localmente

Como a página carrega `data/precos.json` via `fetch`, abrir o `index.html` diretamente (`file://`) pode ser bloqueado pelo navegador. Para testar localmente, rode um servidor simples na pasta do projeto, por exemplo:

```
python -m http.server 8000
```

e acesse `http://localhost:8000`. No GitHub Pages isso não é um problema, pois o site é servido via HTTPS.
