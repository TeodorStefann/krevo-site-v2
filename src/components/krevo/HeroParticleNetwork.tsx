"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const GOLD = new THREE.Color(0xa855f7);
const BLUE = new THREE.Color(0x7c3aed);
const COUNT = 52;
const CONNECT_DIST = 140;
const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;

export function HeroParticleNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      0.1,
      1000,
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const velocities: { vx: number; vy: number }[] = [];

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * width;
      positions[i * 3 + 1] = (Math.random() - 0.5) * height;
      positions[i * 3 + 2] = 0;

      const color = i % 2 === 0 ? GOLD : BLUE;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      velocities.push({
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      });
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    pointsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const points = new THREE.Points(
      pointsGeometry,
      new THREE.PointsMaterial({
        size: 2.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: false,
      }),
    );
    scene.add(points);

    const maxSegments = COUNT * COUNT;
    const linePositions = new Float32Array(maxSegments * 2 * 3);
    const lineColors = new Float32Array(maxSegments * 2 * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3),
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3),
    );

    const lines = new THREE.LineSegments(
      lineGeometry,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.35,
      }),
    );
    scene.add(lines);

    let animId = 0;
    const halfW = width / 2;
    const halfH = height / 2;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const pos = pointsGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        pos[ix] += velocities[i].vx;
        pos[ix + 1] += velocities[i].vy;

        if (pos[ix] < -halfW || pos[ix] > halfW) velocities[i].vx *= -1;
        if (pos[ix + 1] < -halfH || pos[ix + 1] > halfH) velocities[i].vy *= -1;
      }
      pointsGeometry.attributes.position.needsUpdate = true;

      let seg = 0;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECT_DIST_SQ) {
            const alpha = 1 - Math.sqrt(distSq) / CONNECT_DIST;
            const li = seg * 6;
            linePositions[li] = pos[i * 3];
            linePositions[li + 1] = pos[i * 3 + 1];
            linePositions[li + 2] = 0;
            linePositions[li + 3] = pos[j * 3];
            linePositions[li + 4] = pos[j * 3 + 1];
            linePositions[li + 5] = 0;

            const blend = alpha * 0.5;
            lineColors[li] = 0.79 * blend + 0.29 * blend;
            lineColors[li + 1] = 0.66 * blend + 0.62 * blend;
            lineColors[li + 2] = 0.3 * blend + 1 * blend;
            lineColors[li + 3] = lineColors[li];
            lineColors[li + 4] = lineColors[li + 1];
            lineColors[li + 5] = lineColors[li + 2];
            seg++;
          }
        }
      }

      lineGeometry.setDrawRange(0, seg * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      pointsGeometry.dispose();
      lineGeometry.dispose();
      (points.material as THREE.Material).dispose();
      (lines.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      aria-hidden="true"
    />
  );
}
