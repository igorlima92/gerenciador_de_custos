// Função para calcular o total de despesas
function calcularTotalDespesas(despesas) {
    let total = 0;
    despesas.forEach(despesa => {
        total += despesa.valor;
    });
    return total;
}

// Função para atualizar o resumo financeiro na página
function atualizarResumoFinanceiro(despesas, salarioMensal) {
    const totalDespesas = calcularTotalDespesas(despesas);
    document.getElementById('totalDespesas').textContent = 'R$ ' + totalDespesas.toFixed(2);
}

// Função para salvar as despesas no armazenamento local
function salvarDespesas(despesas) {
    localStorage.setItem('despesas', JSON.stringify(despesas));
}

// Função para carregar as despesas do armazenamento local
function carregarDespesas() {
    const despesasJSON = localStorage.getItem('despesas');
    return despesasJSON ? JSON.parse(despesasJSON) : [];
}

// Função para excluir uma despesa
function excluirDespesa(index) {
    despesas.splice(index, 1);
    salvarDespesas(despesas);
    atualizarResumoFinanceiro(despesas, salarioMensal);
    mostrarDespesas(despesas);
}

// Função para mostrar as despesas na página
function mostrarDespesas(despesas) {
    const listaDespesas = document.getElementById('listaDespesas');
    listaDespesas.innerHTML = '';
    despesas.forEach((despesa, index) => {
        const itemDespesa = document.createElement('li');
        itemDespesa.className = 'list-group-item';
        itemDespesa.innerHTML = `
            <span>${despesa.tipo} - R$ ${despesa.valor.toFixed(2)} - ${despesa.data}</span>
            <button class="btn btn-danger btn-sm excluir-despesa" onclick="excluirDespesa(${index})">Excluir</button>
        `;
        listaDespesas.appendChild(itemDespesa);
    });
}

// Evento de envio do formulário de despesas
document.getElementById('despesaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const tipoDespesaSelect = document.getElementById('tipoDespesa');
    const tipoDespesa = tipoDespesaSelect.value === 'Outro' ? document.getElementById('outroDespesa').value : tipoDespesaSelect.value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('data').value;
    despesas.push({ tipo: tipoDespesa, valor: valor, data: data });
    salvarDespesas(despesas);
    atualizarResumoFinanceiro(despesas, salarioMensal);
    mostrarDespesas(despesas);
    tipoDespesaSelect.selectedIndex = 0;
    document.getElementById('valor').value = '';
    document.getElementById('data').value = '';
    if (tipoDespesaSelect.value === 'Outro') {
        document.getElementById('outroDespesa').value = '';
        document.getElementById('outroDespesaField').style.display = 'none';
    }
});

// Função para exibir o campo de entrada de novo tipo de despesa quando "Outro" é selecionado
document.getElementById('tipoDespesa').addEventListener('change', function() {
    const outroDespesaField = document.getElementById('outroDespesaField');
    if (this.value === 'Outro') {
        outroDespesaField.style.display = 'block';
    } else {
        outroDespesaField.style.display = 'none';
    }
});

// Simulação de despesas e salário mensal
let despesas = carregarDespesas();
const salarioMensal = 5000;

// Atualizar o resumo financeiro quando a página for carregada
document.addEventListener('DOMContentLoaded', function() {
    atualizarResumoFinanceiro(despesas, salarioMensal);
    mostrarDespesas(despesas);
});
