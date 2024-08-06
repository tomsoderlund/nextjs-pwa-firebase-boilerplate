const toSlug = (str: string): string => str?.replace(/ /g, '-')?.replace(/[^\w-]+/g, '')?.toLowerCase()
export default toSlug
