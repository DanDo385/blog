// utils/markdownToHtml.js
const { remark } = require('remark');
const html = require('remark-html');

async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

module.exports = markdownToHtml;
