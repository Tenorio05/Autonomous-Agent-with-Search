// sketch.js

let mapGrid;
let offsetX, offsetY;
let agent;
let food;
let visualizer;
let searchGen = null;
let score = 0;
let selectedAlg = '';

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
			// Atualiza as listas de visitados e fronteira do visualizador com os valores retornados pelo gerador
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
		agent.path = [];								// Limpa o caminho antigo para evitar loops acidentais
		selectedAlg = '';
	}

	visualizer.show(offsetX, offsetY);    // 2. Search
    food.show(offsetX, offsetY);          // 3. Food
	agent.show(offsetX, offsetY);         // 4. Agent

	// Show texts
	textAlign(LEFT, TOP);
	noStroke();
	fill(255);
	textSize(18);
	text("Comidas coletadas: " + score, 20, 20);
	text("Escolha um algoritmo:", 20, 60);

	for (let i = 0; i < ALGORITHMS.length; i++) {
		if (selectedAlg === ALGORITHMS[i].key) {
			fill(255, 255, 0);	// Yellow
		} else {
			fill(255);			// White
		}
		
		text("[" + ALGORITHMS[i].key + "]: " + ALGORITHMS[i].name, 20, 90 + (i * 25));
	}

	let pulsingAlpha = map(sin(millis() * 0.005), -1, 1, 50, 255); 

	if (agent.isMoving) {
		fill(255, pulsingAlpha);
		text("Aperte ESPAÇO para pular", offsetX + MAP_WIDTH + 20, offsetY + 20);
	} else if (agent.path.length > 0 && searchGen === null) {
		fill(255, pulsingAlpha);
		text("Aperte ESPAÇO para iniciar", offsetX + MAP_WIDTH + 20, offsetY + 20);
	}
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
	score = 0;
	selectedAlg = '';
}

// Resets the actual search to allow another searches before agente starts moving
function resetForNewSearch() {
	visualizer.clear();
	agent.isMoving = false;
	
	agent.x = agent.i * mapGrid.w;
	agent.y = agent.j * mapGrid.w;
	agent.cell = mapGrid.matrix[agent.i][agent.j];
	agent.path = [];
}

// Keyboard Settings 
function keyPressed() {
	if (key.toUpperCase() === 'R') {
		resetEnvironment();
	}

	if (key.toUpperCase() === ' ') {
		if (agent.isMoving) {
			agent.teleportToGoal();
		} else if (agent.path.length > 0 && searchGen === null) {
			agent.startMoving();
		}
	}

	if (agent.isMoving === false) {
		if (key.toUpperCase() ==='B') {
			resetForNewSearch();
			selectedAlg = 'B';
			searchGen = bfs(agent.cell, agent.goal, mapGrid);
		}
		if(key.toUpperCase() ==='D') {
			resetForNewSearch();
			selectedAlg = 'D';
			searchGen = dfs(agent.cell, agent.goal, mapGrid);
		}
		if (key.toUpperCase() === 'G') {
			resetForNewSearch();
			selectedAlg = 'G';
			searchGen = greedy(agent.cell, agent.goal, mapGrid);
		}
		if (key.toUpperCase() === 'A') {
			resetForNewSearch();
			selectedAlg = 'A';
			searchGen = aStar(agent.cell, agent.goal, mapGrid);
		}
		if (key.toUpperCase() === 'U') {
			resetForNewSearch();
			selectedAlg = 'U';
			searchGen = dijkstra(agent.cell, agent.goal, mapGrid);
		}
	}
}