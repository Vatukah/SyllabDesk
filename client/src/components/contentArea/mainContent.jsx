import Footer from "../footer";
export default function MainContent({ children }) {
  return (
    <main className=" h-full primary-bg rounded-tl-xl rounded-tr-xl overflow-y-auto my-scroll-bar">
      <section >
        {children}
      </section>
      <Footer />
    </main>
  );
}
