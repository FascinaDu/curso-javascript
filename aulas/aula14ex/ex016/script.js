function contar() {
    let ini = document.getElementById('txti')
    let fim = document.getElementById('txtf')
    let passo = document.getElementById('txtp')
    let res = document.querySelector('div#res')

    if (ini.value.length == 0 || fim.value.length == 0 || passo.value.length == 0) {
        window.alert('[ERRO!] Verifique se marcou todas as caixas!')
        res.innerHTML = 'Impossível contar! '
    } else {
        res.innerHTML = 'Contando... <br> '
        let i = Number(ini.value)
        let f = Number(fim.value)
        let p = Number(passo.value)
        if (p <= 0) {
            window.alert('Passo indefinido! Definindo passo para 1')
            p = 1
        }
        if (i < f) {
            //Contagem crescente
            for(let c = i; c <= f; c += p) {
                res.innerHTML += ` ${c}👉 `
            }
            //Contagem descrescente
        } else {
            for(let c = i; c >= f; c -= p){
                res.innerHTML += ` ${c}👉 `
            }
        }
        res.innerHTML += ` E FIM! 🏁 `
    }
}