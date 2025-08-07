export default class Page {
  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  async open(path = "") {
    return await browser.url(`https://www.saucedemo.com/${path}`);
  }
}
