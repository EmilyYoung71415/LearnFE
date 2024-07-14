import { Subscription, Subject, type SubscriptionLike } from "rxjs";
import { isSubscription } from "rxjs/internal/Subscription";
import { isFunction } from "../is-type";

export interface IDisposable {
  dispose(): void;
}

export interface SubscriptionLike {
  unsubscribe(): void;
  readonly closed: boolean;
}

type DisposableLike = IDisposable | SubscriptionLike | (() => void);

export function isSubscription(value: any): value is SubscriptionLike {
  return (
    value instanceof Subscription ||
    (value &&
      "closed" in value &&
      isFunction(value.remove) &&
      isFunction(value.add) &&
      isFunction(value.unsubscribe))
  );
}

export function toDisposable(disposable: IDisposable): IDisposable;
export function toDisposable(subscription: SubscriptionLike): IDisposable;
export function toDisposable(callback: () => void): IDisposable;
export function toDisposable(v: DisposableLike): IDisposable;
export function toDisposable(v: DisposableLike): IDisposable {
  let disposed = false;

  if (!v) {
    return toDisposable(() => {
      // empty
    });
  }

  if (isSubscription(v)) {
    return {
      dispose: () => v.unsubscribe(),
    };
  }

  if (typeof v === "function") {
    return {
      dispose: () => {
        if (disposed) {
          return;
        }

        disposed = true;
        (v as () => void)();
      },
    };
  }

  return v as IDisposable;
}

export class DisposableCollection implements IDisposable {
  private readonly _disposables = new Set<IDisposable>();

  add(disposable: DisposableLike): IDisposable {
    const d = toDisposable(disposable);
    this._disposables.add(d);

    return {
      dispose: () => {
        d.dispose();
        this._disposables.delete(d);
      },
    };
  }

  dispose(): void {
    this._disposables.forEach((item) => {
      item.dispose();
    });

    this._disposables.clear();
  }
}

export class Disposable implements IDisposable {
  protected _disposed = false;
  private readonly _collection = new DisposableCollection();

  protected disposeWithMe(disposable: DisposableLike): IDisposable {
    return this._collection.add(disposable);
  }

  protected ensureNotDisposed(): void {
    if (this._disposed) {
      throw new Error("[Disposable]: object is disposed!");
    }
  }

  dispose(): void {
    if (this._disposed) {
      return;
    }

    this._disposed = true;
    this._collection.dispose();
  }
}

export class RxDisposable extends Disposable implements IDisposable {
  protected dispose$ = new Subject<void>();

  override dispose(): void {
    super.dispose();
    this.dispose$.next();
    this.dispose$.complete();
  }
}
