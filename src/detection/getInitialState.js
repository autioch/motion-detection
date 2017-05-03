export default function getInitialState() {
  return {
    isInMotion: false,
    lastStatic: performance.now(),
    lastMotion: performance.now(),
    changedData: {}
  };
}
