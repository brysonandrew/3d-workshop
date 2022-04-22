import { ChangeEvent } from "react";

export const Controls: ({
  size,
  setSize,
  setF,
  setCx,
  setCy,
  setCyr,
  setCxr,
  setZoom,
}: {
  size: any;
  setSize: any;
  setF: any;
  setCx: any;
  setCy: any;
  setCyr: any;
  setCxr: any;
  setZoom: any;
} & any) => JSX.Element = ({
  size,
  setSize,
  setF,
  setCx,
  setCy,
  setCyr,
  setCxr,
  setZoom,
  f,
  cx,
  cy,
  cxr,
  cyr,
  zoom,
}): JSX.Element => (
  <ul>
    {[
      {
        title: `Size ${size}`,
        step: 0.01,
        min: 1,
        max: 10,
        value: size.toFixed(2),
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          setSize(Number(event.currentTarget.value)),
      },
      {
        title: `Focal Point ${f}`,
        step: 0.001,
        min: 0,
        max: 4,
        value: f.toFixed(2),
        onChange: (event: ChangeEvent<HTMLInputElement>) => setF(Number(event.currentTarget.value)),
      },
      {
        title: `Center X ${cx}`,
        step: 1,
        min: -1000,
        max: 1000,
        value: cx.toFixed(2),
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          setCx(Number(event.currentTarget.value)),
      },
      {
        title: `Center Y ${cy}`,
        step: 1,
        min: -1000,
        max: 1000,
        value: cy.toFixed(2),
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          setCy(Number(event.currentTarget.value)),
      },
      {
        title: `Center Rotate X ${cxr}`,
        step: 10,
        min: -10000,
        max: 10000,
        value: cxr.toFixed(2),
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          setCxr(Number(event.currentTarget.value)),
      },
      {
        title: `Center Rotate Y ${cyr.toFixed(2)}`,
        step: 10,
        min: -10000,
        max: 10000,
        value: cyr,
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          setCyr(Number(event.currentTarget.value)),
      },
      {
        title: `Zoom ${zoom.toFixed(0)}`,
        step: "0.01",
        min: "-10",
        max: "100",
        value: zoom,
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          setZoom(Number(event.currentTarget.value)),
      },
    ].map(({ title, ...rest }, index) => (
      <li key={`input-${index}`}>
        {index !== 0 && <hr />}
        <div>
          <label>
            <div>{title}</div>
            <input name={`input-${index}`} type="range" {...rest} />
          </label>
        </div>
      </li>
    ))}
    <li
      style={{
        height: 200,
      }}
    ></li>
  </ul>
);
