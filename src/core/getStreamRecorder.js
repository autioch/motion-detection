import donwloadWebmVideo from './donwloadWebmVideo';

const MILISECOND = 1000;

export default function getStreamRecorder(stream, recordTolerance = 0) {
  let recorder;

  let chunks = [];

  let motionStart;

  let stopTimeout;

  function downloadVideo() {
    donwloadWebmVideo(chunks, motionStart, new Date());
    chunks = [];
    recorder = null;
  }

  function cancelStopRecording() {
    if (stopTimeout) {
      clearTimeout(stopTimeout);
    }
    stopTimeout = null;
  }

  function startRecording() {
    cancelStopRecording();

    if (recorder) {
      return;
    }
    motionStart = new Date();
    recorder = new MediaRecorder(stream);
    recorder.onstop = downloadVideo;
    recorder.ondataavailable = (ev) => chunks.push(ev.data);
    recorder.start(10);
  }

  function realStopRecording() {
    stopTimeout = null;
    if (recorder?.state === 'recording') {
      recorder.stop();
    }
  }

  function stopRecording(immediate) {
    if (immediate) {
      realStopRecording();
    }
    if (stopTimeout || !recorder || recorder.state !== 'recording') {
      return;
    }

    stopTimeout = setTimeout(realStopRecording, recordTolerance * MILISECOND);
  }

  return {
    startRecording,
    stopRecording
  };
}
