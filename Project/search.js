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