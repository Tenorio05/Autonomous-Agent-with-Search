// agent.js

class Agent {
    constructor(grid) {
        this.grid = grid;
        this.goal = null;
        this.path = [];
        this.pathIndex = 0;
        this.moveTimer = 0;
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

    // Sets agent's goal
    setGoal(food) {
        this.goal = food.cell;
    }
    
    // Sets agent's path
    setPath(newPath) {
        this.path = newPath;
        this.pathIndex = 0;
        this.moveTimer = 0;
    }

    // Updates agent's path when there is one and agent didn't finish it yet
    update() {
        if (this.path.length > 0 && this.pathIndex < this.path.length) {
            let currentCell = this.grid.matrix[this.i][this.j];            
            let delay = currentCell.terrain.cost; 
            this.moveTimer++;

            // When tarrain's passthrough-time is completed, it moves to next node
            if (this.moveTimer >= delay) {
                let nextCell = this.path[this.pathIndex];
                this.i = nextCell.i;
                this.j = nextCell.j;
                this.x = this.i * this.grid.w;
                this.y = this.j * this.grid.w;
                
                this.pathIndex++;
                this.moveTimer = 0;
            }
        }
    }

    // Draws the agent in the middle of the cell
    show(offsetX, offsetY) {
        fill(0, 255, 0);
        noStroke();
        circle(this.x + offsetX + this.w / 2, this.y + offsetY + this.w / 2, this.w * 0.8);
    }
}
