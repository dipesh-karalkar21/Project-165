AFRAME.registerComponent("enmove",{
    init:function(){
        setInterval(function(){
            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();
            
            var enemy = document.querySelector("#enemy2").object3D;
            var player = document.querySelector("#camera-rig").object3D;

            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);
            
            position1.y=0

            var direction = new THREE.Vector3();

            direction.subVectors(position1, position2)

            var bullet = document.createElement("a-entity");

            bullet.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.2,
            });

            bullet.setAttribute("material", "color", "black");

            pos = document.querySelector("#enemy2").getAttribute("position");

            bullet.setAttribute("position", {
            x: pos.x,
            y: pos.y+2 ,
            z: pos.z ,
            });

            bullet.setAttribute("velocity", direction.normalize().multiplyScalar(15));

            var scene = document.querySelector("#scene");

            bullet.setAttribute("dynamic-body", {
            shape: "sphere",
            mass: "0",
            });

            bullet.addEventListener("collide", function(e){
                var scene = document.querySelector("#scene");
        
                var element = e.detail.target.el;
            
                var elementHit = e.detail.body.el;
        

                if (elementHit.id.includes("camera-rig")) {
                    element.removeEventListener("collide", this.removeBullet);
                    var count = document.querySelector("#countLife").getAttribute("text").value
                    var val = parseInt(count) - 1 
                    var valFinal = val >= 0 ? val : 0 
                    document.querySelector("#countLife").setAttribute("text",{ value: valFinal})
                    if(parseInt(count)-1 == 0){
                        document.querySelector("#over").setAttribute("visible",true)
                        scene.removeChild(document.querySelector("#enemy2"))
                    }
                    scene.removeChild(element);
                }
            });

            scene.appendChild(bullet);       
        },4000)
    },
    tick:function(){
            this.direction()
    },
    direction:function(){
            
            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();
            
            var enemy = this.el.object3D;
            var player = document.querySelector("#camera-rig").object3D;

            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);
            
            position1.y=0

            var direction = new THREE.Vector3();

            var ogre = this.el
            direction.subVectors(position1, position2)
            var mag = Math.sqrt(direction.x*direction.x + direction.y*direction.y + direction.z*direction.z)
            //console.log(mag)
            if(mag > 3.5){    
                ogre.setAttribute("velocity",direction.normalize().multiplyScalar(3))
                
            }
            else if(mag<3.1){
                ogre.setAttribute("velocity",direction.normalize().multiplyScalar(-5))
            }
            else{
                ogre.setAttribute("velocity",direction.multiplyScalar(0))
            }    
        
    }
})