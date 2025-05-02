import '@radix-ui/react-checkbox';

declare module '@radix-ui/react-checkbox' {
  export type CheckedState = boolean | 'indeterminate';
}
