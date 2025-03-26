let numeroSecreto = Math.floor(Math.random() * 100) + 1; //Para garantir que o número seja de 1 a 100
let tentativas = 0;

function verificarNumero() {
    let input = document.getElementById("inputNumero");
    let mensagem = document.getElementById("mensagem");
    let numero = parseInt(input.value);

    if (isNaN(numero) || numero < 1 || numero > 100) {
        mensagem.textContent = "Digite um número válido entre 1 e 100.";
        return;
    }

    tentativas++;
    
    if (numero === numeroSecreto) {
        mensagem.textContent = `🎉 Parabéns! Você acertou o número ${numeroSecreto} em ${tentativas} tentativas.`;
        document.getElementById("reiniciar").style.display = "block";
    } else if (numero > numeroSecreto) {
        mensagem.textContent = "🔽 O número secreto é menor! Tente novamente.";
    } else {
        mensagem.textContent = "🔼 O número secreto é maior! Tente novamente.";
    }
}

function reiniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tentativas = 0;
    document.getElementById("mensagem").textContent = "";
    document.getElementById("inputNumero").value = "";
    document.getElementById("reiniciar").style.display = "none";
}