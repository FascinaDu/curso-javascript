function verificar() {
    var data = new Date()
    var ano = data.getFullYear()
    var fano = document.getElementById('txtano')
    var res = document.querySelector('div#res')
    if (fano.value.length == 0 || fano.value > ano) {
        window.alert('[ERRO!] Verifique os dados e tente novamente!')
    } else {
        var fsex = document.getElementsByName('radsex')
        var idade = ano - Number(fano.value)
        var genero = ''
        var img = document.createElement('img')
        img.setAttribute('id', 'foto')
        if (fsex[0].checked){
            genero = 'um homem'
            document.body.style.background = '#224cd1'
            if (idade >= 0 && idade < 10) {
                //Criança
                img.setAttribute('src', 'foto-bebem.png')
            }else if (idade < 21) {
                //Jovem
                img.setAttribute('src', 'foto-jovemm.png')
            } else if (idade < 60) {
                //Adulto
                img.setAttribute('src', 'foto-adultom.png')
            } else if (idade >= 60 && idade < 124) {
                //Idoso
                img.setAttribute('src', 'foto-idosom.png')
            } else if (idade >= 125) {
                img.setAttribute('src', 'morte.png')
                document.body.style.background = '#000000'
            }
            
        } else if (fsex[1].checked) {
            genero = 'uma mulher'
            document.body.style.background = '#e11ab4'
            if (idade >= 0 && idade <= 10) {
                //Criança
                img.setAttribute('src', 'foto-bebef.png')
            }else if (idade < 21) {
                //Jovem
                img.setAttribute('src', 'foto-jovemf.png')
            } else if (idade < 60) {
                //Adulto
                img.setAttribute('src', 'foto-adultof.png')
            } else if (idade >= 60 && idade < 124) {
                //Idoso
                img.setAttribute('src', 'foto-idosof.png')
            } else if (idade >= 125) {
                //Morta
                img.setAttribute('src', 'morte.png')
                document.body.style.background = '#000000'
            }
            
        }
        if (idade <= 124){
            res.style.textAlign = 'center'
            res.innerHTML = `Você é ${genero} com ${idade} anos.`
            res.appendChild(img)
        } else {
            res.style.textAlign = 'center'
            res.innerHTML = `<p>Você era ${genero} e teria ${idade} anos. </p>`
            res.innerHTML += `<p>Se estivesse vivo...</p>`
            res.appendChild(img)
            
        }
        
    }

}