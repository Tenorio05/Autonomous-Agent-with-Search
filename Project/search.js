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

        yield {visited: Array.from(visited),frontier: queue.slice()};
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
