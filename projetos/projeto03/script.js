function criarPiramide() {
    const numero = parseInt(prompt('Digite um número para a base da pirâmide:'));
    const container = document.createElement('div');
    container.className = 'piramide-container';
    
    if (isNaN(numero) || numero <= 1) {
        alert('Por favor, digite um número válido maior que 1');
        return;
    } else {
        for (let i = 1; i <= numero; i++) {
            const linha = document.createElement('div');
            linha.className = 'linha-piramide';
            
            for (let j = 1; j <= i; j++) {
                const bloco = document.createElement('div');
                bloco.className = 'bloco';
                linha.appendChild(bloco);
            }
            
            container.appendChild(linha);
        }
    }
    document.body.appendChild(container);
}

// Executa a função quando a página carregar
window.onload = criarPiramide;
