function getSlugUrl(title) {
    if (typeof title !== 'string') {
        throw new Error('Arg is not string')
    }

    return title.replace(/\s/gi, '-')
}

module.exports = { getSlugUrl }