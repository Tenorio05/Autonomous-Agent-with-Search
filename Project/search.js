//search.js

//BFS
function* bfs(start, goal, grid) {
    let queue = [];
    let visited = new Set();
    let cameFrom = new Map();

    queue.push(start);
    visited.add(start);

    while (queue.length > 0) {
        let current = queue.shift();

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

        let neighbors = grid.getNeighbors(current);

        for (let neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                cameFrom.set(neighbor, current);
                queue.push(neighbor);
            }
        }

        yield {visited: Array.from(visited), frontier: queue.slice()};
    }

    // A fila acabou e o objetivo não foi encontrado
    return null;
}

//DFS
function* dfs(start, goal, grid) {
    let stack = [];
    let visited = new Set();
    let cameFrom = new Map();

    stack.push(start);
    visited.add(start);

    while (stack.length > 0) {
        let current = stack.pop();

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

        let neighbors = grid.getNeighbors(current);

        for (let neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                cameFrom.set(neighbor, current);
                stack.push(neighbor);
            }
        }

        yield {visited: Array.from(visited),frontier: stack.slice()};
    }
    // A pilha acabou e o objetivo não foi encontrado
    return null;
}

// Heuristica: Manhattan distance (o mapa só possui 4 direções possíveis)
function heuristic(a, b) {
    return abs(a.i - b.i) + abs(a.j - b.j);
}

// Guloso (Best First)
function* greedy(start, goal, grid) {
    let frontier = [start];
    let visited = new Set();
    let cameFrom = new Map();

    visited.add(start);

    while (frontier.length > 0) { // noprotect
        // Celula mais próxima ao alvo
        let bestIndex = 0;
        for (let k = 1; k < frontier.length; k++) { // noprotect
            if (heuristic(frontier[k], goal) < heuristic(frontier[bestIndex], goal)) {
                bestIndex = k;
            }
        }
        let current = frontier.splice(bestIndex, 1)[0];

        if (current === goal) {
            let path = [];
            let node = goal;

            while (cameFrom.has(node)) { // noprotect
                path.unshift(node);
                node = cameFrom.get(node);
            }

            path.unshift(start);
            return path;
        }

        for (let neighbor of grid.getNeighbors(current)) { // noprotect
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                cameFrom.set(neighbor, current);
                frontier.push(neighbor);
            }
        }

        yield { visited: Array.from(visited), frontier: frontier.slice() };
    }

    // Não foi possível encontrar
    return null;
}

function* aStar(start, goal, grid) {
    let frontier = [];
    let visited = new Set();
    let cameFrom = new Map();
    let gScore = new Map();
    let fScore = new Map();

    gScore.set(start, 0);
    fScore.set(start, heuristic(start, goal));

    frontier.push({ node: start, f: fScore.get(start) });

    while (frontier.length > 0) {

        frontier.sort((a, b) => a.f - b.f);

        let currentItem = frontier.shift();
        let current = currentItem.node;

        if (current == goal) {
            let path = [];
            let node = goal;

            while (cameFrom.has(node)) {
                path.unshift(node);
                node = cameFrom.get(node);
            }

            path.unshift(start);
            return path;
        }
        
        if (visited.has(current)) continue;
        visited.add(current);

        for (let neighbor of grid.getNeighbors(current)) {
            if (!visited.has(neighbor)) {
                let tentativeG = gScore.get(current) + neighbor.terrain.cost; // Assuming uniform cost
                if (!gScore.has(neighbor) || tentativeG < gScore.get(neighbor)) {
                    cameFrom.set(neighbor, current);
                    gScore.set(neighbor, tentativeG);
                    fScore.set(neighbor, tentativeG + heuristic(neighbor, goal));
                    frontier.push({ node: neighbor, f: fScore.get(neighbor) });
                }
            }
        }

        yield {
            visited: Array.from(visited),
            frontier: frontier.map(item => item.node)
        };
    }

    return null;
}
