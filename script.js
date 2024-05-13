// Ativar máscara para campo de valor
$(document).ready(function(){
    $('#valor').mask('000.000.000,00', { reverse: true });
});

// Array para armazenar despesas
let despesas = [];

// Evento de envio do formulário de despesas
document.getElementById('despesaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const tipoDespesaSelect = document.getElementById('tipoDespesa');
    const tipoDespesa = tipoDespesaSelect.value === 'Outro' ? document.getElementById('outroDespesa').value : tipoDespesaSelect.value;
    const valor = parseFloat(document.getElementById('valor').value.replace(',', '.'));
    const data = document.getElementById('data').value;
    if (isNaN(valor)) {
        alert('Por favor, insira um valor válido.');
        return;
    }
    despesas.push({ tipo: tipoDespesa, valor: valor, data: data });
    salvarDespesas(despesas);
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

// Função para salvar despesas em localStorage
function salvarDespesas(despesas) {
    localStorage.setItem('despesas', JSON.stringify(despesas));
}

// Função para mostrar despesas
function mostrarDespesas(despesas) {
    const resumoFinanceiro = document.getElementById('resumoFinanceiro');
    resumoFinanceiro.innerHTML = ''; // Limpa o conteúdo anterior
    let totalDespesas = 0;
    despesas.forEach(despesa => {
        const despesaItem = document.createElement('div');
        despesaItem.classList.add('mb-2');
        despesaItem.innerHTML = `<strong>${despesa.tipo}</strong>: R$ ${despesa.valor.toFixed(2)} - ${despesa.data}`;
        resumoFinanceiro.appendChild(despesaItem);
        totalDespesas += despesa.valor;
    });
    const totalElement = document.createElement('div');
    totalElement.classList.add('mt-3', 'fw-bold');
    totalElement.textContent = `Total de despesas: R$ ${totalDespesas.toFixed(2)}`;
    resumoFinanceiro.appendChild(totalElement);
}
