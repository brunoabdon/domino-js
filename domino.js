$(function(){
	
	if(!$.domino){
		$.domino = new Object();
		$.domino.cabecaEsquerda = null;
		$.domino.cabecaDireita = null;
		
		$.domino.pedras = [];
		
		$.domino.taVazio = function(){
			return this.cabecaEsquerda == null;
		}
/*		
		var i, j;
	    for(i = 0; i<= 6;i++){
			for(j = 0; j<= 6;j++){
				domino.pedras[(i*7)+j] = new Pedra(i,j);
			}
		}
*/
	
		$.domino.pedra = function(n1,n2){
			if(numeroInvalido(n1) || numeroInvalido(n2)) throw "pedra invalida: " + n1 + ":" + n2 ;
			var codePoint = 127025+(n1*7)+n2;
			if(n1 == n2) codePoint+=50;
			return String.fromCodePoint(codePoint);
		};
		
		$.domino.spanPedra = function (numEsq,numDir){
			return $("<span>")
					.addClass("pedra")
					.text(this.pedra(numEsq,numDir));
		}
		
		$.domino.joga = function(menorNum,maiorNum,lado){
			if(numeroInvalido(menorNum) || numeroInvalido(menorNum)) throw "pedra invalida: " + menorNum + ":" + menorNum ;
			if(menorNum > maiorNum) throw "argumento invalido. diga o numero menor primeiro";
			
			var mesa = $("#mesa");
			
			if(this.taVazio()){
				this.cabecaEsquerda = menorNum;
				this.cabecaDireita = maiorNum;
				
				var spanPedra = this.spanPedra(menorNum,maiorNum);
				mesa.append(spanPedra)
			} else {
				
				if(menorNum != maiorNum){
					var roda = (lado == 'E' && menorNum == this.cabecaEsquerda)
							   ||
							   (lado == 'D' && maiorNum == this.cabecaDireita)
							   
							   
					var numEsq = roda? maiorNum : menorNum;
					var numDir = roda? menorNum : maiorNum;

					if(lado == 'E'){
						this.cabecaEsquerda = this.novaCabeca(this.cabecaEsquerda,menorNum,maiorNum);
					} else {
						this.cabecaDireita = this.novaCabeca(this.cabecaDireita,menorNum,maiorNum);
					}
					
					var spanPedra = this.spanPedra(numEsq,numDir);
					if(lado == 'E'){
						mesa.prepend(spanPedra);
						//se o ultimo adicionado na esquerda foi carroca, precisa setar o letter-spacing do span dele pra um valor negativo
					} else {
						mesa.append(spanPedra);
						//se o ultimo adicionado na direita foi carroca, precisa setar o letter-spacing do span dele pra um valor negativo
					}
				}
			}
		};
		
		$.domino.novaCabeca = function(cabecaAtual,menorNum,maiorNum){
			return menorNum == cabecaAtual ? maiorNum : menorNum;
		};
	}

	
});

function Pedra(cabecaEsquerda,cabecaDireita){
	if(numeroInvalido(cabecaEsquerda) || numeroInvalido(cabecaDireita)) throw "pedra invalida: " + menorNumero + ":" + maiorNumero ;
	this.cabecaEsquerda = cabecaEsquerda;
	this.cabecaDireita = cabecaDireita;
}

function numeroInvalido(num){
	return num < 0 || num > 6;
}

Pedra.prototype = {
	isCarroca: function(){
		return this.cabecaEsquerda == this.cabecaDireita;
	},

	toString(){
		var codePoint = 127025+(this.cabecaEsquerda*7)+this.cabecaDireita;
		if(this.isCarroca()) codePoint+=50;
		return String.fromCodePoint(codePoint);
	}
}


