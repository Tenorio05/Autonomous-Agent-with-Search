//cell.js

class Cell {
    constructor(i, j, w, terrain) {
        this.i = i;
        this.j = j;
        this.x = i * w;
        this.y = j * w;
        this.w = w;
        this.terrain = terrain;
    }

    // Receive offsets to draw itself based on its position on map
    show(offsetX, offsetY) {
        fill(this.terrain.color);
        noStroke();
        //stroke(200);
        //strokeWeight(2);
        
        // Draws cell square considering the map offset on screen
        rect(this.x + offsetX, this.y + offsetY, this.w, this.w);
    }
}