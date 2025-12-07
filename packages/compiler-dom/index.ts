import { baseCompile } from "../compiler-core";

export function compile(template: string): string {
  return baseCompile(template);
}
