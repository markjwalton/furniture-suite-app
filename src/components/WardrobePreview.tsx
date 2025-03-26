import React from 'react';
import WardrobeSVG from '@/components/WardrobeSVG';
import { ConfigurationState } from '@/types/wardrobe';

interface WardrobePreviewProps {
  config: ConfigurationState;
}

const WardrobePreview: React.FC<WardrobePreviewProps> = ({ config }) => {
  return (
    <div className="wardrobe-preview-container">
      <WardrobeSVG config={config} />
    </div>
  );
};

export default WardrobePreview;
