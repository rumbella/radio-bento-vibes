import React from 'react';
import { Users, Instagram, Music2, ExternalLink } from 'lucide-react';
import type { Resident } from '../types';

const ResidentsPage: React.FC = () => {
  const residents: Resident[] = [
    {
      id: '1',
      name: 'DJ Marco',
      bio: 'Marco brings over 10 years of experience in deep house and techno. His morning shows are the perfect way to start your day with positive energy.',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754294998/Schermata_2020-04-13_alle_20.25.01_brwvys.png',
      shows: ['Morning Vibes', 'Weekend Deep Sessions'],
      socialLinks: {
        instagram: 'https://instagram.com/djmarco',
        soundcloud: 'https://soundcloud.com/djmarco',
        mixcloud: 'https://mixcloud.com/djmarco'
      }
    },
    {
      id: '2',
      name: 'Sara Mix',
      bio: 'Sara is our electronic music specialist with a passion for discovering new artists. She curates the perfect lunch break soundtrack.',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754294960/7488-7d7f-4931-aa4c-01e4f93d3279_jjkinc.png',
      shows: ['Lunch Break Beats', 'New Music Friday'],
      socialLinks: {
        instagram: 'https://instagram.com/saramix',
        soundcloud: 'https://soundcloud.com/saramix'
      }
    },
    {
      id: '3',
      name: 'Alex Deep',
      bio: 'Alex specializes in progressive house and ambient sounds. His evening sessions are designed to help you unwind after a long day.',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754294921/6688-af9a-4e1c-9373-edf1c47164e9_ydrkce.jpg',
      shows: ['Evening Sessions', 'Midnight Ambient'],
      socialLinks: {
        instagram: 'https://instagram.com/alexdeep',
        mixcloud: 'https://mixcloud.com/alexdeep'
      }
    },
    {
      id: '4',
      name: 'Luna Beats',
      bio: 'Luna brings the underground scene to Radio Amblè with her selection of cutting-edge electronic music and exclusive mixes.',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754314593/b663-8e1c-4bf8-975e-ec025ce7c823_1_gbsrm2.png',
      shows: ['Underground Sounds', 'Late Night Sessions'],
      socialLinks: {
        instagram: 'https://instagram.com/lunabeats',
        soundcloud: 'https://soundcloud.com/lunabeats',
        mixcloud: 'https://mixcloud.com/lunabeats'
      }
    }
  ];

  const featuredResident = residents[0];
  const otherResidents = residents.slice(1);

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram size={18} />;
      case 'soundcloud':
      case 'mixcloud':
        return <Music2 size={18} />;
      default:
        return <ExternalLink size={18} />;
    }
  };

  const SocialLinks: React.FC<{ links: { [key: string]: string } }> = ({ links }) => (
    <div className="flex items-center flex-wrap gap-4">
      {Object.entries(links).map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-400 hover:text-liquid-lava transition-colors"
        >
          {getSocialIcon(platform)}
          <span className="text-sm capitalize">{platform}</span>
        </a>
      ))}
    </div>
  );

  return (
    <div className="max-w-md mx-auto lg:max-w-4xl p-4 lg:p-8 space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="text-liquid-lava" size={24} />
        <h2 className="text-text-main font-bold text-2xl">Our Residents</h2>
      </div>

      {/* Featured Resident */}
      <div className="bg-container-dark backdrop-blur-md rounded-2xl overflow-hidden">
        <div className="relative h-56">
          <img
            src={featuredResident.image}
            alt={featuredResident.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="bg-liquid-lava text-text-main text-xs px-3 py-1 rounded-full font-medium">
              Featured
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-text-main font-bold text-xl mb-2">{featuredResident.name}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
                {featuredResident.shows.map((show, idx) => (
                    <span key={idx} className="bg-white/20 text-text-main text-xs px-2 py-1 rounded-full font-medium">
                        {show}
                    </span>
                ))}
            </div>
          </div>
        </div>
        <div className="p-6">
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {featuredResident.bio}
            </p>
            <SocialLinks links={featuredResident.socialLinks} />
        </div>
      </div>

      {/* All Residents */}
      <div>
        <h3 className="text-text-main font-semibold text-lg mb-4">All Residents</h3>
        <div className="space-y-4">
          {otherResidents.map((resident) => (
            <div
              key={resident.id}
              className="bg-container-dark backdrop-blur-md rounded-xl p-4 hover:bg-slate-grey/30 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={resident.image}
                  alt={resident.name}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-text-main font-medium text-lg mb-2 line-clamp-1">
                    {resident.name}
                  </h4>
                  <div className="flex flex-wrap gap-1 mb-3">
                      {resident.shows.map((show, idx) => (
                          <span key={idx} className="bg-white/10 text-text-main text-xs px-2 py-1 rounded-full font-medium">
                              {show}
                          </span>
                      ))}
                  </div>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {resident.bio}
                  </p>
                  <SocialLinks links={resident.socialLinks} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResidentsPage;