import { Panel } from '@/types/wardrobe';

export const exportPanelsToCSV = (panels: Panel[]) => {
  const headers = ['ID', 'Width', 'Height', 'Depth', 'Material', 'Grain Direction', 'Edging'];
  const rows = panels.map(panel => [
    panel.id,
    panel.width,
    panel.height,
    panel.depth,
    panel.material.name,
    panel.material.code.startsWith('U') ? 'N/A' : panel.material.texture,
    [
      panel.edging.top ? 'Top' : '',
      panel.edging.bottom ? 'Bottom' : '',
      panel.edging.left ? 'Left' : '',
      panel.edging.right ? 'Right' : '',
    ].filter(Boolean).join(' | ')
  ]);

  const csvContent =
    [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'panels-cut-list.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
