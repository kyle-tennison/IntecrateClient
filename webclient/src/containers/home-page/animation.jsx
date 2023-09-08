import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export default function BlenderAnimation() {
	useEffect(() => {

		// Setup Modeler Objects
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.001, 1000);
		const canvas = document.getElementById('threeJsCanvas')
		const renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true,
		});

		// Load Geometry
		let mixer;
		const loader = new GLTFLoader();
		loader.load('../../../public/home-animation.glb', (gltf) => { // load handler
			const model = gltf.scene
			scene.add(model)

			// Assign Materials
			model.traverse((o) => {
				if (o.isMesh){
					console.log(o)
					// Box Object
					if (o.name === 'Plane_1'){
						
						let boxTexture = new THREE.TextureLoader().load('../../../public/box-texture.png')
						boxTexture.wrapT = THREE.RepeatWrapping;
						boxTexture.wrapS = THREE.RepeatWrapping;
						boxTexture.repeat.set( 3, 3 );
						var boxMaterial = new THREE.MeshStandardMaterial({
							// color: 0x424242,
							map: boxTexture,
							roughness: 1,
						});

						boxMaterial.castShadow = true;
						boxMaterial.receiveShadow = true;

						o.material = boxMaterial
					}
					// Box-Light Object
					else if (o.name === 'Plane_2') {
						var lightMaterial = new THREE.MeshStandardMaterial({color: 0xffffff})
						lightMaterial.emissive = new THREE.Color(0xffffff)
						lightMaterial.emissiveIntensity = 1

						o.material = lightMaterial
					}
					// Floor Object
					else if (o.name === 'Floor') {


						let floorTexture = new THREE.TextureLoader().load('../../../public/wood-texture.tif')
						let floorRoughness = new THREE.TextureLoader().load('../../../public/wood-roughness.tif')
						floorTexture.wrapT = THREE.RepeatWrapping;
						floorTexture.wrapS = THREE.RepeatWrapping;
						floorTexture.repeat.set( 30, 30 );
						var floorMaterial = new THREE.MeshStandardMaterial({
							// color: 0x424242,
							map: floorTexture,
							roughnessMap: floorRoughness,
						});

						floorTexture.receiveShadow = true;
						o.material = floorMaterial
					}
				}
			})

			mixer = new THREE.AnimationMixer(model)

			const clips = gltf.animations;
			const clip = THREE.AnimationClip.findByName(clips, "ArmatureAction")
			const action = mixer.clipAction(clip)
			action.play()

			mixer.update(0)
			renderer.render(scene, camera)
		},
			((prog) => {
				if (prog.loaded == prog.total){
					console.log('done loading')
				}
			}),  // skip progress handler
			(error) => { // err handler
				console.error(error);
			});


		// Load Render Settings
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.shadowMap.enabled = true;
		document.body.appendChild(renderer.domElement)

		// Load background and lighting
		const skytexture = new THREE.TextureLoader().load('../../../public/tmpsky.jpeg')
		scene.background = skytexture
		const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1)
		scene.add(ambientLight)

		const innerLight = new THREE.PointLight(0xffffff, 1)
		scene.add(innerLight)

		const sceneLight1 = new THREE.PointLight(0xffffff, 6)
		sceneLight1.position.set(1, 5 , 2)
		sceneLight1.castShadow = true
		const sceneLight2 = new THREE.PointLight(0xffffff, 3)
		sceneLight2.position.set(-4, 3 , -2)
		sceneLight2.castShadow = true
		scene.add(sceneLight1)
		scene.add(sceneLight2)

		// Set default position
		camera.position.set(-0.05, 1, 0)
		camera.rotation.set(-3.14 / 2, 0, 3.14 / 2)

		// Camera animation path
		function cameraAnimation(t) {

			function glide(t, p0, pf, t0, tf) {
				// Smooth glide from p0 to pf from t0 to tf
				return 0.5 * (pf - p0) * (1 - Math.cos((Math.PI / (tf - t0)) * (t - t0))) + p0
			}

			// prevent backwards scrolling
			if (t <= 0) {
				return null
			}

			function x(t) {
				if (t < 0.3) {
					return -0.05
				}
				if (0.3 <= t && t <= 0.8) {
					return glide(t, -0.05, 2, 0.3, 0.8)
				}
				else {
					return 2
				}
			}
			function y(t) {
				if (t < 0.19) {
					return 1
				}
				else if (0.19 <= t && t <= 0.61) {
					return glide(t, 1, 2.3, 0.19, 0.61)
				}
				else {
					return 2.3
				}
			}

			function z(t) {
				return 0
			}

			function rx(t) {
				return -Math.PI / 2
			}

			function ry(t) {
				// rotate from 0 go ROT_ANGLE from 0.32 to 0.40
				if (t < 0.27) {
					return 0
				}
				else if (0.27 <= t && t <= 0.8) {
					return glide(t, 0, 0.7, 0.27, 0.8)
				}
				else {
					return 0.7
				}
			}

			function rz(t) {
				return Math.PI / 2
			}

			return { x: x(t), y: y(t), z: z(t), rx: rx(t), ry: ry(t), rz: rz(t) }
		}

		// Progress Animation
		let prev_step = 0
		let was_end = false
		function progressAnim() {

			const ANIM_SPEED = -0.001 // Scale at which to play the animation
			const ANIM_OFFSET = 0.2 // skip a bit ahead in the animation
			const ANIM_END = 2.95

			let t = (document.body.getBoundingClientRect().top) * ANIM_SPEED + ANIM_OFFSET

			// If the animation is over, don't do anything
			if (t >= ANIM_END) {
				// if it just now ended, display the last frame
				if (was_end === false) {
					t = ANIM_END
					console.log('displaying last frame')
					was_end = true
				}
				else {
					console.log('animation over')
					return
				}
			}
			else {
				was_end = false
			}

			let difference = (t - prev_step)
			// console.log(`Difference is: ${difference}`)
			prev_step = t
			// console.log(`step: ${t}`)

			if (t < 0) {
				difference = 0 // prevent animation from going negative1
			}

			// Move the camera to the new position
			let newPosition = cameraAnimation(t)
			if (newPosition === null) {
				// we don't need to animate anything new in this case
			}
			else {
				let { x, y, z, rx, ry, rz } = newPosition
				// console.log(`Moving camera to (${x}, ${y}, ${z}) (${rx}, ${ry}, ${rz})`)
				camera.position.set(x, y, z)
				camera.rotation.set(rx, ry, rz)
			}



			mixer.update(difference)
			renderer.render(scene, camera)
		}

		document.body.onscroll = progressAnim
	}, [])

	return (
		<div>
			<canvas id="threeJsCanvas"></canvas>
		</div>
	)
}