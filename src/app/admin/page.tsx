"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  UploadCloud,
  Video,
  ImageIcon,
  RefreshCw,
  Copy,
  Check,
  Play,
  ExternalLink,
  Film,
  Sparkles,
  Layers,
  ArrowLeft,
  ShieldCheck,
  FolderLock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CloudinaryAsset {
  asset_id: string;
  public_id: string;
  format: string;
  resource_type: 'image' | 'video';
  created_at: string;
  bytes: number;
  width?: number;
  height?: number;
  secure_url: string;
  url: string;
  duration?: number;
  asset_folder?: string;
}

export default function AdminPage() {
  const { toast } = useToast();
  const [mediaList, setMediaList] = useState<CloudinaryAsset[]>([]);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<CloudinaryAsset | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dmd5bq3va';
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'cayodrinks-site';

  // Fetch only cayodrinks folder assets
  const fetchCayoMedia = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/cloudinary/media?cayoOnly=true&limit=100');
      const data = await res.json();
      if (data.success && Array.isArray(data.resources)) {
        setMediaList(data.resources);
      } else {
        toast({
          variant: 'destructive',
          title: 'Failed to fetch media',
          description: data.error || 'Could not load Cayo Drinks assets.',
        });
      }
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Connection Error',
        description: err.message || 'Unable to connect to Cloudinary API.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCayoMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploading(true);
    setUploadProgress(15);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', 'cayodrinks/website');

      const isVideo = file.type.startsWith('video/');
      const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${isVideo ? 'video' : 'image'}/upload`;

      setUploadProgress(45);
      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setUploadProgress(100);
        toast({
          title: 'Upload Successful!',
          description: `Saved to cayodrinks/website folder in Cloudinary.`,
        });
        await fetchCayoMedia();
      } else {
        // Fallback to server route
        setUploadProgress(65);
        const serverFormData = new FormData();
        serverFormData.append('file', file);
        serverFormData.append('folder', 'cayodrinks/website');
        serverFormData.append('resourceType', isVideo ? 'video' : 'image');

        const serverRes = await fetch('/api/cloudinary/upload', {
          method: 'POST',
          body: serverFormData,
        });
        const serverData = await serverRes.json();

        if (serverData.success) {
          setUploadProgress(100);
          toast({
            title: 'Upload Successful!',
            description: `Saved to cayodrinks/website folder.`,
          });
          await fetchCayoMedia();
        } else {
          throw new Error(serverData.error || 'Upload failed');
        }
      }
    } catch (error: any) {
      console.error('Upload failed:', error);
      toast({
        variant: 'destructive',
        title: 'Upload Error',
        description: error.message || 'Failed to upload to Cloudinary.',
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast({
      title: 'URL Copied',
      description: 'Cloudinary media URL copied to clipboard.',
    });
    setTimeout(() => setCopiedId(null), 2500);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const filteredMedia = mediaList.filter(item => {
    if (filter === 'image') return item.resource_type === 'image';
    if (filter === 'video') return item.resource_type === 'video';
    return true;
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top Admin Bar */}
      <header className="border-b border-white/5 bg-card/60 backdrop-blur-xl sticky top-0 z-40 px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Storefront
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <span className="font-headline font-extrabold tracking-tight text-lg">
              CAYO <span className="text-primary">ADMIN</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 font-mono text-[11px] gap-1.5 hidden sm:inline-flex">
              <ShieldCheck className="w-3.5 h-3.5" />
              Connected: {cloudName}
            </Badge>
            <Badge className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 font-mono text-[11px] gap-1.5">
              <FolderLock className="w-3.5 h-3.5" />
              Folder: cayodrinks
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-10">
        {/* Admin Intro Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-headline font-extrabold">
              Media Hub & <span className="text-primary">Upload</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
              Manage all official Cayo Drinks photos, can designs, and mixology videos. Strictly scoped to the <strong className="text-foreground">cayodrinks</strong> Cloudinary directory.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={fetchCayoMedia}
              disabled={isLoading}
              className="rounded-full border-white/10 hover:bg-white/5 gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*,video/*"
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-bold shadow-lg shadow-primary/20 gap-2"
            >
              <UploadCloud className="w-5 h-5" />
              {isUploading ? 'Uploading...' : 'Upload Media'}
            </Button>
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="bg-card p-6 rounded-2xl border border-primary/30 shadow-xl space-y-2 animate-in fade-in">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold flex items-center gap-2 text-primary">
                <Sparkles className="w-4 h-4 animate-spin" /> Uploading into cayodrinks folder...
              </span>
              <span className="text-muted-foreground font-mono">{uploadProgress || 50}%</span>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${uploadProgress || 50}%` }}
              />
            </div>
          </div>
        )}

        {/* Filter Controls & Counts */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card/40 p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={filter === 'all' ? 'default' : 'ghost'}
              onClick={() => setFilter('all')}
              className={`rounded-xl text-xs font-bold ${filter === 'all' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
            >
              <Layers className="w-3.5 h-3.5 mr-1.5" />
              All Cayo Media ({mediaList.length})
            </Button>
            <Button
              size="sm"
              variant={filter === 'image' ? 'default' : 'ghost'}
              onClick={() => setFilter('image')}
              className={`rounded-xl text-xs font-bold ${filter === 'image' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
            >
              <ImageIcon className="w-3.5 h-3.5 mr-1.5" />
              Images ({mediaList.filter(m => m.resource_type === 'image').length})
            </Button>
            <Button
              size="sm"
              variant={filter === 'video' ? 'default' : 'ghost'}
              onClick={() => setFilter('video')}
              className={`rounded-xl text-xs font-bold ${filter === 'video' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
            >
              <Film className="w-3.5 h-3.5 mr-1.5" />
              Videos ({mediaList.filter(m => m.resource_type === 'video').length})
            </Button>
          </div>

          <div className="text-xs text-muted-foreground font-mono">
            Showing {filteredMedia.length} assets
          </div>
        </div>

        {/* Asset Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-card rounded-2xl border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : filteredMedia.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedia.map((asset) => {
              const isVideo = asset.resource_type === 'video';
              const cleanTitle = asset.public_id.split('/').pop()?.replace(/[-_]/g, ' ') || asset.public_id;

              return (
                <div
                  key={asset.asset_id || asset.public_id}
                  className="group bg-card rounded-2xl border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-md flex flex-col"
                >
                  <div
                    className="relative aspect-video sm:aspect-square bg-black/40 overflow-hidden cursor-pointer flex items-center justify-center"
                    onClick={() => setSelectedAsset(asset)}
                  >
                    {isVideo ? (
                      <div className="relative w-full h-full flex items-center justify-center bg-black/60">
                        <video
                          src={asset.secure_url}
                          className="w-full h-full object-cover"
                          preload="metadata"
                          muted
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                          <div className="w-12 h-12 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 ml-0.5 fill-current" />
                          </div>
                        </div>
                        <Badge className="absolute top-3 left-3 bg-red-600/90 text-white font-mono text-[10px] uppercase">
                          Video
                        </Badge>
                      </div>
                    ) : (
                      <>
                        <Image
                          src={asset.secure_url}
                          alt={cleanTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <Badge className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white border-white/10 font-mono text-[10px] uppercase">
                          {asset.format}
                        </Badge>
                      </>
                    )}

                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white/80">
                      {asset.width && asset.height ? `${asset.width}×${asset.height}` : formatBytes(asset.bytes)}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-card/60">
                    <div>
                      <h4 className="font-bold text-sm truncate capitalize" title={asset.public_id}>
                        {cleanTitle}
                      </h4>
                      <p className="text-[11px] text-muted-foreground font-mono truncate" title={asset.public_id}>
                        {asset.public_id}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 gap-2">
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {formatBytes(asset.bytes)}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-white/10 rounded-lg text-muted-foreground hover:text-foreground"
                          onClick={() => copyUrl(asset.secure_url, asset.asset_id || asset.public_id)}
                          title="Copy Cloudinary URL"
                        >
                          {copiedId === (asset.asset_id || asset.public_id) ? (
                            <Check className="w-3.5 h-3.5 text-green-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </Button>

                        <a
                          href={asset.secure_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-white/10 transition-colors"
                          title="Open original media"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-card rounded-[2.5rem] border border-dashed border-white/10 p-16 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
              <UploadCloud className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold">No media found in cayodrinks folder</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Use the Upload Media button above to upload drinks photos or videos directly to the cayodrinks folder.
            </p>
          </div>
        )}
      </div>

      {/* Media Detail Modal */}
      <Dialog open={!!selectedAsset} onOpenChange={(open) => !open && setSelectedAsset(null)}>
        <DialogContent className="max-w-4xl bg-card/95 backdrop-blur-2xl border-white/10 p-6 rounded-[2rem] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold truncate">
              {selectedAsset?.public_id}
            </DialogTitle>
          </DialogHeader>

          {selectedAsset && (
            <div className="space-y-6">
              <div className="relative aspect-video bg-black/60 rounded-xl overflow-hidden flex items-center justify-center">
                {selectedAsset.resource_type === 'video' ? (
                  <video
                    src={selectedAsset.secure_url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={selectedAsset.secure_url}
                    alt={selectedAsset.public_id}
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white/5 rounded-xl text-xs font-mono">
                <div>
                  <span className="text-muted-foreground block">Resource Type</span>
                  <span className="font-bold uppercase text-primary">{selectedAsset.resource_type}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Format</span>
                  <span className="font-bold uppercase">{selectedAsset.format}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Dimensions</span>
                  <span className="font-bold">
                    {selectedAsset.width && selectedAsset.height ? `${selectedAsset.width} × ${selectedAsset.height}` : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Size</span>
                  <span className="font-bold">{formatBytes(selectedAsset.bytes)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end items-center">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto rounded-xl gap-2 text-xs font-mono"
                  onClick={() => copyUrl(selectedAsset.secure_url, selectedAsset.asset_id)}
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Secure URL
                </Button>
                <a
                  href={selectedAsset.secure_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button className="w-full sm:w-auto bg-primary text-primary-foreground rounded-xl gap-2 font-bold text-xs">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open Original
                  </Button>
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
