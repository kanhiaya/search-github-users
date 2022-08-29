import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const ExampleChart = ({ data }) => {
  const chartConfigs = {
    type: 'column2d',
    width: 400,
    height: 400,
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Technologies used world wide',
        subCaption: 'Frontend Technology',
        xAxisName: 'Technology',
        yAxisName: 'Used ',
        numberSuffix: '%',
        theme: 'fusion',
      },
      data: data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default ExampleChart;
