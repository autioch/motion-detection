import { render, h } from 'preact';
import { config } from 'core';
import AppView from './view.jsx';

render(<AppView config={config.schema}/>, document.body);
