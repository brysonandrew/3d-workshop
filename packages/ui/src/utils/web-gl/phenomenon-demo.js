export function rotateX(matrix, angle) {
  const m = matrix;
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const mv1 = m[1];
  const mv5 = m[5];
  const mv9 = m[9];

  m[1] = m[1] * c - m[2] * s;
  m[5] = m[5] * c - m[6] * s;
  m[9] = m[9] * c - m[10] * s;

  m[2] = m[2] * c + mv1 * s;
  m[6] = m[6] * c + mv5 * s;
  m[10] = m[10] * c + mv9 * s;
}

export function rotateY(matrix, angle) {
  const m = matrix;
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const mv0 = m[0];
  const mv4 = m[4];
  const mv8 = m[8];

  m[0] = c * m[0] + s * m[2];
  m[4] = c * m[4] + s * m[6];
  m[8] = c * m[8] + s * m[10];

  m[2] = c * m[2] - s * mv0;
  m[6] = c * m[6] - s * mv4;
  m[10] = c * m[10] - s * mv8;
}

export function getRandom(value) {
  const floor = -value;
  return floor + Math.random() * value * 2;
}

export function rgbToHsl(rgb) {
  return rgb.map((c) => c / 255);
}

