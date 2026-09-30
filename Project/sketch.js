// sketch.js

let mapGrid;
let offsetX, offsetY;

function setup() {
	// A tela recebe o tamanho total da janela do navegador
	createCanvas(windowWidth, windowHeight);
	
	// Calcula o recuo (offset) em X e Y para que o mapa de 1000x500 fique no centro da tela
	offsetX = (windowWidth - MAP_WIDTH) / 2;
	offsetY = (windowHeight - MAP_HEIGHT) / 2;
	
	// Instancia e gera a matriz
	mapGrid = new Grid(COLS, ROWS, TILE_SIZE);
	mapGrid.generate();
}

function draw() {
	// Define a cor de fundo de todo o canvas (página) para preto
	background(0);
	
	// Desenha o fundo branco do retângulo central onde ficará o mapa
	fill(255); // Fundo branco
	noStroke(); // Remove as bordas do retângulo de fundo
	rect(offsetX, offsetY, MAP_WIDTH, MAP_HEIGHT);
	
	// Pede ao gerenciador do Grid para desenhar as células do mapa por cima
	mapGrid.show(offsetX, offsetY);
	}

	// Recalcula o centro dinamicamente caso o usuário redimensione o navegador
	function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	offsetX = (windowWidth - MAP_WIDTH) / 2;
	offsetY = (windowHeight - MAP_HEIGHT) / 2;
}