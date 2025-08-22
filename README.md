# Simulador de Entrada de Imóvel aMORA

## Descrição

Simulador financeiro que calcula e compara parcelas mensais de imóveis com correção de juros anual. O simulador compara entre o padrão estabelecido (IGPM = 6%) e uma taxa de juros escolhida pelo usuário, entre 5% e 12%.

## Pré-requisitos:
Node.js instalado no computador

## Execução
No diretório do projeto:

```bash/cmd
node main.js
```

## Como Usar

O programa solicita 4 informações:

1. **Valor do imóvel**: Valor total do imóvel em reais
2. **Percentual da entrada**: Porcentagem da entrada (0% a 100%)
3. **Duração do contrato**: Quantidade de anos (número inteiro)
4. **Taxa de juros anual**: Taxa para cenário alternativo (5% a 12%)

### Exemplo de Uso

```
Simulador de Entrada de Imóvel aMORA com Correções
------------------------------------------------------------
Valor do imóvel: R$ 500000
Percentual (%) da entrada: 10
Duração do contrato (anos): 3
Taxa de juros anual p/ cenário alternativo (%) [5 a 12]: 7.5

Saída:
- Valor da entrada: R$ 50.000,00
- Valor a guardar: R$ 75.000,00
- Valor mensal base: R$ 2.083,33

Valor mensal pelo IGPM:
  - Ano 1: R$ 2.083,33
  - Ano 2: R$ 2.208,33
  - Ano 3: R$ 2.340,83

Valor mensal com 8% ao ano:
  - Ano 1: R$ 2.083,33
  - Ano 2: R$ 2.250,00
  - Ano 3: R$ 2.430,00
```

## Cálculos Realizados

### Valores Base
- **Valor da entrada**: `valorImovel × (percentualEntrada ÷ 100)`
- **Valor a guardar**: `valorImovel × 15%` (fixo)
- **Parcela mensal base**: `valorAGuardar ÷ (anosContrato × 12)`

### Fórmula das Parcelas
```
ParcelaAnoN = ParcelaBase × (1 + TaxaAnual)^(Ano-1)
```

## Tecnologias

- **Node.js**: Runtime JavaScript
- **readline**: Interface de entrada/saída
- **JavaScript ES6+**: Sintaxe moderna

## Licença

Este projeto é de uso livre para fins educacionais e comerciais.
