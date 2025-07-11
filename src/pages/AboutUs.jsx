import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { LinkedInIcon } from "../utils/Icons";

const teamMembers = [
  {
    name: "Ahmed Negm",
    title: "Team Member",
    img: "/team/negm.jpg",
    linkedin: "#",
    email: "#",
  },
  {
    name: "Khaled Saeed",
    title: "Team Member",
    img: "/team/khaled.jpg",
    linkedin: "#",
    email: "#",
  },
  {
    name: "Ehab Salah",
    title: "Team Member",
    img: "/team/ehab.jpg",
    linkedin: "#",
    email: "#",
  },
  {
    name: "Mariam Magdy",
    title: "Team Member",
    img: "/team/mariam2.jpg",
    linkedin: "#",
    email: "#",
  },
  {
    name: "Renad",
    title: "Team Member",
    img: "/team/renad.jpg",
    linkedin: "#",
    email: "#",
  },
  {
    name: "Leen Hassan",
    title: "Team Member",
    img: "/team/leen.jpg",
    linkedin: "#",
    email: "#",
  },
  {
    name: "Aya Dkheil",
    title: "Team Member",
    img: "/team/aya.jpg",
    linkedin: "#",
    email: "#",
  },
];

function AboutUs() {
  return (
    <div className="mx-auto max-w-7xl space-y-16 px-6 pt-8 pb-20 text-gray-800">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-900 bg-clip-text text-5xl font-bold text-transparent">
          About Us
        </h1>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
          Our journey started with a shared pain — a real story that inspired us
          to create something impactful.
        </p>
      </section>

      {/* Problem Section */}
      <section className="rounded-3xl border border-red-100 bg-red-50 p-8">
        <h2 className="mb-4 flex items-center text-3xl font-bold text-red-800">
          <span className="mr-4 h-8 w-2 rounded-full bg-red-600"></span>
          The Problem
        </h2>
        <p className="text-base leading-relaxed text-gray-700">
          One of our team members suffered from a skin condition for years
          without knowing what it actually was. He was prescribed treatments
          that had nothing to do with his real problem. For a long time, he
          couldn't find the right doctor or even know where to start looking.
        </p>
      </section>

      {/* Solution Section */}
      <section className="rounded-3xl border border-green-100 bg-green-50 p-8">
        <h2 className="mb-4 flex items-center text-3xl font-bold text-green-700">
          <span className="mr-4 h-8 w-2 rounded-full bg-green-600"></span>
          Where the Idea Was Born
        </h2>
        <p className="text-base leading-relaxed text-gray-700">
          After realizing that this was a common issue shared by many — delayed
          diagnosis, lack of access, and poor awareness — we decided to create a
          solution. Our platform focuses on helping people detect and manage
          skin diseases, especially{" "}
          <strong className="text-green-800">skin cancer</strong>, due to its
          high mortality rate and increasing global risk.
        </p>
      </section>

      {/* Features Section */}
      <section className="rounded-3xl border border-purple-100 bg-purple-50 p-8">
        <h2 className="mb-6 flex items-center text-3xl font-bold text-purple-700">
          <span className="mr-4 h-8 w-2 rounded-full bg-purple-600"></span>
          What We Offer
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              icon: "🤖",
              title: "AI-Powered Initial Diagnosis",
              desc: "Instantly analyze your skin condition using advanced image recognition.",
            },
            {
              icon: "📚",
              title: "Trusted Medical Articles",
              desc: "Browse a library of expert-approved content to understand your condition better.",
            },
            {
              icon: "🔍",
              title: "Find Nearby Dermatologists",
              desc: "Get matched with top-rated skin doctors near your location, and book directly.",
            },
            {
              icon: "📊",
              title: "Personal Dashboard",
              desc: "Track your health history, updates, and progress over time.",
            },
            {
              icon: "🔔",
              title: "Smart Notifications",
              desc: "Receive personalized alerts, reminders, and seasonal tips for skin care.",
              full: true,
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`rounded-xl border border-purple-100 bg-white p-6 transition-all duration-200 hover:border-purple-400 ${
                feature.full ? "md:col-span-2" : ""
              }`}
            >
              <h3 className="mb-2 text-lg font-bold text-purple-700">
                {feature.icon} {feature.title}
              </h3>
              <p className="text-sm text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="rounded-3xl border border-blue-100 bg-blue-50 p-8">
        <h2 className="mb-6 flex items-center text-3xl font-bold text-blue-800">
          <span className="mr-4 h-8 w-2 rounded-full bg-blue-600"></span>
          Meet Our Team
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-gray-700">
          We're a passionate team of {teamMembers.length} people from different
          backgrounds — tech, medicine, and design — who came together for a
          cause that matters.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group rounded-xl border border-blue-100 bg-white p-6 text-center transition-all duration-300 hover:scale-105 hover:border-blue-400"
            >
              <div className="mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full bg-gradient-to-br from-blue-200 to-purple-200 p-2 shadow-2xl">
                <div className="h-full w-full overflow-hidden rounded-full bg-white">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyQzE0LjIwOTEgMTIgMTYgMTAuMjA5MSAxNiA4QzE2IDUuNzkwODYgMTQuMjA5MSA0IDEyIDRDOS43OTA4NiA0IDggNS43OTA4NiA4IDhDOCAxMC4yMDkxIDkuNzkwODYgMTIgMTJaIiBmaWxsPSIjOTk5OTk5Ii8+CjxwYXRoIGQ9Ik0xMiAxNEM5LjMzIDEzLjk2IDcuNjgxIDEzLjc0MiA2LjYgMTMuNzVDNS4zMzk5NCAxMy43NjAzIDQuNDAzOTMgMTMuOTM5NiAzLjU5IDEzLjkzOTZDMi4yMTA1NSAxMy45Mzk2IDEuNjIgMTQuNDAzOSAxLjYyIDE0LjQwMzlDMS4yNSAxNC43MyAxIDEzLjk3IDEgMTMuNVYxMy40NzFDMSAxMy4yMSAxLjM5IDEzIDEuMzkgMTNDMy4yIDEzIDUuNiAxMy4yMSA2LjYgMTMuNzVDNy40NCAxMy4wNiA4LjYgMTMgMTIgMTNDMTUuNjIgMTMgMTYuNDQgMTMuMDYgMTcuNDYgMTMuNzVDMTguNDcgMTMuMjEgMjAuOCAxMyAyMi42IDEzQzIyLjYgMTMgMjMgMTMuMjEgMjMgMTMuNDcxVjEzLjVDMjMgMTMuOTcgMjIuNzUgMTQuNzMgMjIuMzggMTQuNDAzOUMyMi4zOCAxNC40MDM5IDIxLjc4OTUgMTMuOTM5NiAyMC40MSAxMy45Mzk2QzE5LjU5NjEgMTMuOTM5NiAxOC42NjAxIDEzLjc2MDMgMTcuNCAxMy43NUMxNi4zMTkgMTMuNzQyIDE0LjY3IDEzLjk2IDEyIDE0WiIgZmlsbD0iIzk5OTk5OSIvPgo8L3N2Zz4K";
                    }}
                  />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                {member.name}
              </h3>
              <p className="mb-6 text-sm font-medium text-gray-600">
                {member.title}
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href={member.linkedin}
                  className="rounded-full bg-blue-600 p-3 text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon size={20} />
                </a>

                <a
                  href={`mailto:${member.email}`}
                  className="rounded-full bg-gray-600 p-3 text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-gray-700"
                >
                  <EnvelopeIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
