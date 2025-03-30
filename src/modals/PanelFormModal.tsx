import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const PanelFormModal = ({ open, onClose, onSave, initialData }) => {
  const [panel, setPanel] = useState(
    initialData || { label: '', width: 600, height: 2200, thickness: 18, hardware: '' }
  );

  useEffect(() => {
    if (initialData) setPanel(initialData);
  }, [initialData]);

  const handleSubmit = () => {
    onSave(panel);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Panel' : 'Add Panel'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Label"
            value={panel.label}
            onChange={(e) => setPanel({ ...panel, label: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Width (mm)"
            value={panel.width}
            onChange={(e) => setPanel({ ...panel, width: Number(e.target.value) })}
          />
          <Input
            type="number"
            placeholder="Height (mm)"
            value={panel.height}
            onChange={(e) => setPanel({ ...panel, height: Number(e.target.value) })}
          />
          <Input
            type="number"
            placeholder="Thickness (mm)"
            value={panel.thickness}
            onChange={(e) => setPanel({ ...panel, thickness: Number(e.target.value) })}
          />
          <Input
            placeholder="Hardware"
            value={panel.hardware}
            onChange={(e) => setPanel({ ...panel, hardware: e.target.value })}
          />

          <Button onClick={handleSubmit}>Save Panel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PanelFormModal;


  