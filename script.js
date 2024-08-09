let turno = 'X';
let tabuleiro = ['', '', '', '', '', '', '', '', ''];
let placarX = 0;
let placarO = 0;
let jogoAtivo = true;

const combinacoesVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const celulas = document.querySelectorAll('.celula');
const mensagem = document.getElementById('mensagem');
const botaoReiniciar = document.getElementById('reiniciar');

celulas.forEach(celula => celula.addEventListener('click', jogar));
botaoReiniciar.addEventListener('click', reiniciarJogo);

function jogar(evento) {
    const indice = evento.target.getAttribute('data-index');

    if (tabuleiro[indice] === '' && jogoAtivo) {
        tabuleiro[indice] = turno;
        evento.target.textContent = turno;
        evento.target.classList.add('xo');

        if (verificarVitoria()) {
            jogoAtivo = false;
            if (turno === 'X') {
                placarX++;
            } else {
                placarO++;
            }
            atualizarPlacar();
            mostrarMensagem(`Jogador ${turno} venceu!`);
            destacarVencedor();
        } else if (tabuleiro.every(celula => celula !== '')) {
            jogoAtivo = false;
            mostrarMensagem('Empate!');
        } else {
            turno = turno === 'X' ? 'O' : 'X';
        }
    }
}

function verificarVitoria() {
    return combinacoesVencedoras.some(combinacao => {
        return combinacao.every(indice => tabuleiro[indice] === turno);
    });
}

function destacarVencedor() {
    combinacoesVencedoras.forEach(combinacao => {
        if (combinacao.every(indice => tabuleiro[indice] === turno)) {
            combinacao.forEach(indice => {
                celulas[indice].classList.add('vencedor');
            });
        }
    });
}

function atualizarPlacar() {
    document.getElementById('jogadorX').textContent = `Jogador X: ${placarX}`;
    document.getElementById('jogadorO').textContent = `Jogador O: ${placarO}`;
}

function mostrarMensagem(texto) {
    mensagem.textContent = texto;
    mensagem.style.display = 'block';
}

function reiniciarJogo() {
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    celulas.forEach(celula => {
        celula.textContent = '';
        celula.classList.remove('xo', 'vencedor');
    });
    jogoAtivo = true;
    turno = 'X';
    mensagem.style.display = 'none';
}
