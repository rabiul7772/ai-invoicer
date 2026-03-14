import { useState, useRef } from 'react';
import { MonitorSmartphone, CloudUpload } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type { ProfileFormValues } from '../validation';
import { Spinner } from '../../../components/ui/Spinner';

interface BrandingFormProps {
  isSaving: boolean;
  isUploading: boolean;
}

export const BrandingForm = ({ isSaving, isUploading }: BrandingFormProps) => {
  const { watch } = useFormContext<ProfileFormValues>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use the existing logo URL from the server as the initial preview
  const existingLogoUrl = watch('companyLogoUrl');
  const displayUrl = previewUrl || existingLogoUrl || null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Show local preview immediately — Cloudinary upload happens on form submit
    setPreviewUrl(URL.createObjectURL(file));
  };

  const isLoading = isUploading || (isSaving && previewUrl);
  const loadingText = isUploading ? 'Uploading logo...' : 'Saving profile...';

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-6 text-(--color-primary) font-bold text-sm tracking-wide uppercase">
        <MonitorSmartphone className="w-5 h-5" />
        <span>Branding</span>
      </div>

      <label
        htmlFor="companyLogo"
        className="relative min-h-[300px] border-2 border-dashed border-[rgba(0,255,136,0.2)] rounded-2xl flex flex-col items-center justify-center bg-[rgba(0,255,136,0.02)] hover:bg-[rgba(0,255,136,0.05)] hover:border-(--color-primary) transition-all duration-300 cursor-pointer overflow-hidden group"
      >
        {displayUrl && (
          <div className="absolute inset-0 w-full h-full p-4 flex items-center justify-center bg-[#06120c]">
            <img
              src={displayUrl}
              alt="Company logo preview"
              className="max-w-full max-h-full object-contain drop-shadow-2xl"
            />
            {/* Overlay for hover state */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-(--color-primary) text-[#06120c] font-black px-4 py-2 rounded-lg scale-90 group-hover:scale-100 transition-transform">
                CHANGE LOGO
              </div>
            </div>
          </div>
        )}

        {!displayUrl && !isLoading && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center mb-6 group-hover:bg-(--color-primary) group-hover:text-[#0a1d14] text-(--color-text-dim) transition-all">
              <CloudUpload className="w-10 h-10" />
            </div>
            <p className="text-(--color-text-white) text-lg font-bold mb-2">
              Upload Company Logo
            </p>
            <p className="text-(--color-text-muted) text-sm">
              PNG, JPG or SVG. Max 2MB.
            </p>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-[#06120c]/90 z-20 flex flex-col items-center justify-center backdrop-blur-sm">
            <Spinner size="xl" className="mb-6" />
            <p className="text-(--color-primary) font-black text-xl animate-pulse tracking-widest uppercase">
              {loadingText}
            </p>
          </div>
        )}
      </label>

      <input
        ref={inputRef}
        type="file"
        id="companyLogo"
        name="companyLogo"
        className="hidden"
        accept="image/png, image/jpeg, image/svg+xml"
        onChange={handleFileChange}
      />
    </div>
  );
};
