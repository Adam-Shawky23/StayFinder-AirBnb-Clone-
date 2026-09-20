import NotFoundState from '../components/ui/NotFoundState';

export default function NotFoundPage() {
  return (
    <NotFoundState
      title="This page doesn't exist"
      description="The link might be broken, or the page may have moved. Let's get you back on track."
    />
  );
}
