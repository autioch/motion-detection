import download from './download';

const MILISECOND = 1000;

function realDownload(chunks, startDateTime, stopDateTime) {
  const downloadData = new Blob(chunks, {
    type: 'video/webm'
  });

  const duration = Math.round((stopDateTime.getTime() - startDateTime.getTime()) / MILISECOND);
  const fileName = `motion ${startDateTime.toLocaleString()}  ${duration}s.webm`;

  download(downloadData, fileName);
}

export default function recorderFactory(stream, recordTolerance = 0) {
  let recorder;

  let chunks = [];

  let motionStart;

  let stopTimeout;

  function downloadVideo() {
    realDownload(chunks, motionStart, new Date());
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
