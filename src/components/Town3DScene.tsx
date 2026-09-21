import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TownEnvironment } from './TownEnvironment';
import { TownCharacterAgent } from './TownCharacters';
import { TimeOfDay, CameraMode, CharacterId, CharacterDialogue, ActiveSpeechBubble } from '../types';
import { TOWN_POIS, CONVERSATIONS, IDLE_THOUGHTS, CHARACTER_PROFILES } from '../data';
import { townSounds } from '../sound';

interface Town3DSceneProps {
  timeOfDay: TimeOfDay;
  cameraMode: CameraMode;
  onCharacterClick?: (id: CharacterId) => void;
  onSpeechBubble?: (speech: ActiveSpeechBubble) => void;
  gatherAllTrigger?: number;
}

export const Town3DScene: React.FC<Town3DSceneProps> = ({
  timeOfDay,
  cameraMode,
  onCharacterClick,
  onSpeechBubble,
  gatherAllTrigger
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Ссылки Three.js
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const townEnvRef = useRef<TownEnvironment | null>(null);
  const charactersRef = useRef<Map<CharacterId, TownCharacterAgent>>(new Map());

  // Камера: сферические координаты и цель
  const camTarget = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.8, 0));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.8, 0));
  const camSpherical = useRef<{ radius: number; theta: number; phi: number }>({
    radius: 12.0,
    theta: Math.PI / 4,
    phi: Math.PI / 3.2
  });

  // Управление мышью и жестами
  const isRotating = useRef(false);
  const isPanning = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const panOffset = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Освещение
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);

  // Световой маркер клика
  const clickMarkerRef = useRef<THREE.Mesh | null>(null);

  // Состояние диалогов
  const isConversingRef = useRef(false);
  const conversationCooldownRef = useRef(2.5);

  // Сбор всех 7 жителей на площади при изменении gatherAllTrigger
  useEffect(() => {
    if (!gatherAllTrigger) return;

    townSounds.playTownBell();

    const gatheringTargets: Record<CharacterId, [number, number]> = {
      red_ai: [-1.4, -0.6],
      fly_immortal: [0, -1.6],
      pink_node: [1.4, -0.6],
      blue_quantum: [1.2, 1.0],
      green_sprout: [-0.6, 1.4],
      golden_coin: [0.6, 1.4],
      white_cloud: [-1.2, 1.0]
    };

    charactersRef.current.forEach((char, id) => {
      const target = gatheringTargets[id];
      if (target) {
        char.targetPosition.set(target[0], 0, target[1]);
        char.wanderTimer = 22.0;
        char.currentAction = 'walking';
      }
    });

    // Запускаем общий праздничный диалог через 3.2 секунды
    setTimeout(() => {
      const trioConv = CONVERSATIONS.find((c) => c.id === 'trio_gathering');
      if (trioConv && onSpeechBubble) {
        charactersRef.current.forEach((char) => char.jumpWithJoy());
        playConversationSequence(trioConv.lines);
      }
    }, 3200);
  }, [gatherAllTrigger]);

  // Воспроизведение цепочки реплик
  const playConversationSequence = (lines: CharacterDialogue[]) => {
    isConversingRef.current = true;
    let lineIdx = 0;

    const showNext = () => {
      if (lineIdx >= lines.length) {
        isConversingRef.current = false;
        conversationCooldownRef.current = 8.0;
        charactersRef.current.forEach((c) => {
          if (c.currentAction === 'talking') c.currentAction = 'idle';
        });
        return;
      }

      const line = lines[lineIdx];
      const speaker = charactersRef.current.get(line.speakerId);
      if (speaker) {
        speaker.currentAction = 'talking';
        townSounds.playVoice(line.speakerId);
      }

      if (onSpeechBubble) {
        onSpeechBubble({
          speakerId: line.speakerId,
          textZh: line.textZh
        });
      }

      lineIdx++;
      setTimeout(showNext, 3500);
    };

    showNext();
  };

  // Реакция на смену режима камеры
  useEffect(() => {
    if (cameraMode === 'square_overview') {
      camSpherical.current.radius = 12.5;
      camSpherical.current.theta = Math.PI / 4;
      camSpherical.current.phi = Math.PI / 3.4;
      camTarget.current.set(0, 0.8, 0);
      panOffset.current.set(0, 0, 0);
    } else {
      camSpherical.current.radius = 4.2;
      camSpherical.current.phi = Math.PI / 3.1;
    }
  }, [cameraMode]);

  // Реакция на смену времени суток
  useEffect(() => {
    const scene = sceneRef.current;
    const dirLight = dirLightRef.current;
    const hemiLight = hemiLightRef.current;
    const env = townEnvRef.current;
    if (!scene || !dirLight || !hemiLight) return;

    if (timeOfDay === 'day') {
      scene.background = new THREE.Color(0xbae6fd);
      scene.fog = new THREE.FogExp2(0xbae6fd, 0.016);

      dirLight.color.setHex(0xfffbeb);
      dirLight.intensity = 1.8;
      dirLight.position.set(8, 12, 8);

      hemiLight.color.setHex(0xe0f2fe);
      hemiLight.groundColor.setHex(0xbbf7d0);
      hemiLight.intensity = 1.2;

      if (env) {
        env.streetLights.forEach((l) => (l.intensity = 0));
        env.windowMeshes.forEach((w) => {
          (w.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.1;
        });
      }
    } else if (timeOfDay === 'sunset') {
      scene.background = new THREE.Color(0xfde047);
      scene.fog = new THREE.FogExp2(0xfbcfe8, 0.022);

      dirLight.color.setHex(0xf97316);
      dirLight.intensity = 1.5;
      dirLight.position.set(12, 6, 6);

      hemiLight.color.setHex(0xfef08a);
      hemiLight.groundColor.setHex(0x9333ea);
      hemiLight.intensity = 1.0;

      if (env) {
        env.streetLights.forEach((l) => (l.intensity = 0.9));
        env.windowMeshes.forEach((w) => {
          (w.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6;
        });
      }
    } else {
      // night
      scene.background = new THREE.Color(0x0f172a);
      scene.fog = new THREE.FogExp2(0x0f172a, 0.025);

      dirLight.color.setHex(0x38bdf8);
      dirLight.intensity = 0.5;
      dirLight.position.set(-6, 10, -6);

      hemiLight.color.setHex(0x1e1b4b);
      hemiLight.groundColor.setHex(0x020617);
      hemiLight.intensity = 0.6;

      if (env) {
        env.streetLights.forEach((l) => (l.intensity = 1.8));
        env.windowMeshes.forEach((w) => {
          (w.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.2;
        });
      }
    }
  }, [timeOfDay]);

  // Главная инициализация сцены
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth || 800;
    const height = container.clientHeight || window.innerHeight || 600;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbae6fd);
    scene.fog = new THREE.FogExp2(0xbae6fd, 0.016);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    cameraRef.current = camera;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Освещение
    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0xbbf7d0, 1.2);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const dirLight = new THREE.DirectionalLight(0xfffbeb, 1.8);
    dirLight.position.set(8, 14, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 35;
    dirLight.shadow.camera.left = -12;
    dirLight.shadow.camera.right = 12;
    dirLight.shadow.camera.top = 12;
    dirLight.shadow.camera.bottom = -12;
    dirLight.shadow.bias = -0.0002;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // 4. Построение городка
    const townEnv = new TownEnvironment();
    scene.add(townEnv.group);
    townEnvRef.current = townEnv;

    // 5. Создание 7 персонажей городка
    // 1) 小AI: начинает у лаборатории
    const redAi = new TownCharacterAgent('red_ai', 3.5, -3.2);
    redAi.onStepSound = () => townSounds.playStep(0.9);
    scene.add(redAi.group);
    charactersRef.current.set('red_ai', redAi);

    // 2) 永生苍蝇: начинает у часовой башни
    const fly = new TownCharacterAgent('fly_immortal', -3.2, 3.6);
    fly.onStepSound = () => townSounds.playStep(1.3);
    fly.onWingFlapSound = () => townSounds.playFlyFlap();
    scene.add(fly.group);
    charactersRef.current.set('fly_immortal', fly);

    // 3) 粉色节点: начинает у пекарни
    const pinkNode = new TownCharacterAgent('pink_node', 3.4, 3.0);
    pinkNode.onStepSound = () => townSounds.playStep(1.1);
    scene.add(pinkNode.group);
    charactersRef.current.set('pink_node', pinkNode);

    // 4) 量子小蓝: начинает у центрального фонтана
    const blueQuantum = new TownCharacterAgent('blue_quantum', 0.8, -1.2);
    blueQuantum.onStepSound = () => townSounds.playStep(1.2);
    scene.add(blueQuantum.group);
    charactersRef.current.set('blue_quantum', blueQuantum);

    // 5) 萌芽园丁: начинает в цветочном сквере у клумбы
    const greenSprout = new TownCharacterAgent('green_sprout', -1.6, 4.0);
    greenSprout.onStepSound = () => townSounds.playStep(1.15);
    scene.add(greenSprout.group);
    charactersRef.current.set('green_sprout', greenSprout);

    // 6) 金灿灿: начинает у фонтана (с монеткой)
    const goldenCoin = new TownCharacterAgent('golden_coin', 1.5, 0.5);
    goldenCoin.onStepSound = () => townSounds.playStep(1.35);
    scene.add(goldenCoin.group);
    charactersRef.current.set('golden_coin', goldenCoin);

    // 7) 云朵大厨: начинает у входа в кафе
    const whiteCloud = new TownCharacterAgent('white_cloud', -4.0, -3.2);
    whiteCloud.onStepSound = () => townSounds.playStep(0.85);
    scene.add(whiteCloud.group);
    charactersRef.current.set('white_cloud', whiteCloud);

    // 6. Световой маркер клика
    const markerGeo = new THREE.RingGeometry(0.18, 0.28, 32);
    const markerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0
    });
    const clickMarker = new THREE.Mesh(markerGeo, markerMat);
    clickMarker.rotation.x = -Math.PI / 2;
    clickMarker.position.set(0, 0.03, 0);
    scene.add(clickMarker);
    clickMarkerRef.current = clickMarker;

    // 7. Raycaster и обработка мыши / тач
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let mouseDownPos = { x: 0, y: 0 };
    let mouseDownTime = 0;

    const onMouseDown = (e: MouseEvent) => {
      mouseDownPos = { x: e.clientX, y: e.clientY };
      mouseDownTime = Date.now();
      prevMouse.current = { x: e.clientX, y: e.clientY };

      if (e.button === 0) isRotating.current = true;
      else if (e.button === 2) isPanning.current = true;
    };

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;
      prevMouse.current = { x: e.clientX, y: e.clientY };

      if (isRotating.current) {
        camSpherical.current.theta += dx * 0.005;
        camSpherical.current.phi = Math.max(
          0.15,
          Math.min(Math.PI / 2 - 0.05, camSpherical.current.phi - dy * 0.004)
        );
      } else if (isPanning.current) {
        const panSpeed = 0.003 * camSpherical.current.radius;
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

        // Проверяем клик по персонажу
        let clickedChar: TownCharacterAgent | null = null;
        for (const [, char] of charactersRef.current) {
          const hits = raycaster.intersectObject(char.group, true);
          if (hits.length > 0) {
            clickedChar = char;
            break;
          }
        }

        if (clickedChar) {
          clickedChar.jumpWithJoy();
          townSounds.playBoing();
          townSounds.playVoice(clickedChar.id);

          if (onCharacterClick) {
            onCharacterClick(clickedChar.id);
          }

          // Выдаем случайную мысль персонажа
          const thoughts = IDLE_THOUGHTS[clickedChar.id];
          if (thoughts && onSpeechBubble) {
            const t = thoughts[Math.floor(Math.random() * thoughts.length)];
            onSpeechBubble({
              speakerId: clickedChar.id,
              textZh: t
            });
          }
          return;
        }

        // Проверяем клик по земле городка
        const groundHits = raycaster.intersectObjects(scene.children, true);
        const groundHit = groundHits.find(
          (h) => h.point.y < 0.2 && Math.hypot(h.point.x, h.point.z) < 13
        );

        if (groundHit) {
          const pt = groundHit.point;
          if (clickMarker) {
            clickMarker.position.set(pt.x, 0.03, pt.z);
            (clickMarker.material as THREE.MeshBasicMaterial).opacity = 0.9;
          }
          townSounds.playStep(1.5);

          // Отправляем ближайшего персонажа к точке клика
          let closestChar: TownCharacterAgent | null = null;
          let minDist = 999;
          charactersRef.current.forEach((char) => {
            const d = char.position.distanceTo(pt);
            if (d < minDist) {
              minDist = d;
              closestChar = char;
            }
          });

          if (closestChar) {
            (closestChar as TownCharacterAgent).targetPosition.set(pt.x, 0, pt.z);
            (closestChar as TownCharacterAgent).wanderTimer = 10.0;
            (closestChar as TownCharacterAgent).currentAction = 'walking';
          }
        }
      }

      isRotating.current = false;
      isPanning.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.0012;
      camSpherical.current.radius = Math.max(
        2.5,
        Math.min(24.0, camSpherical.current.radius + zoomDelta * camSpherical.current.radius)
      );
    };

    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('contextmenu', onContextMenu);

    // Resize
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

    // 8. Анимационный цикл и автономное расписание дел жителей
    let reqId = 0;
    let prevTime = performance.now();

    const animate = (time: number) => {
      reqId = requestAnimationFrame(animate);
      const delta = Math.min(0.1, (time - prevTime) / 1000);
      prevTime = time;
      const elapsed = time * 0.001;

      // Фонтан
      if (townEnv) {
        townEnv.updateFountain(delta);
      }

      // Маркер клика
      if (clickMarker && (clickMarker.material as THREE.MeshBasicMaterial).opacity > 0) {
        (clickMarker.material as THREE.MeshBasicMaterial).opacity -= delta * 0.7;
      }

      // Обновление каждого персонажа и их повседневных дел
      charactersRef.current.forEach((char) => {
        char.update(delta, elapsed);

        // Когда таймер блуждания истек и персонаж не в диалоге — назначаем новое дело
        if (char.wanderTimer <= 0 && char.currentAction !== 'talking') {
          char.wanderTimer = 9.0 + Math.random() * 8.0;

          // Персонажи имеют свои предпочтительные рабочие места и занятия:
          let targetPoi: (typeof TOWN_POIS)[0];

          if (char.id === 'green_sprout' && Math.random() < 0.65) {
            targetPoi = TOWN_POIS.find((p) => p.id === 'flower_garden') || TOWN_POIS[0];
          } else if (char.id === 'white_cloud' && Math.random() < 0.65) {
            targetPoi = TOWN_POIS.find((p) => p.id === 'cafe') || TOWN_POIS[0];
          } else if (char.id === 'pink_node' && Math.random() < 0.6) {
            targetPoi = TOWN_POIS.find((p) => p.id === 'bakery') || TOWN_POIS[0];
          } else if (char.id === 'red_ai' && Math.random() < 0.6) {
            targetPoi = TOWN_POIS.find((p) => p.id === 'lab') || TOWN_POIS[0];
          } else if (char.id === 'golden_coin' && Math.random() < 0.65) {
            targetPoi = TOWN_POIS.find((p) => p.id === 'fountain') || TOWN_POIS[0];
          } else if (char.id === 'fly_immortal' && Math.random() < 0.55) {
            targetPoi = TOWN_POIS.find((p) => p.id === 'clock_tower') || TOWN_POIS[0];
          } else {
            // Случайная прогулка
            targetPoi = TOWN_POIS[Math.floor(Math.random() * TOWN_POIS.length)];
          }

          const jitterX = (Math.random() - 0.5) * 1.8;
          const jitterZ = (Math.random() - 0.5) * 1.8;
          char.targetPosition.set(targetPoi.position[0] + jitterX, 0, targetPoi.position[2] + jitterZ);
          char.workTimer = 5.0 + Math.random() * 5.0; // время работы по прибытии
        }
      });

      // ИИ автономного общения при сближении персонажей
      conversationCooldownRef.current -= delta;
      if (!isConversingRef.current && conversationCooldownRef.current <= 0) {
        const charList = Array.from(charactersRef.current.values());

        for (let i = 0; i < charList.length; i++) {
          for (let j = i + 1; j < charList.length; j++) {
            const c1 = charList[i];
            const c2 = charList[j];
            const dist = c1.position.distanceTo(c2.position);

            if (dist < 1.6 && c1.currentAction !== 'talking' && c2.currentAction !== 'talking') {
              const matchingConv = CONVERSATIONS.find(
                (conv) =>
                  conv.participants.includes(c1.id) &&
                  conv.participants.includes(c2.id) &&
                  conv.participants.length === 2
              );

              if (matchingConv) {
                const angle1 = Math.atan2(c2.position.x - c1.position.x, c2.position.z - c1.position.z);
                const angle2 = Math.atan2(c1.position.x - c2.position.x, c1.position.z - c2.position.z);
                c1.rotationY = angle1;
                c2.rotationY = angle2;
                c1.group.rotation.y = angle1;
                c2.group.rotation.y = angle2;

                c1.currentAction = 'talking';
                c2.currentAction = 'talking';

                playConversationSequence(matchingConv.lines);
                break;
              }
            }
          }
          if (isConversingRef.current) break;
        }
      }

      // Камера слежения за выбранным персонажем
      if (cameraMode !== 'square_overview') {
        const followIdMap: Record<CameraMode, CharacterId | null> = {
          square_overview: null,
          follow_red_ai: 'red_ai',
          follow_fly: 'fly_immortal',
          follow_pink_node: 'pink_node',
          follow_blue_quantum: 'blue_quantum',
          follow_green_sprout: 'green_sprout',
          follow_golden_coin: 'golden_coin',
          follow_white_cloud: 'white_cloud'
        };

        const targetId = followIdMap[cameraMode];
        if (targetId) {
          const char = charactersRef.current.get(targetId);
          if (char) {
            camTarget.current.lerp(new THREE.Vector3(char.position.x, 0.75, char.position.z), delta * 4);
          }
        }
      }

      currentLookAt.current.lerp(
        new THREE.Vector3().addVectors(camTarget.current, panOffset.current),
        delta * 5
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
