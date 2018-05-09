import namedColors from 'color-name-list';
import nearestColor from 'nearest-color';
 
// create Object needed for
let colors = {};
 
namedColors.forEach(color => {
  colors[color.name] = color.hex
});
 
// get closest named color
const nearestColorName = nearestColor.from(colors);
export const getColorName = (hex) => {
    return nearestColorName(hex).name
}