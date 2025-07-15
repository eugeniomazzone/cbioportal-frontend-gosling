import React from 'react';
import { GoslingComponent, GoslingSpec } from 'gosling.js';

const spec: GoslingSpec = {
    tracks: [
        {
            id: 'heatmap-track',
            data: {
                url:
                    'https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec',
                type: 'multivec',
                row: 'sample',
                column: 'position',
                value: 'peak',
                categories: ['sample 1', 'sample 2', 'sample 3', 'sample 4'],
                binSize: 4,
            },
            mark: 'rect',
            x: { field: 'start', type: 'genomic' },
            xe: { field: 'end', type: 'genomic' },
            row: { field: 'sample', type: 'nominal', legend: true },
            color: {
                field: 'peak',
                type: 'quantitative',
                legend: true,
                range: 'pink',
            },
            width: 600,
            height: 130,
        },
    ],
};

const SimpleExample: React.FC = () => {
    return (
        <>
            <h1 style={{ marginLeft: '60px', marginTop: '60px' }}>
                Zoom and pan in the track below using your mouse and mouse
                wheel.
            </h1>
            <GoslingComponent spec={spec} experimental={{ reactive: true }} />
        </>
    );
};

export default SimpleExample;
