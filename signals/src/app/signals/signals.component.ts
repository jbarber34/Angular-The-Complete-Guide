import { NgFor } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);
  doubleCounter = computed(() => this.counter() * 2);

  constructor() {
    effect(() => console.log('Counter:', this.counter()));
  }

  increment() {
    this.counter.update((oldCounter) => oldCounter + 1);
    // Alternatively, you can use the following syntax for updating signals:
    // this.counter.set(this.counter() + 1);
    this.actions.set([...this.actions(), 'INCREMENT']);
    // This is the traditional way of updating array
    // this.actions.push('INCREMENT');
  }

  decrement() {
    this.counter.update((oldCounter) => oldCounter - 1);
    this.actions.set([...this.actions(), 'DECREMENT']);
    // This is the traditional way of updating array
    // this.actions.push('DECREMENT');S
  }
}
