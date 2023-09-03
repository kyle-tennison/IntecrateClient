import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function BlenderAnimation(){
	useEffect(() => {

		// Setup Modeler Objects
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		const canvas = document.getElementById('threeJsCanvas')
		const renderer = new THREE.WebGLRenderer({
			canvas: canvas, 
			antialias: true,
		});

		// Load Geometry
		let mixer;
		const loader = new GLTFLoader(); 
		loader.load('../../../public/home-animation.glb', ( gltf ) => { // load handler
			const model = gltf.scene
			scene.add(model)
			mixer = new THREE.AnimationMixer(model)
			const clips = gltf.animations;
			console.log(clips)
			const clip = THREE.AnimationClip.findByName(clips, "ArmatureAction")
			const action = mixer.clipAction(clip)
			action.play()

		}, 
		undefined,  // skip progress handler
		( error ) => { // err handler
			console.error( error ); 
		} );

		// Load Render Settings
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setPixelRatio(window.devicePixelRatio)
		document.body.appendChild(renderer.domElement)


		// Load background and lighting
		const skytexture = new THREE.TextureLoader().load('../../../public/tmpsky.jpeg')
		scene.background = skytexture

		const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1)
		scene.add(ambientLight)

		camera.position.set(0, 5, 0)
		camera.rotation.set(-3.14/2, 0, 0)


		const clock = new THREE.Clock()
		const animate = () => {

			if (mixer===undefined){
				console.log('mixer undefined')
			}

			else {
				mixer.update(clock.getDelta())
			}


			renderer.render(scene, camera)
			window.requestAnimationFrame(animate)
		};
		animate()

	}, [])

	return (
		<div>
			<canvas id="threeJsCanvas"></canvas>
		</div>
	)
}