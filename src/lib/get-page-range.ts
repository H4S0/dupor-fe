export const getPageRange = (totalPage: number, page: number) => {
  if (!totalPage || totalPage <= 5) {
    return Array.from({ length: totalPage || 0 }, (_, i) => i + 1);
  }

  if (page <= 3) return [1, 2, 3, 4, 5, '...', totalPage];
  if (page >= totalPage - 2)
    return [
      1,
      '...',
      totalPage - 4,
      totalPage - 3,
      totalPage - 2,
      totalPage - 1,
      totalPage,
    ];
  return [1, '...', page - 1, page, page + 1, '...', totalPage];
};
