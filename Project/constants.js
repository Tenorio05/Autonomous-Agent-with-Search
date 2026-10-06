// constants.js

// Map and Grid dimensions
const MAP_WIDTH = 600;
const MAP_HEIGHT = 600;
const TILE_SIZE = 30; 
const COLS = MAP_WIDTH / TILE_SIZE; 
const ROWS = MAP_HEIGHT / TILE_SIZE; 

// Dict with all types of terrain and its costs
const TERRAIN = {
  OBSTACLE: { type: 'OBSTACLE', cost: Infinity, color: '#000000' }, // Obstacle
  SAND: { type: 'SAND', cost: 10, color: '#F4A460' },               // Low cost (sand)
  MUD: { type: 'MUD', cost: 50, color: '#8B4513' },                 // Mid cost (mud)
  WATER: { type: 'WATER', cost: 100, color: '#4682B4' }             // High cost (water)
};

// List with all search algorithms
const ALGORITHMS = [
  { key: 'B', name: "Busca em Largura" },
  { key: 'D', name: "Busca em Profundidade" },
  { key: 'G', name: "Busca Gulosa" },
  { key: 'A', name: "Algoritmo A*" },
  { key: 'U', name: "Custo Uniforme" }
	];