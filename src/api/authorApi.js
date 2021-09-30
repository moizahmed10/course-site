import { handleResponse, handleError } from "./apiUtils"
const baseUrl = process.env.GATSBY_API_URL_AUTHORS

export function getAuthors() {
  return fetch(baseUrl).then(handleResponse).catch(handleError)
}
