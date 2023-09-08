import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function BlenderAnimation() {
  useEffect(() => {
    // Setup Modeler Objects
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );
    const canvas = document.getElementById("threeJsCanvas");
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });

    // Setup flag to render everything once its ready
    let mixer_ready = false;
    let scene_ready = false;
    function tryRender() {
      if (!mixer_ready) {
        console.log(`Cannot render. Mixer is not ready`);
      } else if (!scene_ready) {
        console.log(`Cannot render. Scene is not ready`);
      } else {
        console.log("rendering first frame");
        mixer.update(0);
        progressAnim();
        renderer.render(scene, camera);
      }
    }

    // Load Textures
    let boxTexture = new THREE.TextureLoader().load(
      "../../../public/box-texture.png"
    );
    let floorTexture = new THREE.TextureLoader().load(
      "../../../public/wood-texture.tif"
    );
    let floorRoughness = new THREE.TextureLoader().load(
      "../../../public/wood-roughness.tif"
    );

    // Load Geometry
    let mixer;
    const loader = new GLTFLoader();
    loader.load(
      "../../../public/home-animation.glb",
      (gltf) => {
        // load handler
        const model = gltf.scene;
        scene.add(model);

        // Assign Materials
        model.traverse((o) => {
          if (o.isMesh) {
            // Box Object
            if (o.name === "Plane_1") {
              boxTexture.wrapT = THREE.RepeatWrapping;
              boxTexture.wrapS = THREE.RepeatWrapping;
              boxTexture.repeat.set(3, 3);
              var boxMaterial = new THREE.MeshStandardMaterial({
                // color: 0x424242,
                map: boxTexture,
                roughness: 1,
              });

              boxMaterial.castShadow = true;
              boxMaterial.receiveShadow = true;

              o.material = boxMaterial;

              console.log("set box material");
            }
            // Box-Light Object
            else if (o.name === "Plane_2") {
              var lightMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
              });
              lightMaterial.emissive = new THREE.Color(0xffffff);
              lightMaterial.emissiveIntensity = 1;

              o.material = lightMaterial;
            }
            // Floor Object
            else if (o.name === "Floor") {
              floorTexture.wrapT = THREE.RepeatWrapping;
              floorTexture.wrapS = THREE.RepeatWrapping;
              floorTexture.repeat.set(30, 30);
              var floorMaterial = new THREE.MeshStandardMaterial({
                // color: 0x424242,
                map: floorTexture,
                roughnessMap: floorRoughness,
              });

              floorTexture.receiveShadow = true;
              o.material = floorMaterial;
            }
          }
        });

        // Play main animation
        mixer = new THREE.AnimationMixer(model); // Allows animations
        const clips = gltf.animations;
        const clip = THREE.AnimationClip.findByName(clips, "ArmatureAction");
        const action = mixer.clipAction(clip);
        action.play();

        // Flag as done
        mixer_ready = true;
        tryRender();
      },
      (prog) => {
        // progress updates
        if (prog.loaded == prog.total) {
        }
      },
      (error) => {
        // err handler
        console.error(error);
      }
    );

    // Load Render Settings
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Load background and lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const innerLight = new THREE.PointLight(0xffffff, 1);
    scene.add(innerLight);

    const sceneLight1 = new THREE.PointLight(0xffffff, 6);
    sceneLight1.position.set(1, 5, 2);
    sceneLight1.castShadow = true;

    const sceneLight2 = new THREE.PointLight(0xffffff, 3);
    sceneLight2.position.set(-4, 3, -2);
    sceneLight2.castShadow = true;

    scene.add(sceneLight1);
    scene.add(sceneLight2);

    // Camera animation path
    function cameraAnimation(t) {
      function glide(t, p0, pf, t0, tf) {
        // Smooth glide from p0 to pf from t0 to tf
        return (
          0.5 * (pf - p0) * (1 - Math.cos((Math.PI / (tf - t0)) * (t - t0))) +
          p0
        );
      }

      // prevent backwards scrolling
      if (t <= 0) {
        return null;
      }

      function x(t) {
        // x-position function
        if (t < 0.3) {
          return -0.05;
        }
        if (0.3 <= t && t <= 0.8) {
          return glide(t, -0.05, 2, 0.3, 0.8);
        } else {
          return 2;
        }
      }
      function y(t) {
        // y-position function
        if (t < 0.19) {
          return 1;
        } else if (0.19 <= t && t <= 0.61) {
          return glide(t, 1, 2.3, 0.19, 0.61);
        } else {
          return 2.3;
        }
      }

      function z(t) {
        // z-position function
        return 0;
      }

      function rx(t) {
        // x-rotation function
        return -Math.PI / 2;
      }

      function ry(t) {
        // y-rotation function
        if (t < 0.27) {
          return 0;
        } else if (0.27 <= t && t <= 0.8) {
          return glide(t, 0, 0.7, 0.27, 0.8);
        } else {
          return 0.7;
        }
      }

      function rz(t) {
        // z-rotation function
        return Math.PI / 2;
      }

      return { x: x(t), y: y(t), z: z(t), rx: rx(t), ry: ry(t), rz: rz(t) };
    }

    // Progress Animation
    let prev_step = 0;
    let was_end = false;
    function progressAnim() {
      const ANIM_SPEED = -0.001; // Scale at which to play the animation
      const ANIM_OFFSET = 0.2; // skip a bit ahead in the animation
      const ANIM_END = 2.95;

      let t =
        document.body.getBoundingClientRect().top * ANIM_SPEED + ANIM_OFFSET;

      // If the animation is over, don't do anything
      if (t >= ANIM_END) {
        if (was_end === false) {
          t = ANIM_END;
          was_end = true;
        } else {
          return;
        }
      } else {
        was_end = false;
      }

      let difference = t - prev_step;
      prev_step = t;

      if (t < 0) {
        difference = 0; // prevent animation from going negative
      }

      // Move the camera to the new position
      let newPosition = cameraAnimation(t);
      if (newPosition === null) {
        // we don't need to animate anything new in this case
      } else {
        let { x, y, z, rx, ry, rz } = newPosition;
        camera.position.set(x, y, z);
        camera.rotation.set(rx, ry, rz);
      }

      mixer.update(difference);
      renderer.render(scene, camera);
    }

    scene_ready = true;
    tryRender();

    document.body.onscroll = progressAnim;
  }, []);

  return (
    <div>
      <canvas id="threeJsCanvas"></canvas>
    </div>
  );
}
