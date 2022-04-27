import { MotionValue, useSpring, useTransform } from "framer-motion";

export const useSmoothTransform: (value: any, springOptions: any, transformer: any) => MotionValue<any> = (value, springOptions, transformer) => {
  return useSpring(useTransform(value, transformer), springOptions);
};
