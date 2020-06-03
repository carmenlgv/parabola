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
    let vertice= getVertice();
    vertice.value="";
    let otra = getBotonOtra();
    otra.hidden = true;
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
    if (error == "¡Correcto!") {
        let otra = getBotonOtra();
        otra.hidden = false;
    }
    let resultado = getResultado();
    resultado.innerHTML = this.intentos+error;
}

function validaVertice(){
    let vertice = getVertice();
    let error = !validaIgual(vertice.value,"(0,0)")?
                "Vértice incorrecto, vuelve a intentarlo":
                validaFoco(this.num);
    return error;
}

function validaFoco(num) {
    num = num / 4;
    let foco = getFoco();
    let focoC = this.eje2 == 'x' ? "(0,"+num+")" : "("+num+",0)";
    let error = !validaIgual(focoC,foco.value) ?
                "Foco incorrecto, vuelve a intentarlo":
                validaDirectriz(num);
    return error;
}
function validaDirectriz(num) {
    num = num - num - num;
    let directriz = getDirectriz();
    directriz = directriz.value.toLowerCase();
    let error = !validaIgual(this.eje + "=" + num, directriz) ?
                 "Directriz incorrecta, vuelve a intentarlo" : 
                 validaLadoRecto(this.num);
    return error;
}
function validaLadoRecto(num) {
    let ladoRecto = getLadoRecto();
    let error = !validaIgual(Math.abs(num), ladoRecto.value) ? 
                "Lado Recto incorrecto, vuelve a intentarlo" :
                "¡Correcto!";
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
    return document.getElementById("ladoRecto");
}
function getResultado() {
    return document.getElementById("resultado");
}
function getVertice() {
    return document.getElementById("vertice");
}
function getBotonOtra() {
    return document.getElementById("otra");
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