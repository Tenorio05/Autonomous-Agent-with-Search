// agent.js

class Agent {
    constructor(grid) {
        this.grid = grid;
        this.goal = null;
        this.path = [];
        this.pathIndex = 0;
        this.moveTimer = 0;
        this.isMoving = false;
        this.startX = 0;
        this.startY = 0;
        this.targetX = 0;
        this.targetY = 0;
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
        this.isMoving = false;

        // Defines start point and next cell as a goal
        if (this.path.length > 0) {
            this.startX = this.x;
            this.startY = this.y;
            let nextCell = this.path[this.pathIndex];
            this.targetX = nextCell.x;
            this.targetY = nextCell.y;
		}
    }

    // Makes agent start moving into the food
    startMoving() {
		if (this.path && this.path.length > 0) {
		    this.isMoving = true;
		}
	}

    // Makes agent teleport into the food and stop moving
    teleportToGoal() {
        if (this.path && this.path.length > 0) {
            let lastCell = this.path[this.path.length - 1];
            
            // Updates positions
            this.i = lastCell.i;
            this.j = lastCell.j;
            this.x = lastCell.x;
            this.y = lastCell.y;
            
            // Finishes the path
            this.pathIndex = this.path.length;
            this.isMoving = false;
            this.moveTimer = 0;
        }
    }

    // Updates agent's path when there is one and agent didn't finish it yet
    update() {
        if (this.isMoving && this.path.length > 0 && this.pathIndex < this.path.length) {
            let currentCell = this.grid.matrix[this.i][this.j];            
            let delay = currentCell.terrain.cost;

            this.moveTimer++;

            let progress = this.moveTimer / delay;
		    this.x = lerp(this.startX, this.targetX, progress); // Interpola o eixo X
		    this.y = lerp(this.startY, this.targetY, progress); // Interpola o eixo Y

            // When tarrain's passthrough-time is completed, it moves to next node
            if (this.moveTimer >= delay) {
                let nextCell = this.path[this.pathIndex];
                this.i = nextCell.i;
                this.j = nextCell.j;

                this.x = this.targetX;
			    this.y = this.targetY;
                
                this.pathIndex++;
                this.moveTimer = 0;

                if (this.pathIndex < this.path.length) {
					this.startX = this.x;
					this.startY = this.y;
					let nextTargetCell = this.path[this.pathIndex];
					this.targetX = nextTargetCell.x;
					this.targetY = nextTargetCell.y;
				} else {
					this.isMoving = false;
				} 
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
