import StyledTile, { type StyledTileProps } from './StyledTile';
import StyledTileValue from './StyledTileValue';
import Tile2 from "../../../../assets/sm/2.png";
import Tile4 from "../../../../assets/sm/4.png";
import Tile8 from "../../../../assets/sm/8.png";
import Tile16 from "../../../../assets/sm/16.png";
import Tile32 from "../../../../assets/sm/32.png";
import Tile64 from "../../../../assets/sm/64.png";
import Tile128 from "../../../../assets/sm/128.png";
import Tile256 from "../../../../assets/sm/256.png";
import Tile512 from "../../../../assets/sm/512.png";
import Tile1024 from "../../../../assets/sm/1024.png";
import Tile2048 from "../../../../assets/sm/2048.png";
import Tile4096 from "../../../../assets/sm/4096.png";
import Tile8192 from "../../../../assets/sm/8192.png";
const tileImages: Record<number, string> = {
  2: Tile2,
  4: Tile4,
  8: Tile8,
  16: Tile16,
  32: Tile32,
  64: Tile64,
  128: Tile128,
  256: Tile256,
  512: Tile512,
  1024: Tile1024,
  2048: Tile2048,
  4096: Tile4096,
  8192: Tile8192,
}
export interface TileProps extends StyledTileProps {
  isNew?: boolean;
  isMerging?: boolean;
}

const Tile: React.FC<TileProps> = ({
  value,
  x,
  y,
  width,
  height,
  isNew = false,
  isMerging = false,
}) => (
  <StyledTile value={value} x={x} y={y} width={width} height={height}>
    <StyledTileValue value={value} isNew={isNew} isMerging={isMerging}>
      <img src={tileImages[value]} alt={value.toString()} />
    </StyledTileValue>
  </StyledTile>
);

export default Tile;
