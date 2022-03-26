type LoadingToastProps = {
  isLoading: boolean;
};

export function LoadingToast({ isLoading }: LoadingToastProps) {
  return (
    <>
      {isLoading && (
        <section
          className={`fixed animate-fadeInOut left-[50%] translate-x-[-50%] bottom-8 z-50 shadow-2xl border-2 rounded border-brand-secondary bg-brand-neutral-000 text-brand-neutral-900 font-bold py-4 px-8`}
        >
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-full border-2 border-x-brand-secondary border-t-brand-secondary animate-spin" />
            <p>Carregando...</p>
          </div>
        </section>
      )}
    </>
  );
}
