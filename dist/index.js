"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  Axis: () => Axis
});
module.exports = __toCommonJS(src_exports);
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
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
  const pathD = (0, import_react.useMemo)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        stroke: strokeColor ?? color ?? "currentColor",
        d: pathD,
        shapeRendering: "crispEdges",
        fill: "none"
      }
    ),
    values.map((val, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { opacity: "1", transform: translate(position(val)), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "line",
        {
          stroke: strokeColor ?? color ?? "currentColor",
          ...tickLineProps
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", { ...textProps, children: tickTextFormatter(val) })
    ] }, i))
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Axis
});
//# sourceMappingURL=index.js.map