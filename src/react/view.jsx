import { render, h } from 'preact';
import AppView from './app/view.jsx';

export default (schema) => render(<AppView config={schema}/>, document.body);
