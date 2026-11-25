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
  let animation;

  art.src = new URL("fluegel-der-glocke.png", import.meta.url);
  specimen.src = new URL("gefluegelter-schluessel.png", import.meta.url);

  function setOpen(next) {
    opened = next;
    stage.classList.toggle("is-revealed", opened);
    toggle.setAttribute("aria-pressed", String(opened));
    toggle.textContent = opened ? "앞부분 닫기" : "앞부분 열기";
    name.hidden = opened;
    order.hidden = !opened;
    draw();
  }

  toggle.addEventListener("click", () => setOpen(!opened));
  viewer.addEventListener("close", () => {
    cancelAnimationFrame(animation);
    setOpen(false);
  });

  import("./three.min.js").then(T => {
    const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(34, 1, 0.1, 100);
    scene.add(new T.HemisphereLight(0xfff1d6, 0x666c71, 2.15));
    const key = new T.DirectionalLight(0xffe7bb, 2.45);
    key.position.set(-3, 5, 7);
    scene.add(key);

    const model = new T.Group();
    scene.add(model);
    const olive = new T.MeshStandardMaterial({ color: 0x64604c, roughness: 0.85 });
    const graphite = new T.MeshStandardMaterial({ color: 0x38333a, roughness: 0.8 });
    const rust = new T.MeshStandardMaterial({ color: 0x903f2f, roughness: 0.84 });
    const amber = new T.MeshStandardMaterial({ color: 0xe6c496, emissive: 0xf6a847, emissiveIntensity: 0 });

    function silhouette(parent, contour, material) {
      const profile = contour.map(([radius, axis]) => new T.Vector2(radius, axis));
      const piece = new T.Mesh(new T.LatheGeometry(profile, 40), material);
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
    silhouette(cover, [[0,-1.07],[.18,-1.01],[.35,-.85],[.49,-.60],[.59,0],[0,0]], graphite);

    const outline = new T.Shape();
    outline.moveTo(.95,.46);
    outline.lineTo(1.55,1.10);
    outline.lineTo(2.19,1.10);
    outline.lineTo(1.95,.39);
    outline.closePath();
    const fin = new T.ExtrudeGeometry(outline, { depth: .045, bevelEnabled: true, bevelSize: .025, bevelThickness: .025, bevelSegments: 1, steps: 1 });
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

    let progress = 0;
    let previousTime;
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

      const target = Number(opened);
      const step = previousTime === undefined ? 0 : Math.min((now - previousTime) / 680, 1);
      previousTime = now;
      progress = reducedMotion.matches ? target : progress + Math.sign(target - progress) * Math.min(Math.abs(target - progress), step);
      const pose = progress * progress * (3 - 2 * progress);
      cover.position.set(front - .28 * pose, .50 * pose, 0);
      cover.rotation.z = -1.45 * pose;
      amber.emissiveIntensity = pose * 1.1;

      const portrait = camera.aspect < 1.15;
      const distance = Math.max(9.6, 7.7 / camera.aspect);
      model.rotation.set(.12, .28 + .29 * pose, -.08 + .11 * pose);
      model.position.y = (portrait ? -.95 : -.42) * pose;
      camera.position.set(-.52 - .72 * pose, .86, distance);
      camera.lookAt(0, .20, 0);
      renderer.render(scene, camera);
      canvas.hidden = false;
      art.hidden = true;
      if (progress !== target) animation = requestAnimationFrame(frame);
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
    });
    canvas.addEventListener("webglcontextrestored", draw);
    draw();
  }).catch(() => {
    // The original illustration carries the same reveal when WebGL is unavailable.
  });

  return { reset: () => setOpen(false) };
}
