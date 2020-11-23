import { stringToColor } from './string-to-color';

export const logo = (name, url) => {
  const iconColor = stringToColor(name || '');
  // prettier-ignore
  return url ? /* html */`
    <img src="${url}" alt="${name}" title="${name}" />
  ` : /* html */`
    <svg title="${name}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <rect width="32" height="32" fill="${iconColor}" rx="3" />
      ${name ? /* html */`
      <text
        x="50%"
        y="50%"
        font-weight="bold"
        font-size="20"
        fill="#fff"
        dy="0"
        text-anchor="middle"
        dominant-baseline="central"
      >${ name[0].toUpperCase() }</text>
      ` : ''}

    </svg>
  `;
};
