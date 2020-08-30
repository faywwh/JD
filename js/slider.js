class Slider {
  constructor(id) {
    this.box = document.querySelector(id);
    this.picBox = this.box.querySelector('ul');
    this.indexBox = this.box.querySelector('.index-box');
    this.sliderWidth = this.box.offsetWidth;
    this.index = 1;
    this.animated = false;
    this.sliders = this.picBox.children.length;
    this.autoClock = null;
    this.init();
  }

  init() {
    this.initPoint();
    this.picCopy();
    this.leftRight();
    this.autoPlay();
  }

  initPoint() {
    const num = this.picBox.children.length;
    let frg = document.createDocumentFragment();
    for (let i = 0; i < num; i++) {
      let li = document.createElement('li');
      li.setAttribute('data-index', i + 1);
      if (i == 0) {
        li.classList.add('active');
      }
      frg.appendChild(li);
    }
    this.indexBox.children[0].appendChild(frg);
    this.indexBox.children[0].style.width = num * 10 * 2 + 'px';
    this.indexBox.children[0].addEventListener('click', (e) => {
      if (e.target.nodeName.toLowerCase() === 'li' && !this.animated) {
        let pointIndex = e.target.getAttribute('data-index');
        let offset = (pointIndex - this.index) * this.sliderWidth;
        this.index = pointIndex;
        this.move(offset);
      }
    });
  }

  picCopy() {
    const first = this.picBox.firstElementChild.cloneNode(true);
    const last = this.picBox.lastElementChild.cloneNode(true);
    this.picBox.appendChild(first);
    this.picBox.insertBefore(last, this.picBox.firstChild);
    this.picBox.style.width =
      this.sliderWidth * this.picBox.children.length + 'px';
    this.picBox.style.left = -1 * this.sliderWidth + 'px';
  }

  leftRight() {
    this.box.querySelector('.left-box').addEventListener('click', () => {
      if (this.animated) {
        return;
      }
      if (this.index <= 1) {
        this.index = this.sliders;
      } else {
        this.index--;
      }
      this.move(-this.sliderWidth);
    });

    this.box.querySelector('.right-box').addEventListener('click', () => {
      if (this.animated) {
        return;
      }
      if (this.index >= this.sliders) {
        this.index = 1;
      } else {
        this.index++;
      }
      this.move(this.sliderWidth);
    });
  }

  move(offset) {
    this.animate(offset);
    const num = this.indexBox.children[0].children.length;
    for (let i = 0; i < num; i++) {
      this.indexBox.children[0].children[i].className = '';
    }
    this.indexBox.children[0].children[this.index - 1].className = 'active';
  }

  animate(offset) {
    const time = 500;
    const rate = 100;
    let speed = offset / (time / rate);
    let goal = parseFloat(this.picBox.style.left) - offset;
    this.animated = true;
    let animate = setInterval(() => {
      if (
        this.picBox.style.left == goal ||
        Math.abs(
          Math.abs(parseFloat(this.picBox.style.left)) - Math.abs(goal)
        ) < Math.abs(speed)
      ) {
        this.picBox.style.left = goal + 'px';
        clearInterval(animate);
        this.animated = false;

        if (parseFloat(this.picBox.style.left) == 0) {
          this.picBox.style.left = -this.sliders * this.sliderWidth + 'px';
        } else if (
          parseFloat(this.picBox.style.left) ==
          -(this.sliders + 1) * this.sliderWidth
        ) {
          this.picBox.style.left = -this.sliderWidth + 'px';
        }
      } else {
        this.picBox.style.left =
          parseFloat(this.picBox.style.left) - speed + 'px';
      }
    }, rate);
  }
  // 轮播框自动轮播
  autoPlay() {
    this.auto();
    this.box.addEventListener('mouseout', (e) => {
      this.auto();
    });
    this.box.addEventListener('mouseover', (e) => {
      clearInterval(this.autoClock);
    });
  }
  // 每隔3秒自动点击右键
  auto() {
    this.autoClock = setInterval(() => {
      this.box.querySelector('.right-box').click();
    }, 3000);
  }
}

// ES5语法
// function Slider() {}

// Slider.prototype.index = 1;

// Slider.prototype.init = function() {

// }

// var slider = new Slider()
