const getKeyTab = (location: Location) => {
    const search = location.search

    if (search && search?.length !== 0) {
        return `${location.pathname}${search}`
    }

    return location.pathname
}

export { getKeyTab }