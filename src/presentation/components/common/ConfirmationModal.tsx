

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  type?: 'danger' | 'warning' | 'info';
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
  type = 'danger'
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-all duration-300"
        onClick={!isLoading ? onClose : undefined}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-[#1a1a1a]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8">
          
          <div className="flex items-center space-x-4 mb-6">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${type === 'danger' ? 'bg-red-500/20 text-red-500' : 'bg-[#C8A96A]/20 text-[#C8A96A]'}`}>
              {type === 'danger' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 11V17M14 11V17M4 7H20M6 7H18V20C18 20.5523 17.5523 21 17 21H7C6.44772 21 6 20.5523 6 20V7ZM9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7"></path></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              )}
            </div>
            <h2 className="text-xl font-['Playfair_Display'] text-white">{title}</h2>
          </div>
          
          <p className="text-sm font-['Inter'] text-white/60 mb-8 leading-relaxed">
            {message}
          </p>

          <div className="flex items-center justify-end space-x-4">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={isLoading}
              className="px-6 py-2.5 text-white/50 hover:text-white font-['Inter'] text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors hover:bg-white/5 rounded-xl disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button 
              type="button" 
              onClick={onConfirm} 
              disabled={isLoading}
              className={`px-6 py-2.5 font-['Inter'] font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center space-x-2 ${
                type === 'danger' 
                  ? 'bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                  : 'bg-[#C8A96A]/20 text-[#C8A96A] hover:bg-[#C8A96A] hover:text-black border border-[#C8A96A]/50 hover:shadow-[0_0_20px_rgba(200,169,106,0.3)]'
              }`}
            >
              {isLoading && <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />}
              <span>{isLoading ? 'Processing...' : confirmText}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
