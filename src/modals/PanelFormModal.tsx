import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PanelFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (panelData: PanelData) => void;
  initialData?: PanelData;
}

interface PanelData {
  label: string;
  width: number;
  height: number;
  thickness: number;
  hardware: string;
}

const PanelFormModal = ({ open, onClose, onSave, initialData }: PanelFormModalProps) => {
  const [panel, setPanel] = useState<PanelData>(
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
          <div>
            <label className="font-medium">Panel Label</label>
            <Input
              placeholder="e.g. Left Door"
              value={panel.label}
              onChange={(e) => setPanel({ ...panel, label: e.target.value })}
            />
          </div>

          <div>
            <label className="font-medium">Dimensions (mm)</label>
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number"
                placeholder="Width"
                value={panel.width}
                onChange={(e) => setPanel({ ...panel, width: Number(e.target.value) })}
              />
              <Input
                type="number"
                placeholder="Height"
                value={panel.height}
                onChange={(e) => setPanel({ ...panel, height: Number(e.target.value) })}
              />
              <Input
                type="number"
                placeholder="Thickness"
                value={panel.thickness}
                onChange={(e) => setPanel({ ...panel, thickness: Number(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Hardware Details</label>
            <Input
              placeholder="e.g. 3 hinges, 1 handle"
              value={panel.hardware}
              onChange={(e) => setPanel({ ...panel, hardware: e.target.value })}
            />
          </div>

          <Button onClick={handleSubmit} className="mt-4 w-full">Save Panel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PanelFormModal;


  