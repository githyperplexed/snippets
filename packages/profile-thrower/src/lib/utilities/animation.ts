import { z } from "zod";

import { ProjectileOptionsSchema, type ProjectileOptions } from "$lib/types/animation";

const STEPS = 60;

const getCenter = (rect: DOMRect) => ({
  x: rect.left + rect.width / 2,
  y: rect.top + rect.height / 2,
});

const solvePhysics = (
  startY: number,
  endY: number,
  peakHeight: number,
  duration: number,
) => {
  const minY = Math.min(startY, endY) - peakHeight;
  const height = startY - minY;
  const deltaY = endY - startY;

  const a_quad = 0.5 * duration * duration;
  const b_quad = -(duration * Math.sqrt(2 * height));
  const c_quad = -deltaY;

  const discriminant = b_quad * b_quad - 4 * a_quad * c_quad;

  if (discriminant < 0) return { v0: 0, g: 0 };

  const u = (-b_quad + Math.sqrt(discriminant)) / (2 * a_quad);
  const g = u * u;
  const v0 = -Math.sqrt(2 * g * height);

  return { v0, g };
};

const calculateTransform = (
  start: DOMRect,
  end: DOMRect,
  progress: number,
  physics: { x: number; y: number },
  rotation: number,
) => {
  const scaleX = end.width / start.width;
  const currentScale = 1 + (scaleX - 1) * progress;
  const currentRotation = rotation * progress;

  return `translate(${physics.x}px, ${physics.y}px) scale(${currentScale}) rotate(${currentRotation}deg)`;
};

export const resolvePhysicsOptions = (
  options: ProjectileOptions = ProjectileOptionsSchema.parse({}),
) => {
  const { power, duration, peak } = options;

  return {
    ...options,
    duration: duration * (1 + (0.75 * power)),
    peak: peak * (1 + power),
  };
};

export const getKeyframes = (
  start: DOMRect,
  end: DOMRect,
  options: ProjectileOptions = ProjectileOptionsSchema.parse({}),
): Keyframe[] => {
  const startCenter = getCenter(start);
  const endCenter = getCenter(end);

  const { duration, peak } = options;

  const { v0, g } = solvePhysics(
    startCenter.y,
    endCenter.y,
    peak,
    duration,
  );

  return Array.from({ length: STEPS + 1 }, (_, i) => {
    const t = (i / STEPS) * duration;
    const progress = i / STEPS;

    const currentCenterX =
      startCenter.x + (endCenter.x - startCenter.x) * progress;

    const currentCenterY = startCenter.y + v0 * t + 0.5 * g * t * t;

    const x = currentCenterX - startCenter.x;
    const y = currentCenterY - startCenter.y;

    return {
      transform: calculateTransform(start, end, progress, { x, y }, options.rotation),
      transformOrigin: "center",
    };
  });
};
