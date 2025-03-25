function calcular() {
    let numero = document.getElementById('txtn')
    let tabuada = document.getElementById('selalt')

    if (numero.value.length == 0) {
        window.alert('[ERRO!] Selecione um número')
    } else {
        let n = Number(numero.value)
        let t = 1
        while (t <= 10) {
            let item = document.createElement('option')
            item.text = `${n} x ${t} = ${n*t}`
            tabuada.appendChild(item) 
            t++
        }
    }
}