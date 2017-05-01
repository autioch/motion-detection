import { h } from 'preact';

/* TODO Unused for now, waiting for redux... */
export default function LogView({ list }) {
  return (
    <div>
      {list.map(({ date, state }) => (<div><span>{date}</span><span>{state}</span></div>))}
    </div>
  );
}
