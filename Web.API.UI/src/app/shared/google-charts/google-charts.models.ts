
// export class IChartData {
//   chartType:  null | 'pie' = null;
//   chartData: IPie = null;
//   chartSettings: IPieSettings = null;
// }

export class Icharts {
  IChart: IChart;
  IPieSettings: IPieSettings;
  IBarSettings: IBarSettings;
}

export class IChart {
  title: string;
  data: Array<Array<string>>;
  examplePie?: [['Task', 'Delegate Status'], ['Walk', 5], ['Run', 5], ['Eat', 5]];
}


export class IPieSettings {
  title: string;
  fontsize: number;
  pieHoleSize: number;
  is3DBool: boolean;
  tooltipType: 'focus' | 'none' | 'selection';
  tooltipDataType: 'both' | 'percentage' | 'value';
  pieSliceTextType: 'percentage'  | 'value' | 'label' | 'none';
  pieSliceTextColor: string;
  legend: {
    legendPosition: 'labeled' | 'top' | 'left' | 'right' | 'bottom' | 'none';
    maxLines: number,
    alignment: 'start' | 'center' | 'end';
    textStyle: {
      color: string; // legendTxtStyle
      width: string;
    }
  };
}

export class IBarSettings {
  barWidth: number;
  barsType: 'vertical' | 'horizontal';
  legend: {
    position: 'top' | 'left' | 'bottom' | 'right' | 'in' | 'none';
    alignment: 'center' | 'start' | 'end';
    textStyle?: {
      color?: string;
      fontName?: string;
      fontSize?: number;
      bold?: boolean;
      italic?: boolean;
    }
  };
  isStacked: boolean;
  tooltip: {
    isHtml: boolean,
    trigger: 'focus' | 'selection' | 'none';
  };
  reverse: boolean;
  trendlines?: {
    type?: 'linear';
    color?: string;
    lineWidth?: number;
    opacity?: number;
    showR2?: boolean;
    visibleInLegend?: boolean;
  };
}

export class ILineSettings {
  title: string;
  titlePosition?: 'in' | 'out' | 'none';
  legend?: {
    alignment?: 'start' | 'center' | 'end',
    position?: 'bottom' | 'left' | 'in' | 'none' | 'right' | 'top',
  };
  width?: number;
  height?: number;
  selectionMode?: 'single' | 'multiple';
  annotations?: {
    alwaysOutside?: boolean,
    textStyle?: {
      fontSize?: number,
      color?: string,
      auraColor?: string
    },
  };
  tooltip?: { 
    trigger: 'selection' | 'none' | 'focus'
  };
  hAxis: {
    title: string,
    format?: string,
    viewWindow?: {
      min?: Array<number>,
      max?: Array<number>
    },
    gridlines?: {
      count?: number,
    },
    direction?: -1 | 1
  };
  vAxis: {
    title: string,
    viewWindow?: {
      min?: number,
      max?: number
    },
  };
  reverseCategories?: boolean;
  pointShape?:  'circle' | 'triangle' | 'square' | 'diamond' | 'star' | 'polygon';
  pointSize?: number;
  pointsVisible?: boolean;
  orientation?: 'vertical' | 'horizontal'
}

const default_bar_ChartData = [
  // role: "style" -> color, opacity, fill-color,
  // fill-opacity, stroke-color, stroke-opacity, stroke-width
  [
    ['Element', 'Density', { role: 'style' }, { role: 'annotation' }],
    ['Copper', 8.94, '#b87333', 8.94],
    ['Silver', 10.49, 'silver', 10.49],
    ['Gold', 19.30, 'gold', 19.30],
    ['Platinum', 21.45, 'color: #e5e4e2', 21.45]
  ],
  [
    ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
      'Western', 'Literature', { role: 'annotation' }],
    ['2010', 10, 24, 20, 32, 18, 5, ''],
    ['2020', 16, 22, 23, 30, 16, 9, ''],
    ['2030', 28, 19, 29, 30, 12, 13, ''],
  ],
  [
    ['Year', 'Sales', 'Expenses', 'Profit'],
    ['2014', 1000, 400, 200],
    ['2015', 1170, 460, 250],
    ['2016', 660, 1120, 300],
    ['2017', 1030, 540, 350],
  ],
  [
    ['Year', 'Sales', { role: 'annotation' }, 'Expenses', 'Profit', { role: 'annotation' }],
    ['2014', 1000, 1000, 400, 200, 200],
    ['2015', 1170, 1170, 460, 250, 250],
    ['2016', 660, 660, 1120, 300, 300],
    ['2017', 1030, 1030, 540, 350, 350],
  ],
  [
    ['Year', 'Sales', { role: 'annotation' }, 'Expenses', { role: 'style' }, 'Profit', { role: 'annotation' }],
    ['2014', 1000, 1000, 400, '', 200, 200],
    ['2015', 1170, 1170, 460, 'black', 250, 250],
    ['2016', 660, 660, 1120, 'yellow', 300, 300],
    ['2017', 1030, 1030, 540, 'green', 350, 350],
  ]
];