import { getRequest } from "../_http";

/**
 * This file contains all async functions used by useQuery hook in react-query library
 */

export default function fetchVehicles({ queryKey }) {
  const [_, page, pageSize, brand] = queryKey;

  const params = {};

  /*
    If page is 1, then return all
    This is essential in order to find the total
    But it's essential the total count of the returned items should come with the response

    Therefore, response should be ideally modified as follows:

    { total: <count>, items: [ { <vehicle details> } ] }
  */
  if (brand) {
    params["details.brand"] = brand;
  }

  if (page > 1 && pageSize) {
    params._page = page;
    params._limit = pageSize;
  }

  return getRequest(`/vehicles`, params);
}
