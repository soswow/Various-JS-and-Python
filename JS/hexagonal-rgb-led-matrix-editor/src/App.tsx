import * as React from 'react';
import { SyntheticEvent } from 'react';
import './App.css';

const ROWS = 23;
const COLUMNS = 7;
const HEXAGON_SIDE = 20;
const HEXAGON_GAP = 2;
const hexagonHeight = Math.sqrt(3) * HEXAGON_SIDE;

export interface Coordinates {
  x: number;
  y: number;
}

export type Mode = 'selection' | 'define-strip' | 'matrix-rain' | 'random-colors' | 'fire';

type RGB = [number, number, number];
const BLACK: RGB = [0,0,0];
const WHITE: RGB = [255,255,255];

type Cells = Array<RGB | undefined>;

export interface Configuration {
  activeKeys: Array<boolean|undefined>;
  stipIndexToGrid: number[]; // Mapping between strip index (index of an array) to grid index (value)
}

export interface State {
  serializedConfiguration: string;
  selectedCells: Array<boolean|undefined>;
  grid: Cells; // This is virtual rectangular shaped grid state is
  // This is states of each LED in a strip. Length should match
  // This what we iterate over to display
  strip: Cells;
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
        activeKeys: new Array(ROWS * COLUMNS).fill(true),
        stipIndexToGrid: new Array(ROWS * COLUMNS).fill(null).map((_, i) => i)
      },
      strip: new Array(ROWS * COLUMNS).fill(null), // Strip states
      grid: new Array(ROWS * COLUMNS).fill(null)  ,
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
            <option value={'fire' as Mode}>Fire mode</option>
          </select>
        </div>
        <div>
          <svg height={totalHeight} width={400} xmlns="http://www.w3.org/2000/svg">
            {this.renderStrip()}
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
      switch (newMode) {
        case 'random-colors':
          this.nextRandomColorsModeTick();
          break;
        case 'matrix-rain':
          this.nextMatrixRainModeTick();
          break;
        case 'fire':
          this.nextFireModeTick();
          break;
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
      strip: new Array(this.state.selectedCells.length).fill(null),
      selectedCells: []
    });
  };

  private get randomColor() {
    return Math.round(Math.random() * 255);
  }

  private nextRandomColorsModeTick = () => {
    const newStrip: Cells = this.state.strip.map(() => [this.randomColor, this.randomColor, this.randomColor] as RGB);
    this.setState({strip: newStrip});
    if (this.state.mode === 'random-colors') {
      setTimeout(this.nextRandomColorsModeTick, 1000/10);
    }
  };

  private nextMatrixRainModeTick = () => {
    const { grid } = this.state;
    const newGrid: Cells = [];
    for (let yc = ROWS-1; yc >= 0; yc--) {
      for (let xc = 0; xc < COLUMNS; xc++) {
        const gridKey = yc * COLUMNS + xc;
        if(yc > 0) {
          const prevLineKey = (yc-1) * COLUMNS + xc;
          newGrid[gridKey] = grid[prevLineKey] || BLACK;
        } else {
          const gridCell = grid[gridKey];
          if (Math.random() > 0.9 && (!gridCell || gridCell === BLACK || gridCell[1] < 100)) {
            newGrid[gridKey] = WHITE;
          } else if (!gridCell || gridCell === BLACK || gridCell[1] < 10) {
            newGrid[gridKey] = BLACK;
          } else if (gridCell === WHITE) {
            newGrid[gridKey] = [0, 240, 0];
          } else {
            newGrid[gridKey] = [0, gridCell[1] - 20, 0];
          }
        }
      }
    }
    const newStrip = this.state.configuration.stipIndexToGrid.map(gridIndex => newGrid[gridIndex]);

    this.setState({grid: newGrid, strip: newStrip});
    if (this.state.mode === 'matrix-rain') {
      setTimeout(this.nextMatrixRainModeTick, 1000/10);
    }
  };

  private nextFireModeTick = () => {
    const { grid } = this.state;
    const newGrid: Cells = [];

    for (let xc = 0; xc < COLUMNS; xc++) {
      const gridKey = (ROWS-1) * COLUMNS + xc;
      newGrid[gridKey] = [Math.random() * 255, 0, 0];
    }

    for (let yc = ROWS-2; yc >= 0; yc--) {
      for (let xc = 0; xc < COLUMNS; xc++) {
        const gridKey = yc * COLUMNS + xc;
        let sum = 0;
        const oneBellowCell = grid[(yc+1) * COLUMNS + xc];
        sum += oneBellowCell && oneBellowCell[0] || 0;
        if (xc > 0) {
          const leftBottomCell = grid[(yc+1) * COLUMNS + (xc-1)];
          sum += leftBottomCell && leftBottomCell[0] || 0;
        } else {
          // When there is now column to the left, we just add bottom one more time
          sum += oneBellowCell && oneBellowCell[0] || 0;
        }

        if (xc < COLUMNS-1) {
          const rightBottomCell = grid[(yc+1) * COLUMNS + (xc+1)];
          sum += rightBottomCell && rightBottomCell[0] || 0;
        } else {
          // When there is now column to the right, we just add bottom one more time
          sum += oneBellowCell && oneBellowCell[0] || 0;
        }
        if(yc < ROWS-2){
          const twoBellowCell = grid[(yc+2) * COLUMNS + xc];
          sum += twoBellowCell && twoBellowCell[0] || 0;
        }else{
          // When it's just one above last line we add just one bellow
          sum += oneBellowCell && oneBellowCell[0] || 0;
        }

        const red = sum / 4.04;

        newGrid[gridKey] = [red, 0, 0];
      }
    }

    const newStrip = this.state.configuration.stipIndexToGrid.map(gridIndex => newGrid[gridIndex]);
    this.setState({grid: newGrid, strip: newStrip});
    if (this.state.mode === 'fire') {
      setTimeout(this.nextFireModeTick, 1000/20);
    }
  };

  private deserializeData = () => {
    this.setState(({ serializedConfiguration }) => {
      const configuration = JSON.parse(serializedConfiguration) as Configuration;
      return {
        configuration,
        strip: new Array(configuration.stipIndexToGrid.length).fill(null)
      }
    });
  };

  private onHexagonClick = (key: number) => () => {
    const { selectedCells, mode, configuration } = this.state;

    if(mode === 'define-strip'){
      configuration.stipIndexToGrid.push(key);
    }

    selectedCells[key] = !selectedCells[key];

    this.setState({ selectedCells });
  };

  private getCoordinatesByGridIndex(gridIndex: number): Coordinates {
    const yc = Math.floor(gridIndex / COLUMNS);
    const xc = gridIndex % COLUMNS;
    const heightWithGap = hexagonHeight + HEXAGON_GAP * 2;
    const sideWithGap = heightWithGap / Math.sqrt(3);
    const base = { x: 60, y: 60 };
    const coordinates = {
      x: base.x + xc * (sideWithGap * 1.5),
      y: base.y + yc * heightWithGap
    };
    if (xc % 2 !== 0) {
      coordinates.y = base.y + yc * heightWithGap + heightWithGap / 2;
    }
    return coordinates;
  }

  private renderHexagon(gridIndex: number, color?: RGB) {
    const { selectedCells, mode, configuration: {stipIndexToGrid} } = this.state;
    const {x,y} = this.getCoordinatesByGridIndex(gridIndex);
    let stripNumber = null;
    const index = stipIndexToGrid.indexOf(gridIndex);
    if (mode === 'define-strip' && index > -1) {
      stripNumber = <text x={x} y={y} className="small">{index}</text>;
    }
    const isSelected = selectedCells[gridIndex];
    let fill = `none`;
    if (isSelected) {
      fill = 'red';
    } else if (color) {
      fill = `rgb(${color[0]},${color[1]},${color[2]})`;
    }

    return <>
      <path
        key={gridIndex}
        fill={fill}
        stroke="#000000"
        d={this.ngonPath(x, y, 6, HEXAGON_SIDE)}
        onClick={this.onHexagonClick(gridIndex)}
      />
      {stripNumber}
    </>;
  }

  private renderLed(stripIndex: number, stripValue?: RGB) {
    // At this point on Arduino I can call some API that would change color of indexed led.
    // Here I need to do some visual render stuff.
    const {configuration: {stipIndexToGrid}} = this.state;
    const gridIndex = stipIndexToGrid[stripIndex];

    return this.renderHexagon(gridIndex, stripValue);
  }

  private renderStrip() {
    const { strip } = this.state;
    return strip.map((stripValue, stripIndex) => this.renderLed(stripIndex, stripValue));
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
