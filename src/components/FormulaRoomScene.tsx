import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CatCharacter } from './CatModel';
import { FormulaTextureGenerator } from './FormulaRoomTextures';
import { catSounds } from '../sound';
import { CatActionState, CameraViewPreset, RoomTheme, FormulaPoint } from '../types';
import { FORMULA_POINTS, CAT_THOUGHTS } from '../data';

interface FormulaRoomSceneProps {
  theme: RoomTheme;
  cameraPreset: CameraViewPreset;
  onSelectPoint?: (point: FormulaPoint) => void;
  onCatThoughtChange?: (thought: string) => void;
  onCatStateChange?: (state: CatActionState) => void;
}

export const FormulaRoomScene: React.FC<FormulaRoomSceneProps> = ({
  theme,
  cameraPreset,
  onSelectPoint,
  onCatThoughtChange,
  onCatStateChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Ссылки Three.js
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const catRef = useRef<CatCharacter | null>(null);

  // Камера: цель взгляда и сферические координаты
  // Исходно: смотрим со стороны комнаты прямо на спину кота в угол (как на фото)
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0.35, 0.42, 0.35));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0.35, 0.42, 0.35));
  const camSpherical = useRef<{ radius: number; theta: number; phi: number }>({
    radius: 1.55,
    theta: Math.PI / 4, // 45 градусов: точно по диагонали угла из комнаты
    phi: Math.PI / 2.5  // легкий наклон сверху вниз
  });

  // Управление мышью и жестами
  const isRotating = useRef(false);
  const isPanning = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const panOffset = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Маркер клика на полу
  const clickTargetMarker = useRef<THREE.Mesh | null>(null);

  // Материалы для смены темы
  const leftWallMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const rightWallMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const floorMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // Источники света
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const mainDirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const warmFillLightRef = useRef<THREE.PointLight | null>(null);

  // Частицы пылинок / озарений
  const particlesRef = useRef<THREE.Points | null>(null);

  // Обновление мыслей кота по таймеру
  useEffect(() => {
    const interval = setInterval(() => {
      const randomThought = CAT_THOUGHTS[Math.floor(Math.random() * CAT_THOUGHTS.length)];
      if (onCatThoughtChange) onCatThoughtChange(randomThought);
    }, 9000);
    return () => clearInterval(interval);
  }, [onCatThoughtChange]);

  // Реакция на пресеты камеры
  useEffect(() => {
    if (cameraPreset === 'corner_meme') {
      // ТОЧНЫЙ РАКУРС ИЗ ФОТО В УГОЛ!
      camSpherical.current.radius = 1.55;
      camSpherical.current.theta = Math.PI / 4;
      camSpherical.current.phi = Math.PI / 2.5;
      targetLookAt.current.set(0.35, 0.42, 0.35);
      panOffset.current.set(0, 0, 0);
      if (catRef.current) {
        catRef.current.sendToCorner();
      }
    } else if (cameraPreset === 'follow_cat') {
      camSpherical.current.radius = 1.85;
      camSpherical.current.phi = Math.PI / 2.6;
    } else if (cameraPreset === 'room_wide') {
      camSpherical.current.radius = 4.2;
      camSpherical.current.theta = Math.PI / 4;
      camSpherical.current.phi = Math.PI / 3.0;
      targetLookAt.current.set(1.5, 0.8, 1.5);
    } else if (cameraPreset === 'wall_left') {
      camSpherical.current.radius = 2.0;
      camSpherical.current.theta = Math.PI / 2.2;
      camSpherical.current.phi = Math.PI / 2.3;
      targetLookAt.current.set(0.1, 1.2, 1.6);
    } else if (cameraPreset === 'wall_right') {
      camSpherical.current.radius = 2.0;
      camSpherical.current.theta = 0.1;
      camSpherical.current.phi = Math.PI / 2.3;
      targetLookAt.current.set(1.6, 1.2, 0.1);
    }
  }, [cameraPreset]);

  // Смена темы и освещения
  useEffect(() => {
    if (!leftWallMatRef.current || !rightWallMatRef.current || !floorMatRef.current) return;

    const leftTex = FormulaTextureGenerator.createLeftWallTexture(theme);
    const rightTex = FormulaTextureGenerator.createRightWallTexture(theme);
    const floorTex = FormulaTextureGenerator.createFloorTexture(theme);

    leftWallMatRef.current.map = leftTex;
    leftWallMatRef.current.needsUpdate = true;

    rightWallMatRef.current.map = rightTex;
    rightWallMatRef.current.needsUpdate = true;

    floorMatRef.current.map = floorTex;
    floorMatRef.current.needsUpdate = true;

    if (theme === 'classic_paper') {
      if (ambientLightRef.current) {
        ambientLightRef.current.color.setHex(0xf8fafc);
        ambientLightRef.current.intensity = 1.4;
      }
      if (mainDirLightRef.current) {
        mainDirLightRef.current.color.setHex(0xfffbeb);
        mainDirLightRef.current.intensity = 1.6;
      }
      if (warmFillLightRef.current) {
        warmFillLightRef.current.intensity = 0.4;
      }
      if (sceneRef.current) {
        sceneRef.current.background = new THREE.Color(0xf6f5ef);
      }
    } else if (theme === 'warm') {
      if (ambientLightRef.current) {
        ambientLightRef.current.color.setHex(0xfef3c7);
        ambientLightRef.current.intensity = 1.3;
      }
      if (mainDirLightRef.current) {
        mainDirLightRef.current.color.setHex(0xfde68a);
        mainDirLightRef.current.intensity = 1.7;
      }
      if (warmFillLightRef.current) {
        warmFillLightRef.current.intensity = 0.8;
      }
      if (sceneRef.current) {
        sceneRef.current.background = new THREE.Color(0xf7f0dd);
      }
    } else if (theme === 'dark_chalk') {
      if (ambientLightRef.current) {
        ambientLightRef.current.color.setHex(0x334155);
        ambientLightRef.current.intensity = 0.8;
      }
      if (mainDirLightRef.current) {
        mainDirLightRef.current.color.setHex(0xe2e8f0);
        mainDirLightRef.current.intensity = 1.4;
      }
      if (warmFillLightRef.current) {
        warmFillLightRef.current.intensity = 0.6;
      }
      if (sceneRef.current) {
        sceneRef.current.background = new THREE.Color(0x18181b);
      }
    } else {
      // neon_glow
      if (ambientLightRef.current) {
        ambientLightRef.current.color.setHex(0x0f172a);
        ambientLightRef.current.intensity = 0.6;
      }
      if (mainDirLightRef.current) {
        mainDirLightRef.current.color.setHex(0x38bdf8);
        mainDirLightRef.current.intensity = 1.2;
      }
      if (warmFillLightRef.current) {
        warmFillLightRef.current.intensity = 1.8;
        warmFillLightRef.current.color.setHex(0xa855f7);
      }
      if (sceneRef.current) {
        sceneRef.current.background = new THREE.Color(0x070a12);
      }
    }
  }, [theme]);

  // Главная инициализация сцены
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth || 800;
    const height = container.clientHeight || window.innerHeight || 600;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f5ef);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Освещение
    const ambientLight = new THREE.AmbientLight(0xf8fafc, 1.4);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    // Основной свет со стороны комнаты в угол
    const mainDirLight = new THREE.DirectionalLight(0xfffbeb, 1.6);
    mainDirLight.position.set(4.0, 5.0, 4.0);
    mainDirLight.target.position.set(0.5, 0.5, 0.5);
    scene.add(mainDirLight.target);
    mainDirLight.castShadow = true;
    mainDirLight.shadow.mapSize.width = 2048;
    mainDirLight.shadow.mapSize.height = 2048;
    mainDirLight.shadow.bias = -0.0001;
    mainDirLight.shadow.camera.near = 0.5;
    mainDirLight.shadow.camera.far = 15;
    mainDirLight.shadow.camera.left = -3;
    mainDirLight.shadow.camera.right = 3;
    mainDirLight.shadow.camera.top = 3;
    mainDirLight.shadow.camera.bottom = -3;
    scene.add(mainDirLight);
    mainDirLightRef.current = mainDirLight;

    // Мягкий заполняющий свет
    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.5);
    fillLight.position.set(-2, 3, 3);
    scene.add(fillLight);

    const warmFill = new THREE.PointLight(0xf59e0b, 0.5, 8.0);
    warmFill.position.set(2.0, 2.0, 2.0);
    scene.add(warmFill);
    warmFillLightRef.current = warmFill;

    // 5. Построение стен комнаты (УГОЛ В ТОЧКЕ 0, 0, 0!)
    const wallLength = 4.2;
    const wallHeight = 3.2;

    const leftTex = FormulaTextureGenerator.createLeftWallTexture(theme);
    const rightTex = FormulaTextureGenerator.createRightWallTexture(theme);
    const floorTex = FormulaTextureGenerator.createFloorTexture(theme);

    // Левая стена: плоскость x = 0, идет по Z от 0 до wallLength
    const leftWallGeo = new THREE.PlaneGeometry(wallLength, wallHeight);
    const leftWallMat = new THREE.MeshStandardMaterial({
      map: leftTex,
      roughness: 0.85,
      metalness: 0.05,
      side: THREE.DoubleSide
    });
    leftWallMatRef.current = leftWallMat;

    const leftWall = new THREE.Mesh(leftWallGeo, leftWallMat);
    leftWall.position.set(0, wallHeight / 2, wallLength / 2);
    leftWall.rotation.y = Math.PI / 2; // нормаль смотрит в +X
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Правая стена: плоскость z = 0, идет по X от 0 до wallLength
    const rightWallGeo = new THREE.PlaneGeometry(wallLength, wallHeight);
    const rightWallMat = new THREE.MeshStandardMaterial({
      map: rightTex,
      roughness: 0.85,
      metalness: 0.05,
      side: THREE.DoubleSide
    });
    rightWallMatRef.current = rightWallMat;

    const rightWall = new THREE.Mesh(rightWallGeo, rightWallMat);
    rightWall.position.set(wallLength / 2, wallHeight / 2, 0);
    rightWall.rotation.y = 0; // нормаль смотрит в +Z
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // Пол: плоскость y = 0, от (0,0) до (wallLength, wallLength)
    const floorGeo = new THREE.PlaneGeometry(wallLength, wallLength);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTex,
      roughness: 0.9,
      metalness: 0.05,
      side: THREE.DoubleSide
    });
    floorMatRef.current = floorMat;

    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(wallLength / 2, 0, wallLength / 2);
    floor.rotation.x = -Math.PI / 2; // нормаль смотрит в +Y
    floor.receiveShadow = true;
    scene.add(floor);

    // Вертикальная линия стыка стен в углу
    const cornerLineGeo = new THREE.CylinderGeometry(0.012, 0.012, wallHeight, 12);
    const cornerLineMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.8
    });
    const cornerLine = new THREE.Mesh(cornerLineGeo, cornerLineMat);
    cornerLine.position.set(0.008, wallHeight / 2, 0.008);
    scene.add(cornerLine);

    // 6. Создаем черного кота
    const cat = new CatCharacter();
    cat.onStep = () => {
      catSounds.playPawStep();
    };
    scene.add(cat.group);
    catRef.current = cat;

    // 7. Световой маркер клика на полу
    const markerGeo = new THREE.RingGeometry(0.05, 0.08, 32);
    const markerMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0
    });
    const clickMarker = new THREE.Mesh(markerGeo, markerMat);
    clickMarker.rotation.x = -Math.PI / 2;
    clickMarker.position.set(0, 0.005, 0);
    scene.add(clickMarker);
    clickTargetMarker.current = clickMarker;

    // 8. Частицы озарения в воздухе
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = 0.2 + Math.random() * (wallLength - 0.4);
      particlePositions[i + 1] = 0.2 + Math.random() * 2.2;
      particlePositions[i + 2] = 0.2 + Math.random() * (wallLength - 0.4);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.024,
      transparent: true,
      opacity: 0.55
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 9. Взаимодействие с мышью и жестами
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let mouseDownPos = { x: 0, y: 0 };
    let mouseDownTime = 0;

    const onMouseDown = (e: MouseEvent) => {
      mouseDownPos = { x: e.clientX, y: e.clientY };
      mouseDownTime = Date.now();
      prevMouse.current = { x: e.clientX, y: e.clientY };

      if (e.button === 0) {
        isRotating.current = true;
      } else if (e.button === 2) {
        isPanning.current = true;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;
      prevMouse.current = { x: e.clientX, y: e.clientY };

      if (isRotating.current) {
        camSpherical.current.theta += dx * 0.006;
        camSpherical.current.phi = Math.max(
          0.15,
          Math.min(Math.PI / 2 + 0.05, camSpherical.current.phi - dy * 0.005)
        );
      } else if (isPanning.current) {
        const panSpeed = 0.002 * camSpherical.current.radius;
        const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
        const up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);

        panOffset.current.addScaledVector(right, -dx * panSpeed);
        panOffset.current.addScaledVector(up, dy * panSpeed);
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      const dist = Math.hypot(e.clientX - mouseDownPos.x, e.clientY - mouseDownPos.y);
      const duration = Date.now() - mouseDownTime;

      if (dist < 6 && duration < 350 && e.button === 0) {
        const rect = container.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        // Клик по коту — погладить
        if (catRef.current) {
          const catHits = raycaster.intersectObject(catRef.current.group, true);
          if (catHits.length > 0) {
            catRef.current.petCat();
            catSounds.playMeow();
            catSounds.playPurr(2.5);
            return;
          }
        }

        // Клик по полу — направить кота исследовать формулы
        const floorHits = raycaster.intersectObject(floor);
        if (floorHits.length > 0) {
          const hitPoint = floorHits[0].point;

          // Ограничиваем пределы комнаты
          hitPoint.x = Math.max(0.45, Math.min(wallLength - 0.45, hitPoint.x));
          hitPoint.z = Math.max(0.45, Math.min(wallLength - 0.45, hitPoint.z));

          if (clickMarker) {
            clickMarker.position.copy(hitPoint);
            clickMarker.position.y = 0.006;
            (clickMarker.material as THREE.MeshBasicMaterial).opacity = 0.95;
          }

          catSounds.playChalkScritch();

          if (catRef.current) {
            catRef.current.walkTo(hitPoint);
            if (onCatStateChange) onCatStateChange('walking');
          }
        }
      }

      isRotating.current = false;
      isPanning.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.0015;
      camSpherical.current.radius = Math.max(
        0.6,
        Math.min(6.5, camSpherical.current.radius + zoomDelta * camSpherical.current.radius)
      );
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Сенсорные жесты для мобильных
    let touchStartDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        isRotating.current = true;
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isRotating.current) {
        const dx = e.touches[0].clientX - prevMouse.current.x;
        const dy = e.touches[0].clientY - prevMouse.current.y;
        prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        camSpherical.current.theta += dx * 0.006;
        camSpherical.current.phi = Math.max(
          0.15,
          Math.min(Math.PI / 2 + 0.05, camSpherical.current.phi - dy * 0.005)
        );
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = dist > touchStartDist ? 0.96 : 1.04;
        touchStartDist = dist;
        camSpherical.current.radius = Math.max(
          0.6,
          Math.min(6.5, camSpherical.current.radius * factor)
        );
      }
    };

    const onTouchEnd = () => {
      isRotating.current = false;
      isPanning.current = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('contextmenu', onContextMenu);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd);

    // Автоматический ресайз
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);
    window.addEventListener('resize', handleResize);

    // 10. Анимационный цикл
    let reqId = 0;
    let prevTime = performance.now();

    const animate = (time: number) => {
      reqId = requestAnimationFrame(animate);

      const delta = Math.min(0.1, (time - prevTime) / 1000);
      prevTime = time;
      const elapsed = time * 0.001;

      // Обновление кота
      if (cat) {
        cat.update(delta, elapsed);
      }

      // Затухание метки
      if (clickMarker && (clickMarker.material as THREE.MeshBasicMaterial).opacity > 0) {
        (clickMarker.material as THREE.MeshBasicMaterial).opacity -= delta * 0.8;
      }

      // Парение пылинок
      if (particles) {
        particles.rotation.y = elapsed * 0.03;
      }

      // Камера
      if (cameraPreset === 'follow_cat' && cat) {
        targetLookAt.current.lerp(
          new THREE.Vector3(cat.group.position.x, 0.42, cat.group.position.z),
          delta * 3.5
        );
      }

      currentLookAt.current.lerp(
        new THREE.Vector3().addVectors(targetLookAt.current, panOffset.current),
        delta * 6
      );

      const r = camSpherical.current.radius;
      const t = camSpherical.current.theta;
      const p = camSpherical.current.phi;

      const cx = currentLookAt.current.x + r * Math.sin(p) * Math.sin(t);
      const cy = currentLookAt.current.y + r * Math.cos(p);
      const cz = currentLookAt.current.z + r * Math.sin(p) * Math.cos(t);

      camera.position.set(cx, cy, cz);
      camera.lookAt(currentLookAt.current);

      renderer.render(scene, camera);
    };

    reqId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(reqId);
      ro.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('contextmenu', onContextMenu);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none cursor-grab active:cursor-grabbing touch-none"
    />
  );
};
