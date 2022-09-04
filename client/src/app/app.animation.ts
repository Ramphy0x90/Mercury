import { trigger, animate, transition, style, group, query } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  // Transition between any two states
  transition('* <=> *', [
    // Events to apply
    // Defined style and animation function to apply
    // Config object with optional set to true to handle when element not yet added to the DOM
    query(':enter, :leave', style({ position: 'absolute', width: '100%', zIndex: 2 }), { optional: true }),
    // group block executes in parallel
    group([
      query(':enter', [
        style({ opacity: '0' }),
        animate('0.15s linear', style({ opacity: '1' }))
      ], { optional: true }),
      query(':leave', [
        style({ opacity: '1' }),
        animate('0.15s linear', style({ opacity: '0' }))
      ], { optional: true })
    ])
  ])
]);