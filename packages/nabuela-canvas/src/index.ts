import { createBandScale, createLinearScale } from '@nabuela/core';

export function drawBarChart(
  ctx: CanvasRenderingContext2D,
  data: Array<{ label: string; value: number }>,
  width: number,
  height: number
): void {
  const x = createBandScale(data.map((item) => item.label), [40, width - 20]);
  const max = Math.max(...data.map((item) => item.value), 0);
  const y = createLinearScale([0, max || 1], [height - 24, 24]);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#115e59';
  data.forEach((item) => {
    const left = x.map(item.label);
    const top = y.map(item.value);
    ctx.fillRect(left, top, x.bandwidth, height - 24 - top);
  });
}

export function drawHeatmap(
  ctx: CanvasRenderingContext2D,
  data: Array<{ x: number; y: number; value: number }>,
  width: number,
  height: number
): void {
  const cols = Math.max(...data.map((item) => item.x), 0) + 1;
  const rows = Math.max(...data.map((item) => item.y), 0) + 1;
  const cellWidth = width / Math.max(cols, 1);
  const cellHeight = height / Math.max(rows, 1);
  const max = Math.max(...data.map((item) => item.value), 1);

  ctx.clearRect(0, 0, width, height);
  data.forEach((item) => {
    const intensity = item.value / max;
    ctx.fillStyle = `rgba(17, 94, 89, ${Math.max(intensity, 0.1)})`;
    ctx.fillRect(item.x * cellWidth, item.y * cellHeight, cellWidth - 2, cellHeight - 2);
  });
}

export function drawTreemap(
  ctx: CanvasRenderingContext2D,
  data: Array<{ label: string; value: number }>,
  width: number,
  height: number
): void {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  const colors = ['#115e59', '#0f766e', '#15803d', '#b45309', '#b91c1c'];
  let currentX = 0;

  ctx.clearRect(0, 0, width, height);
  ctx.font = '12px sans-serif';
  ctx.textBaseline = 'middle';

  data.forEach((item, index) => {
    const rectWidth = (item.value / total) * width;
    ctx.fillStyle = colors[index % colors.length];
    ctx.fillRect(currentX, 0, rectWidth, height);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(item.label, currentX + 8, height / 2);
    currentX += rectWidth;
  });
}

export function drawScatterPlot(
  ctx: CanvasRenderingContext2D,
  data: Array<{ x: number; y: number; value?: number }>,
  width: number,
  height: number
): void {
  const x = createLinearScale(
    [Math.min(...data.map((item) => item.x), 0), Math.max(...data.map((item) => item.x), 1)],
    [24, width - 24]
  );
  const y = createLinearScale(
    [Math.min(...data.map((item) => item.y), 0), Math.max(...data.map((item) => item.y), 1)],
    [height - 24, 24]
  );

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#115e59';
  data.forEach((item) => {
    const radius = Math.max(item.value ?? 5, 4);
    ctx.beginPath();
    ctx.arc(x.map(item.x), y.map(item.y), radius, 0, Math.PI * 2);
    ctx.fill();
  });
}
