// agent.js

class Agent {
    constructor(grid) {
        this.grid = grid;
        this.goal = null;
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
        
        // Stores the cell where the agent is and calculates its position
        this.cell = this.grid.matrix[this.i][this.j];
        this.x = this.i * this.grid.w;
        this.y = this.j * this.grid.w;
        this.w = this.grid.w;
    }

    // Sets the agent's goal
    setGoal(food) {
        this.goal = food.cell;
    }

    // Draws the agent in the middle of the cell
    show(offsetX, offsetY) {
        fill(0, 255, 0);
        noStroke();
        circle(this.x + offsetX + this.w / 2, this.y + offsetY + this.w / 2, this.w * 0.8);
    }
}