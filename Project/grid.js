// grid.js

class Grid {
    constructor(cols, rows, w) {
        this.cols = cols;
        this.rows = rows;
        this.w = w;
        this.matrix = [];
    }

    // Fills the grid with perlin noise
    generate() {
        let noiseScale = 0.20;
        
        for (let i = 0; i < this.cols; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < this.rows; j++) {
                
                if (random() < 0.20) {
                    this.matrix[i][j] = new Cell(i, j, this.w, TERRAIN.OBSTACLE);
                } else {
                    let noiseVal = noise(i * noiseScale, j * noiseScale);
                    let selectedTerrain;

                    if (noiseVal < 0.45) {
                        selectedTerrain = TERRAIN.SAND;
                    } else if (noiseVal < 0.65) {
                        selectedTerrain = TERRAIN.MUD;
                    } else {
                        selectedTerrain = TERRAIN.WATER;
                    }

                    this.matrix[i][j] = new Cell(i, j, this.w, selectedTerrain);
                }
            }
        }
    }

    // Provides the valid neighbors matrix to be used in the search algorithms
    getNeighbors(cell) {
        let neighbors = [];
        let i = cell.i;
        let j = cell.j;
        
        if (i > 0) neighbors.push(this.matrix[i - 1][j]);
        if (i < this.cols - 1) neighbors.push(this.matrix[i + 1][j]);
        if (j > 0) neighbors.push(this.matrix[i][j - 1]);
        if (j < this.rows - 1) neighbors.push(this.matrix[i][j + 1]);
        
        // Filter the array to ignore it if it's an obstacle
        return neighbors.filter(n => n.terrain.type !== 'OBSTACLE');
    }

    // Shows all cells
    show(offsetX, offsetY) {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.matrix[i][j].show(offsetX, offsetY);
            }
        }
    }
}