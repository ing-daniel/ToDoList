export default class ItemModel{
  constructor(objeto = {}){
    this.text = objeto.text || '';
    this.active = objeto.active || false;
  }
} 