(function () {
  const colors = {
    accent: "#10b981",
    blue: "#2563eb",
    amber: "#f59e0b",
    red: "#ef4444",
    muted: "#94a3b8"
  };

  function setupCanvas(canvas) {
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = (canvas.getAttribute("height") || rect.height) * ratio;
    const ctx = canvas.getContext("2d");
    ctx.scale(ratio, ratio);
    return { ctx, width: rect.width, height: Number(canvas.getAttribute("height")) || rect.height };
  }

  function lineChart(canvas, values, options = {}) {
    if (!canvas) return;
    const { ctx, width, height } = setupCanvas(canvas);
    const padding = options.padding || 24;
    const max = Math.max(...values) * 1.15;
    const min = Math.min(...values) * 0.85;
    const points = values.map((value, index) => {
      const x = padding + (index * (width - padding * 2)) / (values.length - 1);
      const y = height - padding - ((value - min) / (max - min)) * (height - padding * 2);
      return { x, y };
    });

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(148, 163, 184, .22)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i += 1) {
      const y = padding + (i * (height - padding * 2)) / 3;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    const gradient = ctx.createLinearGradient(0, padding, 0, height);
    gradient.addColorStop(0, options.fill || "rgba(16, 185, 129, .24)");
    gradient.addColorStop(1, "rgba(16, 185, 129, 0)");
    ctx.beginPath();
    points.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    points.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
    ctx.strokeStyle = options.stroke || colors.accent;
    ctx.lineWidth = 3;
    ctx.stroke();

    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = options.stroke || colors.accent;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
    });
  }

  function barChart(canvas, values, options = {}) {
    if (!canvas) return;
    const { ctx, width, height } = setupCanvas(canvas);
    const padding = 24;
    const max = Math.max(...values) * 1.2;
    const gap = 12;
    const barWidth = (width - padding * 2 - gap * (values.length - 1)) / values.length;
    ctx.clearRect(0, 0, width, height);
    values.forEach((value, index) => {
      const x = padding + index * (barWidth + gap);
      const barHeight = ((height - padding * 2) * value) / max;
      const y = height - padding - barHeight;
      const gradient = ctx.createLinearGradient(0, y, 0, height - padding);
      gradient.addColorStop(0, options.color || colors.blue);
      gradient.addColorStop(1, colors.accent);
      ctx.fillStyle = gradient;
      roundRect(ctx, x, y, barWidth, barHeight, 6);
      ctx.fill();
    });
  }

  function groupedBars(canvas, profit, expenses) {
    if (!canvas) return;
    const { ctx, width, height } = setupCanvas(canvas);
    const padding = 24;
    const max = Math.max(...profit, ...expenses) * 1.2;
    const groupWidth = (width - padding * 2) / profit.length;
    ctx.clearRect(0, 0, width, height);
    profit.forEach((value, index) => {
      const baseX = padding + index * groupWidth + groupWidth * 0.2;
      const draw = (amount, offset, color) => {
        const h = ((height - padding * 2) * amount) / max;
        roundRect(ctx, baseX + offset, height - padding - h, groupWidth * 0.22, h, 5);
        ctx.fillStyle = color;
        ctx.fill();
      };
      draw(value, 0, colors.accent);
      draw(expenses[index], groupWidth * 0.28, colors.amber);
    });
  }

  function sparkline(canvas) {
    const values = canvas.dataset.points.split(",").map(Number);
    lineChart(canvas, values, { padding: 6, stroke: colors.accent, fill: "rgba(16,185,129,.12)" });
  }

  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
  }

  window.SafariCharts = {
    colors,
    lineChart,
    barChart,
    groupedBars,
    sparkline,
    renderAll() {
      lineChart(document.getElementById("salesChart"), [42, 58, 52, 69, 77, 91, 88, 104, 119, 128, 139, 152]);
      barChart(document.getElementById("revenueChart"), [32, 46, 39, 68, 74, 82, 93], { color: colors.blue });
      groupedBars(document.getElementById("profitChart"), [48, 55, 62, 79, 87, 92], [32, 34, 41, 48, 52, 58]);
      lineChart(document.getElementById("performanceChart"), [68, 72, 78, 74, 86, 91, 90, 96], { stroke: colors.blue, fill: "rgba(37,99,235,.18)" });
      document.querySelectorAll(".sparkline").forEach(sparkline);
    }
  };
})();
