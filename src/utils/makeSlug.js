function makeSlug(title) {
  // const strippedTitle = title.replace(/[^\w\s]/gi, '');
  if (!title) {
    return ""
  }
  const strippedTitle = title.replace(/[^a-zA-Z\u00C0-\u00FF\s]/gi, "")
  return strippedTitle.toLowerCase().replace(/ /g, "-")
}

module.exports = makeSlug
