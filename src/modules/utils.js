/**
 * Populates hyperlinkedField resources from the list of all the related
 * resources.
 * 
 * @export
 * @param {any} hyperlinkedField The url value of the resource.
 * @param {any} models List of model from were the resource will be
 *  retrieved.
 * @returns 
 */
export function populate(hyperlinkedField, models) {
  const id = parseInt(resourceId(hyperlinkedField), 10);
  return models.find((d) => d.id === id);
}

/**
 * Return the rerouce id
 * @param  {String} url string
 * @return {String}
 */
export function resourceId(url) {
  const t = url.split('/')
    .filter((t) => t !== '')
    .pop();
  return t;
}