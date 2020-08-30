class Menu {
  constructor(id) {
    this.box = document.querySelector(id);
    this.ul = this.box.querySelector('ul');
    this.lis = this.box.querySelectorAll('li');
    this.subMenuEles = this.box.querySelectorAll('.sub-menu');
    this.timer1 = null;
    this.timer2 = null;
    this.init();
  }
  init() {
    this.lis.forEach((item) => {
      item.addEventListener(
        'mouseenter',
        (e) => {
          let li = e.target;

          if (this.timer1 != null) {
            clearTimeout(this.timer1);
          }

          this.timer1 = setTimeout(() => {
            this.subMenuEles.forEach((item) => {
              item.classList.remove('active');
            });
            li.children[1].classList.add('active');
          }, 200);
        },
        false
      );
    });

    this.lis.forEach((item) => {
      item.addEventListener(
        'mouseleave',
        (e) => {
          let li = e.target;

          if (this.timer2 != null) {
            clearTimeout(this.timer2);
          }

          this.timer2 = setTimeout(() => {
            li.children[1].classList.remove('active');
          }, 200);
        },
        false
      );
    });
  }
}
