/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, type ReactElement, type CSSProperties } from 'react';


function translateX (x: number) {
  return `translate(${x},0)`;
}

function translateY (y: number) {
  return `translate(0,${y})`;
}

function number <TVal> (scale: (d: TVal) => number) {
  return (d: TVal) => +scale(d);
}

function center <TVal> (
  scale: {
    (d: TVal): number;
    bandwidth: () => number;
    round: () => unknown;
  }
) {
  let offset = Math.max(
    0, scale.bandwidth() - 1
  ) / 2; // Adjust for 0.5px offset.
  if (scale.round()){
    offset = Math.round(offset);
  }
  return (d: TVal) => {
    return +scale(d) + offset;
  };
}

export interface IAxisScale <
    TValueType = unknown,
    TTickArgs extends any[] = unknown[],
    TTickFormatArgs extends any[] = unknown[],
> {
    (d: TValueType): number;
    range: () => number[];
    tickFormat?: (...args: TTickFormatArgs) => (n: TValueType) => string;
    ticks?: (...args: TTickArgs) => TValueType[];
    domain?: () => TValueType[];
    copy: () => IAxisScale<TValueType, TTickArgs, TTickFormatArgs>;
}
interface IBandScale <
    TValueType = unknown,
    TTickArgs extends any[] = unknown[],
    TTickFormatArgs extends any[] = unknown[],
> extends IAxisScale<TValueType, TTickArgs> {
    bandwidth: () => number;
    round: () => unknown;
    copy: () => IBandScale<TValueType, TTickArgs, TTickFormatArgs>;
}

export interface IProps <
    TValueType = unknown,
    TTickArgs extends any[] = unknown[],
    TTickFormatArgs extends any[] = TTickArgs,
> {
    orient: 'top' | 'bottom' | 'left' | 'right';
    scale: IAxisScale<TValueType, TTickArgs, TTickFormatArgs> | IBandScale<TValueType, TTickArgs, TTickFormatArgs>;
    scaleRev?: unknown;
    /**
     * `tickArguments` are only passed to the scale; they are not passed to `tickFormat`.
     */
    tickArguments?: TTickFormatArgs;
    tickValues?: TValueType[];

    /**
     * Sets the tick format function.
     * If undefined, the scale's default formatter will be used.
     */
    tickFormat?: (n: TValueType) => string;
    tickSize?: number;
    tickSizeInner?: number;
    tickSizeOuter?: number;
    tickPadding?: number;

    strokeColor?: string;
    color?: string;
}


/**
 * The d3 axis, with some improvements.
 * The style is configurable.
 * The path and lines are now centered on the axis and scale values and use `shape-rendering: crispEdges`.
 *
 * Usage:
 * ```tsx
 * <Axis
 *   orient="bottom"
 *   scale={scale}
 *   tickArguments={[2]}
 * />
 * ```
 */
export const Axis = <
    TValueType,
    TTickArgs extends any[] = unknown[],
    TTickFormatArgs extends TTickArgs = TTickArgs,
> (
  props: IProps<TValueType, TTickArgs, TTickFormatArgs>,
): ReactElement => {
  const {
    scale,
    orient,
    tickSizeOuter = 6,
    tickSizeInner = 6,
    tickPadding = 3,
    tickFormat,
    tickValues,
    strokeColor,
    color,
  } = props;
  const tickArguments: TTickFormatArgs =
    props.tickArguments ??
    [] as any as TTickFormatArgs
  ;
  const isVert = orient === 'left' || orient === 'right';
  const isTopOrLeft = orient === 'top' || orient === 'left';
  const posOrNeg = isTopOrLeft ? -1 : 1;
  const xOrY = isVert ? 'x' : 'y';
  const range: number[] = scale.range();
  const range0 = +range[0];
  const range1 = +range[range.length - 1];
  const spacing = Math.max(
    tickSizeInner, 0
  ) + tickPadding;

  const pathD = useMemo(
    () => {
      if (isVert) {
        // vertical
        const x0 = posOrNeg * tickSizeOuter;
        return `M${x0},${range0}` +
          'H0' +
          `V${range1}` +
          `H${x0}`
        ;
      } else {
        // horizontal
        const y0 = posOrNeg * tickSizeOuter;
        return `M${range0},${y0}` +
          'V0' +
          `H${range1}` +
          `V${y0}`
        ;
      }
    }, [posOrNeg, tickSizeOuter, range0, range1, isVert]
  );

  const tickTextStyle: CSSProperties = {
    textAnchor: isVert ?
      isTopOrLeft ? 'end' : 'start' :
      'middle'
    ,
    fontFamily: 'sans-serif',
    fontSize: 10,
  }

  const textProps = {
    fill: color ?? 'currentColor',
    [xOrY]: posOrNeg * spacing,
    dy: orient === 'top' ?
      '0em' :
      orient === 'bottom' ?
        '0.71em' :
        '0.32em'
    ,
    style: tickTextStyle,
  }
  const tickLineProps = {
    [`${xOrY}2`]: posOrNeg * tickSizeInner,
  };

  const tickTextFormatter: (val: TValueType) => string =
    tickFormat ??
    scale.tickFormat?.(...tickArguments) ??
    ((x) => String(x))
  ;

  const values: TValueType[] =
    tickValues ??
    scale.ticks?.(...tickArguments) ??
    scale.domain!()
  ;

  const translate = isVert ? translateY : translateX;
  const position = (
    (scale as Partial<IBandScale<any, any>>).bandwidth ?
      center :
      number
  )((scale as IBandScale<TValueType, TTickArgs>).copy());

  return (
    <>
      <path
        stroke={strokeColor ?? color ?? 'currentColor'}
        d={pathD}
        shapeRendering="crispEdges"
        fill="none"
      />
      {values.map((
        val, i
      ) => (
        <g key={i} opacity="1" transform={translate(position(val))}>
          <line
            stroke={strokeColor ?? color ?? 'currentColor'}
            {...tickLineProps}
          />
          <text {...textProps}>
            {tickTextFormatter(val)}
          </text>
        </g>
      ))}
    </>
  );
}
