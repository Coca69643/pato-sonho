// =============================================
// Um Pato e um Sonho - items.js
// v0.0.4 - O Mundo Desperta
// Definição de itens, tiers e receitas
// =============================================

// ---- TIERS DE MATERIAL ----
const TIERS = {
  madeira:   { id: 0, nome: 'Madeira',   cor: '#8B5E3C', durabilidade: 60  },
  pedra:     { id: 1, nome: 'Pedra',     cor: '#9E9E9E', durabilidade: 132 },
  ferro:     { id: 2, nome: 'Ferro',     cor: '#B0BEC5', durabilidade: 251 },
  ouro:      { id: 3, nome: 'Ouro',      cor: '#FFD700', durabilidade: 33  },
  diamante:  { id: 4, nome: 'Diamante',  cor: '#4DD0E1', durabilidade: 1562},
  obsidiana: { id: 5, nome: 'Obsidiana', cor: '#7C4DFF', durabilidade: 9999},
};

// ---- FERRAMENTAS (coluna no spritesheet) ----
// Col 0=espada, 1=picareta, 2=machado, 3=enxada, 4=regador, 5=material
const FERRAMENTAS = {
  espada:   { col: 0, nome: 'Espada',   icone: '⚔️',  descricao: 'Combate'       },
  picareta: { col: 1, nome: 'Picareta', icone: '⛏️',  descricao: 'Minerar pedras' },
  machado:  { col: 2, nome: 'Machado',  icone: '🪓',  descricao: 'Cortar árvores' },
  enxada:   { col: 3, nome: 'Enxada',   icone: '🌱',  descricao: 'Preparar solo'  },
  regador:  { col: 4, nome: 'Regador',  icone: '💧',  descricao: 'Regar plantas'  },
};

// ---- TODOS OS ITENS DO JOGO ----
const ITENS = {
  // Recursos básicos
  madeira:         { id:'madeira',         nome:'Madeira',          stack:64, tipo:'recurso',    icone:'🪵' },
  pedra:           { id:'pedra',           nome:'Pedra',            stack:64, tipo:'recurso',    icone:'🪨' },
  graveto:         { id:'graveto',         nome:'Graveto',          stack:64, tipo:'recurso',    icone:'🥢' },
  minério_ferro:   { id:'minério_ferro',   nome:'Minério de Ferro', stack:64, tipo:'recurso',    icone:'🔩' },
  barra_ferro:     { id:'barra_ferro',     nome:'Barra de Ferro',   stack:64, tipo:'recurso',    icone:'🔧' },
  pepita_ouro:     { id:'pepita_ouro',     nome:'Pepita de Ouro',   stack:64, tipo:'recurso',    icone:'🥇' },
  barra_ouro:      { id:'barra_ouro',      nome:'Barra de Ouro',    stack:64, tipo:'recurso',    icone:'✨' },
  diamante:        { id:'diamante',        nome:'Diamante',         stack:64, tipo:'recurso',    icone:'💎' },
  obsidiana:       { id:'obsidiana',       nome:'Obsidiana',        stack:64, tipo:'recurso',    icone:'🌑' },

  // Ferramentas — Madeira
  espada_madeira:   { id:'espada_madeira',   nome:'Espada de Madeira',   stack:1, tipo:'ferramenta', tier:0, ferramenta:'espada',   spriteRow:5, spriteCol:0 },
  picareta_madeira: { id:'picareta_madeira', nome:'Picareta de Madeira', stack:1, tipo:'ferramenta', tier:0, ferramenta:'picareta', spriteRow:5, spriteCol:1 },
  machado_madeira:  { id:'machado_madeira',  nome:'Machado de Madeira',  stack:1, tipo:'ferramenta', tier:0, ferramenta:'machado',  spriteRow:5, spriteCol:2 },
  enxada_madeira:   { id:'enxada_madeira',   nome:'Enxada de Madeira',   stack:1, tipo:'ferramenta', tier:0, ferramenta:'enxada',   spriteRow:5, spriteCol:3 },
  regador_madeira:  { id:'regador_madeira',  nome:'Regador de Madeira',  stack:1, tipo:'ferramenta', tier:0, ferramenta:'regador',  spriteRow:5, spriteCol:4 },

  // Ferramentas — Pedra
  espada_pedra:     { id:'espada_pedra',     nome:'Espada de Pedra',     stack:1, tipo:'ferramenta', tier:1, ferramenta:'espada',   spriteRow:4, spriteCol:0 },
  picareta_pedra:   { id:'picareta_pedra',   nome:'Picareta de Pedra',   stack:1, tipo:'ferramenta', tier:1, ferramenta:'picareta', spriteRow:4, spriteCol:1 },
  machado_pedra:    { id:'machado_pedra',    nome:'Machado de Pedra',    stack:1, tipo:'ferramenta', tier:1, ferramenta:'machado',  spriteRow:4, spriteCol:2 },
  enxada_pedra:     { id:'enxada_pedra',     nome:'Enxada de Pedra',     stack:1, tipo:'ferramenta', tier:1, ferramenta:'enxada',   spriteRow:4, spriteCol:3 },
  regador_pedra:    { id:'regador_pedra',    nome:'Regador de Pedra',    stack:1, tipo:'ferramenta', tier:1, ferramenta:'regador',  spriteRow:4, spriteCol:4 },

  // Ferramentas — Ferro
  espada_ferro:     { id:'espada_ferro',     nome:'Espada de Ferro',     stack:1, tipo:'ferramenta', tier:2, ferramenta:'espada',   spriteRow:3, spriteCol:0 },
  picareta_ferro:   { id:'picareta_ferro',   nome:'Picareta de Ferro',   stack:1, tipo:'ferramenta', tier:2, ferramenta:'picareta', spriteRow:3, spriteCol:1 },
  machado_ferro:    { id:'machado_ferro',    nome:'Machado de Ferro',    stack:1, tipo:'ferramenta', tier:2, ferramenta:'machado',  spriteRow:3, spriteCol:2 },
  enxada_ferro:     { id:'enxada_ferro',     nome:'Enxada de Ferro',     stack:1, tipo:'ferramenta', tier:2, ferramenta:'enxada',   spriteRow:3, spriteCol:3 },
  regador_ferro:    { id:'regador_ferro',    nome:'Regador de Ferro',    stack:1, tipo:'ferramenta', tier:2, ferramenta:'regador',  spriteRow:3, spriteCol:4 },

  // Ferramentas — Ouro
  espada_ouro:      { id:'espada_ouro',      nome:'Espada de Ouro',      stack:1, tipo:'ferramenta', tier:3, ferramenta:'espada',   spriteRow:2, spriteCol:0 },
  picareta_ouro:    { id:'picareta_ouro',    nome:'Picareta de Ouro',    stack:1, tipo:'ferramenta', tier:3, ferramenta:'picareta', spriteRow:2, spriteCol:1 },
  machado_ouro:     { id:'machado_ouro',     nome:'Machado de Ouro',     stack:1, tipo:'ferramenta', tier:3, ferramenta:'machado',  spriteRow:2, spriteCol:2 },
  enxada_ouro:      { id:'enxada_ouro',      nome:'Enxada de Ouro',      stack:1, tipo:'ferramenta', tier:3, ferramenta:'enxada',   spriteRow:2, spriteCol:3 },
  regador_ouro:     { id:'regador_ouro',     nome:'Regador de Ouro',     stack:1, tipo:'ferramenta', tier:3, ferramenta:'regador',  spriteRow:2, spriteCol:4 },

  // Ferramentas — Diamante
  espada_diamante:  { id:'espada_diamante',  nome:'Espada de Diamante',  stack:1, tipo:'ferramenta', tier:4, ferramenta:'espada',   spriteRow:1, spriteCol:0 },
  picareta_diamante:{ id:'picareta_diamante',nome:'Picareta de Diamante',stack:1, tipo:'ferramenta', tier:4, ferramenta:'picareta', spriteRow:1, spriteCol:1 },
  machado_diamante: { id:'machado_diamante', nome:'Machado de Diamante', stack:1, tipo:'ferramenta', tier:4, ferramenta:'machado',  spriteRow:1, spriteCol:2 },
  enxada_diamante:  { id:'enxada_diamante',  nome:'Enxada de Diamante',  stack:1, tipo:'ferramenta', tier:4, ferramenta:'enxada',   spriteRow:1, spriteCol:3 },
  regador_diamante: { id:'regador_diamante', nome:'Regador de Diamante', stack:1, tipo:'ferramenta', tier:4, ferramenta:'regador',  spriteRow:1, spriteCol:4 },

  // Ferramentas — Obsidiana
  espada_obsidiana: { id:'espada_obsidiana', nome:'Espada Sombria',      stack:1, tipo:'ferramenta', tier:5, ferramenta:'espada',   spriteRow:0, spriteCol:0 },
  picareta_obsidiana:{id:'picareta_obsidiana',nome:'Picareta Sombria',   stack:1, tipo:'ferramenta', tier:5, ferramenta:'picareta', spriteRow:0, spriteCol:1 },
  machado_obsidiana:{ id:'machado_obsidiana',nome:'Machado Sombrio',     stack:1, tipo:'ferramenta', tier:5, ferramenta:'machado',  spriteRow:0, spriteCol:2 },
  enxada_obsidiana: { id:'enxada_obsidiana', nome:'Enxada Sombria',      stack:1, tipo:'ferramenta', tier:5, ferramenta:'enxada',   spriteRow:0, spriteCol:3 },
  regador_obsidiana:{ id:'regador_obsidiana',nome:'Regador Sombrio',     stack:1, tipo:'ferramenta', tier:5, ferramenta:'regador',  spriteRow:0, spriteCol:4 },
};

// ---- RECEITAS DE CRAFTING (bancada 3x3) ----
const RECEITAS = [
  // === MADEIRA ===
  { resultado:'espada_madeira',   qtd:1, ingredientes:{ madeira:2, graveto:1 } },
  { resultado:'picareta_madeira', qtd:1, ingredientes:{ madeira:3, graveto:2 } },
  { resultado:'machado_madeira',  qtd:1, ingredientes:{ madeira:3, graveto:2 } },
  { resultado:'enxada_madeira',   qtd:1, ingredientes:{ madeira:2, graveto:2 } },
  { resultado:'regador_madeira',  qtd:1, ingredientes:{ madeira:4, graveto:1 } },
  // === PEDRA ===
  { resultado:'espada_pedra',     qtd:1, ingredientes:{ pedra:2,       graveto:1 } },
  { resultado:'picareta_pedra',   qtd:1, ingredientes:{ pedra:3,       graveto:2 } },
  { resultado:'machado_pedra',    qtd:1, ingredientes:{ pedra:3,       graveto:2 } },
  { resultado:'enxada_pedra',     qtd:1, ingredientes:{ pedra:2,       graveto:2 } },
  { resultado:'regador_pedra',    qtd:1, ingredientes:{ pedra:4,       graveto:1 } },
  // === FERRO ===
  { resultado:'espada_ferro',     qtd:1, ingredientes:{ barra_ferro:2, graveto:1 } },
  { resultado:'picareta_ferro',   qtd:1, ingredientes:{ barra_ferro:3, graveto:2 } },
  { resultado:'machado_ferro',    qtd:1, ingredientes:{ barra_ferro:3, graveto:2 } },
  { resultado:'enxada_ferro',     qtd:1, ingredientes:{ barra_ferro:2, graveto:2 } },
  { resultado:'regador_ferro',    qtd:1, ingredientes:{ barra_ferro:4, graveto:1 } },
  // === OURO ===
  { resultado:'espada_ouro',      qtd:1, ingredientes:{ barra_ouro:2,  graveto:1 } },
  { resultado:'picareta_ouro',    qtd:1, ingredientes:{ barra_ouro:3,  graveto:2 } },
  { resultado:'machado_ouro',     qtd:1, ingredientes:{ barra_ouro:3,  graveto:2 } },
  { resultado:'enxada_ouro',      qtd:1, ingredientes:{ barra_ouro:2,  graveto:2 } },
  { resultado:'regador_ouro',     qtd:1, ingredientes:{ barra_ouro:4,  graveto:1 } },
  // === DIAMANTE ===
  { resultado:'espada_diamante',  qtd:1, ingredientes:{ diamante:2,    graveto:1 } },
  { resultado:'picareta_diamante',qtd:1, ingredientes:{ diamante:3,    graveto:2 } },
  { resultado:'machado_diamante', qtd:1, ingredientes:{ diamante:3,    graveto:2 } },
  { resultado:'enxada_diamante',  qtd:1, ingredientes:{ diamante:2,    graveto:2 } },
  { resultado:'regador_diamante', qtd:1, ingredientes:{ diamante:4,    graveto:1 } },
  // === OBSIDIANA ===
  { resultado:'espada_obsidiana', qtd:1, ingredientes:{ obsidiana:2,   barra_ouro:1 } },
  { resultado:'picareta_obsidiana',qtd:1,ingredientes:{ obsidiana:3,   barra_ouro:2 } },
  { resultado:'machado_obsidiana',qtd:1, ingredientes:{ obsidiana:3,   barra_ouro:2 } },
  { resultado:'enxada_obsidiana', qtd:1, ingredientes:{ obsidiana:2,   barra_ouro:2 } },
  { resultado:'regador_obsidiana',qtd:1, ingredientes:{ obsidiana:4,   barra_ouro:1 } },
  // === BÁSICO ===
  { resultado:'graveto', qtd:4, ingredientes:{ madeira:1 } },
];

// ---- VERIFICAR SE PODE CRAFTAR ----
function podeCraftar(receita, inventario) {
  for (const [item, qtd] of Object.entries(receita.ingredientes)) {
    const slot = inventario.find(s => s && s.id === item);
    if (!slot || slot.qtd < qtd) return false;
  }
  return true;
}

// ---- EXECUTAR CRAFT ----
function executarCraft(receita, inventario) {
  if (!podeCraftar(receita, inventario)) return false;
  // Remove ingredientes
  for (const [item, qtd] of Object.entries(receita.ingredientes)) {
    const idx = inventario.findIndex(s => s && s.id === item);
    inventario[idx].qtd -= qtd;
    if (inventario[idx].qtd <= 0) inventario[idx] = null;
  }
  // Adiciona resultado
  const itemDef = ITENS[receita.resultado];
  const slotExistente = inventario.findIndex(s => s && s.id === receita.resultado && s.qtd < itemDef.stack);
  if (slotExistente >= 0) {
    inventario[slotExistente].qtd += receita.qtd;
  } else {
    const slotVazio = inventario.findIndex(s => s === null);
    if (slotVazio >= 0) inventario[slotVazio] = { id: receita.resultado, qtd: receita.qtd };
  }
  return true;
}
