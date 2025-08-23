
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

//Função auxiliar de pergunta -> Promise
const ask = question => new Promise(resolve => rl.question(question, resolve));

//----------------------------------------------------------
//Função auxiliar para ler e tratar input
async function readNumber(prompt, { min, max, integer = false } = {}) {
	while (true) {
		let input = (await ask(prompt)).trim();
		
		if (!integer) {
			input = input.replace(',', '.');
		}
		
		const value = Number(input);
		
		if (!Number.isFinite(value) || (integer && !Number.isInteger(value))) {
			console.log(`Entrada inválida. Digite um número${integer ? ' inteiro' : ''}.`);
			continue;
		}
		
		if (min !== undefined && value < min) {
			console.log(`Valor deve ser >= ${min}.`);
			continue;
		}
		
		if (max !== undefined && value > max) {
			console.log(`Valor deve ser <= ${max}.`);
			continue;
		}
		
		return value;
	}
}

//----------------------------------------------------------
//Função auxiliar de calculo de valor das parcelas c/ juros compostos
function calcularParcelasPorAno(parcelaBase, taxaAnual, anos) {
	return Array.from({ length: anos }, (_, i) => 
		parcelaBase * Math.pow(1 + taxaAnual, i)
	);
}

//----------------------------------------------------------
//Função principal
async function main() {
	console.log('Simulador de Entrada de Imóvel aMORA com Correções');
	console.log('-'.repeat(60));
    //solicita dados do usuário
	const valorImovel = await readNumber('Valor do imóvel: R$ ', { min: 0.01 });
	const percentualEntrada = await readNumber('Percentual (%) da entrada: ', { min: 0, max: 100 });
	const anosContrato = await readNumber('Duração do contrato (anos): ', { min: 1, integer: true });
	const taxaJurosAnual = await readNumber('Taxa de juros anual p/ cenário alternativo (%) [5 a 12]: ', { min: 5, max: 12 });
	//calculo de valores base
	const valorEntrada = valorImovel * (percentualEntrada / 100);
	const totalAGuardar = valorImovel * 0.15;
	const parcelaMensalBase = totalAGuardar / (anosContrato * 12);
	//calculo de valores com correção de juros compostos
	const parcelasIGPM = calcularParcelasPorAno(parcelaMensalBase, 0.06, anosContrato);
	const parcelasJuros = calcularParcelasPorAno(parcelaMensalBase, taxaJurosAnual / 100, anosContrato);
    //formatação de moeda	
	const formatMoney = value => `R$ ${value.toFixed(2).replace('.', ',')}`;
	//saída 
	console.log('\nSaída:');
	console.log(`- Valor da entrada: ${formatMoney(valorEntrada)}`);
	console.log(`- Valor a guardar: ${formatMoney(totalAGuardar)}`);
	console.log(`- Valor mensal base: ${formatMoney(parcelaMensalBase)}`);

	console.log('\nValor mensal pelo IGPM:');
	parcelasIGPM.forEach((valor, i) => 
		console.log(`  - Ano ${i + 1}: ${formatMoney(valor)}`)
	);

	console.log(`\nValor mensal com ${taxaJurosAnual.toFixed(0)}% ao ano:`);
	parcelasJuros.forEach((valor, i) => 
		console.log(`  - Ano ${i + 1}: ${formatMoney(valor)}`)
	);

	rl.close();
}

//----------------------------------------------------------
//Tratamento de erros
main().catch(err => {
	console.error('Erro inesperado:', err);
	rl.close();
	process.exit(1);
});
