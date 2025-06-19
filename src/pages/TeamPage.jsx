import React from 'react';
import { 
  Code, 
  FlaskConical, 
  BarChart2, 
  Mic, 
  Camera, 
  BookOpen,
  Users,
  Smartphone,
  Globe
} from 'lucide-react';

const TeamPage = () => {
  const teamMembers = [
    {
      role: "Founder & Lead Developer",
      name: "Ahmad Muhammad Salisu",
      bio: "Computer science major from Bayero University who conceived AgriSeal's core technology after witnessing fertilizer challenges during his final year. Leads both technical vision and seed biohacking algorithm development.",
      expertise: ["Full-stack Development", "Biohacking Algorithms", "Systems Architecture"],
      joinDate: "2023",
      image: "/team/ceo.jpg",
      icon: <Code className="text-green-600" />
    },
    {
      role: "Chief Technology Officer & Lead Field Researcher",
      name: "Ismail Abdullahi",
      bio: "Biotechnology from Bayero University specializing in plant metabolism. Developed the biochemical protocols for our seed treatments, guided the choosing of stacks and oversees all lab operations.",
      expertise: ["Plant Biochemistry", "Molecular Biology Research", "Research Methodology"],
      joinDate: "2023",
      image: "/team/ismail.jpg.jpg",
      icon: <FlaskConical className="text-green-600" />
    },
    {
      role: "Chief Operations Officer",
      name: "Khalid Jibril Muhammad",
      bio: "Agricultural economist with 8 years experience in agri-tech startups. Manages field operations, farmer networks, and coordinates between technical and business teams.",
      expertise: ["Computer Science", "Agriculture","Field Operations", "Stakeholder Engagement"],
      joinDate: "2023",
      image: "/team/khalid.jpg",
      icon: <BarChart2 className="text-green-600" />
    },
    {
      role: "Media & Outreach Coordinator",
      name: "Mustapha Aminu Mikail",
      bio: "Accomplished writer and public speaker with a major in Psychology from Northwest University, Kano.",
      expertise: ["Community Mobilization", "Public Speaking", "Partnership Development"],
      joinDate: "2024",
      image: "/team/adnan.jpg",
      icon: <Mic className="text-green-600" />
    },
    {
      role: "Social Media Manager",
      name: "Samuel Adura",
      bio: "Digital marketing specialist who grew our online presence to 50K+ engaged followers. Creates content that bridges urban tech and rural farming audiences.",
      expertise: ["Content Strategy", "Brand Storytelling", "Community Management"],
      joinDate: "2024",
      image: "/team/samuel.jpg",
      icon: <Smartphone className="text-green-600" />
    },
    {
      role: "Projects Manager",
      name: "Salihu Basiru Buwa",
      bio: "PMP-certified manager overseeing our field trials and technology deployments. Ensures all projects meet both scientific and operational objectives.",
      expertise: ["Project Planning", "Impact Measurement", "Team Coordination"],
      joinDate: "2023",
      image: "/team/buwa.jpg",
      icon: <BookOpen className="text-green-600" />
    },
    {
      role: "UI/UX Designer",
      name: "Abdulaziz Musa",
      bio: "Creates intuitive interfaces for both our digital platforms and rural user experiences, specializing in low-literacy design patterns.",
      expertise: ["User Research", "Interaction Design", "Accessibility"],
      joinDate: "2025",
      image: "/team/abdulaziz.jpg",
      icon: <Camera className="text-green-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The <span className="text-yellow-300">AgriSeal</span> Team
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Interdisciplinary innovators combining biotechnology, computer science, and agricultural expertise to transform Nigerian farming
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-green-300 font-medium">{member.role}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    {member.icon}
                  </div>
                  <span className="text-sm text-gray-500">Member since {member.joinDate}</span>
                </div>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Expertise:</h4>
                  <ul className="space-y-1">
                    {member.expertise.map((skill, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                        <span className="text-sm text-gray-600">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mt-20 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Our <span className="text-green-600">Core</span> Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Farmer First</h3>
              <p className="text-gray-600">
                Every innovation must ultimately serve smallholder farmers' needs and realities
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FlaskConical className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scientific Rigor</h3>
              <p className="text-gray-600">
                Our solutions are grounded in peer-reviewed research and field validation
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Impact</h3>
              <p className="text-gray-600">
                We measure success by tangible improvements in Nigerian farming communities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-800">
        <div className="max-w-4xl mx-auto text-center text-white px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to <span className="text-yellow-300">Join</span> Our Team?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals to help transform African agriculture
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;