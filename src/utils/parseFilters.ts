// export type ParsedFilters = { [key: string]: string[] };

// export function parseFilters(filters: string[]): ParsedFilters {
//   const result: ParsedFilters = {};

//   for (const filter of filters) {
//     const [attribute, values] = filter.split(':');

//     if (!attribute || !values) {
//       continue;
//     }

//     result[attribute] = values.split(',');
//   }

//   return result;
// }

export type ParsedFilters = { [key: string]: string[] };

export function parseFilters(filters: string[]): ParsedFilters {
  return filters.reduce((acc, f) => {
    const [attr, vals] = f.split(':', 2);
    if (attr && vals) {
      acc[attr.trim()] = vals.split(',').map((v) => v.trim());
    }
    return acc;
  }, {} as ParsedFilters);
}
