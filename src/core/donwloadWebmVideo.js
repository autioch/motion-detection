import download from './download';

const MILISECOND = 1000;

export default function donwloadWebmVideo(chunks, startDateTime, stopDateTime) {
  const downloadData = new Blob(chunks, {
    type: 'video/webm'
  });

  const duration = Math.round((stopDateTime.getTime() - startDateTime.getTime()) / MILISECOND);
  const fileName = `motion${startDateTime.toLocaleString()}  ${duration}s.webm`;

  download(downloadData, fileName);
}
