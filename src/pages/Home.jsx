import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
import { useDoctors } from "../features/home/useDoctors";
import DoctorCardSkeleton from "../components/Home/DoctorCardSkeleton";

function Home() {
  const { doctors, isLoading, error } = useDoctors();
  // const { recentlySearchedDoctors, isLoading: isLoadingRecentSearches, error: recentSearchesError } = useRecentlySearchedDoctors();
  const { recentlySearchedDoctors, isLoading: isLoadingRecentSearches } = {
    recentlySearchedDoctors: [],
    isLoading: false,
  }; // Mocking the hook for now

  return (
    <>
      <section className="flex items-center justify-between pt-12 pb-6">
        <div>
          <h1 className="text-primary-text max-w-md text-5xl leading-14 font-semibold">
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
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <DoctorCardSkeleton key={index} />
              ))
            : doctors?.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
          {error && (
            <div className="flex w-full items-center justify-center">
              <p className="text-red-500">
                Failed to load doctors: {error.message}
              </p>
            </div>
          )}
        </ScrollableCarousel>
      </section>
      <section className="relative mt-4">
        <h2 className="mb-4 text-xl font-medium">Recent Searches</h2>
        {isLoadingRecentSearches ? (
          <ScrollableCarousel>
            {Array.from({ length: 5 }).map((_, index) => (
              <DoctorCardSkeleton key={index} variant="landscape" />
            ))}
          </ScrollableCarousel>
        ) : recentlySearchedDoctors?.length > 0 ? (
          <ScrollableCarousel>
            {recentlySearchedDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </ScrollableCarousel>
        ) : (
          <>
            <div className="absolute inset-0 z-10 mt-8 flex cursor-default items-center justify-center bg-blue-50/25 backdrop-blur-xs">
              <h5>
                No recent searches yet. Start by searching for a doctor or a
                skin condition.
              </h5>
            </div>
            <ScrollableCarousel className="z-0 overflow-hidden">
              {Array.from({ length: 5 }).map((_, index) => (
                <DoctorCardSkeleton
                  key={index}
                  variant="landscape"
                  staticMode
                />
              ))}
            </ScrollableCarousel>
          </>
        )}
      </section>
      <section className="my-4 p-4">
        <h2 className="text-primary-text mx-auto mb-4 max-w-xs text-center text-xl font-medium">
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
      <section className="my-4 p-4">
        <div className="flex items-center justify-between">
          <div className="max-w-lg">
            <h4 className="text-primary-text mb-2 text-3xl leading-10 font-bold">
              Download App for your mobile now!
            </h4>
            <p className="text-secondary-text mb-6 text-sm leading-5">
              AI-Dermatologist is an innovative prediagnostic app helping you
              monitor your skin health and detect any unusual or alerting skin
              conditions so you could contact healthcare providers in time and
              avoid undesirable consequences.
            </p>
            <div>
              {/* Apple store & google play buttons */}
              <div className="mt-4 flex items-center gap-4">
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://www.apple.com/app-store/"
                  className="w-40"
                >
                  <img
                    src="/apple-store-button.png"
                    alt="App Store"
                    className="size-full"
                  />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://play.google.com/store"
                  className="w-40"
                >
                  <img
                    src="/play-store-button.png"
                    alt="Google Play"
                    className="size-full"
                  />
                </a>
              </div>
            </div>
          </div>
          <div>
            <img
              src="/skin_safe_phone_mockup.png"
              alt="Mobile app preview"
              className="max-w-xl"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
