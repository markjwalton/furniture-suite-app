import React from 'react';
import WardrobeSVG from '@/components/WardrobeSVG';
import { ConfigurationState } from '@/types/wardrobe';

interface WardrobePreviewProps {
  config: ConfigurationState;
}

const WardrobePreview: React.FC<WardrobePreviewProps> = ({ config }) => {
  return (
    <div className="flex justify-center">
      <WardrobeSVG
        config={config}
        width={800}
        height={600}
        flooringCode={config.flooring?.code}
        numberOfSections={config.numberOfSections}
        fillers={{ top: { height: 0 }, bottom: { height: 0 } }}
      />
    </div>
  );
};

export default WardrobePreview;
