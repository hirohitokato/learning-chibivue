import { track, trigger } from "./effect";
import { reactive } from "./reactive";

/* ここで，Reflect というものが登場しています.
 * Proxy と似た雰囲気のものなんですが，Proxy があるオブジェクトに対する設定を書き込む処理だったのに対し，
 * Reflect はあるオブジェクトに対する処理を行うものです．
 * Proxy も Reflect も JS エンジン内のオブジェクトにまつわる処理の API で，
 * 普通にオブジェクトを使うのと比べてメタなプログラミングを行うことができます．
 * そのオブジェクトを変化させる関数を実行したり，読み取る関数を実行したり，key が存在するのかをチェックしたり
 * さまざまなメタ操作ができます．
 * とりあえず，Proxy = オブジェクトを作る段階でのメタ設定， Reflect = 既に存在しているオブジェクトに対する
 * メタ操作くらいの理解があれば OK です．
 */
export const mutableHandlers: ProxyHandler<object> = {
  get(target: object, key: string | symbol, receiver: object) {
    track(target, key);
    const res = Reflect.get(target, key, receiver);
    // objectの場合はreactiveにしてあげる (これにより、ネストしたオブジェクトもリアクティブにすることができます。)
    if (res !== null && typeof res === "object") {
      return reactive(res);
    }
    return res;
  },

  set(target: object, key: string | symbol, value: unknown, receiver: object) {
    let oldValue = (target as any)[key];
    Reflect.set(target, key, value, receiver);
    // 値が変わった場合にのみtriggerを呼び出す
    if (hasChanged(value, oldValue)) {
      trigger(target, key);
    }
    return true;
  },
};

const hasChanged = (value: any, oldValue: any): boolean =>
  !Object.is(value, oldValue);
