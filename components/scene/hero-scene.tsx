"use client";

import {
  ContactShadows,
  Float,
  Line,
  PresentationControls,
  Sparkles,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";

type PortalExit = {
  active: boolean;
  target: THREE.Vector3 | null;
};

type PortalExitRef = { current: PortalExit };
type LabelRefs = { current: Array<HTMLAnchorElement | null> };

const ROOM_RADIUS = 10;
const WALL_HEIGHT = 7.8;
const LABEL_HEIGHT = 5.2;

const worlds = [
  { number: "01", label: "The Winner", href: "#winner" },
  { number: "02", label: "The Builder", href: "#builder" },
  { number: "03", label: "The Mind", href: "#mind" },
];

function createArch(width: number, height: number) {
  const radius = width / 2;
  const shape = new THREE.Shape();

  shape.moveTo(-width / 2, 0);
  shape.lineTo(-width / 2, height - radius);
  shape.absarc(0, height - radius, radius, Math.PI, 0, true);
  shape.lineTo(width / 2, 0);
  shape.closePath();

  return shape;
}

function getPortalGeometry(narrow: boolean) {
  const spread = narrow ? 0.32 : 0.52;
  const scale = narrow ? 0.88 : 1;

  return worlds.map((world, index) => {
    const angle = -Math.PI / 2 + (index - 1) * spread;
    const x = Math.cos(angle) * (ROOM_RADIUS - 0.03);
    const z = Math.sin(angle) * (ROOM_RADIUS - 0.03);

    return {
      ...world,
      angle,
      x,
      z,
      scale,
      rotationY: -angle - Math.PI / 2,
      portalPoint: new THREE.Vector3(x, 1.8, z),
      labelPoint: new THREE.Vector3(x, LABEL_HEIGHT * scale, z),
    };
  });
}

function Arch({
  href,
  label,
  number,
  x,
  z,
  rotationY,
  scale,
  hovered,
  onHover,
  onEnter,
}: {
  href: string;
  label: string;
  number: string;
  x: number;
  z: number;
  rotationY: number;
  scale: number;
  hovered: boolean;
  onHover: (href: string | null) => void;
  onEnter: (href: string, point: THREE.Vector3) => void;
}) {
  const shape = useMemo(() => createArch(2.4, 3.95), []);
  const outline = useMemo(
    () => shape.getPoints(64).map((point) => new THREE.Vector3(point.x, point.y, 0)),
    [shape],
  );
  const portalPoint = useMemo(() => new THREE.Vector3(x, 1.8, z), [x, z]);

  const enter = useCallback(() => {
    onEnter(href, portalPoint);
  }, [href, onEnter, portalPoint]);

  return (
    <group position={[x, 0, z]} rotation={[0, rotationY, 0]} scale={scale}>
      <mesh position={[0, 0, 0.015]} receiveShadow>
        <extrudeGeometry args={[shape, { depth: 0.03, bevelEnabled: false }]} />
        <meshStandardMaterial
          color="#9a8870"
          emissive="#2a2016"
          emissiveIntensity={0.18}
          roughness={0.98}
          metalness={0.02}
        />
      </mesh>

      <Line
        points={outline}
        position={[0, 0, 0.06]}
        color="#efe4d2"
        lineWidth={0.7}
        transparent
        opacity={hovered ? 0.5 : 0.22}
      />

      {[-1.32, 1.32].map((px) => (
        <group key={px}>
          <mesh position={[px, 1.93, 0.15]} castShadow receiveShadow>
            <boxGeometry args={[0.28, 3.86, 0.3]} />
            <meshStandardMaterial color={hovered ? "#e6d8c2" : "#dbccb5"} roughness={0.9} />
          </mesh>
          <mesh position={[px, 0.1, 0.22]} castShadow>
            <boxGeometry args={[0.38, 0.2, 0.48]} />
            <meshStandardMaterial color="#c9b79d" roughness={0.9} />
          </mesh>
          <mesh position={[px, 3.9, 0.15]} castShadow>
            <boxGeometry args={[0.36, 0.18, 0.34]} />
            <meshStandardMaterial color="#d2c0a7" roughness={0.9} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 2.75, 0.16]} castShadow receiveShadow>
        <torusGeometry args={[1.32, 0.12, 18, 80, Math.PI]} />
        <meshStandardMaterial color={hovered ? "#e8dac4" : "#dccdb5"} roughness={0.88} />
      </mesh>

      <mesh position={[0, 4.06, 0.16]} castShadow>
        <boxGeometry args={[0.26, 0.44, 0.32]} />
        <meshStandardMaterial color="#d6c4ab" roughness={0.9} />
      </mesh>

      <mesh position={[0, 0.035, 0.42]} receiveShadow>
        <boxGeometry args={[2.8, 0.07, 0.6]} />
        <meshStandardMaterial color="#c3b096" roughness={0.92} />
      </mesh>

      <pointLight
        position={[0, 1.4, 0.8]}
        intensity={hovered ? 9 : 2.6}
        distance={5}
        decay={2}
        color="#ffe9c4"
      />

      <mesh
        position={[0, 2.1, 0.55]}
        onClick={enter}
        onPointerOver={(event) => {
          event.stopPropagation();
          onHover(href);
        }}
        onPointerOut={() => onHover(null)}
      >
        <planeGeometry args={[3.2, 4.7]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Room({
  narrow,
  hoveredHref,
  onHover,
  onEnter,
}: {
  narrow: boolean;
  hoveredHref: string | null;
  onHover: (href: string | null) => void;
  onEnter: (href: string, point: THREE.Vector3) => void;
}) {
  const portals = useMemo(() => getPortalGeometry(narrow), [narrow]);
  const spread = narrow ? 0.32 : 0.52;

  return (
    <group>
      <mesh receiveShadow position={[0, WALL_HEIGHT / 2, 0]}>
        <cylinderGeometry args={[ROOM_RADIUS, ROOM_RADIUS, WALL_HEIGHT, 128, 1, true]} />
        <meshStandardMaterial color="#d8ccba" roughness={1} side={THREE.BackSide} />
      </mesh>

      <mesh position={[0, 0.17, 0]} receiveShadow>
        <cylinderGeometry args={[ROOM_RADIUS - 0.02, ROOM_RADIUS - 0.02, 0.34, 128, 1, true]} />
        <meshStandardMaterial color="#c2b096" roughness={0.95} side={THREE.BackSide} />
      </mesh>

      <mesh position={[0, 7.14, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ROOM_RADIUS - 0.03, 0.075, 10, 128]} />
        <meshStandardMaterial color="#cbb99f" roughness={0.9} />
      </mesh>

      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[ROOM_RADIUS, 128]} />
        <meshStandardMaterial color="#baa98f" roughness={0.9} />
      </mesh>

      {[2.7, 5.6, 9.3].map((radius) => (
        <mesh
          key={radius}
          position={[0, 0.006, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[radius, radius + 0.028, 128]} />
          <meshBasicMaterial
            color="#8d7a62"
            transparent
            opacity={0.34}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      <mesh position={[0, 7.64, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, ROOM_RADIUS, 128]} />
        <meshStandardMaterial color="#e7ddcb" roughness={0.98} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[0, 7.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.2, 96]} />
        <meshBasicMaterial color="#f4e8d2" side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[0, 7.63, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.09, 12, 96]} />
        <meshStandardMaterial color="#c8b69c" roughness={0.9} />
      </mesh>

      {portals.map((portal) => (
        <Arch
          key={portal.href}
          href={portal.href}
          label={portal.label}
          number={portal.number}
          x={portal.x}
          z={portal.z}
          rotationY={portal.rotationY}
          scale={portal.scale}
          hovered={hoveredHref === portal.href}
          onHover={onHover}
          onEnter={onEnter}
        />
      ))}

      {!narrow
        ? [-1.55, -0.55, 0.55, 1.55].map((step) => {
            const angle = -Math.PI / 2 + spread * step;
            const x = Math.cos(angle) * (ROOM_RADIUS - 0.06);
            const z = Math.sin(angle) * (ROOM_RADIUS - 0.06);

            return (
              <group
                key={step}
                position={[x, 0, z]}
                rotation={[0, -angle - Math.PI / 2, 0]}
              >
                <mesh position={[0, 3.6, 0.02]} receiveShadow>
                  <boxGeometry args={[0.42, 7.1, 0.14]} />
                  <meshStandardMaterial color="#d3c4ad" roughness={0.95} />
                </mesh>
                <mesh position={[0, 7.12, 0.04]}>
                  <boxGeometry args={[0.58, 0.16, 0.22]} />
                  <meshStandardMaterial color="#cdbca3" roughness={0.92} />
                </mesh>
                <mesh position={[0, 0.14, 0.04]}>
                  <boxGeometry args={[0.58, 0.2, 0.24]} />
                  <meshStandardMaterial color="#c4b197" roughness={0.92} />
                </mesh>
              </group>
            );
          })
        : null}
    </group>
  );
}

function Sculpture() {
  const slowSpin = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (slowSpin.current) {
      slowSpin.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group position={[1.1, 0, 0.35]}>
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[0.98, 1.05, 0.1, 64]} />
        <meshStandardMaterial color="#b3a088" roughness={0.9} />
      </mesh>

      <mesh position={[0, 0.47, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.64, 0.7, 0.76, 64]} />
        <meshStandardMaterial color="#f1ebdf" roughness={0.52} metalness={0.01} />
      </mesh>

      <mesh position={[0, 0.87, 0]}>
        <cylinderGeometry args={[0.67, 0.67, 0.04, 64]} />
        <meshStandardMaterial color="#203129" roughness={0.42} metalness={0.12} />
      </mesh>

      <group position={[0, 1.95, 0]}>
        <Float speed={1.05} rotationIntensity={0.1} floatIntensity={0.12}>
          <PresentationControls
            snap
            speed={1.3}
            polar={[-0.4, 0.4]}
            azimuth={[-0.75, 0.75]}
          >
            <group ref={slowSpin} rotation={[0.22, 0.35, -0.18]}>
              <mesh castShadow receiveShadow>
                <torusKnotGeometry args={[0.64, 0.205, 192, 32]} />
                <meshStandardMaterial color="#eee7dc" roughness={0.32} metalness={0.04} />
              </mesh>

              <mesh castShadow position={[0, 0.06, 0]} rotation={[0.2, 0, 0.32]}>
                <torusGeometry args={[1.04, 0.02, 12, 128]} />
                <meshStandardMaterial color="#b89579" roughness={0.35} metalness={0.45} />
              </mesh>

              <mesh
                castShadow
                position={[0.06, 0.7, 0.08]}
                rotation={[0.7, 0.28, 0.46]}
              >
                <torusGeometry args={[0.7, 0.034, 16, 96, Math.PI * 1.38]} />
                <meshStandardMaterial color="#203129" roughness={0.58} />
              </mesh>

              <mesh castShadow position={[0.98, -0.32, 0.2]}>
                <sphereGeometry args={[0.075, 24, 24]} />
                <meshStandardMaterial color="#203129" roughness={0.5} />
              </mesh>
            </group>
          </PresentationControls>
        </Float>
      </group>

      <ContactShadows
        position={[0, 0.9, 0]}
        scale={5}
        opacity={0.32}
        blur={2.4}
        far={1.8}
        color="#4f3d2c"
      />
    </group>
  );
}

function CameraRig({ exitRef }: { exitRef: PortalExitRef }) {
  const { camera, size } = useThree();
  const narrow = size.width < 760;
  const reduce = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  const look = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const perspective = camera as THREE.PerspectiveCamera;
    perspective.fov = narrow ? 64 : 40;
    perspective.updateProjectionMatrix();
  }, [camera, narrow]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const exit = exitRef.current;

    if (exit.active && exit.target) {
      const ease = 1 - Math.exp(-4.6 * delta);
      camera.position.x += (exit.target.x * 0.94 - camera.position.x) * ease;
      camera.position.y += (1.72 - camera.position.y) * ease;
      camera.position.z += (exit.target.z * 0.94 - camera.position.z) * ease;
      camera.lookAt(exit.target.x, 1.95, exit.target.z);
      return;
    }

    const driftX = reduce ? 0 : Math.sin(time * 0.16) * 0.16;
    const driftY = reduce ? 0 : Math.sin(time * 0.22) * 0.03;
    const driftZ = reduce ? 0 : Math.sin(time * 0.11) * 0.07;

    const targetX = state.pointer.x * 0.48 + driftX;
    const targetY = (narrow ? 1.98 : 1.92) + state.pointer.y * 0.1 + driftY;
    const targetZ = (narrow ? 6.2 : 6.9) + driftZ;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.1, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.1, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 1.5, delta);

    look.set(state.pointer.x * 0.26, narrow ? 2.35 : 2.32, -1.2);
    camera.lookAt(look);
  });

  return null;
}

function LabelProjector({
  points,
  refs,
}: {
  points: THREE.Vector3[];
  refs: RefObject<Array<HTMLAnchorElement | null>>;
}) {
  const { camera, size } = useThree();
  const vector = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const elements = refs?.current;
    if (!elements) return;

    elements.forEach((element, index) => {
      const point = points[index];
      if (!element || !point) return;

      vector.copy(point).project(camera);
      const x = (vector.x * 0.5 + 0.5) * size.width;
      const y = (-vector.y * 0.5 + 0.5) * size.height;
      const visible = vector.z < 1;

      element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      element.style.opacity = visible ? "1" : "0";
      element.style.pointerEvents = visible ? "auto" : "none";
    });
  });

  return null;
}

function SceneContents({
  narrow,
  hoveredHref,
  labelPoints,
  labelRefs,
  exitRef,
  onHover,
  onEnter,
}: {
  narrow: boolean;
  hoveredHref: string | null;
  labelPoints: THREE.Vector3[];
  labelRefs: RefObject<Array<HTMLAnchorElement | null>>;
  exitRef: PortalExitRef;
  onHover: (href: string | null) => void;
  onEnter: (href: string, point: THREE.Vector3) => void;
}) {
  return (
    <>
      <Room
        narrow={narrow}
        hoveredHref={hoveredHref}
        onHover={onHover}
        onEnter={onEnter}
      />
      <Sculpture />
      <Sparkles
        count={48}
        scale={[7, 5.5, 7]}
        position={[0, 3.6, 0]}
        size={1.3}
        speed={0.24}
        opacity={0.34}
        color="#fff3dd"
        noise={0.6}
      />
      <CameraRig exitRef={exitRef} />
      <LabelProjector points={labelPoints} refs={labelRefs} />
    </>
  );
}

export function HeroScene() {
  const exitRef = useRef<PortalExit>({ active: false, target: null });
  const labelRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const timers = useRef<number[]>([]);
  const [veil, setVeil] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const narrow = viewportWidth > 0 && viewportWidth < 760;
  const portals = useMemo(() => getPortalGeometry(narrow), [narrow]);
  const labelPoints = useMemo(() => portals.map((portal) => portal.labelPoint), [portals]);

  const onHover = useCallback((href: string | null) => {
    setHoveredHref(href);
  }, []);

  const enterRoom = useCallback((href: string, point: THREE.Vector3) => {
    if (exitRef.current.active) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    exitRef.current = { active: true, target: point.clone() };
    setVeil(true);

    timers.current.push(
      window.setTimeout(
        () => {
          document.querySelector(href)?.scrollIntoView({ behavior: "auto", block: "start" });
        },
        reduce ? 60 : 760,
      ),
    );

    timers.current.push(
      window.setTimeout(
        () => {
          exitRef.current = { active: false, target: null };
          setVeil(false);
        },
        reduce ? 300 : 1180,
      ),
    );
  }, []);

  return (
    <div className="hero-scene h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.65]}
        camera={{ position: [0, 2.25, 8.4], fov: 40, near: 0.1, far: 70 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.04;
        }}
      >
        <color attach="background" args={["#d8ccba"]} />
        <fog attach="fog" args={["#d8ccba", 18, 44]} />

        <ambientLight intensity={0.42} color="#fff7e9" />
        <hemisphereLight args={["#fff8ed", "#6d5c48", 0.85]} />
        <directionalLight position={[-6, 6.5, 5]} intensity={1.35} color="#ffeed6" />
        <spotLight
          castShadow
          position={[0, 7.4, 0]}
          angle={0.55}
          penumbra={0.9}
          intensity={120}
          distance={22}
          decay={1.7}
          color="#ffeacb"
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0004}
        />
        <pointLight position={[4.5, 2.6, 3.6]} intensity={9} color="#d9e1d6" />
        <pointLight position={[-3.6, 2.2, 2.4]} intensity={6} color="#f2d7b9" />

        <SceneContents
          narrow={narrow}
          hoveredHref={hoveredHref}
          labelPoints={labelPoints}
          labelRefs={labelRefs}
          exitRef={exitRef}
          onHover={onHover}
          onEnter={enterRoom}
        />
      </Canvas>

      <div className="portal-labels">
        {portals.map((portal, index) => (
          <a
            key={portal.href}
            href={portal.href}
            ref={(node) => {
              labelRefs.current[index] = node;
            }}
            className={`room-label${hoveredHref === portal.href ? " is-hovered" : ""}`}
            onClick={(event) => {
              event.preventDefault();
              enterRoom(portal.href, portal.portalPoint);
            }}
            onPointerEnter={() => onHover(portal.href)}
            onPointerLeave={() =>
              setHoveredHref((current) => (current === portal.href ? null : current))
            }
          >
            <span className="room-label-number">{portal.number}</span>
            <span className="room-label-title">{portal.label}</span>
          </a>
        ))}
      </div>

      {typeof document !== "undefined"
        ? createPortal(
            <div className="portal-veil" data-active={veil} aria-hidden="true" />,
            document.body,
          )
        : null}
    </div>
  );
}
