import * as THREE from 'three';

export class TownEnvironment {
  public group: THREE.Group;
  public fountainWaterParticles: THREE.Points;
  public streetLights: THREE.PointLight[] = [];
  public windowMeshes: THREE.Mesh[] = [];

  constructor() {
    this.group = new THREE.Group();

    this.buildTerrain();
    this.buildFountain();
    this.buildBuildings();
    this.buildFlowerGardens();
    this.buildProps();
    this.fountainWaterParticles = this.buildFountainSpray();
  }

  // 1. Земля, лужайки и дорожки
  private buildTerrain() {
    const groundGeo = new THREE.CylinderGeometry(14, 14.5, 0.4, 48);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x86efac,
      roughness: 0.85,
      metalness: 0.05
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.2;
    ground.receiveShadow = true;
    this.group.add(ground);

    const borderGeo = new THREE.CylinderGeometry(14.5, 14.8, 0.6, 48);
    const borderMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.9
    });
    const border = new THREE.Mesh(borderGeo, borderMat);
    border.position.y = -0.4;
    this.group.add(border);

    // Мощеная центральная площадь
    const plazaGeo = new THREE.CylinderGeometry(3.6, 3.6, 0.04, 32);
    const plazaMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.7
    });
    const plaza = new THREE.Mesh(plazaGeo, plazaMat);
    plaza.position.y = 0.01;
    plaza.receiveShadow = true;
    this.group.add(plaza);

    const plazaRingGeo = new THREE.RingGeometry(3.6, 3.9, 32);
    const plazaRingMat = new THREE.MeshStandardMaterial({
      color: 0xcfd8dc,
      roughness: 0.8,
      side: THREE.DoubleSide
    });
    const plazaRing = new THREE.Mesh(plazaRingGeo, plazaRingMat);
    plazaRing.rotation.x = -Math.PI / 2;
    plazaRing.position.y = 0.015;
    this.group.add(plazaRing);

    // Мощеные дорожки к зданиям
    const createPath = (x1: number, z1: number, x2: number, z2: number, width: number = 1.4) => {
      const len = Math.hypot(x2 - x1, z2 - z1);
      const angle = Math.atan2(x2 - x1, z2 - z1);

      const pathGeo = new THREE.PlaneGeometry(width, len);
      const pathMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        roughness: 0.85
      });
      const path = new THREE.Mesh(pathGeo, pathMat);
      path.rotation.x = -Math.PI / 2;
      path.rotation.z = angle;
      path.position.set((x1 + x2) / 2, 0.012, (z1 + z2) / 2);
      path.receiveShadow = true;
      this.group.add(path);
    };

    createPath(0, 0, -5.5, -4.5, 1.4); // путь к кафе
    createPath(0, 0, 5.5, -5.0, 1.4);  // путь к лаборатории
    createPath(0, 0, 5.0, 4.5, 1.4);   // путь к пекарне
    createPath(0, 0, -4.8, 5.2, 1.4);  // путь к башне
    createPath(0, 0, 0.5, 6.0, 1.3);   // путь к скверу
    createPath(0, 0, -1.8, 4.8, 1.2);  // путь к цветнику
  }

  // 2. Центральный фонтан
  private buildFountain() {
    const fountainGroup = new THREE.Group();

    const basinOuterGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.45, 32);
    const basinMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 });
    const basinOuter = new THREE.Mesh(basinOuterGeo, basinMat);
    basinOuter.position.y = 0.22;
    basinOuter.castShadow = true;
    basinOuter.receiveShadow = true;
    fountainGroup.add(basinOuter);

    const waterGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.02, 32);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.6,
      transparent: true,
      opacity: 0.85
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.y = 0.4;
    fountainGroup.add(water);

    const pillarGeo = new THREE.CylinderGeometry(0.35, 0.45, 1.1, 16);
    const pillar = new THREE.Mesh(pillarGeo, basinMat);
    pillar.position.y = 0.6;
    pillar.castShadow = true;
    fountainGroup.add(pillar);

    const bowlGeo = new THREE.CylinderGeometry(0.75, 0.4, 0.25, 24);
    const bowl = new THREE.Mesh(bowlGeo, basinMat);
    bowl.position.y = 1.15;
    bowl.castShadow = true;
    fountainGroup.add(bowl);

    // Кристалл дружбы
    const gemGeo = new THREE.OctahedronGeometry(0.2, 0);
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      roughness: 0.1,
      metalness: 0.7,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.4
    });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    gem.position.y = 1.45;
    fountainGroup.add(gem);

    // Золотая чаша для бросания монет
    const coinPotGeo = new THREE.CylinderGeometry(0.2, 0.15, 0.15, 16);
    const coinPotMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.8, roughness: 0.3 });
    const coinPot = new THREE.Mesh(coinPotGeo, coinPotMat);
    coinPot.position.set(1.1, 0.45, -0.6);
    fountainGroup.add(coinPot);

    this.group.add(fountainGroup);
  }

  // 3. Брызги фонтана
  private buildFountainSpray(): THREE.Points {
    const count = 120;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.4 + Math.random() * 0.7;

      positions[i * 3] = 0;
      positions[i * 3 + 1] = 1.45;
      positions[i * 3 + 2] = 0;

      velocities[i * 3] = Math.cos(angle) * speed * 0.7;
      velocities[i * 3 + 1] = 1.2 + Math.random() * 0.9;
      velocities[i * 3 + 2] = Math.sin(angle) * speed * 0.7;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const mat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.07,
      transparent: true,
      opacity: 0.85
    });

    const particles = new THREE.Points(geo, mat);
    this.group.add(particles);
    return particles;
  }

  // 4. Цветочные клумбы (где работает садовник)
  private buildFlowerGardens() {
    const gardenGroup = new THREE.Group();
    gardenGroup.position.set(-1.8, 0, 4.8);

    // Основа клумбы (кирпичный бортик)
    const bedGeo = new THREE.CylinderGeometry(1.2, 1.25, 0.15, 24);
    const bedMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
    const bed = new THREE.Mesh(bedGeo, bedMat);
    bed.position.y = 0.075;
    gardenGroup.add(bed);

    // Земля внутри
    const soilGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.16, 24);
    const soilMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.95 });
    const soil = new THREE.Mesh(soilGeo, soilMat);
    soil.position.y = 0.08;
    gardenGroup.add(soil);

    // Цветы
    const flowerColors = [0xef4444, 0xf43f5e, 0xec4899, 0xf59e0b, 0x38bdf8, 0xa855f7];
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2 + Math.random() * 0.2;
      const radius = 0.3 + Math.random() * 0.65;
      const fx = Math.cos(angle) * radius;
      const fz = Math.sin(angle) * radius;

      // Стебель
      const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.2, 6);
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x15803d });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.set(fx, 0.2, fz);
      gardenGroup.add(stem);

      // Бутон тюльпана
      const blossomGeo = new THREE.SphereGeometry(0.06, 8, 8);
      blossomGeo.scale(1.0, 1.4, 1.0);
      const blossomMat = new THREE.MeshStandardMaterial({
        color: flowerColors[i % flowerColors.length],
        roughness: 0.4
      });
      const blossom = new THREE.Mesh(blossomGeo, blossomMat);
      blossom.position.set(fx, 0.32, fz);
      gardenGroup.add(blossom);
    }

    this.group.add(gardenGroup);
  }

  // 5. Домики городка
  private buildBuildings() {
    const addWindow = (parent: THREE.Group, x: number, y: number, z: number, w: number, h: number, rotY: number = 0) => {
      const winGeo = new THREE.PlaneGeometry(w, h);
      const winMat = new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        emissive: 0xfacc15,
        emissiveIntensity: 0.5,
        roughness: 0.3
      });
      const win = new THREE.Mesh(winGeo, winMat);
      win.position.set(x, y, z);
      win.rotation.y = rotY;
      parent.add(win);
      this.windowMeshes.push(win);
    };

    // А. Кафе «Сладкий Байт» (甜心字节咖啡馆)
    const cafeGroup = new THREE.Group();
    cafeGroup.position.set(-5.5, 0, -4.5);
    cafeGroup.rotation.y = Math.PI / 4;

    const cafeGeo = new THREE.BoxGeometry(2.8, 2.2, 2.4);
    const cafeMat = new THREE.MeshStandardMaterial({ color: 0xbae6fd, roughness: 0.7 });
    const cafe = new THREE.Mesh(cafeGeo, cafeMat);
    cafe.position.y = 1.1;
    cafe.castShadow = true;
    cafe.receiveShadow = true;
    cafeGroup.add(cafe);

    const cafeRoofGeo = new THREE.ConeGeometry(2.3, 1.2, 4);
    cafeRoofGeo.rotateY(Math.PI / 4);
    const cafeRoofMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.6 });
    const cafeRoof = new THREE.Mesh(cafeRoofGeo, cafeRoofMat);
    cafeRoof.position.y = 2.8;
    cafeRoof.castShadow = true;
    cafeGroup.add(cafeRoof);

    const awningGeo = new THREE.BoxGeometry(1.6, 0.15, 0.7);
    const awningMat = new THREE.MeshStandardMaterial({ color: 0xf87171, roughness: 0.5 });
    const awning = new THREE.Mesh(awningGeo, awningMat);
    awning.position.set(0, 1.4, 1.4);
    awning.rotation.x = 0.25;
    cafeGroup.add(awning);

    const doorGeo = new THREE.PlaneGeometry(0.65, 1.1);
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, 0.55, 1.21);
    cafeGroup.add(door);

    addWindow(cafeGroup, -0.75, 1.1, 1.21, 0.5, 0.6);
    addWindow(cafeGroup, 0.75, 1.1, 1.21, 0.5, 0.6);

    // Кофейный столик со стульями
    const tableGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.04, 16);
    const tableMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.set(1.4, 0.45, 1.6);
    cafeGroup.add(table);

    const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.45, 8);
    const leg = new THREE.Mesh(legGeo, tableMat);
    leg.position.set(1.4, 0.22, 1.6);
    cafeGroup.add(leg);

    this.group.add(cafeGroup);

    // Б. Техно-лаборатория AI
    const labGroup = new THREE.Group();
    labGroup.position.set(5.5, 0, -5.0);
    labGroup.rotation.y = -Math.PI / 4;

    const labGeo = new THREE.BoxGeometry(2.6, 2.4, 2.6);
    const labMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 });
    const lab = new THREE.Mesh(labGeo, labMat);
    lab.position.y = 1.2;
    lab.castShadow = true;
    labGroup.add(lab);

    const labRoofGeo = new THREE.BoxGeometry(2.8, 0.2, 2.8);
    const labRoofMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.4 });
    const labRoof = new THREE.Mesh(labRoofGeo, labRoofMat);
    labRoof.position.y = 2.5;
    labGroup.add(labRoof);

    const antPoleGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.9, 8);
    const antPoleMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.5 });
    const antPole = new THREE.Mesh(antPoleGeo, antPoleMat);
    antPole.position.set(0, 3.0, 0);
    labGroup.add(antPole);

    const antSphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const antSphereMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 0.7
    });
    const antSphere = new THREE.Mesh(antSphereGeo, antSphereMat);
    antSphere.position.set(0, 3.5, 0);
    labGroup.add(antSphere);

    addWindow(labGroup, 0, 1.3, 1.31, 1.4, 0.7);
    addWindow(labGroup, 1.31, 1.3, 0, 1.4, 0.7, Math.PI / 2);

    this.group.add(labGroup);

    // В. Пекарня «Кубик»
    const bakeryGroup = new THREE.Group();
    bakeryGroup.position.set(5.0, 0, 4.5);
    bakeryGroup.rotation.y = -Math.PI * 0.75;

    const bakeryGeo = new THREE.BoxGeometry(2.6, 2.0, 2.4);
    const bakeryMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.7 });
    const bakery = new THREE.Mesh(bakeryGeo, bakeryMat);
    bakery.position.y = 1.0;
    bakery.castShadow = true;
    bakeryGroup.add(bakery);

    const bakeryRoofGeo = new THREE.ConeGeometry(2.2, 1.2, 4);
    bakeryRoofGeo.rotateY(Math.PI / 4);
    const bakeryRoofMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.6 });
    const bakeryRoof = new THREE.Mesh(bakeryRoofGeo, bakeryRoofMat);
    bakeryRoof.position.y = 2.6;
    bakeryGroup.add(bakeryRoof);

    const decoCubeGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const decoCubeMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      roughness: 0.3,
      metalness: 0.2
    });
    const decoCube = new THREE.Mesh(decoCubeGeo, decoCubeMat);
    decoCube.position.set(0, 3.4, 0);
    decoCube.rotation.set(0.4, 0.5, 0.2);
    bakeryGroup.add(decoCube);

    addWindow(bakeryGroup, 0, 1.1, 1.21, 1.2, 0.7);

    this.group.add(bakeryGroup);

    // Г. Часовая башня с золотым колоколом
    const towerGroup = new THREE.Group();
    towerGroup.position.set(-4.8, 0, 5.2);
    towerGroup.rotation.y = Math.PI * 0.75;

    const baseGeo = new THREE.BoxGeometry(2.0, 3.8, 2.0);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0xd6d3d1, roughness: 0.8 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 1.9;
    base.castShadow = true;
    towerGroup.add(base);

    const clockGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.08, 24);
    clockGeo.rotateX(Math.PI / 2);
    const clockMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    const clock = new THREE.Mesh(clockGeo, clockMat);
    clock.position.set(0, 2.8, 1.04);
    towerGroup.add(clock);

    const spireGeo = new THREE.ConeGeometry(1.6, 2.0, 4);
    spireGeo.rotateY(Math.PI / 4);
    const spireMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.6 });
    const spire = new THREE.Mesh(spireGeo, spireMat);
    spire.position.y = 4.8;
    spire.castShadow = true;
    towerGroup.add(spire);

    const bellGeo = new THREE.CylinderGeometry(0.15, 0.35, 0.4, 16);
    const bellMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.85,
      roughness: 0.25
    });
    const bell = new THREE.Mesh(bellGeo, bellMat);
    bell.position.set(0, 3.8, 0);
    towerGroup.add(bell);

    this.group.add(towerGroup);
  }

  // 6. Деревья, лавочки, фонарные столбы
  private buildProps() {
    const createTree = (x: number, z: number, scale: number = 1.0) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(x, 0, z);
      treeGroup.scale.set(scale, scale, scale);

      const trunkGeo = new THREE.CylinderGeometry(0.14, 0.2, 1.2, 8);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.9 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 0.6;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      const leafMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.7 });
      const leaf1 = new THREE.Mesh(new THREE.SphereGeometry(0.75, 14, 14), leafMat);
      leaf1.position.y = 1.6;
      leaf1.castShadow = true;
      treeGroup.add(leaf1);

      const leaf2 = new THREE.Mesh(new THREE.SphereGeometry(0.6, 12, 12), leafMat);
      leaf2.position.set(0.25, 2.0, 0.15);
      leaf2.castShadow = true;
      treeGroup.add(leaf2);

      const leaf3 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 12), leafMat);
      leaf3.position.set(-0.25, 2.1, -0.15);
      leaf3.castShadow = true;
      treeGroup.add(leaf3);

      this.group.add(treeGroup);
    };

    createTree(-2.5, -5.5, 1.1);
    createTree(2.0, -6.0, 1.0);
    createTree(6.5, -1.5, 1.2);
    createTree(6.2, 1.5, 0.9);
    createTree(-6.5, 1.0, 1.15);
    createTree(-2.5, 6.5, 1.2);
    createTree(3.2, 6.5, 1.05);

    const createStreetLamp = (x: number, z: number) => {
      const lampGroup = new THREE.Group();
      lampGroup.position.set(x, 0, z);

      const poleGeo = new THREE.CylinderGeometry(0.04, 0.06, 2.0, 8);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.y = 1.0;
      pole.castShadow = true;
      lampGroup.add(pole);

      const bulbGeo = new THREE.SphereGeometry(0.14, 16, 16);
      const bulbMat = new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        emissive: 0xfacc15,
        emissiveIntensity: 0.8,
        roughness: 0.2
      });
      const bulb = new THREE.Mesh(bulbGeo, bulbMat);
      bulb.position.y = 2.05;
      lampGroup.add(bulb);

      const light = new THREE.PointLight(0xfef08a, 0.8, 6.0);
      light.position.set(0, 2.05, 0);
      lampGroup.add(light);
      this.streetLights.push(light);

      this.group.add(lampGroup);
    };

    createStreetLamp(-2.6, -2.6);
    createStreetLamp(2.6, -2.6);
    createStreetLamp(-2.6, 2.6);
    createStreetLamp(2.6, 2.6);

    const createBench = (x: number, z: number, rotY: number) => {
      const benchGroup = new THREE.Group();
      benchGroup.position.set(x, 0, z);
      benchGroup.rotation.y = rotY;

      const seatGeo = new THREE.BoxGeometry(1.2, 0.08, 0.4);
      const woodMat = new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.8 });
      const seat = new THREE.Mesh(seatGeo, woodMat);
      seat.position.y = 0.35;
      seat.castShadow = true;
      benchGroup.add(seat);

      const backGeo = new THREE.BoxGeometry(1.2, 0.35, 0.06);
      const back = new THREE.Mesh(backGeo, woodMat);
      back.position.set(0, 0.6, -0.18);
      back.castShadow = true;
      benchGroup.add(back);

      this.group.add(benchGroup);
    };

    createBench(0, -2.8, 0);
    createBench(0, 2.8, Math.PI);
    createBench(-2.8, 0, Math.PI / 2);
    createBench(2.8, 0, -Math.PI / 2);
    createBench(0.5, 6.0, Math.PI);
  }

  // Обновление частиц воды
  public updateFountain(delta: number) {
    const posAttr = this.fountainWaterParticles.geometry.attributes.position as THREE.BufferAttribute;
    const velAttr = this.fountainWaterParticles.geometry.attributes.velocity as THREE.BufferAttribute;

    for (let i = 0; i < posAttr.count; i++) {
      let py = posAttr.getY(i);
      let vy = velAttr.getY(i);

      py += vy * delta;
      vy -= 3.8 * delta;

      let px = posAttr.getX(i) + velAttr.getX(i) * delta;
      let pz = posAttr.getZ(i) + velAttr.getZ(i) * delta;

      if (py < 0.4) {
        px = 0;
        py = 1.45;
        pz = 0;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.35 + Math.random() * 0.6;
        velAttr.setXYZ(i, Math.cos(angle) * speed * 0.7, 1.2 + Math.random() * 0.8, Math.sin(angle) * speed * 0.7);
      } else {
        velAttr.setY(i, vy);
      }

      posAttr.setXYZ(i, px, py, pz);
    }

    posAttr.needsUpdate = true;
  }
}
