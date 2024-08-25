import { ReactElement } from 'react';

interface IAxisScale<TValueType = unknown, TTickArgs extends any[] = unknown[], TTickFormatArgs extends any[] = unknown[]> {
    (d: TValueType): number;
    range: () => number[];
    tickFormat?: (...args: TTickFormatArgs) => (n: TValueType) => string;
    ticks?: (...args: TTickArgs) => TValueType[];
    domain?: () => TValueType[];
    copy: () => IAxisScale<TValueType, TTickArgs, TTickFormatArgs>;
}
interface IBandScale<TValueType = unknown, TTickArgs extends any[] = unknown[], TTickFormatArgs extends any[] = unknown[]> extends IAxisScale<TValueType, TTickArgs> {
    bandwidth: () => number;
    round: () => unknown;
    copy: () => IBandScale<TValueType, TTickArgs, TTickFormatArgs>;
}
interface IProps<TValueType = unknown, TTickArgs extends any[] = unknown[], TTickFormatArgs extends any[] = TTickArgs> {
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
declare const Axis: <TValueType, TTickArgs extends any[] = unknown[], TTickFormatArgs extends TTickArgs = TTickArgs>(props: IProps<TValueType, TTickArgs, TTickFormatArgs>) => ReactElement;

export { Axis, type IAxisScale, type IProps };
