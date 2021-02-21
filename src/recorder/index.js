import './styles';

// possible states:
// - filenme downloaded
// el.textContent = 'Recording...';
// el.textContent = 'Recording stopped.';
// el.textContent = 'Recording waiting...';
export default function Recorder({ state = '' }) {
  return (
    <div className="recorder">{state}</div>
  );
}
