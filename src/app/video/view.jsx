import { h, Component } from 'preact';

const ratio = 0.75;

export default class VideoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageCache: this.initImageCache(),
      data1: null,
      data2: null,
      isInMotion: false,
      lastMotion: performance.now(),
      lastStatic: performance.now(),
      changedData: null
    };
  }

  initImageCache() {
    const imageCacheEl = document.createElement('canvas');

    const width = Math.round(this.props.width / this.props.quality);
    const height = Math.round(width * ratio);

    imageCacheEl.width = width;
    imageCacheEl.height = height;

    return imageCacheEl;
  }

  syncMotion() {
    let { isInMotion, lastStatic, lastMotion } = this.state;
    const { timeTolerance } = this.props;
    const currentTime = performance.now();

    if (this.state.changedData.changed) {
      if (currentTime - lastStatic > timeTolerance) {
        isInMotion = true;
        lastMotion = currentTime;
      }
    } else if (currentTime - lastMotion > timeTolerance) {
      if (isInMotion) {
        lastStatic = currentTime;
      }
      isInMotion = false;
    }

    return {
      isInMotion,
      lastStatic,
      lastMotion
    };
  }

  cacheImage() {
    const context = this.state.imageCahe.getContext('2d');
    const width = Math.round(this.props.width / this.props.quality);
    const height = Math.round(width * ratio);

    context.clearRect(0, 0, width, height);
    context.drawImage(this.context.video, 0, 0, width, height);

    const { isInMotion, lastStatic, lastMotion } = this.syncMotion();

    this.setState({
      data1: this.state.data2,
      data2: context.getImageData(0, 0, width, height).data,
      isInMotion,
      lastStatic,
      lastMotion
    });
  }

  render() {
    return (
    <div>
      <video
      srcObject={this.props.source}
      width={this.props.width}
      height={this.props.height}
      ref={(el) => {
        this.context.video = el;
      }}
      onloadedmetadata={(ev) => ev.target.play()}
      />
    </div>
    );
  }
}
