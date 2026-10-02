// searchVisualizer.js

class SearchVisualizer {
    constructor() {
        this.visited = [];
        this.frontier = [];
        this.path = [];
    }

    // Clear the lists when the map is reseted
    clear() {
        this.visited = [];
        this.frontier = [];
        this.path = [];
    }

    // Desenha as etapas intermediárias da busca de forma destacada
    show(offsetX, offsetY) {
        // Visitados: véu escuro azulado, o terreno continua visível por baixo
        fill(10, 10, 40, 110);
        noStroke();
        for (let cell of this.visited) {
            rect(cell.x + offsetX, cell.y + offsetY, cell.w, cell.w);
        }

        // Fronteira: só contorno amarelo, sem preenchimento
        noFill();
        stroke(10, 255, 10);
        strokeWeight(3);
        for (let cell of this.frontier) {
            rect(cell.x + offsetX + 3, cell.y + offsetY + 3, cell.w - 6, cell.w - 6);
        }

        // Caminho final: linha branca grossa por baixo, laranja por cima
        if (this.path.length > 0) {
            noFill();
            for (let [col, weight] of [[color(255), 9], [color(255, 180, 0), 5]]) {
                stroke(col);
                strokeWeight(weight);
                beginShape();
                for (let cell of this.path) {
                    vertex(cell.x + offsetX + cell.w / 2, cell.y + offsetY + cell.w / 2);
                }
                endShape();
            }
        }
    }
}