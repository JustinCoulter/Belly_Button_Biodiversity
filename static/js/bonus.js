function buildGauge(sample) {
//   create a route to engage the provided function  
    const url =`/wfreq/${sample}`;

    d3.json(url).then(function(sample) {
        console.log(sample)
        // Enter a speed between 0 and 180
        var level = sample.WFREQ;
        console.log(level);

        // Trig to calc meter point
        var degrees = 180 - ((level*18)),
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var data = [{ type: 'scatter',
            x: [0], y:[0],
                marker: {size: 28, color:'850000'},
                showlegend: false,
                name: 'speed',
                text: level,
                hoverinfo: 'text+name'},
            { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
            rotation: 90,
            text: ['9', '8', '7', '6',
                        '5', '4', '3', '2', '1', ''],
            textinfo: 'text',
            textposition:'inside',                                   
            marker: {colors:['rgb(234, 145, 118)', 'rgb(229, 150, 130)',
                                'rgb(225, 155 142)', 'rgb(221, 160, 155)',
                                'rgb(217, 165, 167)', 'rgb(212, 170, 179)',
                                'rgb(208, 175, 192)', 'rgb(204, 180, 204)',
                                'rgb(200, 186, 217)','rgba(255, 255, 255, 1)']},                                    
            labels: ['clean bean', 'pretty darn clean', 'satisfactory cleanliness', 'acceptable, but could be better', 'come on just shower', 'no excuses', 'pitiful', 'not disgusting gross, but still really gross', 'absolutely gross', ''],
            hoverinfo: 'label',
            hole: .5,
            type: 'pie',
            showlegend: false
        }];

        var layout = {
            shapes:[{
                type: 'path',
                path: path,
                fillcolor: '850000',
                line: {
                    color: '850000'
                }
                }],
            title: '<b>Washing Frequency</b> <br>0-9',
            height: 500,
            width: 500,
            xaxis: {zeroline:false, showticklabels:false,
                        showgrid: false, range: [-1, 1]},
            yaxis: {zeroline:false, showticklabels:false,
                        showgrid: false, range: [-1, 1]}
        };
        Plotly.newPlot('gauge', data, layout);
    });

    

}