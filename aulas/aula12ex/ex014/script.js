function carregar() {
    var msg = window.document.getElementById('msg')
    var img = window.document.getElementById('imagem')
    var data = new Date()
    var hora = data.getHours()
    var minuto = data.getMinutes()

    msg.innerHTML = `Agora são ${hora}:${minuto}`
    if (hora >= 0 && hora < 12) {
        //bom dia
        msg.innerHTML = 'Bom dia!'
        img.src = 'fotomanha.png'
        document.body.style.background = '#87ceeb'
        document.body.style.color= '#87ceeb'
    } else if (hora >= 12 && hora < 18) {
        //boa tarde
        msg.innerHTML = 'Boa tarde!'
        img.src = 'fototarde.png'
        document.body.style.background = '#b9846f'
        document.body.style.color= '#b9846f'
    } else {
        //boa noite
        msg.innerHTML = 'Boa noite!'
        img.src = 'fotonoite.png'
        document.body.style.background = '#403456'
        document.body.style.color= '#403456'
    }
    
}
