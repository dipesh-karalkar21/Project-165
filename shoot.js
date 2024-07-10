AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        bullet.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera-rig");
        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y+2 ,
          z: pos.z ,
        });

        var camera = document.querySelector("#camera").object3D;

        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        bullet.setAttribute("velocity", direction.multiplyScalar(-50));

        var scene = document.querySelector("#scene");

        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "0",
        });

        bullet.addEventListener("collide", this.removeBullet);

        scene.appendChild(bullet);

        this.shootSound();
      }
    });
  },
 removeBullet: function (e) {
    var scene = document.querySelector("#scene");
    
    var element = e.detail.target.el;

    var elementHit = e.detail.body.el;

    if (elementHit.id.includes("enemy")) {
      element.removeEventListener("collide", this.removeBullet);
      var count = document.querySelector("#countTank").getAttribute("text").value
      document.querySelector("#countTank").setAttribute("text",{ value:parseInt(count)-1 })
      if(parseInt(count)-1 == 0){
        document.querySelector("#completed").setAttribute("visible",true)
    }
      scene.removeChild(element);
      scene.removeChild(elementHit);
    }
  },
  shootSound: function () {
    var entity = document.querySelector("#sound1");
    entity.components.sound.playSound();
  },
});

