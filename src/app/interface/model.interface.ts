export interface Model<T, S> {
 items?: T,
  state: S
}
//сделать интерфейс для стейта


export enum State {
  PENDING = 'PENDING',
  READY = 'READY',
  ERROR = 'ERROR',
}
