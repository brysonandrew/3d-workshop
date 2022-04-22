
// const P = {
//   x: [
//     93.04908616001205, 217.3099205191738, 86.88725100657868, 211.1480853657404,
//     28.85191463425963, 153.1127489934214, 22.6900794808262, 146.950913839988,
//   ],
//   y: [
//     64.02891541681889, 59.598407080665176, 202.2435946523421, 197.8130863161884,
//     42.18691368381158, 37.7564053476579, 180.40159291933483, 175.97108458318112,
//   ],
//   z: [
//     15.880424829084447, 80.22026971736685, 37.29850670779928,
//     101.63835159608166, 138.3616484039183, 202.70149329220067,
//     159.7797302826332, 224.11957517091554,
//   ],
// };


// const LINES = [
//   [2, 3, 1, 0], // front top
//   // [2, 3], // front bottom
//   // [0, 2, 1, 3],
//   // [1, 3],
//   [6, 4, 5, 7], // back top
//   // [6, 7], // back bottom
//   // [4, 6, 5, 7], // left back
//   // [5, 7], // right back
//   // [0, 4, 1, 5], // left top
//   // [1, 5],
//   // [2, 6, 3, 7],
//   // [3, 7],
// ];

// const filter = () => (
// <defs>
//   {[180, 90, 315].map((config, index) => (
//     <linearGradient
//       key={`gradient-${index}`}
//       id={`gradient-${index}`}
//       gradientTransform={`rotate(${config})`}
//       // filterUnits="userSpaceOnUse"
//     >
//       <stop offset="0%" stopColor="#eee" />
//       {/* <stop offset="20%" stopColor="#919191" />
//       <stop offset="40%" stopColor="#757575" />
//       <stop offset="60%" stopColor="#1a1c20" /> */}
//       <stop offset="100%" stopColor="#000" />
//     </linearGradient>
//   ))}
// </defs>;
// <filter id="dropshadow">
//   <feSpecularLighting
//     specularExponent="2"
//     lightingColor="#F3F4F3"
//     result="light"
//   >
//     <fePointLight x="300" y="100" z="100" />
//   </feSpecularLighting>
//   <feComposite in="light" in2="SourceAlpha" operator="in" result="lit" />
//   <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
//   <feOffset dx="5" dy="5" result="blur" />
//   <feComposite
//     in="blur"
//     in2="SourceAlpha"
//     operator="out"
//     result="shadow"
//   />
//   <feComposite in="shadow" in2="lit" operator="xor" />
// </filter>;

// )
