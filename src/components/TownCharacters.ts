import * as THREE from 'three';
import { CharacterId, CharacterAction } from '../types';

// Генератор текстур для пузика персонажей (AI, 永生, 立方体, 量子, 生态, 财富, 美味)
function createDecalTexture(type: CharacterId): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 512, 512);

  if (type === 'red_ai') {
    // Надпись "AI"
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 160px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AI', 256, 256);
  } else if (type === 'fly_immortal') {
    // Каллиграфическая надпись "永生"
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 130px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('永生', 256, 256);
  } else if (type === 'pink_node') {
    // Изометрический логотип куба
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 26;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const cx = 256;
    const cy = 256;
    const size = 110;

    const hexPoint = (i: number) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return [cx + size * Math.cos(angle), cy + size * Math.sin(angle)];
    };

    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const [x, y] = hexPoint(i);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx, cy - size);
    ctx.moveTo(cx, cy);
    const [p3x, p3y] = hexPoint(3);
    ctx.lineTo(p3x, p3y);
    ctx.moveTo(cx, cy);
    const [p5x, p5y] = hexPoint(5);
    ctx.lineTo(p5x, p5y);
    ctx.stroke();

    const innerSize = 48;
    const innerPoint = (i: number) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return [cx + innerSize * Math.cos(angle), cy + innerSize * Math.sin(angle)];
    };
    ctx.lineWidth = 14;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const [x, y] = innerPoint(i);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  } else if (type === 'blue_quantum') {
    // Символ "量子"
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 125px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('量子', 256, 256);
  } else if (type === 'green_sprout') {
    // Символ "生态"
    ctx.fillStyle = '#064e3b';
    ctx.font = 'bold 125px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('生态', 256, 256);
  } else if (type === 'golden_coin') {
    // Символ "财富"
    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 125px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('财富', 256, 256);
  } else if (type === 'white_cloud') {
    // Символ "美味"
    ctx.fillStyle = '#0284c7';
    ctx.font = 'bold 125px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('美味', 256, 256);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export class TownCharacterAgent {
  public id: CharacterId;
  public group: THREE.Group;
  public currentAction: CharacterAction = 'idle';

  // Позиция и навигация
  public position: THREE.Vector3;
  public targetPosition: THREE.Vector3;
  public moveSpeed: number = 1.6;
  public rotationY: number = 0;
  public wanderTimer: number = 0;
  public workTimer: number = 0;

  // Описание текущей деятельности на китайском
  public currentActivityZh: string = '';

  // Части тела для анимации
  private bodyMesh!: THREE.Mesh;
  private leftArmGroup!: THREE.Group;
  private rightArmGroup!: THREE.Group;
  private leftLegGroup!: THREE.Group;
  private rightLegGroup!: THREE.Group;
  private leftWingGroup?: THREE.Group;
  private rightWingGroup?: THREE.Group;
  private specialPropGroup?: THREE.Group; // лейка, монетка, кристалл, поварской колпак

  // Счетчики анимаций
  private animCycle: number = 0;
  private jumpY: number = 0;
  private jumpVelocity: number = 0;
  public onStepSound?: () => void;
  public onWingFlapSound?: () => void;

  constructor(id: CharacterId, startX: number, startZ: number) {
    this.id = id;
    this.position = new THREE.Vector3(startX, 0, startZ);
    this.targetPosition = new THREE.Vector3(startX, 0, startZ);
    this.group = new THREE.Group();
    this.group.position.copy(this.position);

    this.buildMesh();
  }

  private buildMesh() {
    const isRed = this.id === 'red_ai';
    const isFly = this.id === 'fly_immortal';
    const isPink = this.id === 'pink_node';
    const isBlue = this.id === 'blue_quantum';
    const isGreen = this.id === 'green_sprout';
    const isGold = this.id === 'golden_coin';
    const isWhite = this.id === 'white_cloud';

    // 1. Основной цвет тела
    let bodyColor = 0xef2e2e;
    if (isFly) bodyColor = 0x2b2e38;
    else if (isPink) bodyColor = 0xec4899;
    else if (isBlue) bodyColor = 0x38bdf8;
    else if (isGreen) bodyColor = 0x22c55e;
    else if (isGold) bodyColor = 0xf59e0b;
    else if (isWhite) bodyColor = 0xf8fafc;

    const bodyRadius = isFly ? 0.38 : isWhite ? 0.45 : 0.42;

    const bodyMat = new THREE.MeshStandardMaterial({
      color: bodyColor,
      roughness: isFly ? 0.6 : isGold ? 0.25 : 0.45,
      metalness: isGold ? 0.4 : 0.08
    });

    const bodyGeo = new THREE.SphereGeometry(bodyRadius, 32, 32);
    this.bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    this.bodyMesh.castShadow = true;
    this.bodyMesh.receiveShadow = true;
    this.bodyMesh.position.y = bodyRadius + 0.12;
    this.group.add(this.bodyMesh);

    // 2. Деколь с символом на пузике
    const decalTex = createDecalTexture(this.id);
    const decalGeo = new THREE.PlaneGeometry(bodyRadius * 1.15, bodyRadius * 1.15);
    const decalMat = new THREE.MeshBasicMaterial({
      map: decalTex,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1
    });
    const decalMesh = new THREE.Mesh(decalGeo, decalMat);
    decalMesh.position.set(0, isFly ? -0.06 : -0.05, bodyRadius * 0.96);
    this.bodyMesh.add(decalMesh);

    // 3. Глазки персонажа
    if (isFly) {
      // Огромные выпуклые круглые ярко-красные глаза сбоку от хоботка
      const flyEyeGeo = new THREE.SphereGeometry(0.19, 24, 24);
      flyEyeGeo.scale(1.0, 1.15, 0.95);
      const flyEyeMat = new THREE.MeshStandardMaterial({
        color: 0xef2323,
        roughness: 0.3,
        metalness: 0.2
      });

      const leftEye = new THREE.Mesh(flyEyeGeo, flyEyeMat);
      leftEye.position.set(-0.16, 0.08, bodyRadius * 0.68);
      leftEye.rotation.y = -0.2;
      this.bodyMesh.add(leftEye);

      const rightEye = new THREE.Mesh(flyEyeGeo, flyEyeMat);
      rightEye.position.set(0.16, 0.08, bodyRadius * 0.68);
      rightEye.rotation.y = 0.2;
      this.bodyMesh.add(rightEye);

      // Хоботок
      const proboscisGeo = new THREE.ConeGeometry(0.045, 0.16, 16);
      proboscisGeo.rotateX(Math.PI / 2);
      const proboscisMat = new THREE.MeshStandardMaterial({ color: 0x1e2129, roughness: 0.8 });
      const proboscis = new THREE.Mesh(proboscisGeo, proboscisMat);
      proboscis.position.set(0, -0.02, bodyRadius * 0.95);
      this.bodyMesh.add(proboscis);
    } else {
      // Круглые выразительные светящиеся глазки с черными зрачками
      const eyeColor = isGold ? 0xfffbeb : isGreen ? 0xecfdf5 : 0x00f5ff;
      const eyeGeo = new THREE.SphereGeometry(0.065, 20, 20);
      eyeGeo.scale(1.0, 1.1, 0.5);

      const eyeGlowMat = new THREE.MeshBasicMaterial({ color: eyeColor });
      const pupilMat = new THREE.MeshBasicMaterial({ color: 0x09090b });

      const leftEye = new THREE.Mesh(eyeGeo, eyeGlowMat);
      leftEye.position.set(-0.13, 0.12, bodyRadius * 0.92);
      const leftPupil = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), pupilMat);
      leftPupil.position.set(0, 0, 0.025);
      leftEye.add(leftPupil);
      this.bodyMesh.add(leftEye);

      const rightEye = new THREE.Mesh(eyeGeo, eyeGlowMat);
      rightEye.position.set(0.13, 0.12, bodyRadius * 0.92);
      const rightPupil = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), pupilMat);
      rightPupil.position.set(0, 0, 0.025);
      rightEye.add(rightPupil);
      this.bodyMesh.add(rightEye);
    }

    // 4. Головные уборы и аксессуары персонажей
    if (isFly) {
      // Антенки мухи
      const antMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.6 });
      const ant1 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.18, 8), antMat);
      ant1.position.set(-0.1, bodyRadius * 0.95, 0.1);
      ant1.rotation.z = 0.3;
      this.bodyMesh.add(ant1);
      const ant2 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.18, 8), antMat);
      ant2.position.set(0.1, bodyRadius * 0.95, 0.1);
      ant2.rotation.z = -0.3;
      this.bodyMesh.add(ant2);

      // Прозрачные крылышки
      const createWing = (isLeft: boolean) => {
        const wingRoot = new THREE.Group();
        const wingGeo = new THREE.SphereGeometry(0.24, 16, 16);
        wingGeo.scale(0.85, 1.4, 0.04);
        wingGeo.translate(0, 0.22, 0);

        const wingMat = new THREE.MeshStandardMaterial({
          color: 0xc7d2fe,
          transparent: true,
          opacity: 0.65,
          roughness: 0.2,
          metalness: 0.1,
          side: THREE.DoubleSide
        });

        const wingMesh = new THREE.Mesh(wingGeo, wingMat);
        wingMesh.rotation.z = isLeft ? 0.6 : -0.6;
        wingMesh.rotation.x = -0.25;
        wingRoot.add(wingMesh);
        wingRoot.position.set(isLeft ? -0.12 : 0.12, 0.08, -bodyRadius * 0.85);
        return wingRoot;
      };

      this.leftWingGroup = createWing(true);
      this.rightWingGroup = createWing(false);
      this.bodyMesh.add(this.leftWingGroup);
      this.bodyMesh.add(this.rightWingGroup);

    } else if (isRed || isPink) {
      // Классические круглые антенны-рожки
      const createAntenna = (isLeft: boolean) => {
        const antGroup = new THREE.Group();
        const antLen = 0.16;
        const antMat = new THREE.MeshStandardMaterial({
          color: isRed ? 0xc52222 : 0x18181b,
          roughness: 0.6
        });

        const stemGeo = new THREE.CylinderGeometry(0.016, 0.012, antLen, 8);
        stemGeo.translate(0, antLen / 2, 0);
        const stem = new THREE.Mesh(stemGeo, antMat);
        stem.rotation.z = isLeft ? 0.35 : -0.35;
        antGroup.add(stem);

        const tipGeo = new THREE.SphereGeometry(0.028, 12, 12);
        const tip = new THREE.Mesh(tipGeo, antMat);
        tip.position.set((isLeft ? -1 : 1) * Math.sin(0.35) * antLen, Math.cos(0.35) * antLen, 0);
        antGroup.add(tip);

        antGroup.position.set(isLeft ? -0.12 : 0.12, bodyRadius * 0.92, 0);
        return antGroup;
      };

      this.bodyMesh.add(createAntenna(true));
      this.bodyMesh.add(createAntenna(false));

    } else if (isGreen) {
      // Зеленый росток с двумя покачивающимися листиками
      const sproutGroup = new THREE.Group();
      const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.14, 8);
      const plantMat = new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.5 });
      const stem = new THREE.Mesh(stemGeo, plantMat);
      stem.position.y = 0.07;
      sproutGroup.add(stem);

      const leafGeo = new THREE.SphereGeometry(0.06, 12, 12);
      leafGeo.scale(1.4, 0.4, 0.8);
      const leaf1 = new THREE.Mesh(leafGeo, plantMat);
      leaf1.position.set(-0.06, 0.13, 0);
      leaf1.rotation.z = 0.4;
      sproutGroup.add(leaf1);

      const leaf2 = new THREE.Mesh(leafGeo, plantMat);
      leaf2.position.set(0.06, 0.13, 0);
      leaf2.rotation.z = -0.4;
      sproutGroup.add(leaf2);

      sproutGroup.position.set(0, bodyRadius * 0.95, 0);
      this.bodyMesh.add(sproutGroup);
      this.specialPropGroup = sproutGroup;

    } else if (isBlue) {
      // Квантовая орбитальная антенна со светящейся сферой
      const quantumGroup = new THREE.Group();
      const ringGeo = new THREE.TorusGeometry(0.08, 0.012, 12, 24);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.8
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      quantumGroup.add(ring);

      const coreSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x38bdf8, emissiveIntensity: 1.0 })
      );
      quantumGroup.add(coreSphere);

      quantumGroup.position.set(0, bodyRadius * 0.98 + 0.08, 0);
      this.bodyMesh.add(quantumGroup);
      this.specialPropGroup = quantumGroup;

    } else if (isGold) {
      // Сверкающая золотая корона/звездочка
      const starGroup = new THREE.Group();
      const starGeo = new THREE.OctahedronGeometry(0.07, 0);
      const starMat = new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        emissive: 0xfacc15,
        emissiveIntensity: 0.6,
        metalness: 0.8,
        roughness: 0.2
      });
      const star = new THREE.Mesh(starGeo, starMat);
      star.position.set(0, bodyRadius * 0.98 + 0.05, 0);
      starGroup.add(star);
      this.bodyMesh.add(starGroup);
      this.specialPropGroup = starGroup;

    } else if (isWhite) {
      // Поварской колпак шеф-мастера
      const chefHatGroup = new THREE.Group();
      const bandGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.08, 24);
      const hatMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
      const band = new THREE.Mesh(bandGeo, hatMat);
      band.position.y = 0.04;
      chefHatGroup.add(band);

      const puffGeo = new THREE.SphereGeometry(0.24, 20, 20);
      puffGeo.scale(1.0, 0.8, 1.0);
      const puff = new THREE.Mesh(puffGeo, hatMat);
      puff.position.y = 0.2;
      chefHatGroup.add(puff);

      chefHatGroup.position.set(0, bodyRadius * 0.95, 0);
      this.bodyMesh.add(chefHatGroup);
    }

    // 5. Ручки
    const armMat = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.5 });
    const createArm = (isLeft: boolean) => {
      const armRoot = new THREE.Group();
      const armLen = 0.22;
      const armGeo = new THREE.CylinderGeometry(0.04, 0.035, armLen, 12);
      armGeo.translate(0, -armLen / 2, 0);

      const armMesh = new THREE.Mesh(armGeo, armMat);
      armMesh.castShadow = true;
      armRoot.add(armMesh);

      const handGeo = new THREE.SphereGeometry(0.05, 12, 12);
      handGeo.scale(1.0, 0.8, 1.2);
      const hand = new THREE.Mesh(handGeo, armMat);
      hand.position.set(0, -armLen, 0.015);
      armRoot.add(hand);

      armRoot.position.set((isLeft ? -1 : 1) * (bodyRadius + 0.02), 0.05, 0.02);
      armRoot.rotation.z = isLeft ? 0.35 : -0.35;
      return armRoot;
    };

    this.leftArmGroup = createArm(true);
    this.rightArmGroup = createArm(false);
    this.bodyMesh.add(this.leftArmGroup);
    this.bodyMesh.add(this.rightArmGroup);

    // Добавляем рабочий реквизит в ручку:
    if (isGreen) {
      // Маленькая желто-голубая садовая лейка в правой ручке
      const canGroup = new THREE.Group();
      const potGeo = new THREE.CylinderGeometry(0.05, 0.06, 0.1, 12);
      const canMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.4 });
      const pot = new THREE.Mesh(potGeo, canMat);
      pot.position.y = -0.05;
      canGroup.add(pot);

      const spoutGeo = new THREE.CylinderGeometry(0.015, 0.02, 0.1, 8);
      const spout = new THREE.Mesh(spoutGeo, canMat);
      spout.rotation.z = -0.8;
      spout.position.set(0.06, -0.02, 0);
      canGroup.add(spout);

      canGroup.position.set(0, -0.22, 0.04);
      canGroup.scale.set(0.8, 0.8, 0.8);
      this.rightArmGroup.add(canGroup);

    } else if (isGold) {
      // Блестящая золотая монетка в ручке
      const coinGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.018, 16);
      coinGeo.rotateX(Math.PI / 2);
      const coinMat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        metalness: 0.9,
        roughness: 0.2
      });
      const coin = new THREE.Mesh(coinGeo, coinMat);
      coin.position.set(0, -0.22, 0.05);
      this.rightArmGroup.add(coin);

    } else if (isWhite) {
      // Белая кофейная чашка
      const cupGeo = new THREE.CylinderGeometry(0.045, 0.035, 0.08, 12);
      const cupMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
      const cup = new THREE.Mesh(cupGeo, cupMat);
      cup.position.set(0, -0.22, 0.05);
      this.rightArmGroup.add(cup);
    }

    // 6. Ножки
    const legMat = new THREE.MeshStandardMaterial({
      color: isFly ? 0x1f2128 : isRed ? 0xd12424 : 0x1e1b4b,
      roughness: 0.6
    });

    const createLeg = (isLeft: boolean) => {
      const legRoot = new THREE.Group();
      const legLen = 0.18;
      const legGeo = new THREE.CylinderGeometry(0.045, 0.04, legLen, 12);
      legGeo.translate(0, -legLen / 2, 0);

      const leg = new THREE.Mesh(legGeo, legMat);
      leg.castShadow = true;
      legRoot.add(leg);

      const footGeo = new THREE.SphereGeometry(0.055, 12, 12);
      footGeo.scale(1.0, 0.6, 1.4);
      const foot = new THREE.Mesh(footGeo, legMat);
      foot.position.set(0, -legLen, 0.02);
      foot.castShadow = true;
      legRoot.add(foot);

      legRoot.position.set(isLeft ? -0.15 : 0.15, bodyRadius * 0.25, 0);
      return legRoot;
    };

    this.leftLegGroup = createLeg(true);
    this.rightLegGroup = createLeg(false);
    this.group.add(this.leftLegGroup);
    this.group.add(this.rightLegGroup);
  }

  // Принудительный прыжок от радости при клике игрока
  public jumpWithJoy() {
    this.jumpVelocity = 4.2;
    this.currentAction = 'celebrating';
    setTimeout(() => {
      if (this.currentAction === 'celebrating') {
        this.currentAction = 'idle';
      }
    }, 1800);
  }

  // Обновление физики и процедурных движений
  public update(delta: number, elapsedTime: number) {
    this.wanderTimer -= delta;
    this.workTimer -= delta;

    // Прыжковая физика
    if (this.jumpVelocity > 0 || this.jumpY > 0) {
      this.jumpY += this.jumpVelocity * delta;
      this.jumpVelocity -= 14.0 * delta;
      if (this.jumpY <= 0) {
        this.jumpY = 0;
        this.jumpVelocity = 0;
      }
    }

    // Движение к цели
    const toTarget = new THREE.Vector3().subVectors(this.targetPosition, this.position);
    toTarget.y = 0;
    const dist = toTarget.length();

    if (dist > 0.18) {
      if (this.currentAction !== 'talking' && this.currentAction !== 'celebrating') {
        this.currentAction = (this.id === 'fly_immortal' && dist > 2.2) ? 'flying' : 'walking';
      }

      // Разворот к цели
      const targetAngle = Math.atan2(toTarget.x, toTarget.z);
      let angleDiff = targetAngle - this.rotationY;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      this.rotationY += angleDiff * Math.min(1.0, delta * 6.0);
      this.group.rotation.y = this.rotationY;

      // Шаг вперед
      const speed = this.currentAction === 'flying' ? this.moveSpeed * 1.5 : this.moveSpeed;
      const step = Math.min(dist, speed * delta);
      const moveVec = new THREE.Vector3(0, 0, step).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.rotationY);
      this.position.add(moveVec);

      // Анимация походки / полета
      this.animCycle += delta * (this.currentAction === 'flying' ? 14 : 9);

      if (this.currentAction === 'flying') {
        this.group.position.y = 0.6 + Math.sin(this.animCycle * 0.8) * 0.15;
        this.leftLegGroup.rotation.x = 0.3;
        this.rightLegGroup.rotation.x = 0.3;
        this.leftArmGroup.rotation.z = 0.8;
        this.rightArmGroup.rotation.z = -0.8;
      } else {
        const sin = Math.sin(this.animCycle);
        const cos = Math.cos(this.animCycle);

        this.leftLegGroup.rotation.x = sin * 0.6;
        this.rightLegGroup.rotation.x = -sin * 0.6;

        this.leftArmGroup.rotation.x = -sin * 0.5;
        this.rightArmGroup.rotation.x = sin * 0.5;

        this.bodyMesh.rotation.z = sin * 0.08;
        this.bodyMesh.position.y = (this.id === 'fly_immortal' ? 0.5 : 0.55) + Math.abs(cos) * 0.05 + this.jumpY;

        if (Math.abs(sin) > 0.95 && Math.random() < 0.12) {
          if (this.onStepSound) this.onStepSound();
        }
      }

    } else {
      // Дошел до цели
      if (this.currentAction === 'walking' || this.currentAction === 'flying') {
        this.currentAction = this.workTimer > 0 ? 'working' : 'idle';
      }

      this.leftLegGroup.rotation.x = THREE.MathUtils.lerp(this.leftLegGroup.rotation.x, 0, delta * 6);
      this.rightLegGroup.rotation.x = THREE.MathUtils.lerp(this.rightLegGroup.rotation.x, 0, delta * 6);
      this.bodyMesh.rotation.z = THREE.MathUtils.lerp(this.bodyMesh.rotation.z, 0, delta * 6);
      this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, 0, delta * 8);

      if (this.currentAction === 'talking') {
        const talkWave = Math.sin(elapsedTime * 6);
        this.leftArmGroup.rotation.z = 0.5 + talkWave * 0.25;
        this.rightArmGroup.rotation.z = -0.5 - talkWave * 0.25;
        this.bodyMesh.position.y = 0.55 + Math.abs(talkWave) * 0.03 + this.jumpY;
      } else if (this.currentAction === 'working') {
        // Персонаж занят своим любимым делом
        const workCycle = Math.sin(elapsedTime * 4);
        if (this.id === 'green_sprout') {
          // Садовник наклоняется и поливает
          this.rightArmGroup.rotation.x = -0.8 + workCycle * 0.2;
          this.rightArmGroup.rotation.z = -0.4;
          this.bodyMesh.rotation.x = 0.15;
        } else if (this.id === 'golden_coin') {
          // Казначей подбрасывает золотую монетку
          this.rightArmGroup.rotation.x = -0.6 + Math.abs(workCycle) * 0.4;
        } else if (this.id === 'white_cloud') {
          // Повар мешает кофе
          this.rightArmGroup.rotation.x = -0.5;
          this.rightArmGroup.rotation.y = workCycle * 0.6;
        } else if (this.id === 'blue_quantum' || this.id === 'red_ai') {
          // Ученый сканирует и калибрует
          this.leftArmGroup.rotation.x = -0.5 + workCycle * 0.2;
          this.rightArmGroup.rotation.x = -0.5 - workCycle * 0.2;
        } else {
          this.leftArmGroup.rotation.z = 0.4 + workCycle * 0.15;
          this.rightArmGroup.rotation.z = -0.4 - workCycle * 0.15;
        }
        this.bodyMesh.position.y = 0.55 + Math.abs(workCycle) * 0.02 + this.jumpY;
      } else if (this.currentAction === 'celebrating') {
        this.leftArmGroup.rotation.z = 1.4 + Math.sin(elapsedTime * 12) * 0.3;
        this.rightArmGroup.rotation.z = -1.4 - Math.sin(elapsedTime * 12) * 0.3;
        this.bodyMesh.position.y = 0.55 + this.jumpY;
        this.bodyMesh.rotation.y = Math.sin(elapsedTime * 8) * 0.4;
      } else {
        const breathe = Math.sin(elapsedTime * 2.2) * 0.015;
        this.bodyMesh.position.y = 0.55 + breathe + this.jumpY;
        this.leftArmGroup.rotation.z = 0.35 + breathe * 2;
        this.rightArmGroup.rotation.z = -0.35 - breathe * 2;
      }
    }

    // Вращение квантового кристалла / ростка / звездочки
    if (this.specialPropGroup) {
      if (this.id === 'blue_quantum') {
        this.specialPropGroup.rotation.y += delta * 2.5;
      } else if (this.id === 'green_sprout') {
        this.specialPropGroup.rotation.z = Math.sin(elapsedTime * 3) * 0.15;
      } else if (this.id === 'golden_coin') {
        this.specialPropGroup.rotation.y += delta * 3.0;
      }
    }

    // Анимация крылышек у Мухи (永生)
    if (this.leftWingGroup && this.rightWingGroup) {
      const isBuzzing =
        this.currentAction === 'flying' ||
        this.currentAction === 'talking' ||
        Math.random() < 0.15;
      const wingSpeed = isBuzzing ? 45 : 12;
      const wingAngle = Math.sin(elapsedTime * wingSpeed) * 0.45;
      this.leftWingGroup.rotation.y = wingAngle;
      this.rightWingGroup.rotation.y = -wingAngle;

      if (isBuzzing && Math.random() < 0.04) {
        if (this.onWingFlapSound) this.onWingFlapSound();
      }
    }

    this.group.position.x = this.position.x;
    this.group.position.z = this.position.z;
  }
}
