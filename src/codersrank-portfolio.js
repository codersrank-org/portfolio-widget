import { fetchData } from './shared/fetch-data';
import { formatData } from './shared/format-data';
import { render } from './shared/render';
import { renderError } from './shared/render-error';
import { renderLoading } from './shared/render-loading';

// eslint-disable-next-line
const COMPONENT_TAG = 'codersrank-portfolio';
const STATE_IDLE = 0;
const STATE_LOADING = 1;
const STATE_ERROR = 2;
const STATE_SUCCESS = 3;

// eslint-disable-next-line
const STYLES = `$_STYLES_$`;

// eslint-disable-next-line
class CodersrankPortfolio extends HTMLElement {
  constructor() {
    super();

    this.shadowEl = this.attachShadow({ mode: 'closed' });
    this.tempDiv = document.createElement('div');

    this.stylesEl = document.createElement('style');
    this.stylesEl.textContent = STYLES;
    this.shadowEl.appendChild(this.stylesEl);

    this.mounted = false;

    this.state = STATE_IDLE;

    this.data = null;
  }

  static get observedAttributes() {
    return [
      'username',
      'logos',
      'grid',
      'max-items',
      'dates',
      'title',
      'description',
      'company',
      'skills',
      'links',
    ];
  }

  get username() {
    return this.getAttribute('username');
  }

  set username(value) {
    this.setAttribute('username', value);
  }

  get logos() {
    return this.getAttribute('logos') !== 'false';
  }

  set logos(value) {
    this.setAttribute('logos', value);
  }

  get dates() {
    return this.getAttribute('dates') !== 'false';
  }

  set dates(value) {
    this.setAttribute('dates', value);
  }

  get title() {
    return this.getAttribute('title') !== 'false';
  }

  set title(value) {
    this.setAttribute('title', value);
  }

  get description() {
    return this.getAttribute('description') !== 'false';
  }

  set description(value) {
    this.setAttribute('description', value);
  }

  get company() {
    return this.getAttribute('company') !== 'false';
  }

  set company(value) {
    this.setAttribute('company', value);
  }

  get skills() {
    return this.getAttribute('skills') !== 'false';
  }

  set skills(value) {
    this.setAttribute('skills', value);
  }

  get links() {
    return this.getAttribute('links') !== 'false';
  }

  set links(value) {
    this.setAttribute('links', value);
  }

  get grid() {
    const grid = this.getAttribute('grid');
    if (grid === 'true' || grid === '') return true;
    return false;
  }

  set grid(value) {
    this.setAttribute('grid', value);
  }

  get maxItems() {
    const maxItems = parseInt(this.getAttribute('max-items') || 0, 10) || 0;
    return maxItems;
  }

  set maxItems(value) {
    this.setAttribute('max-items', value);
  }

  set ['max-items'](value) {
    this.setAttribute('max-items', value);
  }

  render() {
    const {
      username,
      mounted,
      state,
      shadowEl,
      data,
      logos,
      grid,
      dates,
      title,
      description,
      company,
      skills,
      links,
    } = this;
    const ctx = {
      data,
      grid,
      logos,
      dates,
      title,
      description,
      company,
      skills,
      links,
    };

    if (!username || !mounted) return;
    if (state === STATE_SUCCESS) {
      this.tempDiv.innerHTML = render(ctx);
    } else if (state === STATE_ERROR) {
      this.tempDiv.innerHTML = renderError(ctx);
    } else if (state === STATE_IDLE || state === STATE_LOADING) {
      this.tempDiv.innerHTML = renderLoading(ctx);
    }

    let widgetEl = shadowEl.querySelector('.codersrank-portfolio');
    if (widgetEl) {
      widgetEl.parentNode.removeChild(widgetEl);
    }
    widgetEl = this.tempDiv.querySelector('.codersrank-portfolio');
    if (!widgetEl) return;
    this.widgetEl = widgetEl;
    shadowEl.appendChild(widgetEl);
  }

  loadAndRender() {
    const { username } = this;
    this.state = STATE_LOADING;
    this.render();
    fetchData(username)
      .then((portfolio) => {
        this.data = formatData(portfolio, this.maxItems);
        this.state = STATE_SUCCESS;
        this.render();
      })
      .catch(() => {
        this.state = STATE_ERROR;
        this.render();
      });
  }

  attributeChangedCallback() {
    if (!this.mounted) return;
    this.loadAndRender();
  }

  connectedCallback() {
    this.mounted = true;
    this.loadAndRender();
  }

  disconnectedCallback() {
    this.mounted = false;
  }
}

// EXPORT
