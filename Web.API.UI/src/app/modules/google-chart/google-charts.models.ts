
export class IChartData {
  chartType:  null | 'pie' = null;
  chartData: IPie = null;
  chartSettings: IPieSettings = null;
}

export class Icharts {
  IPie: IPie;
  IPieSettings: IPieSettings;
  IBarSettings: IBarSettings;
}

export class IPie {
  title: string;
  data: Array<Array<string>>;
  example?: [['Task', 'Delegate Status'], ['Walk', 5], ['Run', 5], ['Eat', 5]];
}


export class IPieSettings {
  fontsize: number;
  pieHoleSize: number;
  is3DBool = true;
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
