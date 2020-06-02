function asignaEcuacion() {
    let ecuacion = getEcuacion();
    this.eje = randomEje();
    this.eje2 = otroEje(this.eje);
    this.num = randomInt(40, -40);
    this.intentos = 0;
    ecuacion.value = this.eje2 + "²=" + this.num + this.eje;
    inicializar();
}
function inicializar(){
    let resultado = getResultado();
    resultado.innerHTML = "";
    let foco = getFoco();
    foco.value="";
    let directriz = getDirectriz();
    directriz.value="";
    let ladoRecto= getLadoRecto();
    ladoRecto.value="";
}
function randomInt(min, max) {
    let num = Math.floor(Math.random() * (max + 1 - min)) + min;
    num = num !== 0 && num % 4 == 0 ? num : randomInt(min, max);
    return num;
}
function randomEje() {
    let eje = Math.floor(Math.random() * 2) === 1 ? 'x' : 'y';
    return eje;
}
function otroEje(eje) {
    eje = eje === 'x' ? 'y' : 'x';
    return eje;
}

function valida() {
    let error = formatoFoco() && formatoDirectriz() ? 
                validaVertice():
                "Llena todos los campos con el formato correcto";
    this.intentos += 1;
    let resultado = getResultado();
    resultado.innerHTML = this.intentos+error;
}

function validaVertice(){
    let vertice = getVertice();
    let error = !validaIgual(vertice.value,"(0,0)")?"Escribe bien el vértice":validaFoco(this.num);
    return error;
}

function validaFoco(num) {
    num = num / 4;
    let foco = getFoco();
    foco = foco.value.split(/[(),]/);
    let foco2 = this.eje2 == 'x' ? foco[1] : foco[2];
    foco = this.eje2 == 'x' ? foco[2] : foco[1];
    let error = !validaIgual(foco2,0) && !validaIgual(num, foco) ?
                "Para obtener el foco divide el lado recto entre 4":
                validaDirectriz(num);
    return error;
}
function validaDirectriz(num) {
    num = num - num - num;
    let directriz = getDirectriz();
    let error = !validaIgual(this.eje + "=" + num, directriz.value) ?
                 "La directriz es el foco con el signo contrario" : 
                 validaLadoRecto(this.num);
    return error;
}
function validaLadoRecto(num) {
    let error = !validaIgual(Math.abs(num), getLadoRecto()) ? "El lado recto es 4 veces el foco" : "¡Correcto!";
    return error;
}
function validaIgual(x, y) {
    let resultado = x == y ? true : false;
    return resultado;
}
function getEcuacion() {
    return document.getElementById("ecuacion");
}
function getFoco() {
    return document.getElementById("foco");
}
function getDirectriz() {
    return document.getElementById("directriz");
}
function getLadoRecto() {
    return document.getElementById("ladoRecto").value;
}
function getResultado() {
    return document.getElementById("resultado");
}
function getVertice() {
    return document.getElementById("vertice");
}
function formatoFoco(){
    let regExp = new RegExp('([0-9],[0-9])');
    let foco =getFoco();
    let res = foco.value == "" && !regExp.test(foco.value)?false:true;
    return res;
}
function formatoDirectriz(){
    let regExp = new RegExp('((x|y)=[0-9])');
    let directriz = getDirectriz();
    let res = directriz.value == ""&& !regExp.test(directriz.value)?false:true;
    return res;
}