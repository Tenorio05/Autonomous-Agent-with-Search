// dijkstra.js


// Min-heap
class DijkstraHeap {
    constructor() { 
        this.a = []; 
    }

    get size() { 
        return this.a.length; 
    }

    push(priority, item) {
        const a = this.a;
        a.push([priority, item]);
        let i = a.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (a[p][0] <= a[i][0]) break;
            [a[p], a[i]] = [a[i], a[p]];
            i = p;
        }
    }

    pop() {
        const a = this.a;
        const top = a[0];
        const last = a.pop();
        if (a.length > 0) {
            a[0] = last;
            let i = 0;
            while (true) {
                const l = 2 * i + 1, r = l + 1;
                let m = i;
                if (l < a.length && a[l][0] < a[m][0]) m = l;
                if (r < a.length && a[r][0] < a[m][0]) m = r;
                if (m === i) break;
                [a[m], a[i]] = [a[i], a[m]];
                i = m;
            }
        }
        return top;
    }
}

function* dijkstra(start, goal, grid) {
    let heap = new DijkstraHeap();
    let visited = new Set();
    // células que estão na fila 
    let frontier = new Set([start]);    
    let cameFrom = new Map();
    // menor custo conhecido até cada célula
    let gScore = new Map([[start, 0]]);  

    heap.push(0, start);

    while (heap.size > 0) {
        let [g, current] = heap.pop();

        
        if (visited.has(current)) continue;

        visited.add(current);
        frontier.delete(current);

        if (current === goal) {
            let path = [];
            let node = goal;

            while (cameFrom.has(node)) {
                path.unshift(node);
                node = cameFrom.get(node);
            }

            path.unshift(start);
            return path;
        }

        for (let neighbor of grid.getNeighbors(current)) {
            if (visited.has(neighbor)) continue;

            let newCost = g + neighbor.terrain.cost;
            if (!gScore.has(neighbor) || newCost < gScore.get(neighbor)) {
                gScore.set(neighbor, newCost);
                cameFrom.set(neighbor, current);
                heap.push(newCost, neighbor);
                frontier.add(neighbor);
            }
        }

        yield { visited: Array.from(visited), frontier: Array.from(frontier) };
    }

    
    return null;
}