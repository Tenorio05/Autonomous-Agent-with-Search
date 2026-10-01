// food.js

class Food {
    constructor(grid) {
        this.grid = grid;
        this.spawn();
    }

    // Picks a random position avoiding obstacles
    spawn() {
        let valid = false;
        while (!valid) {
            this.i = floor(random(this.grid.cols));
            this.j = floor(random(this.grid.rows));
            
            if (this.grid.matrix[this.i][this.j].terrain.type !== 'OBSTACLE') {
                valid = true;
            }
        }
        
        // Stores the cell where the food is and calculates its position
        this.cell = this.grid.matrix[this.i][this.j];
        this.x = this.i * this.grid.w;
        this.y = this.j * this.grid.w;
        this.w = this.grid.w;
    }

    // Draws the food in the middle of the cell
    show(offsetX, offsetY) {
        fill(255, 0, 0);
        noStroke();
        circle(this.x + offsetX + this.w / 2, this.y + offsetY + this.w / 2, this.w * 0.6);
    }
}