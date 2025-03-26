let amigo = {
    nome: 'José',
    sexo: 'M',
    peso: 85.4,
    //criou uma função de engordar
    engordar(p=0){
        console.log('Engordou')
        this.peso += p
    }
}
amigo.engordar(2)
console.log(`${amigo.nome} pesa ${amigo.peso}Kg`)