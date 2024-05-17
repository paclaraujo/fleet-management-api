const PER_PAGE = 25;

module.exports = {
  PER_PAGE,
  getPagination: (page) => {
    return {
      skip: ((page || 1) - 1) * PER_PAGE,
      take: PER_PAGE
    }
  }
}
