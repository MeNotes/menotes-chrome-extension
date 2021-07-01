export class Page {
  constructor(id) {
    this.init = this.init.bind(this);
    this.destroy = this.destroy.bind(this);

    this.element = document.getElementById(id);
  }

  init() {
    this.element.style.display = "block";
  }

  destroy() {
    this.element.style.display = "none";
  }
}
