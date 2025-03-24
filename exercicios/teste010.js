function contarVogais(str) {
    const vogais = str.match(/[aeiouáéíóúAEIOUÁÉÍÓÚ]/g);
    return vogais ? vogais.length : 0; // Se não houver vogais, retorna 0
  }
  
  console.log(contarVogais("Olá, como vai?")); // 6