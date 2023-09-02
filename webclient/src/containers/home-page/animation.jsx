import * as THREE from 'three';


import { useEffect } from 'react';

export default function BlenderAnimation(){
	useEffect(() => {
		console.log('testing')

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

		const canvas = document.getElementById('threeJsCanvas')

		const renderer = new THREE.WebGLRenderer({
			canvas: canvas, 
			antialias: true,
		});

		renderer.setSize( window.innerWidth, window.innerHeight );
		// renderer.setPixelRatio(window.devicePixelRatio)
		document.body.appendChild(renderer.domElement)

		const animate = () => {
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