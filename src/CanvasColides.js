import EventEmitter from "eventemitter3";

function between(x, min, max) {
  return x >= min && x <= max;
}

class CanvasColides extends EventEmitter {
  constructor(canvas) {
    super();
    this.enabled = true;
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.objects = [];
    this.mouse = {
      x: 0,
      y: 0
    };

    canvas.addEventListener('mousemove', (event) => {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
      this.loop();
    });

    canvas.addEventListener('click', () => {
      var objects = this.searchObjectsAtCoordinates(this.mouse.x, this.mouse.y);

      this.emit('click', objects);
    });
  }

  searchObjectsAtCoordinates(x, y) {
    var objects = this.objects;
    var objectsToReturn = [];

    for (let index in objects) {
      let object = objects[index];

      if (between(x, object.x, object.endX)
          && between(y, object.y, object.endY))
      {
        objectsToReturn.push(object.name);
      }
    }

    return objectsToReturn;
  }

  updateCanvas(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  reset() {
    this.objects = [];
    this.mouse = {
      x: 0,
      y: 0
    };
  }

  addObject(name, x, y, width, height) {
    this.objects.push({
      name: name,
      x: x, 
      y: y,
      width: width,
      height: height,
      endX: x + width,
      endY: y + height,
      colided: false
    });
  }

  findObject(name) {
    var objects = this.objects;

    for (let index in objects) {
      let object = objects[index];

      if (object.name === name) return object;
    }

    return false;
  }

  loop() {
    if (!this.enabled) return;
    if (this.objects.length <= 0) return;
    
    var objects = this.objects;

    for (let index in objects) {
      let object = objects[index];
      
      if (between(this.mouse.x, object.x, object.endX)
          && between(this.mouse.y, object.y, object.endY))
      {
        if (object.colided) continue;

        this.objects[index].colided = true;
        this.emit('colide', object);
      } else {
        if (!object.colided) continue;

        this.objects[index].colided = false;
        this.emit('uncolide', object);
      }
    }
  }
}

export {
  CanvasColides
}