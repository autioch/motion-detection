import getRectImageDiffer from './rect';
import getPixelImageDiffer from './pixel';

const differTypes = {
  '1': getRectImageDiffer,
  '2': getPixelImageDiffer
};

export default function imageDifferFactory(config, compareWidth, compareHeight, differType) {
  return differTypes[differType](config, compareWidth, compareHeight);
}
