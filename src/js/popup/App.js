import { EditorPage } from "./pages/EditorPage";
import { SizeService } from "./services";

export class App {
  constructor(routerService, storageService) {
    this.routerService = routerService;

    this.routerService.openPage(EditorPage.id);

    const navigationContainer = document.getElementById("navigation");
    navigationContainer.addEventListener("click", ({ target }) => {
      if (target.dataset.pageId === undefined) return;
      this.routerService.openPage(target.dataset.pageId);
    });

    new SizeService(storageService);
  }
}
