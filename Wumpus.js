const Sentenca = class {
    constructor(operador, primeiro, segundo){
    this.operador = operador;
    this.primeiro = primeiro;
    this.segundo = segundo;
    }
};
const removeParenteses = function(sentenca){
    while(sentenca.operador == null && typeof(sentenca.primeiro == "object")){
        sentenca = sentenca.primeiro;
    }
    return sentenca;
}

const igual = function(sentenca1, sentenca2){
    //sentenca1 = removeParenteses(sentenca1);
    //sentenca2 = removeParenteses(sentenca2);
    //console.log(sentenca1, sentenca2);
    if(sentenca1.operador != sentenca2.operador){
        return false;
    }
    else if(sentenca1.operador == null){
        if (sentenca1.primeiro !== sentenca2.primeiro){
            return false;
        }
        else { 
            return true;
        }
    }
    else{
        return igual(sentenca1.primeiro, sentenca2.primeiro) && igual(sentenca1.segundo, sentenca2.segundo);
    }
}

const provaE = function(i){
    baseConhecimento.push(new Sentenca(baseConhecimento[i].primeiro.operador, baseConhecimento[i].primeiro.primeiro, baseConhecimento[i].primeiro.segundo));
    baseConhecimento.push(new Sentenca(baseConhecimento[i].segundo.operador, baseConhecimento[i].segundo.primeiro, baseConhecimento[i].segundo.segundo));
    baseConhecimento.splice(i, 1);
}
const converteImplica = function(i){
    baseConhecimento[i].operador = 'OU';
    baseConhecimento[i].primeiro = new Sentenca('¬', baseConhecimento[i].primeiro);
}
const tentaProvarOu = function(sentenca, i){
    if(procura(new Sentenca('¬', sentenca.primeiro))){
        baseConhecimento.splice(i, 1);
        baseConhecimento.push(sentenca.segundo);
        return true;
    }
    return false;
}
const checaDuplaNegacao = function(sentenca){
    if (sentenca.operador === '¬' && sentenca.primeiro.operador === '¬'){
        return true;
    }
    return false;
}
const imprime = function(){
    for(let i = 0; i < baseConhecimento.length; i++){
        console.log(baseConhecimento[i]);
    }
}

const baseConhecimento = [];

let procura = function (sentenca){
    if(checaDuplaNegacao(sentenca)){
        sentenca = sentenca.primeiro.primeiro;
    }
    for(let i = 0; i < baseConhecimento.length; i++){
        if(igual(sentenca, baseConhecimento[i])){
            return true;
        }
    }
    return false;
}
const processa = function(){
    for(let i = 0; i < baseConhecimento.length; i++){
        switch(baseConhecimento[i].operador){
            case '>':
                converteImplica(i);
                //console.log(baseConhecimento[i]);
                tentaProvarOu(baseConhecimento[i], i);
                break;
            case 'OU':
                tentaProvarOu(baseConhecimento[i], i);
                break;
            case 'E':
                provaE(i);
                i = -1;
                break;
            default:
                break;
        }
    }
}

// TESTE //
baseConhecimento.push(new Sentenca('E', new Sentenca(null, 'P'), new Sentenca(null, 'R')));
baseConhecimento.push(new Sentenca('>', new Sentenca(null, 'P'), new Sentenca(null, 'Q')));
console.log('-----------------');

processa();


imprime();


//
/* 
galeria(i, j).fedor -> galeria(i+1, j).monstro || galeria(i, j+1).monstro || galeria(i-1, j).monstro || galeria(i, j-1).monstro;
galeria(i, j).vento -> galeria(i+1, j).buraco || galeria(i, j+1).buraco || galeria(i-1, j).buraco || galeria(i, j-1).buraco;
!galeria(i, j).fedor -> !galeria(i+1, j).monstro && !galeria(i, j+1).monstro && !galeria(i-1, j).monstro && !galeria(i, j-1).monstro;
!galeria(i, j).vento -> !galeria(i+1, j).buraco && !galeria(i, j+1).buraco && !galeria(i-1, j).buraco && !galeria(i, j-1).buraco;

base de conhecimento : conjunto de sentenças atômicas e conjuntos de sentenças compostas:
    sentenças:
    ¬p || (q1 || q2 || q3 || q4)
    p || (¬q1 && ¬q2 && ¬q3 && ¬q4)
    
    
    cada proposição pode ser considerada uma árvore
    Nossa base de conhecimento será uma lista de árvores
    
    https://code.tutsplus.com/articles/data-structures-with-javascript-tree--cms-23393
    
*/

