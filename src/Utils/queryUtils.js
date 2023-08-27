import { getRequest } from "../_http";

/**
 * This file contains all async functions used by useQuery hook in react-query library
 */

export default function fetchVehicles({ queryKey }) {
  const [_, page, pageSize, brand] = queryKey;

  const params = {};

  if (page) params._page = page;
  if (pageSize) params._limit = pageSize;
  if (brand) params["details.brand"] = brand;

  return getRequest(`/vehicles`, params);
}
