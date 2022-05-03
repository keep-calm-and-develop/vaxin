import {
  useLocation
} from "react-router-dom";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function isWeekSearch(query) {
    return Number(query.get('span')) === 7;
}