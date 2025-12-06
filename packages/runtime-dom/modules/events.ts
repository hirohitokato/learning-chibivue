interface Invoker extends EventListener {
  value: EventValue;
}

type EventValue = Function;

export function addEventListener(
  el: Element,
  event: string,
  handler: EventListener
) {
  el.addEventListener(event, handler);
}

export function removeEventListener(
  el: Element,
  event: string,
  handler: EventListener
) {
  el.removeEventListener(event, handler);
}

export function patchEvent(
  el: Element & { _vei?: Record<string, Invoker | undefined> },
  rawName: string,
  value: EventValue | null
) {
  // _vei: vue event invokers.
  // 同じ要素に対して重複して addEventListener しないよう，要素に _vei という名前で invoker を生やしている
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];

  if (value && existingInvoker) {
    // 更新
    existingInvoker.value = value;
  } else {
    const name = parseName(rawName);
    if (value) {
      // 新規登録
      const invoker = (invokers[rawName] = createInvoker(value));
      addEventListener(el, name, invoker);
    } else if (existingInvoker) {
      // 削除
      removeEventListener(el, name, existingInvoker);
      invokers[rawName] = undefined;
    }
  }
}

/// rawName から "on" を取り除き，小文字に変換する
function parseName(name: string): string {
  return name.slice(2).toLowerCase();
}

function createInvoker(initialValue: EventValue): Invoker {
  const invoker: Invoker = (e: Event) => {
    invoker.value(e);
  };
  invoker.value = initialValue;
  return invoker;
}
