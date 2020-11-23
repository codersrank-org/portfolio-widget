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
} = {}) => {
  const formatDate = (date) => {
    if (!date) return '';
    const formatter = Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });
    return formatter.format(new Date(date));
  };

  const dates = (item) => {
    const startDate = formatDate(item.startDate || item.dateFrom);
    const endDate = item.currentlyWorkingHere
      ? 'Present'
      : formatDate(item.endDate || item.dateTo);
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
            ${logo(portfolio.title, portfolio.picture)}
          </div>
          ` : ''}
          <div class="codersrank-portfolio-content">
            ${showTitle && portfolio.title ? /* html */`
            <div class="codersrank-portfolio-title">
              ${ portfolio.title }
            </div>
            ` : ''}

            ${showDates && dates(portfolio) ? /* html */`
            <div class="codersrank-portfolio-date">
              ${ dates(portfolio) }
            </div>
            ` : ''}

            ${showCompany && portfolio.companyName ? /* html */`
            <div class="codersrank-portfolio-company">
              ${ portfolio.companyName }
            </div>
            ` : ''}

            ${showDescription && portfolio.description ? /* html */`
            <div class="codersrank-portfolio-description">
              ${ portfolio.description }
            </div>
            ` : ''}

            ${showSkills && (portfolio.highlightedSkills || portfolio.skills) ? /* html */`
              <div class="codersrank-portfolio-tags">
                ${(portfolio.highlightedSkills || []).map((tech) => /* html */`
                  <span class="codersrank-portfolio-tag"><span class="codersrank-portfolio-tag-star">★</span>${tech}</span>
                `).join('')}

                ${(portfolio.skills || []).map((tech) => /* html */`
                  <span class="codersrank-portfolio-tag">${tech}</span>
                `).join('')}
              </div>
            ` : ''}

            ${showLinks && (portfolio.demoUrl || portfolio.sourceUrl) ? /* html */`
            <div class="codersrank-portfolio-links">
              ${portfolio.demoUrl ? /* html */`
              <a href="${portfolio.demoUrl}" target="_blank" rel="noopener noreferrer">Demo</a>
              ` : ''}
              ${portfolio.sourceUrl ? /* html */`
              <a href="${portfolio.sourceUrl}" target="_blank" rel="noopener noreferrer">Source</a>
              ` : ''}
            </div>
            ` : ''}
          </div>
        </li>
        `).join('')}
      </ul>
    </div>
  `;
};
