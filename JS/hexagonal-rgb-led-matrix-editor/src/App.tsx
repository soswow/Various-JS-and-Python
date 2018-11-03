import * as React from 'react';
import { SyntheticEvent } from 'react';
import './App.css';
// import { CSSProperties } from 'react';

// const Raphael = require('raphael');

const gradToRads = (grad: number) => (grad * Math.PI) / 180;
const radsToGrad = (rads: number) => Math.PI * 180 / rads;

const ROWS = 23;
const COLUMNS = 7;
const HEXAGON_SIDE = 20;
const HEXAGON_GAP = 2;
const hexagonHeight = Math.sqrt(3) * HEXAGON_SIDE;

// const hexagonSideAngle = gradToRads(360 / 6);

export interface Coordinate {
  x: number;
  y: number;
}

export interface Configuration {
  activeKeys: Array<boolean|undefined>;
  stipEnumToKeys: number[];
}

export type Mode = 'selection' | 'define-strip' | 'matrix-rain' | 'random-colors';

export type CellKey = string; //  `yIndex-xIndex` format

type RGB = [number, number, number];
const BLACK: RGB = [0,0,0];
const WHITE: RGB = [255,255,255];

type Cells = RGB[];

export interface State {
  serializedConfiguration: string;
  selectedCells: Array<boolean|undefined>;
  cells: Cells;
  configuration: Configuration;
  mode: Mode;
}

// TODO I need data structure with all the cells. Each cell will have some values.
// Selected? Color? etc. MAtrix rain will go from top to bottom and

const matrixRainDrops = ['0-3'];

class App extends React.Component<{}, State> {
  // private readonly divRef: RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.state = {
      configuration: {
        activeKeys: [],
        stipEnumToKeys: []
      },
      cells: [],
      selectedCells: [],
      mode: 'selection',
      serializedConfiguration: '',
    }
  }

  public render() {
    const totalHeight = ROWS * (hexagonHeight + HEXAGON_GAP) + 200;
    const {
      mode,
      serializedConfiguration
    } = this.state;
    return (
      <div className="App">
        <div className='side-panel'>
          <button onClick={this.leaveSelectedAsActive}>Leave only selected as active</button>
          <br/>
          <select value={mode} onChange={this.onModeChange}>
            <option value={'selection' as Mode}>Selection mode</option>
            <option value={'define-strip' as Mode}>Strip enum mode</option>
            <option value={'matrix-rain' as Mode}>Matrix rain mode</option>
            <option value={'random-colors' as Mode}>Random colors mode</option>
          </select>
        </div>
        <div>
          <svg height={totalHeight} width={400} xmlns="http://www.w3.org/2000/svg">
            {this.renderHexagons()}
          </svg>
        </div>
        <div className='side-panel'>
          <textarea
            name="code" id="serialized_state"
            cols={30} rows={10}
            value={serializedConfiguration}
            onChange={this.onSerializedConfigurationChange}
          /><br/>
          <button onClick={this.serializeData}>Stringify state</button>
          <button onClick={this.deserializeData}>Parse state</button>
        </div>
      </div>
    );
  }

  private onSerializedConfigurationChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    this.setState({ serializedConfiguration: e.currentTarget.value });
  };

  private onModeChange = (e: SyntheticEvent<HTMLSelectElement>) => {
    const newMode = e.currentTarget.value as Mode;
    this.setState({ mode: newMode }, () => {
      if (newMode === 'random-colors') {
        this.nextRandomColorsModeTick();
      } else if (newMode === 'matrix-rain') {
        this.nextMatrixRainModeTick();
      }
    });
  };

  private serializeData = () => {
    this.setState(({ configuration }) => {
      return { serializedConfiguration: JSON.stringify(configuration) }
    });
  };

  private leaveSelectedAsActive = () => {
    const configuration = this.state.configuration;
    this.setState({
      configuration: {
        ...configuration,
        activeKeys: [...this.state.selectedCells]
      },
      selectedCells: []
    });
  };

  private get randomColor() {
    return Math.round(Math.random() * 255);
  }

  private nextRandomColorsModeTick = () => {
    const newCells: Cells = [];
    for (let yc = 0; yc < ROWS; yc++) {
      for (let xc = 0; xc < COLUMNS; xc++) {
        newCells.push([this.randomColor, this.randomColor, this.randomColor]);
      }
    }

    this.setState({cells: newCells});
    if (this.state.mode === 'random-colors') {
      setTimeout(this.nextRandomColorsModeTick, 1000/10);
      // requestAnimationFrame(this.nextRandomColorsModeTick);
    }
  };

  private nextMatrixRainModeTick = () => {
    const { cells } = this.state;
    const newCells: Cells = [];
    for (let yc = ROWS-1; yc >= 0; yc--) {
      for (let xc = 0; xc < COLUMNS; xc++) {
        const key = yc * COLUMNS + xc;
        if(yc > 0) {
          const prevLineKey = (yc-1) * COLUMNS + xc;
          newCells[key] = cells[prevLineKey] || {color: BLACK};
        } else {
          if (Math.random() > 0.9 && (!cells[key] || cells[key] === BLACK || cells[key][1] < 100)) {
            newCells[key] = WHITE;
          } else if (!cells[key] || cells[key] === BLACK || cells[key][1] < 10) {
            newCells[key] = BLACK;
          } else if (cells[key] === WHITE) {
            newCells[key] = [0, 240, 0];
          } else {
            newCells[key] = [0, cells[key][1] - 20, 0];
          }
        }
      }
    }

    this.setState({cells: newCells});
    if (this.state.mode === 'matrix-rain') {
      setTimeout(this.nextMatrixRainModeTick, 1000/10);
    }
  };

  private deserializeData = () => {
    this.setState(({ serializedConfiguration }) => {
      return { configuration: JSON.parse(serializedConfiguration) }
    });
  };

  private onHexagonClick = (key: number) => () => {
    const { selectedCells, mode, configuration } = this.state;

    if(mode === 'define-strip'){
      configuration.stipEnumToKeys.push(key);
    }

    selectedCells[key] = !selectedCells[key];

    this.setState({ selectedCells });
  };


  private getCellColor(key: number): string {
    const { selectedCells, cells } = this.state;
    const isSelected = selectedCells[key];
    const cellState = cells[key];
    if (isSelected) {
      return 'red';
    } else if (cellState) {
      return `rgb(${cellState[0]},${cellState[1]},${cellState[2]})`;
    } else {
      return 'none';
    }
  }

  private renderHexagon(key: number, x: number, y: number, side: number) {
    const { mode, configuration: {stipEnumToKeys} } = this.state;
    const fill = this.getCellColor(key);

    let stripNumber = null;
    const index = stipEnumToKeys.indexOf(key);
    if (mode === 'define-strip' && index > -1) {
      stripNumber = <text x={x} y={y} className="small">{index}</text>;
    }

    return <>
      <path
        key={key}
        fill={fill}
        stroke="#000000"
        d={this.ngonPath(x, y, 6, side)}
        onClick={this.onHexagonClick(key)}
      />
      {stripNumber}
    </>;
  }

  private renderHexagons() {
    const { activeKeys } = this.state.configuration;
    const base = { x: 60, y: 60 };
    const hexagons = [];
    // const gap = 1;
    // const side = 20;
    // const height = Math.sqrt(3) * side;
    const heightWithGap = hexagonHeight + HEXAGON_GAP * 2;
    const sideWithGap = heightWithGap / Math.sqrt(3);

    for (let yc = 0; yc < ROWS; yc++) {
      for (let xc = 0; xc < COLUMNS; xc++) {
        const key = yc * COLUMNS + xc;
        if (activeKeys.length === 0 || activeKeys[key]) {
          const xy = {
            x: base.x + xc * (sideWithGap * 1.5),
            y: base.y + yc * heightWithGap
          };
          if (xc % 2 !== 0) {
            xy.y = base.y + yc * heightWithGap + heightWithGap / 2;
          }
          hexagons.push(this.renderHexagon(key, xy.x, xy.y, HEXAGON_SIDE));
        }
      }
    }
    return hexagons;
  }

  private ngonPath(x: number, y: number, N: number, side: number) {
    let path = '';

    for (let c = 0; c <= N; c += 1) {
      const theta = (c * (360 / N) * Math.PI) / 180;
      const tempX = x + Math.cos(theta) * side;
      const tempY = y + Math.sin(theta) * side;
      path += (c === 0 ? "M" : "L") + tempX + "," + tempY;
    }

    return path;
  }
}

export default App;
