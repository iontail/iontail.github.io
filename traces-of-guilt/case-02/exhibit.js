export function mountExhibit(viewer) {
  const stage = viewer.querySelector(".case02-stage");
  const art = stage.querySelector(".case02-art");
  const canvas = stage.querySelector("canvas");
  const specimen = stage.querySelector(".case02-specimen");
  const toggle = viewer.querySelector(".case02-toggle");
  const [name, order] = viewer.querySelector(".case02-caption").children;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let opened = false;
  let draw = () => {};
  let resetPose = () => {};
  let animation;

  art.src = new URL("fluegel-der-glocke.png", import.meta.url);
  specimen.src = new URL("gefluegelter-schluessel.png", import.meta.url);

  function setOpen(next) {
    opened = next;
    stage.classList.toggle("is-revealed", opened);
    toggle.setAttribute("aria-pressed", String(opened));
    toggle.textContent = opened ? "앞부분 닫기" : "앞부분 열기";
    if (!stage.classList.contains("has-three")) {
      name.hidden = opened;
      order.hidden = !opened;
    }
    draw();
  }

  toggle.addEventListener("click", () => setOpen(!opened));
  viewer.addEventListener("close", () => {
    cancelAnimationFrame(animation);
    resetPose();
    setOpen(false);
  });

  import("./three.min.js").then(async T => {
    const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(34, 1, 0.1, 100);
    scene.add(new T.HemisphereLight(0xfff8e9, 0x7a6d5c, 1.05));
    const key = new T.DirectionalLight(0xffecd3, 3.0);
    key.position.set(-3, 7, 5);
    const rim = new T.DirectionalLight(0xd3e4ff, 2.0);
    rim.position.set(3, 3, -5);
    scene.add(key, rim);

    const model = new T.Group();
    scene.add(model);
    const olive = new T.MeshStandardMaterial({ color: 0x595749, roughness: 0.47, metalness: 0.16 });
    const graphite = new T.MeshStandardMaterial({ color: 0x373139, roughness: 0.52, metalness: 0.14 });
    const rust = new T.MeshStandardMaterial({ color: 0x903f2f, roughness: 0.84 });
    const amber = new T.MeshStandardMaterial({ color: 0xe6c496, emissive: 0xf6a847, emissiveIntensity: 0 });

    function silhouette(parent, contour, material) {
      const profile = contour.map(([radius, axis]) => new T.Vector2(radius, axis));
      const piece = new T.Mesh(new T.LatheGeometry(profile, 64), material);
      piece.rotation.z = -Math.PI / 2;
      parent.add(piece);
    }

    silhouette(model, [[0,-1.21],[.59,-1.21],[.62,-.70],[.58,.85],[.49,1.76],[.31,2.12],[0,2.12]], olive);
    silhouette(model, [[.618,-.99],[.622,-.92]], rust);
    silhouette(model, [[0,-1.224],[.588,-1.224],[.588,-1.212]], amber);

    const cover = new T.Group();
    const front = -1.23;
    cover.position.x = front;
    model.add(cover);
    silhouette(cover, [[0,-1.12],[.12,-1.09],[.24,-1.02],[.35,-.89],[.44,-.72],[.51,-.52],[.56,-.28],[.59,0],[0,0]], graphite);

    const outline = new T.Shape();
    outline.moveTo(.95,.46);
    outline.lineTo(1.49,1.04);
    outline.quadraticCurveTo(1.54,1.10,1.65,1.11);
    outline.lineTo(2.09,1.14);
    outline.quadraticCurveTo(2.22,1.14,2.16,1.01);
    outline.lineTo(1.90,.41);
    outline.closePath();
    const fin = new T.ExtrudeGeometry(outline, { depth: .045, bevelEnabled: true, bevelSize: .025, bevelThickness: .025, bevelSegments: 3, steps: 1 });
    for (const angle of [0, 2 * Math.PI / 3, 4 * Math.PI / 3]) {
      const shape = new T.Mesh(fin, olive);
      shape.rotation.x = angle;
      model.add(shape);
    }

    const label = document.createElement("canvas");
    label.width = 700;
    label.height = 108;
    const ink = label.getContext("2d");
    ink.font = "italic bold 54px sans-serif";
    ink.textAlign = "center";
    ink.textBaseline = "middle";
    ink.fillStyle = "#e4c99e";
    ink.fillText("FLÜGEL DER GLOCKE", 350, 56);
    const texture = new T.CanvasTexture(label);
    texture.colorSpace = T.SRGBColorSpace;
    const lettering = new T.Mesh(new T.PlaneGeometry(2.45,.38), new T.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false }));
    lettering.position.set(.26, .03, .638);
    model.add(lettering);

    function artPlane(image, width, height) {
      const map = new T.CanvasTexture(image);
      map.colorSpace = T.SRGBColorSpace;
      const material = new T.MeshBasicMaterial({ map, transparent: true, depthWrite: false, opacity: 0 });
      const mesh = new T.Mesh(new T.PlaneGeometry(width, height), material);
      scene.add(mesh);
      return mesh;
    }

    const floor = document.createElement("canvas");
    floor.width = floor.height = 128;
    const floorInk = floor.getContext("2d");
    const shade = floorInk.createRadialGradient(64, 64, 0, 64, 64, 64);
    shade.addColorStop(0, "rgba(50,39,33,.34)");
    shade.addColorStop(.48, "rgba(53,44,37,.22)");
    shade.addColorStop(1, "rgba(56,47,38,0)");
    floorInk.fillStyle = shade;
    floorInk.fillRect(0, 0, 128, 128);
    const shadow = artPlane(floor, 6.3, 2.8);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -1.02;
    shadow.material.opacity = 1;

    const svg = stage.querySelector(".case02-projection svg").cloneNode(true);
    svg.setAttribute("stroke", "#ffd493");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("width", "480");
    svg.setAttribute("height", "264");
    const emblemImage = new Image();
    emblemImage.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
    await Promise.all([specimen.decode(), emblemImage.decode()]);

    const projection = document.createElement("canvas");
    projection.width = 640;
    projection.height = 320;
    const projectionInk = projection.getContext("2d");
    const pool = projectionInk.createRadialGradient(320, 160, 60, 320, 160, 306);
    pool.addColorStop(0, "rgba(37,29,31,.97)");
    pool.addColorStop(.55, "rgba(44,35,35,.94)");
    pool.addColorStop(.82, "rgba(51,42,39,.62)");
    pool.addColorStop(1, "rgba(51,42,39,0)");
    projectionInk.fillStyle = pool;
    projectionInk.save();
    projectionInk.translate(0, 88);
    projectionInk.scale(1, .45);
    projectionInk.fillRect(0, -196, 640, 712);
    projectionInk.restore();
    projectionInk.shadowColor = "#efa348";
    projectionInk.shadowBlur = 23;
    projectionInk.drawImage(emblemImage, 104, 35, 432, 237.6);

    const halo = artPlane(projection, 2.95, 1.48);
    const image = artPlane(specimen, 1.84, .94);
    image.renderOrder = 1;

    const smooth = (start, end, time) => {
      const value = Math.max(0, Math.min(1, (time - start) / (end - start)));
      return value * value * (3 - 2 * value);
    };
    let elapsed = 0;
    let previousTime;
    resetPose = () => {
      elapsed = 0;
      previousTime = undefined;
    };
    let lastWidth;
    let lastHeight;
    function frame(now) {
      if (!viewer.open) return;
      const { clientWidth: width, clientHeight: height } = stage;
      if (!width || !height) return;
      if (width !== lastWidth || height !== lastHeight) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        lastWidth = width;
        lastHeight = height;
      }

      const target = opened ? 4100 : 0;
      const delta = previousTime === undefined ? 0 : Math.min(now - previousTime, 60);
      previousTime = now;
      elapsed = reducedMotion.matches ? target
        : elapsed + Math.sign(target - elapsed) * Math.min(Math.abs(target - elapsed), delta * (opened ? 1 : 3.8));

      const approach = smooth(0, 1350, elapsed);
      const release = smooth(520, 1420, elapsed);
      const swing = smooth(1250, 2420, elapsed);
      const settle = smooth(2250, 4050, elapsed);
      const glow = smooth(1600, 2350, elapsed);
      const reveal = smooth(2350, 3270, elapsed);
      const resolve = smooth(3030, 3970, elapsed);

      cover.position.set(front - .39 * release - .17 * swing, .21 * release + .66 * swing, .08 * release - .29 * swing);
      cover.rotation.set(.25 * swing, -.25 * swing, -1.42 * swing);
      amber.emissiveIntensity = glow * (.94 + .41 * (1 - reveal));

      const portrait = camera.aspect < 1.15;
      const wide = Math.max(8.35, (portrait ? 8.6 : 7.0) / camera.aspect);
      const distance = wide - (portrait ? 1.8 : 2.45) * approach + (portrait ? 1.5 : 1.52) * settle;
      camera.position.set(-1.25 - 1.65 * approach + .95 * settle, 1.40 + .55 * swing, distance);
      camera.lookAt(-.06 - .83 * approach + .73 * settle, .04 + .34 * reveal, 0);
      model.rotation.set(.04 + .16 * approach, -.16 + .27 * swing, -.10 + .05 * settle);
      model.position.y = -.36 * reveal;
      shadow.position.y = -1.04 - .28 * reveal;

      halo.position.set(-1.28 + .86 * settle, .76 + .96 * reveal, .55);
      halo.quaternion.copy(camera.quaternion);
      halo.scale.setScalar(.59 + .44 * reveal + (portrait ? -.12 : 0) * settle);
      halo.material.opacity = reveal * (1 - .28 * resolve);
      image.position.copy(halo.position);
      image.position.z += .06;
      image.quaternion.copy(camera.quaternion);
      image.scale.copy(halo.scale);
      image.material.opacity = .79 * resolve;

      renderer.render(scene, camera);
      stage.classList.add("has-three");
      canvas.hidden = false;
      art.hidden = true;
      name.hidden = elapsed >= 3000;
      order.hidden = elapsed < 3000;
      if (elapsed !== target) animation = requestAnimationFrame(frame);
      else previousTime = undefined;
    }

    draw = () => {
      cancelAnimationFrame(animation);
      animation = requestAnimationFrame(frame);
    };
    new ResizeObserver(draw).observe(stage);
    canvas.addEventListener("webglcontextlost", event => {
      event.preventDefault();
      cancelAnimationFrame(animation);
      canvas.hidden = true;
      art.hidden = false;
      stage.classList.remove("has-three");
      name.hidden = opened;
      order.hidden = !opened;
    });
    canvas.addEventListener("webglcontextrestored", draw);
    draw();
  }).catch(() => {
    // The original illustration carries the same reveal when WebGL is unavailable.
  });

  return { reset: () => setOpen(false) };
}
