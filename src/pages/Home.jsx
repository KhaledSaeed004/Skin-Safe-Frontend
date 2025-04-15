import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import NewsletterBanner from "../components/Home/NewsletterBanner";
import {
  ArticlesIcon,
  Medical,
  MedicalDiagnosisIcon,
  MedicalToolIcon,
  Step01Icon,
} from "../components/ui/Icons";
import UVIndex from "../components/Home/UVIndex";
import DoctorCard from "../components/Home/DoctorCard";
import ScrollableCarousel from "../components/ui/ScrollableCarousel";

function Home() {
  return (
    <>
      <section className="flex items-center justify-between pt-12 pb-6">
        <div>
          <h1 className="max-w-md text-5xl leading-14 font-semibold">
            <span className="text-primary">Early</span> Detection for Peace of
            mind
          </h1>
          <p className="mt-4 max-w-xl text-lg text-gray-500">
            We are here to help you upload clear images of moles, spots or areas
            of concern, We provide you an easy, on- demand access to specialists
            by connecting you with certified dermatologists for an expert advice
            and care. We inform you with articles for your skin, help you learn
            about skin cancer types, symptoms, prevention tips and treatments.
          </p>
          <div className="mt-20 flex items-center gap-8">
            <span className="flex flex-col">
              <span className="text-primary text-2xl font-semibold">200+</span>
              <span className="text-sm text-gray-500">Active Doctors</span>
            </span>
            <span className="flex flex-col">
              <span className="text-primary text-2xl font-semibold">15K+</span>
              <span className="text-sm text-gray-500">Active Users</span>
            </span>
            <span className="flex flex-col">
              <span className="text-primary text-2xl font-semibold">50+</span>
              <span className="text-sm text-gray-500">Skincare Articles</span>
            </span>
          </div>
        </div>
        <div className="relative">
          <span className="absolute top-8 -left-10 rounded-lg bg-white px-3 py-2 text-green-600 shadow-lg">
            <ShieldCheckIcon className="mr-2 inline h-5 w-5" />
            Accurate diagnosis
          </span>
          <span className="text-primary absolute top-10/12 -right-10 rounded-lg bg-white px-3 py-2 shadow-lg">
            <Medical className="text-primary mr-2 inline h-5 w-5" />
            Accurate diagnosis
          </span>
          <div className="overflow-hidden rounded-full">
            <img
              src="/hero-img.png"
              alt="A man getting his skin checked image"
            />
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center">
        <UVIndex />
      </section>
      <section>
        <h2 className="mb-4 text-xl font-medium">Top Doctors</h2>
        <ScrollableCarousel>
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
        </ScrollableCarousel>
      </section>
      <section className="mt-4">
        <h2 className="mb-4 text-xl font-medium">Recent Searches</h2>
        <ScrollableCarousel>
          <DoctorCard variant="landscape" />
          <DoctorCard variant="landscape" />
          <DoctorCard variant="landscape" />
          <DoctorCard variant="landscape" />
          <DoctorCard variant="landscape" />
          <DoctorCard variant="landscape" />
          <DoctorCard variant="landscape" />
          <DoctorCard variant="landscape" />
        </ScrollableCarousel>
      </section>
      <section className="my-4 p-4">
        <h2 className="mb-4 text-center text-xl font-medium">
          Exceptionally High Standards Of Skin Cancer Detection
        </h2>
        <div className="flex flex-nowrap space-x-4">
          <div className="relative flex items-center overflow-hidden rounded-md border border-gray-200 p-4 pl-24 shadow-md">
            <div className="bg-primary absolute top-1/2 -left-1/7 flex aspect-square h-full -translate-y-1/2 items-center justify-center rounded-full pl-12 text-white">
              <MedicalDiagnosisIcon className="size-10" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Early Detection</h3>
              <p className="max-w-xs text-sm text-gray-500">
                Use your device to upload clear images of moles, spots or areas
                of concern.
              </p>
            </div>
          </div>
          <div className="relative flex items-center overflow-hidden rounded-md border border-gray-200 p-4 pl-24 shadow-md">
            <div className="bg-primary absolute top-1/2 -left-1/7 flex aspect-square h-full -translate-y-1/2 items-center justify-center rounded-full pl-12 text-white">
              <MedicalToolIcon className="size-10" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Doctor Appointments</h3>
              <p className="max-w-xs text-sm text-gray-500">
                Connect you with certified dermatologists for expert advice and
                care.
              </p>
            </div>
          </div>
          <div className="relative flex items-center overflow-hidden rounded-md border border-gray-200 p-4 pl-24 shadow-md">
            <div className="bg-primary absolute top-1/2 -left-1/7 flex aspect-square h-full -translate-y-1/2 items-center justify-center rounded-full pl-12 text-white">
              <ArticlesIcon className="size-10" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Informative Articles</h3>
              <p className="max-w-xs text-sm text-gray-500">
                Learn about skin cancer types, symptoms, prevention tips and
                treatments.
              </p>
            </div>
          </div>
        </div>
      </section>
      <NewsletterBanner />
    </>
  );
}

export default Home;
