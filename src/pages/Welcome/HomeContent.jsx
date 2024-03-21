import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm"; // Assuming you have a ContactForm component


function HomeContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative isolate px-6 pt-14 lg:px-8 text-left">
        {" "}
        {/* Add text-left class */}
        {/* Background shape */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        {/* Content */}
        <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Empowering Healthcare Collaboration: Connect, Share, Innovate
          </h1>
          <p className="mt-12 text-xl leading-8 text-gray-600">
            Join the movement towards revolutionizing healthcare collaboration!
            Our web-based platform offers a secure space for medical
            professionals to connect, share anonymized patient data, and
            innovate together. With cutting-edge technology and a user-friendly
            interface, we're empowering practitioners worldwide to propel
            healthcare advancements and improve patient outcomes. Connect with
            us and be part of the future of healthcare innovation!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/sign-in"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </a>
            <a
              href="#about"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-blue-100">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl py-12 sm:py-20 text-left">
            {" "}
            {/* Add text-left class */}
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
              About Our Project
            </h2>
            <div className="text-xl leading-7 text-gray-800">
              <p className="mb-8">
                The innovative healthcare project endeavors to revolutionize the
                landscape of medical collaboration by developing a comprehensive
                web-based platform. At its core, the initiative aims to
                facilitate the secure and anonymized exchange of patient data
                among clinicians, researchers, and hospitals. Recognizing the
                transformative power of collective insights in driving
                advancements in healthcare, the project prioritizes cultivating
                a culture of collaboration. Leveraging cutting-edge web
                technologies and robust security protocols, the platform not
                only ensures the confidentiality and integrity of shared health
                data but also fosters an environment where practitioners
                collectively contribute to the evolution of medical knowledge.
              </p>
              <p>
                Central to the project's philosophy is an unwavering commitment
                to a user-friendly web interface. By bridging technological gaps
                and ensuring accessibility and intuitiveness for medical
                professionals, the platform aims to democratize healthcare
                collaboration. Through the integration of advanced encryption
                techniques and anonymization algorithms, it meets the highest
                standards of data protection and privacy, instilling confidence
                among users. In summary, the project represents a dynamic
                ecosystem where diverse datasets and projects are shared
                transparently, transforming healthcare collaboration into a
                visually and mathematically comprehensible format for broader
                understanding. With the potential to empower medical
                professionals with secure spaces for sharing patient data,
                facilitating collaboration, and propelling advancements in
                healthcare practices, this project heralds a new era of
                innovation in global healthcare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl py-12 sm:py-20 text-left">
            {" "}
            {/* Add text-left class */}
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
              Contact Us
            </h2>
            <div className="text-xl leading-7 text-gray-800">
              <p className="mb-8">
                Have questions or feedback? Reach out to us using the form
                below.
              </p>
              <ContactForm /> {/* Assuming you have a ContactForm component */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeContent;
