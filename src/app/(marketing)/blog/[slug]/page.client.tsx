'use client';

import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { Check, Share } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Control({ url }: { url: string }): React.ReactElement {
  const [isChecked, onCopy] = useCopyButton(() => {
    void navigator.clipboard.writeText(`${window.location.origin}${url}`);
  });

  useEffect(() => {
    if (isChecked) {
      toast.success('Copied success!');
    }
  }, [isChecked]);

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({ className: 'gap-2', variant: 'secondary' })
      )}
      onClick={onCopy}
    >
      {isChecked ? <Check className="size-4" /> : <Share className="size-4" />}
      {isChecked ? 'Copied URL' : 'Share Post'}
    </button>
  );
}
