import { Action, createAction, props } from '@ngrx/store';

export const init = createAction('[Counter] Init');

export const set = createAction('[Counter] Set', props<{ value: number }>());

export const INCREMENT = '[Counter] Increment';
export const DECREMENT = '[Counter] Decrement';

export const increment = createAction(INCREMENT, props<{ value: number }>());

// Alternative way to define an action

// export class IncrementAction implements Action {
//   readonly type = INCREMENT;
//   constructor(public value: number) {}
// }

// export type CounterActions = IncrementAction;

export const decrement = createAction(DECREMENT, props<{ value: number }>());
