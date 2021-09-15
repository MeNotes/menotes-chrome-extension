export class RouterService {
  constructor() {
    this.routes = new Map();
  }

  addRoute(id, page) {
    this.routes.set(id, page);
    this.pages = [...this.routes.values()];
  }

  openPage(pageId, ...args) {
    this.pages.forEach((p) => p.destroy());
    this.routes.get(pageId).init(args);
  }
}
