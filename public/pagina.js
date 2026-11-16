/* =========================================================
   Lion Dev — comportamento sob medida desta página
   1. "O leão feito de código"  (movimento-assinatura, cena 1)
   2. Cabeçalho que ganha corpo depois da abertura
   3. Câmbio em H: o pomo engata 1 → 2 → 3 → 4 com a rolagem
   4. KUMON: números contam quando a etapa final chega
   ========================================================= */
(function () {
  "use strict";

  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function limitar(v, a, b) { return v < a ? a : v > b ? b : v; }
  function suave(t) { t = limitar(t, 0, 1); return t * t * (3 - 2 * t); }
  function entraSai(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  function progressoDe(secao) {
    var r = secao.getBoundingClientRect();
    var percurso = secao.offsetHeight - window.innerHeight;
    if (percurso <= 0) return 0;
    return limitar(-r.top / percurso, 0, 1);
  }

  /* ---------------------------------------------------------
     1. O LEÃO FEITO DE CÓDIGO
     --------------------------------------------------------- */
  var CODIGO = [
    "const pedido = await checkout.criar({ gateway: 'asaas', parcelas: 10 });",
    "webhook.on('pagamento.confirmado', idempotente(async (evento) => {",
    "await estoque.reservar(vaga, { atomico: true, expira: '15min' });",
    "SELECT id, status FROM inscricoes WHERE status = 'pago';",
    "export default defineComponent({ setup() { const loja = useLojaStore();",
    "git push origin main && docker compose up -d --build",
    "router.post('/api/pedidos', autenticar, async (req, res) => {",
    "const total = itens.reduce((soma, i) => soma + i.preco * i.qtd, 0);",
    "if (!pagamento.confirmado) return res.status(402).json({ erro });",
    "UPDATE vagas SET reservada = 1 WHERE id = ? AND reservada = 0;",
    "describe('split de pagamento', () => { it('fecha no centavo', ...",
    "<template><v-data-table :items=\"pedidos\" :loading=\"carregando\" />"
  ];

  var secao = document.getElementById("hero");
  var canvas = document.getElementById("leao-codigo");
  var leao = document.querySelector(".leao");
  var halo = document.querySelector(".abertura__halo");
  var hud = document.querySelector(".hud");
  var hudNum = hud && hud.querySelector(".hud__estado b");
  var hudEstado = hud && hud.querySelector(".hud__estado");

  function iniciarLeao() {
    if (!secao || !canvas || !leao) return;

    var ctx = canvas.getContext("2d");
    var W = 0, H = 0, dpr = 1, cel = 9, caixa = null;
    var parts = [];
    var atlas = null, atlasClaro = null, atlasEscuro = null, atlasBranco = null, glifos = {}, G = 0;
    var mouse = { x: -9999, y: -9999, ativo: false };
    var visivel = true, rodando = false;
    var img = new Image();

    function medir() {
      var palco = secao.querySelector(".fx-palco");
      W = palco.clientWidth;
      H = palco.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);

      var movel = W < 760;
      var pad = limitar(W * 0.044, 16, 72);
      var texto = secao.querySelector(".abertura__texto");
      var rPalco = palco.getBoundingClientRect();
      var lado, cx, cy;
      if (movel) {
        // o leão ocupa o céu acima do bloco de texto, sem encostar nele
        var topoTexto = texto.getBoundingClientRect().top - rPalco.top;
        var barra = 68;
        lado = Math.max(140, Math.min(W * 0.86, topoTexto - barra - 12));
        cx = W / 2;
        cy = barra + (topoTexto - barra) / 2;
      } else {
        // à direita, encostado na margem, sem invadir o título
        var direitaTitulo = 0;
        texto.querySelectorAll(".fx-palavra, .abertura__sub, .acoes").forEach(function (el) {
          direitaTitulo = Math.max(direitaTitulo, el.getBoundingClientRect().right - rPalco.left);
        });
        var livre = (W - pad - direitaTitulo) / 0.94;
        lado = Math.max(260, Math.min(H * 0.84, W * 0.48, livre));
        cx = W - pad - lado / 2;
        cy = H * 0.5;
      }
      caixa = { x: cx - lado / 2, y: cy - lado / 2, lado: lado };
      cel = movel ? 7 : (lado > 700 ? 10 : 9);

      leao.style.setProperty("--lx", caixa.x + "px");
      leao.style.setProperty("--ly", caixa.y + "px");
      leao.style.setProperty("--ll", lado + "px");
      halo.style.setProperty("--hx", (cx / W * 100) + "%");
      halo.style.setProperty("--hy", (cy / H * 100) + "%");
    }

    // glifos pré-desenhados: drawImage é bem mais barato que fillText
    function montarAtlas() {
      var chars = {};
      CODIGO.join("").split("").forEach(function (c) { if (c !== " ") chars[c] = 1; });
      var lista = Object.keys(chars);
      G = Math.ceil(cel * 2.2 * dpr);
      function desenhar(cor) {
        var c = document.createElement("canvas");
        c.width = G * lista.length; c.height = G;
        var x = c.getContext("2d");
        x.fillStyle = cor;
        x.textAlign = "center"; x.textBaseline = "middle";
        x.font = "600 " + Math.round(G * 0.62) + "px 'JetBrains Mono', ui-monospace, monospace";
        lista.forEach(function (ch, i) { x.fillText(ch, i * G + G / 2, G / 2 + G * 0.03); });
        return c;
      }
      atlas = desenhar("#F2B01E");
      atlasClaro = desenhar("#FFE29A");
      atlasEscuro = desenhar("#2A1C00");
      atlasBranco = desenhar("#FFFBF0");
      glifos = {};
      lista.forEach(function (ch, i) { glifos[ch] = i; });
    }

    function amostrar() {
      var n = Math.ceil(caixa.lado / cel);
      var off = document.createElement("canvas");
      off.width = n; off.height = n;
      var o = off.getContext("2d", { willReadFrequently: true });
      o.imageSmoothingQuality = "high";
      o.drawImage(img, 0, 0, n, n);
      var dados = o.getImageData(0, 0, n, n).data;

      // o olho do leão: a montagem começa por ele
      var olhoX = caixa.x + caixa.lado * 0.73, olhoY = caixa.y + caixa.lado * 0.37;
      var maxDist = caixa.lado * 0.95;

      parts = [];
      for (var r = 0; r < n; r++) {
        var linha = CODIGO[(r * 5) % CODIGO.length];
        var desloc = (r * 17) % linha.length;
        for (var c = 0; c < n; c++) {
          if (dados[(r * n + c) * 4 + 3] < 120) continue;
          var ch = linha[(desloc + c) % linha.length];
          if (ch === " ") continue;
          var tx = caixa.x + c * cel + cel / 2;
          var ty = caixa.y + r * cel + cel / 2;
          var dist = Math.hypot(tx - olhoX, ty - olhoY) / maxDist;
          var z = 0.25 + Math.random() * 0.75;
          var sx = Math.random() * W, sy = Math.random() * H;
          var ang = Math.atan2(ty - sy, tx - sx) + Math.PI / 2;
          parts.push({
            tx: tx, ty: ty, sx: sx, sy: sy, z: z,
            d: limitar(dist, 0, 1) * 0.8 + Math.random() * 0.2,
            curva: (Math.random() - 0.5) * caixa.lado * 0.5,
            nx: Math.cos(ang), ny: Math.sin(ang),
            f: Math.random() * 6.28, v: 0.6 + Math.random() * 0.8,
            g: glifos[ch], ox: 0, oy: 0
          });
        }
      }
    }

    var CHAVES = null;
    function trocarGlifos(qtd) {
      if (!CHAVES) CHAVES = Object.keys(glifos);
      for (var i = 0; i < qtd; i++) {
        var p = parts[(Math.random() * parts.length) | 0];
        if (p) p.g = glifos[CHAVES[(Math.random() * CHAVES.length) | 0]];
      }
    }

    function quadro(t) {
      if (!visivel) { rodando = false; return; }
      var p = progressoDe(secao);

      var compactar = suave((p - 0.50) / 0.18);   // caracteres se apertam e acendem
      var solido = suave((p - 0.62) / 0.14);      // logo real aparece
      var apagar = suave((p - 0.70) / 0.12);      // canvas sai
      var brilho = suave((p - 0.80) / 0.18);      // reflexo de farol no metal

      leao.style.opacity = solido.toFixed(3);
      leao.style.setProperty("--brilho", (120 - brilho * 140) + "%");
      var fase = 1 - apagar;
      halo.style.opacity = (suave((p - 0.15) / 0.5) * 0.9).toFixed(3);

      if (hud) {
        var pct = Math.round(limitar(p / 0.8, 0, 1) * 100);
        hud.style.setProperty("--hud", (pct / 100).toFixed(3));
        hudNum.textContent = pct + "%";
        var pronto = pct >= 100;
        if (pronto !== hud.classList.contains("is-pronto")) {
          hud.classList.toggle("is-pronto", pronto);
          hudEstado.firstChild.nodeValue = pronto ? "pronto para produção " : "compilando ";
        }
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      if (atlas) {
        var raio = 110, raio2 = raio * raio;
        var montando = p > 0.02 && p < 0.6;
        trocarGlifos(montando ? 40 : 6);
        var lanterna = 130, lanterna2 = lanterna * lanterna;

        for (var i = 0; i < parts.length; i++) {
          var a = parts[i];
          var gs = a.g * G;

          // código gravado no metal; o cursor acende o que está por baixo
          if (solido > 0) {
            var tg = cel * 1.02, luz = 0;
            if (mouse.ativo) {
              var gx = a.tx - mouse.x, gy = a.ty - mouse.y, g2 = gx * gx + gy * gy;
              if (g2 < lanterna2) luz = 1 - Math.sqrt(g2) / lanterna;
            }
            ctx.globalAlpha = solido * 0.17 * (1 - luz);
            ctx.drawImage(atlasEscuro, gs, 0, G, G, a.tx - tg / 2, a.ty - tg / 2, tg, tg);
            if (luz > 0) {
              ctx.globalAlpha = solido * luz * luz;
              ctx.drawImage(atlasBranco, gs, 0, G, G, a.tx - tg / 2, a.ty - tg / 2, tg, tg);
            }
          }
          if (fase <= 0) continue;
          var ini = 0.02 + a.d * 0.30;
          var l = entraSai(limitar((p - ini) / 0.22, 0, 1));
          var solto = 1 - l;

          // céu de código: deriva lenta enquanto solto
          var sx = a.sx + Math.sin(t * 0.00035 * a.v + a.f) * 14 * solto;
          var sy = a.sy + Math.cos(t * 0.00028 * a.v + a.f) * 10 * solto;
          var arco = Math.sin(l * Math.PI) * a.curva;
          var x = sx + (a.tx - sx) * l + arco * a.nx;
          var y = sy + (a.ty - sy) * l + arco * a.ny;

          // o cursor agita o código por perto
          var alvoX = 0, alvoY = 0;
          if (mouse.ativo) {
            var dx = x - mouse.x, dy = y - mouse.y, d2 = dx * dx + dy * dy;
            if (d2 < raio2) {
              var d = Math.sqrt(d2) || 1, forca = (1 - d / raio) * 22 * (1 - compactar);
              alvoX = dx / d * forca; alvoY = dy / d * forca;
              if (Math.random() < 0.08) a.g = glifos[CHAVES[(Math.random() * CHAVES.length) | 0]];
            }
          }
          a.ox += (alvoX - a.ox) * 0.12;
          a.oy += (alvoY - a.oy) * 0.12;
          x += a.ox; y += a.oy;

          var tam = cel * ((0.55 + 0.65 * a.z) * solto + 1.08 * l + 0.5 * compactar);
          var alfa = (0.10 + 0.34 * a.z) * solto + 0.8 * l;
          alfa = Math.min(1, alfa + 0.2 * compactar) * fase;

          ctx.globalAlpha = alfa * (1 - compactar * 0.6);
          ctx.drawImage(atlas, gs, 0, G, G, x - tam / 2, y - tam / 2, tam, tam);
          if (compactar > 0) {
            ctx.globalAlpha = alfa * compactar;
            ctx.drawImage(atlasClaro, gs, 0, G, G, x - tam / 2, y - tam / 2, tam, tam);
          }
        }
        ctx.globalAlpha = 1;
      }

      requestAnimationFrame(quadro);
    }

    function ligar() {
      if (!rodando && visivel) { rodando = true; requestAnimationFrame(quadro); }
    }

    function preparar() {
      medir();
      montarAtlas();
      amostrar();
      ligar();
    }

    new IntersectionObserver(function (e) {
      visivel = e[0].isIntersecting;
      ligar();
    }).observe(secao);

    if (window.matchMedia("(pointer: fine)").matches) {
      secao.addEventListener("pointermove", function (e) {
        var r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.ativo = true;
      }, { passive: true });
      secao.addEventListener("pointerleave", function () { mouse.ativo = false; });
    }

    var espera;
    var larguraAnterior = window.innerWidth;
    window.addEventListener("resize", function () {
      // no celular a barra de endereço muda a altura; só refaz se a largura mudar
      if (Math.abs(window.innerWidth - larguraAnterior) < 2 && W < 760) return;
      larguraAnterior = window.innerWidth;
      clearTimeout(espera);
      espera = setTimeout(preparar, 180);
    });

    img.src = "/logo.png";
    // espera as duas fontes: a do código (glifos) e a do título (medida do espaço livre)
    var fontes = document.fonts
      ? document.fonts.load("600 20px 'JetBrains Mono'").then(function () { return document.fonts.ready; })
      : Promise.resolve();
    Promise.all([img.decode ? img.decode() : new Promise(function (ok) { img.onload = ok; }), fontes.catch(function () {})])
      .then(preparar)
      .catch(function () { leao.style.opacity = 1; });
  }

  /* ---------------------------------------------------------
     2. CABEÇALHO
     --------------------------------------------------------- */
  var topo = document.getElementById("topo");
  function atualizarTopo() {
    if (!topo || !secao) return;
    var fim = secao.offsetTop + secao.offsetHeight - window.innerHeight * 1.05;
    topo.classList.toggle("is-solido", window.scrollY > fim);
  }

  /* ---------------------------------------------------------
     3. CÂMBIO EM H — o pomo percorre N → 1 → 2 → N → 3 → 4
     --------------------------------------------------------- */
  var marchas = document.querySelector(".marchas");
  var pomo = document.querySelector(".cambio__pomo");
  var bolas = document.querySelectorAll(".cambio__m");
  var itens = document.querySelectorAll(".etapas li");
  // pontos do trajeto e qual marcha cada trecho engata
  var TRAJETO = [
    [120, 120, -1], [60, 120, -1], [60, 40, 0], [60, 120, 0], [60, 200, 1],
    [60, 120, 1], [120, 120, 1], [180, 120, 1], [180, 40, 2], [180, 120, 2], [180, 200, 3]
  ];
  var marchaAtual = -2;
  function atualizarCambio() {
    if (!marchas || !pomo) return;
    var r = marchas.getBoundingClientRect();
    var vh = window.innerHeight;
    var p = limitar((vh * 0.75 - r.top) / (r.height - vh * 0.2), 0, 1);
    var pos = p * (TRAJETO.length - 1);
    var i = Math.min(Math.floor(pos), TRAJETO.length - 2);
    var f = pos - i;
    var a = TRAJETO[i], b = TRAJETO[i + 1];
    pomo.setAttribute("cx", (a[0] + (b[0] - a[0]) * f).toFixed(1));
    pomo.setAttribute("cy", (a[1] + (b[1] - a[1]) * f).toFixed(1));
    var m = f > 0.85 ? b[2] : a[2];
    if (p >= 1) m = 3;
    if (m !== marchaAtual) {
      marchaAtual = m;
      bolas.forEach(function (bola, k) { bola.classList.toggle("is-on", k <= m && m >= 0); });
      itens.forEach(function (li, k) { li.classList.toggle("is-on", k <= m && m >= 0); });
    }
  }

  /* ---------------------------------------------------------
     4. KUMON — contadores da etapa final
     --------------------------------------------------------- */
  function contar(el) {
    var fim = parseFloat(el.dataset.fim), pre = el.dataset.prefixo || "", suf = el.dataset.sufixo || "";
    var inicio = null, dur = 1300;
    function q(t) {
      if (inicio === null) inicio = t;
      var k = limitar((t - inicio) / dur, 0, 1), e = 1 - Math.pow(1 - k, 3);
      el.textContent = pre + Math.round(fim * e).toLocaleString("pt-BR") + suf;
      if (k < 1) requestAnimationFrame(q);
    }
    requestAnimationFrame(q);
  }
  function armarKumon() {
    var kumon = document.querySelector(".kumon");
    if (!kumon) return;
    var contadores = kumon.querySelectorAll(".conta");
    var feito = false;
    new MutationObserver(function () {
      if (!feito && kumon.getAttribute("data-etapa") === "3") { feito = true; contadores.forEach(contar); }
    }).observe(kumon, { attributes: true, attributeFilter: ["data-etapa"] });
  }

  /* ---------------------------------------------------------
     ciclo
     --------------------------------------------------------- */
  var agendado = false;
  function aoRolar() {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(function () {
      agendado = false;
      atualizarTopo();
      atualizarCambio();
    });
  }

  function iniciar() {
    if (reduzido) {
      if (topo) topo.classList.add("is-solido");
      bolas.forEach(function (b) { b.classList.add("is-on"); });
      itens.forEach(function (li) { li.classList.add("is-on"); });
      if (pomo) { pomo.setAttribute("cx", 180); pomo.setAttribute("cy", 200); }
      return;
    }
    iniciarLeao();
    armarKumon();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    aoRolar();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
