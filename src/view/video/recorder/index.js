import tag from 'lean-tag';
import { download } from 'utils';
import './styles';

const MILISECOND = 1000;

export default function recorderFactory(stream, recordTolerance) {
  const el = tag('.recorder.app-video__overlay');
  let recorder;
  let chunks = [];
  let motionStart;
  let motionStop;
  let stopTimeout;

  function downloadVideo() {
    const downloadData = new Blob(chunks, {
      type: 'video/webm'
    });

    const duration = Math.round((motionStop.getTime() - motionStart.getTime()) / MILISECOND);
    const fileName = `motion ${motionStart.toLocaleString()}  ${duration}s.webm`;

    download(downloadData, fileName);
    el.textContent = fileName;
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
    el.textContent = 'Recording...';
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
    if (recorder && recorder.state === 'recording') {
      el.textContent = 'Recording stopped.';
      recorder.stop();
      motionStop = new Date();
    }
  }

  function stopRecording(immediate) {
    if (immediate) {
      realStopRecording();
    }
    if (stopTimeout || !recorder || recorder.state !== 'recording') {
      return;
    }

    el.textContent = 'Recording waiting...';

    stopTimeout = setTimeout(realStopRecording, recordTolerance * MILISECOND);
  }

  return {
    el,
    startRecording,
    stopRecording
  };
}
