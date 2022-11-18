// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor() {
    this.skin = '🌀';
    this.position = 1;
    this.isDeadly = false;
  }

  fly(launchPosition) {
    this.isDeadly = true;
    this.moveRight();
  }

  moveLeft() {
    // Идём влево.
    let timer = 0;
    const id = setInterval(() => {
      if (timer < 6) {
        this.position -= 1;
        timer += 1;
      } else {
        clearInterval(id);
      }
    }, 100);
  }

  moveRight() {
    // Идём вправо.
    let timer = 0;
    const id = setInterval(() => {
      if (timer < 6) {
        this.position += 1;
        timer += 1;
      } else {
        clearInterval(id);
        this.isDeadly = false;
        this.moveLeft();
      }
    }, 100);
  }
}

module.exports = Boomerang;
