function float(v) {
  return Number(v) || 0;
}
function formatBRL(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function calcular() {
  const material = float(document.getElementById("material").value);
  const mao = float(document.getElementById("mao").value);
  const outros = float(document.getElementById("outros").value);
  const fixo = float(document.getElementById("fixo").value);
  const producao = Math.max(
    1,
    float(document.getElementById("producao").value)
  );
  const markup = float(document.getElementById("markup").value);

  const custoVariavel = material + mao + outros;
  const custoFixoUn = fixo / producao;
  const custoTotalUn = custoVariavel + custoFixoUn;
  const preco = custoTotalUn * (1 + markup / 100);
  const lucroUn = preco - custoTotalUn;
  const margem = preco ? (lucroUn / preco) * 100 : 0;

  const resultado = `
    <strong>Resultados:</strong><br>
    Custo total por unidade: ${formatBRL(custoTotalUn)}<br>
    Preço sugerido (markup ${markup}%): ${formatBRL(preco)}<br>
    Lucro por unidade: ${formatBRL(lucroUn)}<br>
    Margem de lucro: ${margem.toFixed(2)}%
  `;

  const saida = document.getElementById("saida");
  saida.innerHTML = resultado;
  saida.style.display = "block";
}

function limpar() {
  ["material", "mao", "outros", "fixo", "producao", "markup"].forEach((id) => {
    document.getElementById(id).value =
      id === "markup" ? 30 : id === "producao" ? 1 : 0;
  });
  document.getElementById("saida").style.display = "none";
}

document.getElementById("calcular").addEventListener("click", calcular);
document.getElementById("limpar").addEventListener("click", limpar);
