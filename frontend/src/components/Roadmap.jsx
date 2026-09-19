import React from 'react';
import { Code2, Trophy, Mic2, CloudSun } from 'lucide-react';

export default function Roadmap() {
  const roadmap = [
    {
      icon: <CloudSun className="text-purple-400" size={22} />,
      title: "Cloud Fundamentals to Dev",
      timeline: "Q1",
      desc: "Zero-to-One foundational cohorts covering AWS IAM, EC2, S3, Docker, and API deployment. Learn and teach together."
    },
    {
      icon: <Code2 className="text-awsGreen" size={22} />,
      title: "Hands-on Architecture Labs",
      timeline: "Q2",
      desc: "Intensive build sessions: Serverless architectures with AWS Lambda, DynamoDB pipelines, and full-stack integration."
    },
    {
      icon: <Mic2 className="text-awsOrange" size={22} />,
      title: "Guest Lectures & Cloud Days",
      timeline: "Q3",
      desc: "Inviting industry-experienced Solutions Architects, DevOps leads, and AWS Community Builders for unmoderated AMAs and real project audits."
    },
    {
      icon: <Trophy className="text-purple-400" size={22} />,
      title: "Flagship Cloud Hackathon",
      timeline: "Q4",
      desc: "24-hour sprint focused on solving real-world challenges using scalable cloud infrastructure and serverless solutions."
    }
  ];

  return (
    <section id="roadmap" className="py-20 bg-zinc-950/40 border-t border-white/5">
      <div className="w-full px-[5%] sm:px-[6%] lg:px-[7%]">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-awsGreen font-semibold mb-2">12-Month Outlook</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Next 1 Year Action Plan</h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4">Concrete initiatives, hackathons, and execution roadmaps planned for the community.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {roadmap.map((item, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl bg-[#0f0e17] border border-white/5 hover:border-purple-500/20 transition-all flex gap-6"
            >
              <div className="shrink-0 w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">{item.timeline}</span>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-base text-zinc-400 mt-3 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
