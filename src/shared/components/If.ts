export interface IfProps {
  condition: boolean | (() => boolean);
  children: any;
}

export function If({ condition, children }: IfProps) {
  let result;
  if (typeof condition === 'function') {
    result = condition();
  } else {
    result = condition;
  }
  return result ? children : null;
}
