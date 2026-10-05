// sketch.js

let mapGrid;
let offsetX, offsetY;
let agent;
let food;
let visualizer;
let searchGen = null;
let score = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	// Calculates the offset in X and Y so that the 1000x500 map is drawn centered
	offsetX = (windowWidth - MAP_WIDTH) / 2;
	offsetY = (windowHeight - MAP_HEIGHT) / 2;

	// Generates a new seed based on elapsed time
	noiseSeed(millis());
	
	// Generates the environment
	mapGrid = new Grid(COLS, ROWS, TILE_SIZE);
	mapGrid.generate();
	food = new Food(mapGrid);
	agent = new Agent(mapGrid);
	agent.setGoal(food);
	visualizer = new SearchVisualizer();
}


function draw() {
	background(0);
	fill(255);
	//noStroke();
	stroke(255);
	strokeWeight(5);
	rect(offsetX, offsetY, MAP_WIDTH, MAP_HEIGHT);

	mapGrid.show(offsetX, offsetY);       // 1. Map

	if(searchGen) {
		let result = searchGen.next();

		if(result.done) {
			if(result.value) {
				visualizer.path = result.value;
				agent.setPath(result.value);
			} else {
				visualizer.path = [];
			}
			searchGen = null;
		} else {
			//Atualiza as listas de visitados e fronteira do visualizador com os valores retornados pelo gerador
			visualizer.visited = result.value.visited;
			visualizer.frontier = result.value.frontier;
		}
	}

	agent.update();

	if (agent.i === food.i && agent.j === food.j) {
		score++;										// A comida é contabilizada
		agent.cell = mapGrid.matrix[agent.i][agent.j];	// Atualiza a posição do agente
		food.spawn();									// Outra comida aparece no ambiente
		agent.setGoal(food);							// O agente percebe a nova comida
		visualizer.clear();								// Limpa as matrizes de renderização da busca anterior
	}

	visualizer.show(offsetX, offsetY);    // 2. Search
    food.show(offsetX, offsetY);          // 3. Food
	agent.show(offsetX, offsetY);         // 4. Agent

	fill(255);
	noStroke();
	textSize(24);
	text("Comidas coletadas: " + score, 20, 40);
}

// Recalculates the center dinamically
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	offsetX = (windowWidth - MAP_WIDTH) / 2;
	offsetY = (windowHeight - MAP_HEIGHT) / 2;
}

// Resets all the environment
function resetEnvironment() {
	noiseSeed(millis());	// Generates a new seed based on elapsed time
	mapGrid.generate();		// 1. New map
	food.spawn();			// 2. New position for food
	agent.spawn();			// 3. New position for agent
	agent.setGoal(food);	// 4. New goal for agent to achieve
	visualizer.clear();		// 5. Past search cleared
	searchGen = null;		// 6. Search generator reseted
}

// Calls the reset once "r" is pressed
function keyPressed() {
	if (key === 'r' || key === 'R') {
		resetEnvironment();
	}
	if (key==='b' || key==='B') {
		visualizer.clear();
		searchGen = bfs(agent.cell, agent.goal, mapGrid);
	}

	if(key==='d' || key==='D') {
		visualizer.clear();
		searchGen = dfs(agent.cell, agent.goal, mapGrid);
	}
	if (key === 'g' || key === 'G') {
		visualizer.clear();
		searchGen = greedy(agent.cell, agent.goal, mapGrid);
	}
	if (key === 'a' || key === 'A') {
		visualizer.clear();
		searchGen = aStar(agent.cell, agent.goal, mapGrid);
	}
	if (key === 'u' || key === 'U') {
		visualizer.clear();
		searchGen = dijkstra(agent.cell, agent.goal, mapGrid);
	}
}