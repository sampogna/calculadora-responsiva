import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent {

  public valorDisplayNum: number = 0; // Variavel que serve como um temp holder p conversao de valores
  public valorDisplayStr: string = ''; // O input esta ligado por property binding a esta variavel
  public stringTemp: string = ''; //String temporaria para formatacao facilitada dos numeros
  public opAnteriorDisplay: string = ''; //Variavel que guarda a string da primeira parte da operacao de multiplicacao

  constructor() { }

  ngOnInit(): void {

  }

  public getSingleNum(num: string) {

    if (num == ',' && this.valorDisplayStr.indexOf(',') != -1) {
      return;
    }
    else if (this.valorDisplayStr.length == 16) {
      return;
    }
    else {
      this.valorDisplayStr += num;
      this.stringTemp += num;
      this.valorDisplayNum = Number(this.stringTemp.replace(',', '.'));
      this.valorDisplayStr = this.valorDisplayNum.toLocaleString("pt-BR");
    }

  }

  public onPressX() {
    if (this.valorDisplayStr != '' && this.opAnteriorDisplay == '') {
      (this.valorDisplayStr.slice(-1) == ',') ? this.valorDisplayStr = this.valorDisplayStr.substring(0, this.valorDisplayStr.length - 1) : this.opAnteriorDisplay;
      this.opAnteriorDisplay += this.valorDisplayStr + ' x';
      this.valorDisplayNum = 0;
      this.valorDisplayStr = '';
      this.stringTemp = '';
    }
    else if (this.opAnteriorDisplay != '') {
      this.calcular(true);
    }
  }

  public limparCntrls() {
    this.valorDisplayStr = '';
    this.valorDisplayNum = 0;
    this.opAnteriorDisplay = '';
    this.stringTemp = '';
  }

  public calcular(opOnX?: boolean) {
    if (this.opAnteriorDisplay != '') {
      this.valorDisplayNum = parseFloat(this.unformatNum(this.valorDisplayStr)) * parseFloat(this.unformatNum(this.opAnteriorDisplay));
      this.valorDisplayStr = this.valorDisplayNum.toLocaleString("pt-BR");
      if (opOnX) {
        this.opAnteriorDisplay = this.valorDisplayStr + ' x';
      }
      else {
        this.opAnteriorDisplay = '';
      }
      this.stringTemp = '';
    }

  }

  public unformatNum(num: string) {
    let newNum = num.split(".").join(""); newNum = newNum.split(",").join("."); newNum = newNum.split(" x").join("");
    return newNum;
  }



}
