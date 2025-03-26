let num = document.getElementById('txtn')
let lista = document.getElementById('txtl')
let res = document.querySelector('div#res')
let valores = []

function isNum(n) {
    //Se for maior que 1 e menor que 100
    if (Number(n) >= 1 && Number(n) <= 100) {
        return true
    } else {
        return false
    }
}

function inList(n, l) {
    //Confere se o número está ou não na lista
    if (l.indexOf(Number(n)) != -1) {
        return true
    } else {
        return false
    }
}

function adicionar() {
    //Confirma se o número é válido e não ta na lista
    if(isNum(num.value) && !inList(num.value, valores)) {
        valores.push(Number(num.value))
        let item = document.createElement('option')
        item.text = `Número ${Number(num.value)} adicionado`
        lista.appendChild(item)
    } else {
        //O número estava na lista ou não era de 1 até 100
        window.alert('[ERRO!] Valor inválido ou já encontrado na lista.')
    }
    num.value = ''
    num.focus()
}

function finalizar() {
    if (valores.length == 0) {
        window.alert('[ERRO!] Adicione um valor antes de finalizar')
    } else {
        let tot = valores.length
        let maior = valores[0]
        let menor = valores[0]
        let soma = 0
        let media = 0

        for (let pos in valores){
            soma += valores[pos]
            if (valores[pos] > maior)
                maior = valores[pos]
            if (valores[pos] < menor)
                menor = valores[pos]
        }
        media = soma / tot
        res.innerHTML = `<br>Ao todo, temos ${tot} números cadastrados.<br>`
        res.innerHTML += `<br>O maior valor informado foi ${maior}.<br>`
        res.innerHTML += `<br>O menor valor informado foi ${menor}.<br>`
        res.innerHTML += `<br>Somando todos valores, temos ${soma}.<br>`
        res.innerHTML += `<br>A média dos números é ${parseInt(media)}`

    }
}
function limpar() {
    location.reload()
}

function handle(event){
    if (event.keyCode == 13){
            adicionar();
    }
}