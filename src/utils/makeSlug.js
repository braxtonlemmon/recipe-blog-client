function makeSlug(title) {
  const strippedTitle = title.replace(/[^\w\s]/gi, '');
  return strippedTitle.toLowerCase().replace(/ /g, '-');  
}

module.exports = makeSlug