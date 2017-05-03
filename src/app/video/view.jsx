import { h, Component } from 'preact';
import { MotionView, prepareCompareCanvas, detectMotion } from './motion'; // eslint-disable-line no-unused-vars

export default class VideoView extends Component {
  constructor(props) {
    super(props);
    this.detectMotion = this.detectMotion.bind(this);

    const compareCanvas = document.createElement('canvas');
    const compareCanvasDetails = prepareCompareCanvas(compareCanvas, this.props.width, this.props.quality);
    const { compareContext, compareWidth, compareHeight } = compareCanvasDetails;

    this.state = Object.assign({}, compareCanvasDetails, {
      isInMotion: false,
      lastMotion: performance.now(),
      lastStatic: performance.now(),
      previousFrame: compareContext.getImageData(0, 0, compareWidth, compareHeight).data,
      changedData: {}
    });
  }

  detectMotion() {
    this.requestMotionDetection();
    const currentFrame = this.getCurrentFrame();
    const motionChanges = detectMotion(this.props, this.state, currentFrame);

    this.setState(motionChanges);
  }

  getCurrentFrame() {
    const { compareContext, compareWidth, compareHeight } = this.state;

    compareContext.clearRect(0, 0, compareWidth, compareHeight);
    compareContext.drawImage(this.context.video, 0, 0, compareWidth, compareHeight);

    return compareContext.getImageData(0, 0, compareWidth, compareHeight).data;
  }

  requestMotionDetection() {
    this.rafId = requestAnimationFrame(this.detectMotion);
  }

  componentDidMount() {
    this.requestMotionDetection();
  }

  render() {
    const { changedData } = this.state;

    return (
      <div style="position:relative;overflow:hidden">
        <video
        srcObject={this.props.source}
        width={this.props.width}
        height={this.props.height}
        ref={(el) => {
          this.context.video = el;
        }}
        onloadedmetadata={(ev) => ev.target.play()}
        />
        <MotionView changedData={this.state.changedData} />
      </div>
    );
  }
}
