import * as THREE from 'three';
import { CatActionState } from '../types';

export class CatCharacter {
  public group: THREE.Group;
  
  // Части тела
  private bodyMesh: THREE.Mesh;
  private chestMesh: THREE.Mesh;
  private headGroup: THREE.Group;
  private headMesh: THREE.Mesh;
  private leftEar: THREE.Mesh;
  private rightEar: THREE.Mesh;
  private leftEye: THREE.Mesh;
  private rightEye: THREE.Mesh;
  private tailBones: THREE.Group[] = [];

  // Лапки (передние левая/правая, задние левая/правая)
  private frontLeftLeg: THREE.Group;
  private frontRightLeg: THREE.Group;
  private backLeftLeg: THREE.Group;
  private backRightLeg: THREE.Group;

  // Материалы
  private furMaterial: THREE.MeshStandardMaterial;
  private eyeMaterial: THREE.MeshBasicMaterial;

  // Логика перемещения и анимации
  public state: CatActionState = 'corner_solving';
  // Исходное положение: в углу комнаты (угол стен в 0, 0, 0)
  public targetPos: THREE.Vector3 = new THREE.Vector3(0.48, 0, 0.48);
  public targetRotY: number = -Math.PI * 0.75; // Мордочкой прямо в угол (0, 0)
  private walkSpeed: number = 0.95;
  private walkCycle: number = 0;
  private idleTime: number = 0;

  // Callback шага для звука
  public onStep?: () => void;

  constructor() {
    this.group = new THREE.Group();

    // Масштабируем кота в 1.65 раза для прекрасной видимости и четкого силуэта
    this.group.scale.set(1.65, 1.65, 1.65);

    // 1. Материал черной шерсти (с легким бархатистым отблеском)
    this.furMaterial = new THREE.MeshStandardMaterial({
      color: 0x141518,
      roughness: 0.55,
      metalness: 0.15
    });

    // Светящиеся изумрудно-зеленые кошачьи глаза
    this.eyeMaterial = new THREE.MeshBasicMaterial({
      color: 0x4ade80
    });

    // 2. Туловище кота
    // Задняя часть (круглая попа кота, как на фото)
    const buttGeo = new THREE.SphereGeometry(0.13, 20, 20);
    buttGeo.scale(0.95, 1.15, 1.25);
    this.bodyMesh = new THREE.Mesh(buttGeo, this.furMaterial);
    this.bodyMesh.position.set(0, 0.17, -0.05);
    this.bodyMesh.castShadow = true;
    this.group.add(this.bodyMesh);

    // Грудная клетка
    const chestGeo = new THREE.SphereGeometry(0.115, 20, 20);
    chestGeo.scale(0.9, 1.05, 1.05);
    this.chestMesh = new THREE.Mesh(chestGeo, this.furMaterial);
    this.chestMesh.position.set(0, 0.23, 0.12);
    this.chestMesh.castShadow = true;
    this.group.add(this.chestMesh);

    // 3. Шея и голова
    this.headGroup = new THREE.Group();
    this.headGroup.position.set(0, 0.31, 0.18);
    this.group.add(this.headGroup);

    const headGeo = new THREE.SphereGeometry(0.098, 24, 24);
    headGeo.scale(1.05, 0.95, 0.95);
    this.headMesh = new THREE.Mesh(headGeo, this.furMaterial);
    this.headMesh.castShadow = true;
    this.headGroup.add(this.headMesh);

    // Мордочка
    const snoutGeo = new THREE.SphereGeometry(0.038, 14, 14);
    snoutGeo.scale(1.2, 0.7, 0.9);
    const snout = new THREE.Mesh(snoutGeo, this.furMaterial);
    snout.position.set(0, -0.025, 0.08);
    this.headGroup.add(snout);

    // Носик
    const noseGeo = new THREE.ConeGeometry(0.012, 0.012, 3);
    noseGeo.rotateX(Math.PI);
    const noseMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.8 });
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.position.set(0, -0.012, 0.112);
    this.headGroup.add(nose);

    // Ушки (характерные кошачьи треугольные ушки с фото)
    const createEar = (isLeft: boolean) => {
      const earGroup = new THREE.Group();
      const earGeo = new THREE.ConeGeometry(0.042, 0.08, 4);
      earGeo.scale(0.85, 1.0, 0.45);
      earGeo.rotateZ(isLeft ? 0.25 : -0.25);
      const earMesh = new THREE.Mesh(earGeo, this.furMaterial);
      earMesh.castShadow = true;
      earGroup.add(earMesh);

      // Внутренняя выемка ушка
      const innerEarGeo = new THREE.ConeGeometry(0.026, 0.055, 3);
      innerEarGeo.scale(0.7, 0.9, 0.2);
      innerEarGeo.rotateZ(isLeft ? 0.25 : -0.25);
      const innerEarMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.9 });
      const innerEar = new THREE.Mesh(innerEarGeo, innerEarMat);
      innerEar.position.set(0, -0.005, 0.01);
      earGroup.add(innerEar);

      earGroup.position.set(isLeft ? -0.058 : 0.058, 0.078, 0.01);
      return earGroup;
    };

    this.leftEar = createEar(true) as unknown as THREE.Mesh;
    this.rightEar = createEar(false) as unknown as THREE.Mesh;
    this.headGroup.add(this.leftEar);
    this.headGroup.add(this.rightEar);

    // Глаза кота (яркие светящиеся изумрудные)
    const eyeGeo = new THREE.SphereGeometry(0.018, 14, 14);
    eyeGeo.scale(1.0, 1.25, 0.5);

    this.leftEye = new THREE.Mesh(eyeGeo, this.eyeMaterial);
    this.leftEye.position.set(-0.04, 0.005, 0.084);
    this.headGroup.add(this.leftEye);

    this.rightEye = new THREE.Mesh(eyeGeo, this.eyeMaterial);
    this.rightEye.position.set(0.04, 0.005, 0.084);
    this.headGroup.add(this.rightEye);

    // Усики
    const whiskerMat = new THREE.LineBasicMaterial({ color: 0xa1a1aa });
    const addWhiskers = (isLeft: boolean) => {
      [-0.15, 0, 0.15].forEach((angle) => {
        const points = [
          new THREE.Vector3(isLeft ? -0.02 : 0.02, -0.025, 0.09),
          new THREE.Vector3(isLeft ? -0.12 : 0.12, -0.025 + angle * 0.04, 0.13)
        ];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geo, whiskerMat);
        this.headGroup.add(line);
      });
    };
    addWhiskers(true);
    addWhiskers(false);

    // 4. Лапки (4 штуки с сочленениями)
    const createLeg = (isFront: boolean, isLeft: boolean) => {
      const legRoot = new THREE.Group();
      const length = isFront ? 0.18 : 0.17;
      const legGeo = new THREE.CylinderGeometry(0.028, 0.022, length, 12);
      legGeo.translate(0, -length / 2, 0);

      const legMesh = new THREE.Mesh(legGeo, this.furMaterial);
      legMesh.castShadow = true;
      legRoot.add(legMesh);

      // Подушечка лапы
      const pawGeo = new THREE.SphereGeometry(0.03, 12, 12);
      pawGeo.scale(0.9, 0.6, 1.3);
      const paw = new THREE.Mesh(pawGeo, this.furMaterial);
      paw.position.set(0, -length, 0.015);
      paw.castShadow = true;
      legRoot.add(paw);

      const xOffset = (isLeft ? -1 : 1) * (isFront ? 0.068 : 0.085);
      const yOffset = isFront ? 0.20 : 0.18;
      const zOffset = isFront ? 0.12 : -0.11;

      legRoot.position.set(xOffset, yOffset, zOffset);
      this.group.add(legRoot);
      return legRoot;
    };

    this.frontLeftLeg = createLeg(true, true);
    this.frontRightLeg = createLeg(true, false);
    this.backLeftLeg = createLeg(false, true);
    this.backRightLeg = createLeg(false, false);

    // 5. Хвост (многозвенная кинематическая цепочка для плавных изгибов)
    let parentTailNode: THREE.Group = this.group;
    let startPos = new THREE.Vector3(0, 0.18, -0.16);

    for (let i = 0; i < 7; i++) {
      const bone = new THREE.Group();
      bone.position.copy(startPos);
      parentTailNode.add(bone);

      const segLen = 0.058;
      const radius = 0.024 * (1 - i * 0.08);
      const segGeo = new THREE.CylinderGeometry(radius * 0.9, radius, segLen, 10);
      segGeo.translate(0, segLen / 2, 0);

      const segMesh = new THREE.Mesh(segGeo, this.furMaterial);
      segMesh.castShadow = true;
      bone.add(segMesh);

      this.tailBones.push(bone);
      parentTailNode = bone;
      startPos = new THREE.Vector3(0, segLen, -0.01);
    }

    // Исходная позиция в углу (как на фото)
    this.group.position.copy(this.targetPos);
    this.group.rotation.y = this.targetRotY;
  }

  // Принудительно отправить кота в культовый угол
  public sendToCorner() {
    this.state = 'walking';
    this.targetPos.set(0.48, 0, 0.48);
    this.targetRotY = -Math.PI * 0.75; // спиной к нам, носом в угол
  }

  // Отправить кота к конкретной точке в комнате
  public walkTo(pos: THREE.Vector3, stateAfter: CatActionState = 'inspecting_wall') {
    this.state = 'walking';
    this.targetPos.copy(pos);
    this.targetPos.y = 0;

    // Вычисляем угол поворота к цели
    const dx = this.targetPos.x - this.group.position.x;
    const dz = this.targetPos.z - this.group.position.z;
    if (Math.hypot(dx, dz) > 0.05) {
      this.targetRotY = Math.atan2(dx, dz);
    }

    setTimeout(() => {
      if (this.state === 'walking') {
        this.state = stateAfter;
      }
    }, 4500);
  }

  // Погладить котика
  public petCat() {
    this.state = 'purring';
    this.headGroup.rotation.x = -0.25; // поднимает мордочку
    setTimeout(() => {
      if (this.state === 'purring') {
        this.state = 'sitting';
      }
    }, 3000);
  }

  // Обновление физики и процедурной анимации кота на каждом кадре (delta)
  public update(delta: number, elapsedTime: number) {
    this.idleTime += delta;

    // Логика перемещения при ходьбе
    if (this.state === 'walking') {
      const toTarget = new THREE.Vector3().subVectors(this.targetPos, this.group.position);
      toTarget.y = 0;
      const dist = toTarget.length();

      if (dist > 0.06) {
        // Плавный разворот к направлению движения
        const targetAngle = Math.atan2(toTarget.x, toTarget.z);
        let diff = targetAngle - this.group.rotation.y;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        this.group.rotation.y += diff * Math.min(1.0, delta * 4.5);

        // Движение вперед
        const step = Math.min(dist, this.walkSpeed * delta);
        const moveVec = new THREE.Vector3(0, 0, step).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.group.rotation.y);
        this.group.position.add(moveVec);

        // Фаза шага и звук шага
        const prevCycle = this.walkCycle;
        this.walkCycle += delta * 7.5;
        if (Math.floor(this.walkCycle / Math.PI) > Math.floor(prevCycle / Math.PI)) {
          if (this.onStep) this.onStep();
        }

        // Анимация 4 лап (диагональная походка)
        const sin = Math.sin(this.walkCycle);
        const cos = Math.cos(this.walkCycle);

        this.frontLeftLeg.rotation.x = sin * 0.45;
        this.frontRightLeg.rotation.x = -sin * 0.45;
        this.backLeftLeg.rotation.x = -cos * 0.4;
        this.backRightLeg.rotation.x = cos * 0.4;

        // Покачивание спины и головы
        this.bodyMesh.position.y = 0.17 + Math.abs(sin) * 0.015;
        this.chestMesh.position.y = 0.23 + Math.abs(cos) * 0.015;
        this.headGroup.position.y = 0.31 + Math.sin(this.walkCycle * 2) * 0.01;
        this.headGroup.rotation.x = 0.05;

        // Хвост покачивается из стороны в сторону
        this.tailBones.forEach((bone, idx) => {
          bone.rotation.y = Math.sin(this.walkCycle * 0.7 + idx * 0.4) * 0.15;
          bone.rotation.x = -0.3 + Math.sin(this.walkCycle * 0.5) * 0.1;
        });

      } else {
        // Дошел до цели!
        if (Math.hypot(this.targetPos.x - 0.48, this.targetPos.z - 0.48) < 0.2) {
          this.state = 'corner_solving';
        } else {
          this.state = Math.random() > 0.4 ? 'inspecting_wall' : 'sitting';
        }
      }
    } else {
      // Кот стоит, сидит или решает формулу
      this.frontLeftLeg.rotation.x = THREE.MathUtils.lerp(this.frontLeftLeg.rotation.x, 0, delta * 5);
      this.frontRightLeg.rotation.x = THREE.MathUtils.lerp(this.frontRightLeg.rotation.x, 0, delta * 5);
      this.backLeftLeg.rotation.x = THREE.MathUtils.lerp(this.backLeftLeg.rotation.x, 0, delta * 5);
      this.backRightLeg.rotation.x = THREE.MathUtils.lerp(this.backRightLeg.rotation.x, 0, delta * 5);

      if (this.state === 'corner_solving') {
        // ТОТ САМЫЙ РАКУРС ИЗ ФОТО!
        // Кот сидит плотно на попе, спиной к зрителю, носом прямо в угол
        this.group.position.x = THREE.MathUtils.lerp(this.group.position.x, 0.48, delta * 3);
        this.group.position.z = THREE.MathUtils.lerp(this.group.position.z, 0.48, delta * 3);
        this.group.rotation.y = THREE.MathUtils.lerp(this.group.rotation.y, -Math.PI * 0.75, delta * 3);

        // Опускается чуть ниже в сидячую позу
        this.bodyMesh.position.y = THREE.MathUtils.lerp(this.bodyMesh.position.y, 0.13, delta * 4);
        this.chestMesh.position.y = THREE.MathUtils.lerp(this.chestMesh.position.y, 0.20, delta * 4);
        this.headGroup.position.y = THREE.MathUtils.lerp(this.headGroup.position.y, 0.27, delta * 4);

        // Голова задумчиво приподнята и смотрит прямо в стык стен между формулами
        this.headGroup.rotation.x = -0.16 + Math.sin(elapsedTime * 1.2) * 0.04;
        this.headGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.05;

        // Ушки слегка шевелятся (прислушивается к формулам)
        this.leftEar.rotation.z = 0.25 + Math.sin(elapsedTime * 2.5) * 0.05;
        this.rightEar.rotation.z = -0.25 - Math.sin(elapsedTime * 2.1) * 0.05;

        // Хвост лежит на полу с легким подрагиванием кончика
        this.tailBones.forEach((bone, idx) => {
          bone.rotation.x = -0.55 + idx * 0.05;
          bone.rotation.y = Math.sin(elapsedTime * 1.5 + idx * 0.6) * (0.05 + idx * 0.03);
        });

      } else if (this.state === 'inspecting_wall') {
        // Кот смотрит на стену: поднимает голову вверх, сканирует строчки
        this.headGroup.rotation.x = -0.38 + Math.sin(elapsedTime * 1.4) * 0.12; // смотрит вверх на интегралы
        this.headGroup.rotation.y = Math.sin(elapsedTime * 0.6) * 0.25; // водит головой слева направо по формуле
        
        // Хвост спокойно покачивается
        this.tailBones.forEach((bone, idx) => {
          bone.rotation.x = -0.2 + idx * 0.04;
          bone.rotation.y = Math.sin(elapsedTime * 1.8 + idx * 0.5) * 0.15;
        });

      } else if (this.state === 'purring') {
        // Погладили — довольное мурлыканье
        this.bodyMesh.position.y = 0.14 + Math.sin(elapsedTime * 25) * 0.003;
        this.headGroup.rotation.x = -0.25;
        this.tailBones.forEach((bone, idx) => {
          bone.rotation.x = 0.2 + Math.sin(elapsedTime * 4) * 0.08;
          bone.rotation.y = Math.sin(elapsedTime * 3 + idx * 0.3) * 0.2;
        });

      } else {
        // Обычное спокойное сидение
        const breathe = Math.sin(elapsedTime * 1.8) * 0.006;
        this.bodyMesh.position.y = 0.14 + breathe;
        this.chestMesh.position.y = 0.21 + breathe * 1.2;
        this.headGroup.position.y = 0.28 + breathe * 0.8;
        this.headGroup.rotation.x = Math.sin(elapsedTime * 0.7) * 0.06;
        this.headGroup.rotation.y = Math.sin(elapsedTime * 0.5) * 0.12;

        this.tailBones.forEach((bone, idx) => {
          bone.rotation.x = -0.45;
          bone.rotation.y = Math.sin(elapsedTime * 1.2 + idx * 0.4) * 0.08;
        });
      }
    }
  }
}
