const listaItensEl = document.getElementById('lista-itens');
const resumoListaEl = document.getElementById('resumo-lista');
const totalValorEl = document.getElementById('total-valor');
const limparBtn = document.getElementById('limpar');

let moeda = '$';
const quantidades = {};

function formatarValor(valor) {
  return moeda + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calcularTotal(itens) {
  return itens.reduce((total, item) => total + item.preco * (quantidades[item.id] || 0), 0);
}

function atualizarResumo(itens) {
  const selecionados = itens.filter((item) => (quantidades[item.id] || 0) > 0);

  resumoListaEl.innerHTML = '';
  if (selecionados.length === 0) {
    resumoListaEl.innerHTML = '<li class="resumo-vazio">Nenhum item selecionado</li>';
  } else {
    selecionados.forEach((item) => {
      const qtd = quantidades[item.id];
      const li = document.createElement('li');
      li.innerHTML = `<span>${item.icone} ${item.nome} x${qtd}</span><span>${formatarValor(item.preco * qtd)}</span>`;
      resumoListaEl.appendChild(li);
    });
  }

  totalValorEl.textContent = formatarValor(calcularTotal(itens));
}

function atualizarLinha(item) {
  const qtd = quantidades[item.id] || 0;
  const linha = document.getElementById(`linha-${item.id}`);
  linha.querySelector('.item-qtd input').value = qtd;
  linha.querySelector('.item-subtotal').textContent = formatarValor(item.preco * qtd);
}

function renderizarItens(itens) {
  listaItensEl.innerHTML = '';

  itens.forEach((item) => {
    quantidades[item.id] = 0;

    const linha = document.createElement('div');
    linha.className = 'item-linha';
    linha.id = `linha-${item.id}`;
    linha.innerHTML = `
      <span class="item-icone">${item.icone}</span>
      <div class="item-info">
        <p class="item-nome">${item.nome}</p>
        <p class="item-preco">${formatarValor(item.preco)} / unidade</p>
      </div>
      <div class="item-qtd">
        <button type="button" data-acao="menos" aria-label="Diminuir quantidade">-</button>
        <input type="number" min="0" value="0" inputmode="numeric">
        <button type="button" data-acao="mais" aria-label="Aumentar quantidade">+</button>
      </div>
      <div class="item-subtotal">${formatarValor(0)}</div>
    `;
    listaItensEl.appendChild(linha);

    const input = linha.querySelector('.item-qtd input');

    linha.querySelector('[data-acao="menos"]').addEventListener('click', () => {
      quantidades[item.id] = Math.max(0, (quantidades[item.id] || 0) - 1);
      atualizarLinha(item);
      atualizarResumo(itens);
    });

    linha.querySelector('[data-acao="mais"]').addEventListener('click', () => {
      quantidades[item.id] = (quantidades[item.id] || 0) + 1;
      atualizarLinha(item);
      atualizarResumo(itens);
    });

    input.addEventListener('input', () => {
      const valor = parseInt(input.value, 10);
      quantidades[item.id] = isNaN(valor) || valor < 0 ? 0 : valor;
      atualizarLinha(item);
      atualizarResumo(itens);
    });
  });

  limparBtn.addEventListener('click', () => {
    itens.forEach((item) => {
      quantidades[item.id] = 0;
      atualizarLinha(item);
    });
    atualizarResumo(itens);
  });

  atualizarResumo(itens);
}

fetch('data/precos.json')
  .then((resposta) => {
    if (!resposta.ok) throw new Error('Falha ao carregar arquivo de preços');
    return resposta.json();
  })
  .then((dados) => {
    moeda = dados.moeda || '$';
    renderizarItens(dados.itens || []);
  })
  .catch((erro) => {
    listaItensEl.innerHTML = `<p class="erro">Não foi possível carregar os itens (${erro.message}). Verifique o arquivo data/precos.json.</p>`;
  });
