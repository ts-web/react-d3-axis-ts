/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type PropsWithChildren, type CSSProperties } from 'react';
import { scaleLinear, scaleLog, scaleTime, scalePoint } from 'd3-scale';
import * as d3 from 'd3';

import { Axis } from '~/index';


export default {
  title: 'Example/Axis',
  component: Axis,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const width = 500;
const axisFrameStyles: CSSProperties = {
  boxShadow: '0 0 1em 1em #aaa',
  margin: '2em',
  display: 'flex',
  width,
  overflow: 'visible',
};

const Frame = ({children}: PropsWithChildren) => (
  <div style={axisFrameStyles}>
    <svg
      width={width}
      height={33}
      viewBox={`0 0 ${String(width)} 33`}
      style={{
        overflow: 'visible',
      }}
    >
      <g
        transform={`translate(0,0)`}
      >
        {children}
      </g>
    </svg>
  </div>
);

function d3AxisBootstrap (
  el: HTMLElement | null,
  fn: () => d3.Axis<any>,
) {
  if (!el) return;
  const axis = fn();
  const svg = d3.create('svg')
    .attr('width', width)
    .attr('height', 33)
    .attr('viewBox', `0 0 ${String(width)} 33`)
    .attr('style', 'overflow: visible')
  ;
  svg
    .append('g')
    .attr('transform', `translate(0,0)`)
    .call(axis)
  ;
  el.appendChild(svg.node()!);
}

export const Fig1 = () => (
  <Fig1_Component />
);
const Fig1_Component = () => {
  const scale = scaleLinear();
  scale.range([0, width]);

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    d3AxisBootstrap(el, () =>
      d3.axisBottom(scale)
        .ticks(2),
    );
  }, [el, scale]);

  return (
    <>
      <p>
        On top, a declarative Axis with <kbd>orient="bottom"</kbd>, a linear scale, and{' '}
        <kbd>tickArguments={'{[2]}'}</kbd> (which creates three tick marks.)<br />
        On the bottom, the imperative d3 equivalent looks almost the same, but with a more blurry line.
      </p>
      <Frame>
        <Axis
          orient="bottom"
          scale={scale}
          tickArguments={[2]}
        />
      </Frame>
      <div style={axisFrameStyles} ref={setEl} />
    </>
  );
}


export const Fig2 = () => (
  <Fig2_Component />
);
const Fig2_Component = () => {
  const scale = scaleLinear();
  scale.range([0, width]);

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    d3AxisBootstrap(el, () =>
      d3.axisBottom(scale)
        .ticks(5),
    );
  }, [el, scale]);

  return (
    <>
      <p>
        The same as Fig 1, but with <kbd>tickArguments={'{[5]}'}</kbd>, creating six tick marks.
      </p>
      <Frame>
        <Axis
          orient="bottom"
          scale={scale}
          tickArguments={[5]}
        />
      </Frame>
      <div style={axisFrameStyles} ref={setEl} />
    </>
  );
}

export const Fig3 = () => (
  <Fig3_Component />
);
const Fig3_Component = () => {
  const scale = scaleLinear();
  scale.range([0, width]);

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    d3AxisBootstrap(el, () =>
      d3.axisBottom(scale)
        .ticks(10),
    );
  }, [el, scale]);

  return (
    <>
      <p>
        The same as Fig 1 and Fig 2, but with <kbd>tickArguments={'{[10]}'}</kbd>, creating eleven tick marks.
      </p>
      <Frame>
        <Axis
          orient="bottom"
          scale={scale}
          tickArguments={[10]}
        />
      </Frame>
      <div style={axisFrameStyles} ref={setEl} />
    </>
  );
}


export const Fig4 = () => (
  <Fig4_Component />
);
const Fig4_Component = () => {
  const scale = scaleLinear();
  scale.range([0, width]);

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    d3AxisBootstrap(el, () =>
      d3.axisBottom(scale)
        .ticks(10, '+f'),
    );
  }, [el, scale]);

  return (
    <>
      <p>
        With <kbd>tickArguments={`{[10, '+f']}`}</kbd> — eleven ticks, formatted as floats with a sign indicator.
      </p>
      <Frame>
        <Axis
          orient="bottom"
          scale={scale}
          tickArguments={[10, '+f'] as any}
        />
      </Frame>
      <div style={axisFrameStyles} ref={setEl} />
    </>
  );
}

export const Fig5 = () => (
  <Fig5_Component />
);
const Fig5_Component = () => {
  const scale = scaleLinear();
  scale.range([0, width]);

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    d3AxisBootstrap(el, () =>
      d3.axisBottom(scale)
        .ticks(15, '+f'),
    );
  }, [el, scale]);

  return (
    <>
      <p>
        The same as Fig 5, but with <kbd>tickArguments={`{[15, '+f']}`}</kbd>, which shows two decimal places. Since some ticks require it, all ticks display it.
      </p>
      <Frame>
        <Axis
          orient="bottom"
          scale={scale}
          tickArguments={[15, '+f'] as any}
        />
      </Frame>
      <div style={axisFrameStyles} ref={setEl} />
    </>
  );
}

export const Fig6 = () => (
  <Fig6_Component />
);
const Fig6_Component = () => {
  const scale = scaleLinear();
  scale.range([0, width]);

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    d3AxisBootstrap(el, () =>
      d3.axisBottom(scale)
        .ticks(10, '$.2f'),
    );
  }, [el, scale]);

  return (
    <>
      <Frame>
        <p>
          With <kbd>tickArguments={`{[10, '$.2f']}`}</kbd> — a common currency format.
        </p>
        <Axis
          orient="bottom"
          scale={scale}
          tickArguments={[10, '$.2f'] as any}
        />
      </Frame>
      <div style={axisFrameStyles} ref={setEl} />
    </>
  );
}


export const Fig7 = () => (
  <Fig7_Component />
);
const Fig7_Component = () => {
  const scale = scaleLinear();
  scale.range([0, width]);

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    d3AxisBootstrap(el, () =>
      d3.axisBottom(scale)
        .tickFormat(x => `(${(x as number).toFixed(1)})`),
    )
  }, [el, scale]);

  return (
    <>
      <p>
        With a custom tickArguments function: <kbd>{'(x) => `(${x.toFixed(1)})`'}</kbd>.
      </p>
      <Frame>
        <Axis
          orient="bottom"
          scale={scale}
          tickFormat={x => `(${x.toFixed(1)})`}
        />
      </Frame>
      <div style={axisFrameStyles} ref={setEl} />
    </>
  );
}

export const Fig8 = () => (
  <Fig8_Component />
);
const Fig8_Component = () => {
  const scale = scaleLog();
  scale.range([0, width]);
  scale.domain([1e0, 1e6]);

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    d3AxisBootstrap(el, () =>
      d3.axisBottom(scale)
        .ticks(2),
    );
  }, [el, scale]);

  return (
    <>
      <Frame>
        <p>
          With a scale from 1e0 to 1e6, and <kbd>tickArguments={`{[2]}`}</kbd> — shows e-notation.
        </p>
        <Axis
          orient="bottom"
          scale={scale}
          tickArguments={[2]}
        />
      </Frame>
      <div style={axisFrameStyles} ref={setEl} />
    </>
  );
}

export const Fig9 = () => (
  <Fig9_Component />
);
const Fig9_Component = () => {
  const scale = scaleLog();
  scale.range([0, width]);
  scale.domain([1e0, 1e6]);

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    d3AxisBootstrap(el, () =>
      d3.axisBottom(scale)
        .ticks(10),
    );
  }, [el, scale]);

  return (
    <>
    <p>
      Demonstrating a log scale of domain 1e0 to 1e6, with <kbd>tickArguments={`{[10]}`}</kbd>.
      </p>
      <Frame>
        <Axis
          orient="bottom"
          scale={scale}
          tickArguments={[10]}
        />
      </Frame>
      <div style={axisFrameStyles} ref={setEl} />
    </>
  );
}

export const Fig10 = () => (
  <Fig10_Component />
);
const Fig10_Component = () => {
  const scale = scaleLog();
  scale.range([0, width]);
  scale.domain([1e0, 1e6]);
  scale.base(2);

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    d3AxisBootstrap(el, () =>
      d3.axisBottom(scale)
        .ticks(5),
    );
  }, [el, scale]);

  return (
    <>
      <p>
        With <kbd>tickArguments={`{[5]}`}</kbd> and a base 2 scale.
      </p>
      <Frame>
        <Axis
          orient="bottom"
          scale={scale}
          tickArguments={[5]}
        />
      </Frame>
      <div style={axisFrameStyles} ref={setEl} />
    </>
  );
}

export const Fig11 = () => (
  <Fig11_Component />
);
const Fig11_Component = () => {
  const scale = scaleLog();
  scale.range([0, width]);
  scale.domain([1e0, 1e6]);
  scale.base(2);

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    d3AxisBootstrap(el, () =>
      d3.axisBottom(scale)
        .ticks(10),
    );
  }, [el, scale]);

  return (
    <>
      <p>
        The same as Fig 10, but with <kbd>tickArguments={`{[10]}`}</kbd>.
      </p>
      <Frame>
        <Axis
          orient="bottom"
          scale={scale}
          tickArguments={[10]}
        />
      </Frame>
      <div style={axisFrameStyles} ref={setEl} />
    </>
  );
}

export const Fig12 = () => (
  <Fig12_Component />
);
const Fig12_Component = () => {
  const scale = scaleLog();
  scale.range([0, width]);
  scale.domain([1e0, 1e6]);
  scale.base(2);

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    d3AxisBootstrap(el, () =>
      d3.axisBottom(scale)
        .ticks(20),
    );
  }, [el, scale]);

  return (
    <>
      <p>
        The same as Fig 10 and Fig 11, but with <kbd>tickArguments={`{[20]}`}</kbd>.
      </p>
      <Frame>
        <Axis
          orient="bottom"
          scale={scale}
          tickArguments={[20]}
        />
      </Frame>
      <div style={axisFrameStyles} ref={setEl} />
    </>
  );
}

export const Fig13 = () => (
  <Fig13_Component />
);
const Fig13_Component = () => {
  const scale = scaleLog();
  scale.range([0, width]);
  scale.domain([1e0, 1e6]);

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    d3AxisBootstrap(el, () =>
      d3.axisBottom(scale)
        .ticks(10, '~s'),
    );
  }, [el, scale]);

  return (
    <>
      <p>
        With <kbd>tickArguments={`{[10, '~s']}`}</kbd>, with a scale from 1e0 to 1e6.
      </p>
      <Frame>
        <Axis
          orient="bottom"
          scale={scale}
          tickArguments={[10, '~s'] as any}
        />
      </Frame>
      <div style={axisFrameStyles} ref={setEl} />
    </>
  );
}

export const Fig14 = () => (
  <Fig14_Component />
);
const Fig14_Component = () => {
  const scale = scaleTime();
  scale.range([0, width]);

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    d3AxisBootstrap(el, () =>
      d3.axisBottom(scale)
        .ticks(10),
    );
  }, [el, scale]);

  return (
    <>
      <p>
        With a time scale and <kbd>tickArguments={`{[10]}`}</kbd>.
      </p>
      <Frame>
        <Axis
          orient="bottom"
          scale={scale}
          tickArguments={[10] as any}
        />
      </Frame>
      <div style={axisFrameStyles} ref={setEl} />
    </>
  );
}

export const Fig15 = () => (
  <Fig15_Component />
);
const Fig15_Component = () => {
  const scale = scaleTime();
  scale.range([0, width]);

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    d3AxisBootstrap(el, () =>
      d3.axisBottom(scale)
        .ticks(d3.timeHour.every(3), '%I %p'),
    );
  }, [el, scale]);

  return (
    <>
      <p>
        With a time scale and <kbd>tickArguments={`{[d3.timeHour.every(3), '%I %p']}`}</kbd>.
      </p>
      <Frame>
        <Axis
          orient="bottom"
          scale={scale}
          tickArguments={[d3.timeHour.every(3), '%I %p'] as any}
        />
      </Frame>
      <div style={axisFrameStyles} ref={setEl} />
    </>
  );
}

export const Fig16 = () => (
  <Fig16_Component />
);
const Fig16_Component = () => {
  const scale = scalePoint();
  scale.range([0, width]);
  scale.domain([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'])

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    d3AxisBootstrap(el, () =>
      d3.axisBottom(scale)
        .tickValues([...'AEIOUY']),
    );
  }, [el, scale]);

  return (
    <>
      <p>
        With a point scale whose range is the alphabet, and <kbd>tickValues={`{['A', 'E', 'I', 'O', 'U', 'Y']}`}</kbd>.
      </p>
      <Frame>
        <Axis
          orient="bottom"
          scale={scale as any}
          tickValues={
            [...'AEIOUY']}
        />
      </Frame>
      <div style={axisFrameStyles} ref={setEl} />
    </>
  );
}

export const Fig17 = () => (
  <Fig17_Component />
);
const Fig17_Component = () => {
  const scale = scalePoint();
  scale.range([0, width]);
  scale.domain([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'])

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    d3AxisBootstrap(el, () =>
      d3.axisBottom(scale)
        .tickFormat(x => /[AEIOUY]/.test(x) ? x : ''),
    );
  }, [el, scale]);

  return (
    <>
      <p>
        The same as Fig 16, but using a tickFormat function to show ticks but only labels for the vowels.{' '}
        Uses <kbd>tickFormat={`{(x) => /[AEIOUY]/.text(x) ? x : ''}`}</kbd>.
      </p>
      <Frame>
        <Axis
          orient="bottom"
          scale={scale as any}
          tickFormat={((x: string) => /[AEIOUY]/.test(x) ? x : '') as any}
        />
      </Frame>
      <div style={axisFrameStyles} ref={setEl} />
    </>
  );
}
