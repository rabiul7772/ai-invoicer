import { Camera } from 'lucide-react';
import { useState } from 'react';

interface ProfileHeaderProps {
  avatarUrl?: string;
  name?: string;
  email?: string;
}

export const ProfileHeader = ({
  avatarUrl,
  name,
  email
}: ProfileHeaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const displayUrl = previewUrl || avatarUrl || null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold text-(--color-text-white) mb-2">
        Profile Settings
      </h1>
      <p className="text-(--color-text-dim) mb-10">
        Manage your personal and business information
      </p>

      {/* Avatar Card */}
      <div className="card-premium flex items-center gap-6 p-8">
        <label htmlFor="avatarInput" className="relative cursor-pointer group">
          <div className="w-24 h-24 rounded-full bg-linear-to-tr from-[#1a4a38] to-[#0a1d14] border-2 border-[rgba(0,255,136,0.2)] overflow-hidden">
            {displayUrl ? (
              <img
                src={displayUrl}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-(--color-text-dim)">
                <Camera className="w-8 h-8" />
              </div>
            )}
          </div>
          {/* Camera Icon Overlay */}
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-(--color-primary) flex items-center justify-center border-2 border-[#0a1d14] group-hover:scale-110 transition-transform">
            <Camera className="w-4 h-4 text-[#0a1d14]" />
          </div>
          <input
            type="file"
            id="avatarInput"
            className="hidden"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </label>

        <div>
          <h2 className="text-2xl font-bold text-(--color-text-white)">
            {name || 'Loading...'}
          </h2>
          <p className="text-(--color-text-dim)">{email || ''}</p>
        </div>
      </div>
    </div>
  );
};
