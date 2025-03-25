function calcular() {
    let num = document.getElementById('txtn')
    let tab = document.getElementById('selalt')

    if (num.value.length == 0) {
        window.alert('[ERRO!] Selecione um número')
    } else {
        let n = Number(num.value)
        let t = 1
        tab.innerHTML = ''
        while (t <= 10) {
            let item = document.createElement('option')
            item.text = `${n} x ${t} = ${n*t}`
            item.value = `tab${t}`
            tab.appendChild(item) 
            t++
        }
    }
}