"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

const routeDuration = 1900;
const routePause = 260;

function wait(duration: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, duration));
}

function center(rect: DOMRect, origin: DOMRect): Point {
  return {
    x: rect.left - origin.left + rect.width / 2,
    y: rect.top - origin.top + rect.height / 2,
  };
}

function dedupePoints(points: Point[]) {
  return points.filter((point, index) => {
    const previous = points[index - 1];
    return !previous || Math.hypot(point.x - previous.x, point.y - previous.y) > 0.5;
  });
}

function pathKeyframes(points: Point[]): Keyframe[] {
  const path = dedupePoints(points);
  const distances = path.slice(1).map((point, index) => (
    Math.hypot(point.x - path[index].x, point.y - path[index].y)
  ));
  const totalDistance = distances.reduce((total, distance) => total + distance, 0) || 1;
  let travelled = 0;

  const positionFrames = path.map((point, index) => {
    if (index > 0) travelled += distances[index - 1];

    return {
      transform: `translate3d(${point.x}px, ${point.y}px, 0)`,
      opacity: 1,
      offset: 0.06 + (travelled / totalDistance) * 0.86,
    } satisfies Keyframe;
  });

  const first = path[0];
  const last = path[path.length - 1];

  return [
    {
      transform: `translate3d(${first.x}px, ${first.y}px, 0)`,
      opacity: 0,
      offset: 0,
    },
    ...positionFrames,
    {
      transform: `translate3d(${last.x}px, ${last.y}px, 0)`,
      opacity: 0,
      offset: 1,
    },
  ];
}

export default function FlowParticle() {
  const layerRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const particle = particleRef.current;
    const diagram = layer?.parentElement;

    if (!layer || !particle || !diagram) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileLayout = window.matchMedia("(max-width: 820px)");
    let activeAnimation: Animation | null = null;
    let stopped = false;
    let sourceIndex = 0;
    let agentIndex = 0;

    const getRoute = (sourceRoute: number, agentRoute: number): Point[] | null => {
      const sources = Array.from(diagram.querySelectorAll<HTMLElement>(".source-pill"));
      const agents = Array.from(diagram.querySelectorAll<HTMLElement>(".agent-logo"));
      const sourceNetwork = diagram.querySelector<HTMLElement>(".source-network");
      const mcp = diagram.querySelector<HTMLElement>(".mcp-node");
      const agentOutcome = diagram.querySelector<HTMLElement>(".agent-outcome");
      const source = sources[sourceRoute];
      const agent = agents[agentRoute];

      if (!source || !agent || !sourceNetwork || !mcp || !agentOutcome) return null;

      const origin = layer.getBoundingClientRect();
      const sourceRect = source.getBoundingClientRect();
      const sourceNetworkRect = sourceNetwork.getBoundingClientRect();
      const mcpRect = mcp.getBoundingClientRect();
      const agentOutcomeRect = agentOutcome.getBoundingClientRect();
      const agentRect = agent.getBoundingClientRect();
      const sourceCenter = center(sourceRect, origin);
      const mcpCenter = center(mcpRect, origin);
      const agentCenter = center(agentRect, origin);

      if (!mobileLayout.matches) {
        const sourcePadding = Number.parseFloat(getComputedStyle(sourceNetwork).paddingRight) || 0;
        const agentPadding = Number.parseFloat(getComputedStyle(agentOutcome).paddingLeft) || 0;
        const sourceBusX = sourceNetworkRect.right - origin.left - sourcePadding / 2;
        const agentBusX = agentOutcomeRect.left - origin.left + agentPadding / 2;

        return [
          { x: sourceRect.right - origin.left - 12, y: sourceCenter.y },
          { x: sourceBusX, y: sourceCenter.y },
          { x: sourceBusX, y: mcpCenter.y },
          { x: mcpRect.left - origin.left, y: mcpCenter.y },
          { x: mcpRect.right - origin.left, y: mcpCenter.y },
          { x: agentBusX, y: mcpCenter.y },
          { x: agentBusX, y: agentCenter.y },
          { x: agentRect.left - origin.left + 12, y: agentCenter.y },
        ];
      }

      const centerX = mcpCenter.x;
      const sourceFromLeft = sourceRoute % 2 === 0;
      const targetOnLeft = agentRoute % 2 === 0;

      return [
        {
          x: (sourceFromLeft ? sourceRect.right - 12 : sourceRect.left + 12) - origin.left,
          y: sourceCenter.y,
        },
        { x: centerX, y: sourceCenter.y },
        { x: centerX, y: mcpRect.top - origin.top },
        { x: centerX, y: mcpRect.bottom - origin.top },
        { x: centerX, y: agentCenter.y },
        {
          x: (targetOnLeft ? agentRect.right - 12 : agentRect.left + 12) - origin.left,
          y: agentCenter.y,
        },
      ];
    };

    const run = async () => {
      await wait(900);

      while (!stopped) {
        if (reducedMotion.matches) {
          await wait(400);
          continue;
        }

        const route = getRoute(sourceIndex, agentIndex);

        if (!route) {
          await wait(routePause);
          continue;
        }

        activeAnimation = particle.animate(pathKeyframes(route), {
          duration: routeDuration,
          easing: "linear",
          fill: "none",
        });

        let completed = false;

        try {
          await activeAnimation.finished;
          completed = true;
        } catch {
          // Resizing or changing motion preferences cancels the current route.
        }

        activeAnimation = null;
        if (completed) {
          const sourceCount = diagram.querySelectorAll(".source-pill").length || 1;
          const agentCount = diagram.querySelectorAll(".agent-logo").length || 1;
          sourceIndex = (sourceIndex + 1) % sourceCount;
          agentIndex = (agentIndex + 1) % agentCount;
        }
        await wait(routePause);
      }
    };

    const cancelActiveRoute = () => activeAnimation?.cancel();
    const resizeObserver = new ResizeObserver(cancelActiveRoute);
    resizeObserver.observe(diagram);
    reducedMotion.addEventListener("change", cancelActiveRoute);
    mobileLayout.addEventListener("change", cancelActiveRoute);
    void run();

    return () => {
      stopped = true;
      activeAnimation?.cancel();
      resizeObserver.disconnect();
      reducedMotion.removeEventListener("change", cancelActiveRoute);
      mobileLayout.removeEventListener("change", cancelActiveRoute);
    };
  }, []);

  return (
    <div className="flow-particle-layer" ref={layerRef} aria-hidden="true">
      <span className="flow-particle-dot" ref={particleRef} />
    </div>
  );
}
