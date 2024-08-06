module.exports = str => str && str.replace(/ /g, '-').replace(/[^\w-]+/g, '').toLowerCase()
