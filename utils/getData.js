/**
 * It returns the data from the given url
 * @param url - The URL to make the request to.
 * @returns a promise.
 */
import axios from "axios";

export async function getData(url) {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error("Error", error);
  }
}
