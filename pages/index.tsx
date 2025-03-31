import Head from 'next/head';
import SmplrspaceViewer from '@/components/viewers/SmplrspaceViewer';

export default function Home() {
  const testPanels = [
    {
      id: 'test-panel-1',
      label: 'Visible Panel',
      dimensions: { width: 600, height: 2000, thickness: 18 },
      position: { x: 1000, y: 0, z: 1000 }, // these values are ignored now
      rotation: { x: 0, y: 0, z: 0 },
    },
  ];

  return (
    <>
      <Head>
        <title>Furniture Suite 3D Viewer</title>
        <meta name="description" content="Render test panels in Smplrspace" />
      </Head>
      <main className="w-screen h-screen">
        <SmplrspaceViewer
          spaceId={process.env.NEXT_PUBLIC_SMPLRSPACE_SPACE_ID || ''}
          clientToken={process.env.NEXT_PUBLIC_SMPLRSPACE_CLIENT_TOKEN || ''}
          panels={testPanels}
        />
      </main>
    </>
  );
}
