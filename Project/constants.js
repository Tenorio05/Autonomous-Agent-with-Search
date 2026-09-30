// constants.js

// Map and Grid dimensions
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;
const TILE_SIZE = 50; 
const COLS = MAP_WIDTH / TILE_SIZE; 
const ROWS = MAP_HEIGHT / TILE_SIZE; 

// Dict with all types of terrain and its costs
const TERRAIN = {
  OBSTACLE: { type: 'OBSTACLE', cost: Infinity, color: '#000000' }, // Obstacle
  SAND: { type: 'SAND', cost: 10, color: '#F4A460' },               // Low cost (sand)
  MUD: { type: 'MUD', cost: 50, color: '#8B4513' },                 // Mid cost (mud)
  WATER: { type: 'WATER', cost: 100, color: '#4682B4' }             // High cost (water)
};