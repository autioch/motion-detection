import { h, Component } from 'preact';
import getUserMedia from './getUserMedia';
import ControlsView from './controls/view';
import VideoView from './video/view';
import './styles';

const ratio = 0.75;

export default class AppView extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = Object.keys(props.config).reduce((dict, key) => {
      dict[key] = props.config[key].value;

      return dict;
    }, {});

    this.state.changes = [];

    this.state.height = Math.round(this.state.width * ratio);
    this.getSource();
  }

  getSource() {
    getUserMedia().then((videoStream) => this.setState({
      source: videoStream
    }));
  }

  setDimensions(width) {
    this.setState({
      width,
      height: Math.round(width * ratio)
    });
  }

  onChange(key, value) {
    if (key === 'width') {
      this.setDimensions(value);
    } else {
      this.setState({
        [key]: value
      });
    }
  }

  render() {
    // console.log(this.state);
    const { config } = this.props;
    const visibleConfig = Object
        .keys(this.props.config)
        .filter((key) => !config[key].hidden)
        .map((key) => config[key]);

    return (
      <div className="m-app">
        <VideoView
          source={this.state.source}
          width={this.state.width}
          height={this.state.height}
          quality={this.state.quality}
          timeTolerance ={this.state.timeTolerance}
        />
        <ControlsView controls={visibleConfig} values={this.state} onChange={this.onChange}/>
      </div>
    );
  }
}
