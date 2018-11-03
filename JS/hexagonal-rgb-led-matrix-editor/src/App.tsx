import * as React from 'react';
import { SyntheticEvent } from 'react';
import './App.css';
// import { CSSProperties } from 'react';

// const Raphael = require('raphael');

const gradToRads = (grad: number) => (grad * Math.PI) / 180;
const radsToGrad = (rads: number) => Math.PI * 180 / rads;

const MAX_ROWS = 23;
const HEXAGON_SIDE = 20;
const HEXAGON_GAP = 2;
const hexagonHeight = Math.sqrt(3) * HEXAGON_SIDE;

// const hexagonSideAngle = gradToRads(360 / 6);

export interface Coordinate {
  x: number;
  y: number;
}

export interface Configuration {
  activeKeys: string[];
  stipEnumToKey: string[];
}

export type Mode = 'selection' | 'define-strip' | 'matrix-rain' | 'random-colors';

export type CellKey = string; //  `yIndex-xIndex` format

type RGB = [number, number, number];
const BLACK: RGB = [0,0,0];
const WHITE: RGB = [255,255,255];

interface CellState {
  color: RGB;
}

interface Cells {
  [cellKey: string]: CellState
}

export interface State {
  serializedConfiguration: string;
  selectedCells: CellKey[];
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
        stipEnumToKey: []
      },
      cells: {},
      selectedCells: [],
      mode: 'selection',
      serializedConfiguration: '',
    }
  }

  public render() {
    const totalHeight = MAX_ROWS * (hexagonHeight + HEXAGON_GAP) + 200;
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
          <br/>
          <button onClick={this.saveStripEnum}>Save strip enumeration</button>
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

  private saveStripEnum = () => {
    const configuration = this.state.configuration;
    this.setState({
      configuration: {
        ...configuration,
        activeKeys: [...this.state.selectedCells],
        stipEnumToKey: [...this.state.selectedCells]
      },
      mode: 'selection',
      selectedCells: []
    });
  };

  private get randomColor() {
    return Math.round(Math.random() * 255);
  }

  private nextRandomColorsModeTick = () => {
    const newCells: Cells = {};
    for (let yc = 0; yc < 23; yc++) {
      for (let xc = 0; xc < 7; xc++) {
        const key = `${yc}-${xc}`;
        newCells[key] = {
          color: [this.randomColor, this.randomColor, this.randomColor]
        };
      }
    }

    this.setState({cells: newCells});
    if (this.state.mode === 'random-colors') {
      requestAnimationFrame(this.nextRandomColorsModeTick);
    }
  };

  private nextMatrixRainModeTick = () => {
    const { cells } = this.state;
    const newCells: Cells = {};
    for (let yc = 22; yc >= 0; yc--) {
      for (let xc = 0; xc < 7; xc++) {
        const key = `${yc}-${xc}`;
        if(yc > 0) {
          const prevLineKey = `${yc-1}-${xc}`;
          newCells[key] = cells[prevLineKey] || {color: BLACK};
        } else {
          if (Math.random() > 0.9 && (!cells[key] || cells[key].color === BLACK || cells[key].color[1] < 100)) {
            newCells[key] = { color: WHITE };
          } else if (!cells[key] || cells[key].color === BLACK || cells[key].color[1] < 10) {
            newCells[key] = { color: BLACK };
          } else if (cells[key].color === WHITE) {
            newCells[key] = { color: [0, 240, 0] };
          } else {
            newCells[key] = { color: [0, cells[key].color[1] - 20, 0] };
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

  private onPathClick = (key: string) => () => {
    const { selectedCells } = this.state;

    const existingIndex = selectedCells.indexOf(key);
    if (existingIndex > -1) {
      selectedCells.splice(existingIndex, 1);
    } else {
      selectedCells.push(key);
    }
    this.setState({ selectedCells });
  };


  private getCellColor(key: CellKey): string {
    const { selectedCells, cells } = this.state;
    const selectedIndex = selectedCells.indexOf(key);
    const cellState = cells[key];
    if (selectedIndex > -1) {
      return 'red';
    } else if (cellState) {
      return `rgb(${cellState.color[0]},${cellState.color[1]},${cellState.color[2]})`;
    } else {
      return 'none';
    }
  }

  private renderHexagon(key: string, x: number, y: number, side: number) {
    const { selectedCells, mode } = this.state;
    const fill = this.getCellColor(key);

    const selectedIndex = selectedCells.indexOf(key);
    let stripNumber = null;
    if (mode === 'define-strip' && selectedIndex > -1) {
      stripNumber = <text x={x} y={y} className="small">{selectedIndex + 1}</text>;
    }

    return <>
      <path
        key={key}
        fill={fill}
        stroke="#000000"
        d={this.ngonPath(x, y, 6, side)}
        onClick={this.onPathClick(key)}
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

    for (let yc = 0; yc < 23; yc++) {
      for (let xc = 0; xc < 7; xc++) {
        const key = `${yc}-${xc}`;
        if (activeKeys.length === 0 || activeKeys.indexOf(key) > -1) {
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
