// =============================================
// Um Pato e um Sonho - inventory.js
// v0.0.4 - Sistema de Inventário + Crafting
// Estilo Minecraft adaptado para mobile
// =============================================

const Inventory = (() => {

  // ---- ESTADO ----
  const state = {
    aberto: false,
    // 27 slots de inventário + 9 hotbar = 36 total
    slots: new Array(36).fill(null),
    // 4 slots de armadura: 0=capacete, 1=peitoral, 2=calças, 3=botas
    armadura: new Array(4).fill(null),
    slotSelecionado: null,   // slot sendo movido
    hotbarAtiva: 0,          // slot 0-8 da hotbar ativo
    bancadaAberta: false,
    // Receitas filtradas para a bancada
    receitasFiltradas: [],
    filtroTier: -1,  // -1 = todos
  };

  // ---- SPRITESHEET FERRAMENTAS ----
  let imgFerramentas = null;
  let imgIdle1       = null;
  const SPRITE_COLS  = 6;
  const SPRITE_ROWS  = 7; // 6 tiers + 1 extra

  function setFerramentasImg(img) { imgFerramentas = img; }
  function setIdleImg(img)        { imgIdle1 = img; }

  // Desenha ícone de ferramenta num canvas 2D
  function desenharIcone(ctx, item, x, y, w, h) {
    if (!item || !imgFerramentas) return;
    const def = ITENS[item.id];
    if (!def || def.tipo !== 'ferramenta') return;
    const fw = imgFerramentas.width  / SPRITE_COLS;
    const fh = imgFerramentas.height / SPRITE_ROWS;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(imgFerramentas,
      def.spriteCol * fw, def.spriteRow * fh, fw, fh,
      x, y, w, h
    );
    // Barra de durabilidade (futuro)
  }

  // ---- ADICIONAR ITEM AO INVENTÁRIO ----
  function adicionarItem(itemId, quantidade) {
    const def = ITENS[itemId];
    if (!def) return false;
    let restante = quantidade;
    // Tenta empilhar em slot existente
    for (let i = 0; i < state.slots.length && restante > 0; i++) {
      const s = state.slots[i];
      if (s && s.id === itemId && s.qtd < def.stack) {
        const cabe = def.stack - s.qtd;
        const add  = Math.min(cabe, restante);
        s.qtd     += add;
        restante  -= add;
      }
    }
    // Slot vazio
    for (let i = 0; i < state.slots.length && restante > 0; i++) {
      if (!state.slots[i]) {
        const add      = Math.min(def.stack, restante);
        state.slots[i] = { id: itemId, qtd: add };
        restante       -= add;
      }
    }
    salvarInventario();
    return restante === 0;
  }

  // ---- SAVE / LOAD ----
  function salvarInventario() {
    try {
      localStorage.setItem('inv_slots',   JSON.stringify(state.slots));
      localStorage.setItem('inv_armadura',JSON.stringify(state.armadura));
      localStorage.setItem('inv_hotbar',  JSON.stringify(state.hotbarAtiva));
    } catch(e) {}
  }

  function carregarInventario() {
    try {
      const s = localStorage.getItem('inv_slots');
      const a = localStorage.getItem('inv_armadura');
      const h = localStorage.getItem('inv_hotbar');
      if (s) state.slots    = JSON.parse(s);
      if (a) state.armadura = JSON.parse(a);
      if (h) state.hotbarAtiva = parseInt(h) || 0;
    } catch(e) {}
  }

  // ---- ABRIR / FECHAR ----
  function abrir() {
    state.aberto = true;
    state.receitasFiltradas = RECEITAS;
    document.getElementById('tela-inventario').classList.add('aberto');
    renderizar();
  }

  function fechar() {
    state.aberto = false;
    state.slotSelecionado = null;
    document.getElementById('tela-inventario').classList.remove('aberto');
  }

  function toggle() { state.aberto ? fechar() : abrir(); }

  // ---- RENDERIZAR INVENTÁRIO ----
  function renderizar() {
    renderizarSlots();
    renderizarArmadura();
    renderizarPato();
    renderizarHotbarUI();
    renderizarReceitas();
  }

  function renderizarSlots() {
    const grid = document.getElementById('inv-grid');
    if (!grid) return;
    grid.innerHTML = '';
    for (let i = 0; i < 27; i++) {
      grid.appendChild(criarSlotEl(i, state.slots[i], 'inv'));
    }
  }

  function renderizarArmadura() {
    const nomes = ['capacete','peitoral','calças','botas'];
    const icons = ['🪖','🦺','👖','👟'];
    nomes.forEach((nome, i) => {
      const el = document.getElementById(`armor-slot-${i}`);
      if (!el) return;
      el.innerHTML = '';
      if (state.armadura[i]) {
        el.appendChild(criarIconeItem(state.armadura[i], 'armor', i));
      } else {
        el.innerHTML = `<span class="slot-placeholder">${icons[i]}</span>`;
      }
    });
  }

  function renderizarPato() {
    const el = document.getElementById('inv-pato');
    if (!el || !imgIdle1) return;
    el.innerHTML = '';
    const img = document.createElement('img');
    img.src    = imgIdle1.src;
    img.style.cssText = 'width:64px;height:64px;image-rendering:pixelated;animation:invPatoFloat 1.5s ease-in-out infinite;';
    el.appendChild(img);
  }

  function renderizarHotbarUI() {
    const bar = document.getElementById('hotbar-ui');
    if (!bar) return;
    bar.innerHTML = '';
    for (let i = 27; i < 36; i++) {
      const el = criarSlotEl(i, state.slots[i], 'hotbar');
      if (i - 27 === state.hotbarAtiva) el.classList.add('ativo');
      bar.appendChild(el);
    }
  }

  function renderizarReceitas() {
    const lista = document.getElementById('receitas-lista');
    if (!lista) return;
    lista.innerHTML = '';
    const filtro = state.filtroTier;
    const receitas = filtro >= 0
      ? RECEITAS.filter(r => ITENS[r.resultado]?.tier === filtro)
      : RECEITAS;

    receitas.forEach(r => {
      const def     = ITENS[r.resultado];
      if (!def) return;
      const pode    = podeCraftar(r, state.slots);
      const el      = document.createElement('div');
      el.className  = `receita-item ${pode ? 'pode-craftar' : 'nao-pode'}`;

      // Ícone da ferramenta
      let iconeHTML = '';
      if (def.tipo === 'ferramenta' && imgFerramentas) {
        const cvs    = document.createElement('canvas');
        cvs.width    = cvs.height = 40;
        const ctx    = cvs.getContext('2d');
        const fw     = imgFerramentas.width  / SPRITE_COLS;
        const fh     = imgFerramentas.height / SPRITE_ROWS;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(imgFerramentas,
          def.spriteCol * fw, def.spriteRow * fh, fw, fh,
          0, 0, 40, 40);
        iconeHTML = cvs.outerHTML;
      } else {
        iconeHTML = `<span style="font-size:28px">${def.icone||'📦'}</span>`;
      }

      // Ingredientes
      const ings = Object.entries(r.ingredientes)
        .map(([id, qtd]) => {
          const temQtd = (state.slots.find(s => s?.id === id)?.qtd || 0);
          const ok     = temQtd >= qtd;
          return `<span class="${ok?'ing-ok':'ing-falta'}">${ITENS[id]?.icone||'?'}×${qtd}</span>`;
        }).join(' ');

      el.innerHTML = `
        <div class="receita-icone">${iconeHTML}</div>
        <div class="receita-info">
          <div class="receita-nome">${def.nome}</div>
          <div class="receita-ings">${ings}</div>
        </div>
        <button class="btn-craft ${pode?'':'disabled'}" 
          onclick="Inventory.craft('${r.resultado}')">
          CRAFTAR
        </button>
      `;
      lista.appendChild(el);
    });
  }

  function criarSlotEl(idx, item, tipo) {
    const el      = document.createElement('div');
    el.className  = `inv-slot ${state.slotSelecionado === idx ? 'selecionado' : ''}`;
    el.dataset.idx = idx;
    el.dataset.tipo = tipo;

    if (item) {
      const def = ITENS[item.id];
      if (def?.tipo === 'ferramenta' && imgFerramentas) {
        const cvs   = document.createElement('canvas');
        cvs.width   = cvs.height = 48;
        const ctx   = cvs.getContext('2d');
        desenharIcone(ctx, item, 0, 0, 48, 48);
        el.appendChild(cvs);
      } else {
        const span       = document.createElement('span');
        span.className   = 'slot-icone';
        span.textContent = def?.icone || '📦';
        el.appendChild(span);
      }
      if (item.qtd > 1) {
        const qtdEl       = document.createElement('span');
        qtdEl.className   = 'slot-qtd';
        qtdEl.textContent = item.qtd;
        el.appendChild(qtdEl);
      }
    }

    el.addEventListener('click', () => onClickSlot(idx, tipo));
    return el;
  }

  function criarIconeItem(item, tipo, idx) {
    const el      = document.createElement('div');
    el.className  = 'slot-item-inner';
    const def     = ITENS[item.id];
    el.textContent = def?.icone || '📦';
    return el;
  }

  // ---- INTERAÇÃO SLOTS ----
  function onClickSlot(idx, tipo) {
    if (state.slotSelecionado === null) {
      const arr = tipo === 'armor' ? state.armadura : state.slots;
      if (arr[idx]) {
        state.slotSelecionado = idx;
        renderizar();
      }
    } else {
      // Move item
      const from = state.slotSelecionado;
      if (from !== idx) {
        const tmp        = state.slots[from];
        state.slots[from] = state.slots[idx];
        state.slots[idx]  = tmp;
        salvarInventario();
      }
      state.slotSelecionado = null;
      renderizar();
    }
  }

  // ---- CRAFTING ----
  function craft(resultadoId) {
    const receita = RECEITAS.find(r => r.resultado === resultadoId);
    if (!receita) return;
    if (executarCraft(receita, state.slots)) {
      salvarInventario();
      renderizar();
      mostrarNotificacao(`✅ ${ITENS[resultadoId]?.nome} criado!`);
    }
  }

  // ---- HOTBAR IN-GAME ----
  function renderizarHotbarIngame() {
    const bar = document.getElementById('hotbar-ingame');
    if (!bar) return;
    bar.innerHTML = '';
    for (let i = 27; i < 36; i++) {
      const slot = state.slots[i];
      const el   = document.createElement('div');
      el.className = `hotbar-slot-ingame ${i-27 === state.hotbarAtiva ? 'ativo' : ''}`;
      if (slot) {
        const def = ITENS[slot.id];
        if (def?.tipo === 'ferramenta' && imgFerramentas) {
          const cvs   = document.createElement('canvas');
          cvs.width   = cvs.height = 40;
          const ctx   = cvs.getContext('2d');
          desenharIcone(ctx, slot, 0, 0, 40, 40);
          el.appendChild(cvs);
        } else {
          el.textContent = def?.icone || '📦';
        }
      }
      el.addEventListener('click', () => {
        state.hotbarAtiva = i - 27;
        salvarInventario();
        renderizarHotbarIngame();
      });
      bar.appendChild(el);
    }
  }

  function itemHotbarAtivo() {
    return state.slots[27 + state.hotbarAtiva];
  }

  // ---- NOTIFICAÇÃO ----
  function mostrarNotificacao(msg) {
    const el = document.getElementById('notificacao');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('visivel');
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove('visivel'), 2500);
  }

  // ---- FILTRO DE TIER ----
  function setFiltroTier(tier) {
    state.filtroTier = tier;
    renderizarReceitas();
  }

  // ---- DEBUG: Dar itens para teste ----
  function darItensDebug() {
    adicionarItem('madeira', 20);
    adicionarItem('pedra',   15);
    adicionarItem('graveto', 10);
    adicionarItem('barra_ferro', 8);
    renderizar();
    renderizarHotbarIngame();
  }

  carregarInventario();

  return {
    abrir, fechar, toggle,
    adicionarItem,
    craft,
    setFiltroTier,
    setFerramentasImg,
    setIdleImg,
    renderizarHotbarIngame,
    itemHotbarAtivo,
    mostrarNotificacao,
    darItensDebug,
    state,
  };
})();
