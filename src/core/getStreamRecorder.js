import donwloadWebmVideo from './donwloadWebmVideo';

const MILISECOND = 1000;

// https://www.npmjs.com/package/react-media-recorder
// https://www.npmjs.com/package/@wmik/use-media-recorder
// https://www.npmjs.com/package/use-media-recorder

export default function getStreamRecorder(stream) {
  let recorder;

  let chunks = [];

  let motionStart;

  let stopTimeout;

  let recordTolerance = 0;

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

  function startRecording(newRecordTolerance = 0) {
    recordTolerance = newRecordTolerance;
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

  function stopRecording(immediate = false) {
    if (immediate) {
      realStopRecording();
    }
    if (stopTimeout || !recorder || recorder.state !== 'recording') {
      return;
    }

    stopTimeout = setTimeout(realStopRecording, recordTolerance * MILISECOND);
  }

  function toggleRecording() {
    stopTimeout = null;
    if (recorder?.state === 'recording') {
      recorder.stop();
    } else {
      startRecording(0);
    }
  }

  return {
    startRecording,
    stopRecording,
    toggleRecording
  };
}
