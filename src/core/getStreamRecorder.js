import download from './download';

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
    const motionStop = new Date();
    const downloadData = new Blob(chunks, {
      type: 'video/webm'
    });

    const duration = Math.round((motionStop.getTime() - motionStart.getTime()) / MILISECOND);
    const fileName = `motion${motionStart.toLocaleString()}  ${duration}s.webm`;

    download(downloadData, fileName);
    chunks = [];
    recorder = null;
  }

  function startRecording(newRecordTolerance = 0) {
    recordTolerance = newRecordTolerance;
    if (stopTimeout) {
      clearTimeout(stopTimeout);
    }
    stopTimeout = null;

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
