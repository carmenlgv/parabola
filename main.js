//(x-h)^2=4p(y-k)
//(y-k)^2=4p(x-h)
function asignaEcuacion() {
    let fecha = getFecha();
    let date = new Date();
    fecha.value =date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear();
    let ecuacion = getEcuacion();
    this.eje = randomEje();
    this.eje2 = otroEje(this.eje);
    this.p = randomInt(10, -10, 0);
    this.h = randomInt(10, -10, 11);
    this.k = randomInt(10, -10, 11);
    this.intentos = 0;
    if (this.h == 0 && this.k == 0) {
        ecuacion.value = this.eje2 + "²=" + (this.p * 4) + this.eje;
    }
    else if (this.h == 0) {
        let knum = this.k <= 0 ? "+" + (this.k - this.k - this.k) : (this.k - this.k - this.k);
        ecuacion.value = this.eje2 == 'x' ?
            this.eje2 + "²=" + (this.p * 4) + "(" + this.eje + knum + ")" :
            "(" + this.eje2 + knum + ")²=" + (this.p * 4) + this.eje;
    }
    else if (this.k == 0) {
        let hnum = this.h <= 0 ? "+" + (this.h - this.h - this.h) : (this.h - this.h - this.h);
        ecuacion.value = this.eje2 == 'x' ?
            "(" + this.eje2 + hnum + ")²=" + (this.p * 4) + this.eje :
            this.eje2 + "²=" + this.p * 4 + "(" + this.eje + hnum + ")";
    }
    else {
        let hnum = this.h <= 0 ? "+" + (this.h - this.h - this.h) : (this.h - this.h - this.h);
        let knum = this.k <= 0 ? "+" + (this.k - this.k - this.k) : (this.k - this.k - this.k);
        ecuacion.value = this.eje2 == 'x' ?
            "(" + this.eje2 + hnum + ")²=" + this.p * 4 + "(" + this.eje + knum + ")" :
            "(" + this.eje2 + knum + ")²=" + this.p * 4 + "(" + this.eje + hnum + ")";
    }
    inicializar();
}
function inicializar() {
    let resultado = getResultado();
    resultado.innerHTML = "";
    let foco = getFoco();
    foco.value = "";
    let directriz = getDirectriz();
    directriz.value = "";
    let ladoRecto = getLadoRecto();
    ladoRecto.value = "";
    let vertice = getVertice();
    vertice.value = "";
    let otra = getBotonOtra();
    otra.hidden = true;
}
function randomInt(min, max, dif) {
    let p = Math.floor(Math.random() * (max + 1 - min)) + min;
    p = p !== dif ? p : randomInt(min, max);
    return p;
}
function randomEje() {
    let eje = Math.floor(Math.random() * 2) === 1 ? 'x' : 'y';
    return eje;
}
function otroEje(eje) {
    eje = eje == 'x' ? 'y' : 'x';
    return eje;
}

function valida() {
    let error = validaVertice();
    this.intentos += 1;
    if (error == "¡Correcto!") {
        let otra = getBotonOtra();
        otra.hidden = false;
    }
    let resultado = getResultado();
    resultado.innerHTML = this.intentos + error;
}

function validaVertice() {
    let vertice = getVertice();
    let error = !validaIgual(vertice.value, "(" + this.h + "," + this.k + ")") ?//k signo contrario
        "Vértice incorrecto, vuelve a intentarlo" :
        validaFoco();
    return error;
}

function validaFoco() {
    let resp = this.eje2 == 'x' ?
        "(" + this.h + "," + (this.k + this.p) + ")" :
        "(" + (this.h + this.p) + "," + this.k + ")";
    let foco = getFoco();
    let error = !validaIgual(resp, foco.value) ?
        "Foco incorrecto, vuelve a intentarlo" :
        validaDirectriz();
    return error;
}
function validaDirectriz() {
    let resp = this.eje2 == 'x' ? (this.k - this.p) : (this.h - this.p);
    let directriz = getDirectriz();
    directriz = directriz.value.toLowerCase();
    let error = !validaIgual(this.eje + "=" + resp, directriz) ?
        "Directriz incorrecta, vuelve a intentarlo" :
        validaLadoRecto(this.p * 4);
    return error;
}
function validaLadoRecto(p) {
    let ladoRecto = getLadoRecto();
    let error = !validaIgual(Math.abs(p), ladoRecto.value) ?
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
function getFecha() {
    return document.getElementById("fecha");
}
