import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { User } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { UploadDropzone } from '@/lib/uploadthing';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { sessionAuth } from '@/lib/session';
import { updateUser } from '@/lib/api/user';

const ProfileCard = ({ user }: { user: User }) => {
  const sessionUser = sessionAuth.getUser();
  const [imageUrl, setImageUrl] = useState<string>(user.image);
  const [imageLoading, setImageLoading] = useState(false);
  const [showUploader, setShowUploader] = useState(false);

  const isDirector = sessionUser?.role === 'director';

  const handleImageUpload = async (file: { url: string }[]) => {
    setImageLoading(true);
    setImageUrl(file[0].url);
    toast.success('Image uploaded successfully');
    setShowUploader(false);
    await updateUser(user?._id, {
      image: file[0].url,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4">
      <CardHeader>
        <div className="flex flex-col items-center gap-4">
          <div
            className={cn(
              'flex items-center justify-center rounded-3xl',
              'w-4 h-40 sm:w-52 sm:h-52',
              user?.image ? 'bg-none' : 'bg-primary/20'
            )}
          >
            {showUploader || user?.image === null ? (
              <UploadDropzone
                appearance={{
                  button({ isUploading }) {
                    return [
                      'px-10 font-semibold text-black bg-primary',
                      'ut-ready:bg-green-500 after:bg-yellow-700',
                      isUploading
                        ? 'cursor-not-allowed opacity-50 pointer-events-none'
                        : 'cursor-pointer',
                    ].join(' ');
                  },
                  container: 'cursor-pointer border-0',
                  allowedContent:
                    'flex h-8 items-center justify-center text-white',
                }}
                endpoint={(routeRegistry) => routeRegistry.videoAndImage}
                onClientUploadComplete={handleImageUpload}
                onUploadError={(error) => {
                  console.error(error, error.cause);
                  toast.error('Image upload failed, please contact support');
                }}
              />
            ) : (
              <div className="relative w-full max-w-[160px] aspect-square">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                    <div className="w-6 h-6 border-2 border-t-transparent border-gray-700 rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  onLoad={() => setImageLoading(false)}
                  className={cn(
                    'w-full h-full object-cover rounded-2xl',
                    imageLoading
                      ? 'opacity-0'
                      : 'opacity-100 transition-opacity duration-300'
                  )}
                />
              </div>
            )}
          </div>

          {isDirector && (
            <Button
              variant="outline"
              className="text-sm"
              onClick={() => setShowUploader((prev) => !prev)}
            >
              {showUploader
                ? 'Cancel'
                : imageUrl
                ? 'Update Image'
                : 'Upload Image'}
            </Button>
          )}

          <div className="text-center space-y-2">
            <CardTitle>
              {user?.firstName}
              <span className="ml-1">{user?.lastName}</span>
            </CardTitle>
            <CardDescription>{user?.role}</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProfileCard;
