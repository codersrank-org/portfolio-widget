import { codersrRankLogo } from './codersrank-logo';
import { logo } from './logo';

export const render = ({
  data: portfolios,
  grid,
  preloader,
  logos: showLogos,
  dates: showDates,
  title: showTitle,
  description: showDescription,
  company: showCompany,
  skills: showSkills,
  links: showLinks,
  branding,
} = {}) => {
  const formatDate = (date) => {
    if (!date) return '';
    const formatter = Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });
    return formatter.format(new Date(date));
  };

  const dates = (item) => {
    const startDate = formatDate(item.start_date || item.date_from);
    const endDate = item.is_current
      ? 'Present'
      : formatDate(item.end_date || item.date_to);
    return `${startDate} - ${endDate}`;
  };

  // prettier-ignore
  return /* html */ `
    <div class="codersrank-portfolio ${grid ? 'codersrank-portfolio-grid' : ''} ${!showLogos ? 'codersrank-portfolio-no-logos' : ''} ${preloader ? 'codersrank-portfolio-loading' : ''}">
      ${preloader ? /* html */ `
      <div class="codersrank-portfolio-preloader"></div>
      ` : ''}
      <ul>
        ${portfolios.map((portfolio) => /* html */`
        <li class="codersrank-portfolio-item">
          ${showLogos ? /* html */`
          <div class="codersrank-portfolio-logo">
            ${logo(portfolio.project_title, portfolio.image)}
          </div>
          ` : ''}
          <div class="codersrank-portfolio-content">
            ${showTitle && portfolio.project_title ? /* html */`
            <div class="codersrank-portfolio-title">
              ${ portfolio.project_title }
            </div>
            ` : ''}

            ${showDates && dates(portfolio) ? /* html */`
            <div class="codersrank-portfolio-date">
              ${ dates(portfolio) }
            </div>
            ` : ''}

            ${showCompany && portfolio.company ? /* html */`
            <div class="codersrank-portfolio-company">
              ${ portfolio.company }
            </div>
            ` : ''}

            ${showDescription && portfolio.description ? /* html */`
            <div class="codersrank-portfolio-description">
              ${ portfolio.description }
            </div>
            ` : ''}

            ${showSkills && (portfolio.highlighted_technologies || portfolio.other_technologies) ? /* html */`
              <div class="codersrank-portfolio-tags">
                ${(portfolio.highlighted_technologies || []).map((tech) => /* html */`
                  <span class="codersrank-portfolio-tag"><span class="codersrank-portfolio-tag-star">★</span>${tech}</span>
                `).join('')}

                ${(portfolio.other_technologies || []).map((tech) => /* html */`
                  <span class="codersrank-portfolio-tag">${tech}</span>
                `).join('')}
              </div>
            ` : ''}

            ${showLinks && (portfolio.link_to_project || portfolio.link_to_source_code) ? /* html */`
            <div class="codersrank-portfolio-links">
              ${portfolio.link_to_project ? /* html */`
              <a href="${portfolio.link_to_project}" target="_blank" rel="noopener noreferrer">Demo</a>
              ` : ''}
              ${portfolio.link_to_source_code ? /* html */`
              <a href="${portfolio.link_to_source_code}" target="_blank" rel="noopener noreferrer">Source</a>
              ` : ''}
            </div>
            ` : ''}
          </div>
        </li>
        `).join('')}
      </ul>
      ${branding ? /* html */`
      <div class="codersrank-portfolio-branding">
        <a href="https://codersrank.io" target="_blank" rel="noopener noreferrer">
          <span>Powered by </span>
          ${codersrRankLogo}
        </a>
      </div>
      ` : ''}
    </div>
  `;
};
