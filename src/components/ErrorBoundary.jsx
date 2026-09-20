import { Component } from 'react';
import Button from './ui/Button';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Unhandled error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-full flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-sm font-semibold text-brand-500">Something broke</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
          This page hit a snag
        </h1>
        <p className="mx-auto mt-3 max-w-md text-stone-600">
          Something unexpected went wrong on our end. Reloading the page usually fixes it.
        </p>
        <Button className="mt-8" onClick={() => window.location.reload()}>
          Reload page
        </Button>
      </div>
    );
  }
}
