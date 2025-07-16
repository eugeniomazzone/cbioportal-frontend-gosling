import React from 'react';
import { GoslingComponent, GoslingSpec } from 'gosling.js';

const GenomeViewer: React.FC = () => {
  const spec: GoslingSpec = {
    title: 'Genome Overview',
    "layout": "linear",
    "arrangement": "vertical",
    "centerRadius": 0.5,
    "assembly": "hg19",
    "spacing": 40,
    "style": {
    "outlineWidth": 1,
    "outline": "lightgray",
    "enableSmoothPath": false
  },
  "views": [
    {
      "arrangement": "horizontal",
      "views": [
        {
          "static": true,
          "xOffset": 1,
          "layout": "circular",
          "spacing": 10,
          "tracks": [
            // Cytobands - Circular
            {
              "title": "Patient Overview (PD35930a)",
              "alignment": "overlay",
              "data": {
                "url": "https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv",
                "type": "csv",
                "chromosomeField": "Chromosome",
                "genomicFields": ["chromStart", "chromEnd"]
              },
              "tracks": [
                {"mark": "rect"},
                {
                  "mark": "brush",
                  "x": {"linkingId": "mid-scale"},
                  "strokeWidth": {"value": 1.5},
                  "stroke": {"value": "#0070DC"},
                  "color": {"value": "#AFD8FF"},
                  "opacity": {"value": 0.5}
                }
              ],
              "color": {
                "field": "Stain",
                "type": "nominal",
                "domain": [
                  "gneg",
                  "gpos25",
                  "gpos50",
                  "gpos75",
                  "gpos100",
                  "gvar",
                  "acen"
                ],
                "range": [
                  "white",
                  "lightgray",
                  "gray",
                  "gray",
                  "black",
                  "#7B9CC8",
                  "#DC4542"
                ]
              },
              "size": {"value": 18},
              "x": {"field": "chromStart", "type": "genomic"},
              "xe": {"field": "chromEnd", "type": "genomic"},
              "stroke": {"value": "gray"},
              "strokeWidth": {"value": 0.3},
              "width": 500,
              "height": 100
            },
            // Structuyral Variant - Circular
            {
              "title": "Structural Variant",
              "data": {
                "url": "https://s3.amazonaws.com/gosling-lang.org/data/cancer/rearrangement.PD35930a.csv",
                "type": "csv",
                "genomicFieldsToConvert": [
                  {
                    "chromosomeField": "chr1",
                    "genomicFields": ["start1", "end1"]
                  },
                  {
                    "chromosomeField": "chr2",
                    "genomicFields": ["start2", "end2"]
                  }
                ]
              },
              "mark": "withinLink",
              "x": {"field": "start1", "type": "genomic"},
              "xe": {"field": "end2", "type": "genomic"},
              "color": {
                "field": "svclass",
                "type": "nominal",
                "legend": true,
                "domain": [
                  "tandem-duplication",
                  "translocation",
                  "delection",
                  "inversion"
                ],
                "range": ["#569C4D", "#4C75A2", "#DA5456", "#EA8A2A"]
              },
              "stroke": {
                "field": "svclass",
                "type": "nominal",
                "domain": [
                  "tandem-duplication",
                  "translocation",
                  "delection",
                  "inversion"
                ],
                "range": ["#569C4D", "#4C75A2", "#DA5456", "#EA8A2A"]
              },
              "strokeWidth": {"value": 1},
              "opacity": {"value": 0.6},
              "style": {"legendTitle": "SV Class"},
              "width": 500,
              "height": 80
            }
          ]
        },
        {
          "linkingId": "mid-scale",
          "xDomain": {"chromosome": "chr1"},
          "layout": "linear",
          "tracks": [
            // Cytobands - Linear
            {
              "style": {
                "background": "#D7EBFF",
                "outline": "#8DC1F2",
                "outlineWidth": 5
              },
              "title": "Ideogram",
              "alignment": "overlay",
              "data": {
                "url": "https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv",
                "type": "csv",
                "chromosomeField": "Chromosome",
                "genomicFields": ["chromStart", "chromEnd"]
              },
              "tracks": [
                {
                  "mark": "rect",
                  "dataTransform": [
                    {
                      "type": "filter",
                      "field": "Stain",
                      "oneOf": ["acen"],
                      "not": true
                    }
                  ]
                },
                {
                  "mark": "triangleRight",
                  "dataTransform": [
                    {"type": "filter", "field": "Stain", "oneOf": ["acen"]},
                    {"type": "filter", "field": "Name", "include": "q"}
                  ]
                },
                {
                  "mark": "triangleLeft",
                  "dataTransform": [
                    {"type": "filter", "field": "Stain", "oneOf": ["acen"]},
                    {"type": "filter", "field": "Name", "include": "p"}
                  ]
                },
                {
                  "mark": "text",
                  "dataTransform": [
                    {
                      "type": "filter",
                      "field": "Stain",
                      "oneOf": ["acen"],
                      "not": true
                    }
                  ],
                  "size": {"value": 12},
                  "color": {
                    "field": "Stain",
                    "type": "nominal",
                    "domain": [
                      "gneg",
                      "gpos25",
                      "gpos50",
                      "gpos75",
                      "gpos100",
                      "gvar"
                    ],
                    "range": [
                      "black",
                      "black",
                      "black",
                      "black",
                      "white",
                      "black"
                    ]
                  },
                  "visibility": [
                    {
                      "operation": "less-than",
                      "measure": "width",
                      "threshold": "|xe-x|",
                      "transitionPadding": 10,
                      "target": "mark"
                    }
                  ]
                }
              ],
              "color": {
                "field": "Stain",
                "type": "nominal",
                "domain": [
                  "gneg",
                  "gpos25",
                  "gpos50",
                  "gpos75",
                  "gpos100",
                  "gvar",
                  "acen"
                ],
                "range": [
                  "white",
                  "lightgray",
                  "gray",
                  "gray",
                  "black",
                  "#7B9CC8",
                  "#DC4542"
                ]
              },
              "size": {"value": 18},
              "x": {"field": "chromStart", "type": "genomic"},
              "xe": {"field": "chromEnd", "type": "genomic"},
              "text": {"field": "Name", "type": "nominal"},
              "stroke": {"value": "gray"},
              "strokeWidth": {"value": 0.3},
              "width": 500,
              "height": 30
            },
            // Genes - Linear
            {
              "alignment": "overlay",
              "title": "hg38 | Genes",
              "data": {
                "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=gene-annotation",
                "type": "beddb",
                "genomicFields": [
                  {"index": 1, "name": "start"},
                  {"index": 2, "name": "end"}
                ],
                "valueFields": [
                  {"index": 5, "name": "strand", "type": "nominal"},
                  {"index": 3, "name": "name", "type": "nominal"}
                ],
                "exonIntervalFields": [
                  {"index": 12, "name": "start"},
                  {"index": 13, "name": "end"}
                ]
              },
              "tracks": [
                {
                  "dataTransform": [
                    {"type": "filter", "field": "type", "oneOf": ["gene"]},
                    {"type": "filter", "field": "strand", "oneOf": ["+"]}
                  ],
                  "mark": "triangleRight",
                  "x": {"field": "end", "type": "genomic"},
                  "size": {"value": 15}
                },
                {
                  "dataTransform": [
                    {"type": "filter", "field": "type", "oneOf": ["gene"]}
                  ],
                  "mark": "text",
                  "text": {"field": "name", "type": "nominal"},
                  "x": {"field": "start", "type": "genomic"},
                  "xe": {"field": "end", "type": "genomic"},
                  "style": {"dy": -15, "outline": "black", "outlineWidth": 0}
                },
                {
                  "dataTransform": [
                    {"type": "filter", "field": "type", "oneOf": ["gene"]},
                    {"type": "filter", "field": "strand", "oneOf": ["-"]}
                  ],
                  "mark": "triangleLeft",
                  "x": {"field": "start", "type": "genomic"},
                  "size": {"value": 15},
                  "style": {
                    "align": "right",
                    "outline": "black",
                    "outlineWidth": 0
                  }
                },
                {
                  "dataTransform": [
                    {"type": "filter", "field": "type", "oneOf": ["exon"]}
                  ],
                  "mark": "rect",
                  "x": {"field": "start", "type": "genomic"},
                  "size": {"value": 15},
                  "xe": {"field": "end", "type": "genomic"}
                },
                {
                  "dataTransform": [
                    {"type": "filter", "field": "type", "oneOf": ["gene"]},
                    {"type": "filter", "field": "strand", "oneOf": ["+"]}
                  ],
                  "mark": "rule",
                  "x": {"field": "start", "type": "genomic"},
                  "strokeWidth": {"value": 2},
                  "xe": {"field": "end", "type": "genomic"},
                  "style": {
                    "linePattern": {"type": "triangleRight", "size": 3.5},
                    "outline": "black",
                    "outlineWidth": 0
                  }
                },
                {
                  "dataTransform": [
                    {"type": "filter", "field": "type", "oneOf": ["gene"]},
                    {"type": "filter", "field": "strand", "oneOf": ["-"]}
                  ],
                  "mark": "rule",
                  "x": {"field": "start", "type": "genomic"},
                  "strokeWidth": {"value": 2},
                  "xe": {"field": "end", "type": "genomic"},
                  "style": {
                    "linePattern": {"type": "triangleLeft", "size": 3.5},
                    "outline": "black",
                    "outlineWidth": 0
                  }
                },
                {
                  "mark": "brush",
                  "x": {"linkingId": "detail-1"},
                  "strokeWidth": {"value": 0},
                  "color": {"value": "gray"},
                  "opacity": {"value": 0.3}
                },
                {
                  "mark": "brush",
                  "x": {"linkingId": "detail-2"},
                  "strokeWidth": {"value": 0},
                  "color": {"value": "gray"},
                  "opacity": {"value": 0.3}
                }
              ],
              "row": {
                "field": "strand",
                "type": "nominal",
                "domain": ["+", "-"]
              },
              "color": {
                "field": "strand",
                "type": "nominal",
                "domain": ["+", "-"],
                "range": ["#97A8B2", "#D4C6BA"]
              },
              "visibility": [
                {
                  "operation": "less-than",
                  "measure": "width",
                  "threshold": "|xe-x|",
                  "transitionPadding": 10,
                  "target": "mark"
                }
              ],
              "width": 400,
              "height": 100
            },
            // Structural Variant - Linear
            {
              "title": "Structural Variant",
              "data": {
                "url": "https://s3.amazonaws.com/gosling-lang.org/data/cancer/rearrangement.PD35930a.csv",
                "type": "csv",
                "genomicFieldsToConvert": [
                  {
                    "chromosomeField": "chr1",
                    "genomicFields": ["start1", "end1"]
                  },
                  {
                    "chromosomeField": "chr2",
                    "genomicFields": ["start2", "end2"]
                  }
                ]
              },
              "alignment": "overlay",
              "tracks": [
                {
                  "mark": "withinLink",
                  "x": {"field": "start1", "type": "genomic"},
                  "xe": {"field": "end2", "type": "genomic"}
                },
                {
                  "mark": "point",
                  "x": {"field": "start1", "type": "genomic"},
                  "y": {"value": 400}
                },
                {
                  "mark": "point",
                  "x": {"field": "end2", "type": "genomic"},
                  "y": {"value": 400}
                }
              ],
              "color": {
                "field": "svclass",
                "type": "nominal",
                "domain": [
                  "tandem-duplication",
                  "translocation",
                  "delection",
                  "inversion"
                ],
                "range": ["#569C4D", "#4C75A2", "#DA5456", "#EA8A2A"],
                "legend": true
              },
              "stroke": {
                "field": "svclass",
                "type": "nominal",
                "domain": [
                  "tandem-duplication",
                  "translocation",
                  "delection",
                  "inversion"
                ],
                "range": ["#569C4D", "#4C75A2", "#DA5456", "#EA8A2A"]
              },
              "strokeWidth": {"value": 1},
              "opacity": {"value": 0.6},
              "size": {"value": 4},
              "tooltip": [
                {"field": "start1", "type": "genomic"},
                {"field": "end2", "type": "genomic"},
                {"field": "svclass", "type": "nominal"}
              ],
              "style": {"legendTitle": "SV Class", "linkStyle": "elliptical"},
              "width": 1000,
              "height": 200
            }
          ]
        }
      ]
    },
  ]};

  return <GoslingComponent spec={spec} />;
};

export default GenomeViewer;
