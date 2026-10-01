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
        // Visitados (Vermelho transparente)
        fill(255, 0, 0, 100); 
        noStroke();
        for (let cell of this.visited) {
            rect(cell.x + offsetX, cell.y + offsetY, cell.w, cell.w);
        }

        // Fronteira (Verde transparente)
        fill(0, 255, 0, 100);
        noStroke();
        for (let cell of this.frontier) {
            rect(cell.x + offsetX, cell.y + offsetY, cell.w, cell.w);
        }

        // Caminho Final (Linha amarela contínua)
        if (this.path.length > 0) {
            noFill();
            stroke(255, 255, 0);
            strokeWeight(4);
            beginShape();
            for (let cell of this.path) {
                vertex(cell.x + offsetX + cell.w / 2, cell.y + offsetY + cell.w / 2);
            }
            endShape();
            strokeWeight(1); 
        }
    }
}