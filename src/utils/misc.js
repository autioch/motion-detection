export function dictToOptions(idDict, labelDict) {
  return Object.values(idDict).map((id) => ({
    id,
    label: labelDict[id]
  }));
}

const MILISECOND = 1000;

export function getFps(lastRender, currentRender) {
  const delta = (currentRender - lastRender) / MILISECOND;

  return Math.floor(1 / delta);
}
