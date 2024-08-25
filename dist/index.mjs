// src/index.tsx
import { useMemo } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function translateX(x) {
  return `translate(${x},0)`;
}
function translateY(y) {
  return `translate(0,${y})`;
}
function number(scale) {
  return (d) => +scale(d);
}
function center(scale) {
  let offset = Math.max(
    0,
    scale.bandwidth() - 1
  ) / 2;
  if (scale.round()) {
    offset = Math.round(offset);
  }
  return (d) => {
    return +scale(d) + offset;
  };
}
var Axis = (props) => {
  const {
    scale,
    orient,
    tickSizeOuter = 6,
    tickSizeInner = 6,
    tickPadding = 3,
    tickFormat,
    tickValues,
    strokeColor,
    color
  } = props;
  const tickArguments = props.tickArguments ?? [];
  const isVert = orient === "left" || orient === "right";
  const isTopOrLeft = orient === "top" || orient === "left";
  const posOrNeg = isTopOrLeft ? -1 : 1;
  const xOrY = isVert ? "x" : "y";
  const range = scale.range();
  const range0 = +range[0];
  const range1 = +range[range.length - 1];
  const spacing = Math.max(
    tickSizeInner,
    0
  ) + tickPadding;
  const pathD = useMemo(
    () => {
      if (isVert) {
        const x0 = posOrNeg * tickSizeOuter;
        return `M${x0},${range0}H0V${range1}H${x0}`;
      } else {
        const y0 = posOrNeg * tickSizeOuter;
        return `M${range0},${y0}V0H${range1}V${y0}`;
      }
    },
    [posOrNeg, tickSizeOuter, range0, range1, isVert]
  );
  const tickTextStyle = {
    textAnchor: isVert ? isTopOrLeft ? "end" : "start" : "middle",
    fontFamily: "sans-serif",
    fontSize: 10
  };
  const textProps = {
    fill: color ?? "currentColor",
    [xOrY]: posOrNeg * spacing,
    dy: orient === "top" ? "0em" : orient === "bottom" ? "0.71em" : "0.32em",
    style: tickTextStyle
  };
  const tickLineProps = {
    [`${xOrY}2`]: posOrNeg * tickSizeInner
  };
  const tickTextFormatter = tickFormat ?? scale.tickFormat?.(...tickArguments) ?? ((x) => String(x));
  const values = tickValues ?? scale.ticks?.(...tickArguments) ?? scale.domain();
  const translate = isVert ? translateY : translateX;
  const position = (scale.bandwidth ? center : number)(scale.copy());
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        stroke: strokeColor ?? color ?? "currentColor",
        d: pathD,
        shapeRendering: "crispEdges",
        fill: "none"
      }
    ),
    values.map((val, i) => /* @__PURE__ */ jsxs("g", { opacity: "1", transform: translate(position(val)), children: [
      /* @__PURE__ */ jsx(
        "line",
        {
          stroke: strokeColor ?? color ?? "currentColor",
          ...tickLineProps
        }
      ),
      /* @__PURE__ */ jsx("text", { ...textProps, children: tickTextFormatter(val) })
    ] }, i))
  ] });
};
export {
  Axis
};
//# sourceMappingURL=index.mjs.map