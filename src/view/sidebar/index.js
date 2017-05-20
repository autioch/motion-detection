/* eslint no-use-before-define: 0 */
import tag from 'lean-tag';
import './styles';
import controlsViewFactory from '../controls';

export default function sidebarView(controls, onChange) {
  let isExpanded = false;

  const contentEl = tag('.app-controls__content', controlsViewFactory(controls, onChange).el);
  const toggleEl = tag('.app-controls__toggle', tag('span'), {
    onclick: toggleExpanded
  });

  const el = tag('.app-sidebar', [contentEl, toggleEl]);

  function toggleExpanded() {
    isExpanded = !isExpanded;
    if (isExpanded) {
      el.classList.add('is-expanded');
    } else {
      el.classList.remove('is-expanded');
    }
  }

  return {
    el
  };
}
