// Наш герой.

class Hero {
  constructor({ position, boomerang }) {
    this.skin = '🤠'; // можете использовать любые emoji '💃'
    this.position = position;
    this.boomerang = boomerang;
    this.isDead = false;
    this.score = 0;
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
    this.boomerang.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
    this.boomerang.position += 1;
  }

  attack() {
    if (this.position === this.boomerang.position - 1) {
      this.boomerang.fly(this.position);
    }
    // Атакуем.
  }

  die() {
    this.skin = '💀';
    this.boomerang.skin = '';
    this.isDead = true;
  }
}

module.exports = Hero;
