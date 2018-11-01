export default function interval(callback) {
  let rafId = requestAnimationFrame(callback);

  function cancel() {
    cancelAnimationFrame(rafId);
  }

  function loop() {
    rafId = requestAnimationFrame(loop);
    callback();
  }

  loop();

  return {
    cancel
  };
}
