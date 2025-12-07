import { generate } from "./codegen";
import { baseParse } from "./parse";

export function baseCompile(template: string): string {
  const parseResult = baseParse(template);
  const code = generate(parseResult);
  return code;
}
