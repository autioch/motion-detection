import { h, Component } from 'preact';
import MotionView from './motion/view'; // eslint-disable-line no-unused-vars
import detectorFactory from 'detection';

export default class VideoView extends Component {
  constructor(props) {
    super(props);
    this.detectMotion = this.detectMotion.bind(this);
    this.detector = detectorFactory(props.config);

    this.state = {
      forcedUpdate: performance.now()
    };
  }

  detectMotion() {
    this.rafId = requestAnimationFrame(this.detectMotion);
    this.detector.compareFrame(this.context.video);
    console.log('detectMotion');
    this.setState({
      forcedUpdate: performance.now()
    });
  }

  requestMotionDetection() {
    this.rafId = requestAnimationFrame(this.detectMotion);
  }

  componentDidMount() {
    this.rafId = requestAnimationFrame(this.detectMotion);
  }

  render() {
    const motionState = this.detector.getState();

    return (
      <div style="position:relative;overflow:hidden">
        <video
        srcObject={this.props.config.source}
        width={this.props.config.width}
        height={this.props.config.height}
        ref={(el) => {
          this.context.video = el;
        }}
        onloadedmetadata={(ev) => ev.target.play()}
        />
        <MotionView isInMotion={motionState.isInMotion} changedData={motionState.changedData} />
      </div>
    );
  }
}
