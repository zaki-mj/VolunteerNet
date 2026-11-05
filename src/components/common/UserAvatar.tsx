import React from 'react';

// Gender detector from Algerian Arabic names
export const isFemaleName = (name?: string): boolean => {
  if (!name) return false;
  const femaleKeywords = [
    'مريم', 'فاطمة', 'ليلى', 'سارة', 'خديجة', 'أنيسة', 'نسرين',
    'إيمان', 'رانية', 'سهام', 'أسماء', 'مروى', 'نادية', 'أميرة', 'شيماء',
    'هاجر', 'سلمى', 'خولة', 'لمياء', 'حنان', 'أحلام', 'ريم', 'ياسمين',
    'دنيا', 'بشرى', 'سميرة', 'منال', 'هدى', 'فتيحة', 'هبة', 'وفاء',
    'نجوى', 'ملاك', 'صبرينة', 'بسمة', 'كوثر', 'سلوى', 'زينب', 'فايزة',
    'إكرام', 'نوال', 'سعاد', 'ابتسام', 'كنزة', 'وسيلة', 'زهية', 'نرجس',
    'وردة', 'خالدة', 'إيناس', 'عفاف', 'حورية', 'صفية', 'عائشة', 'سهيلة',
    'نجاة', 'دلال', 'صباح', 'فوزية', 'سليمة', 'جميلة', 'فضيلة', 'راوية',
    'حسناء', 'غانية', 'حسينة', 'سعيدة', 'عتيقة'
  ];
  return femaleKeywords.some((fn) => name.includes(fn));
};

export const MaleAvatarSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Male Avatar"
  >
    <defs>
      <linearGradient id="male-bg-grad" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
        <stop stopColor="#059669" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="male-shirt-grad" x1="24" y1="90" x2="104" y2="128" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1e3a8a" />
        <stop offset="1" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="male-hair-grad" x1="36" y1="16" x2="92" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1f2937" />
        <stop offset="1" stopColor="#111827" />
      </linearGradient>
    </defs>

    {/* Background Circle */}
    <circle cx="64" cy="64" r="64" fill="url(#male-bg-grad)" />

    {/* Shoulders & Shirt */}
    <path
      d="M24 128C24 105.909 41.9086 88 64 88C86.0914 88 104 105.909 104 128H24Z"
      fill="url(#male-shirt-grad)"
    />
    <path d="M54 88L64 102L74 88H54Z" fill="#fef3c7" />
    <path d="M64 96L60 88H68L64 96Z" fill="#f59e0b" />

    {/* Neck */}
    <rect x="55" y="74" width="18" height="18" rx="4" fill="#f59e0b" />

    {/* Head & Face */}
    <ellipse cx="64" cy="56" rx="24" ry="28" fill="#fde68a" />

    {/* Ears */}
    <circle cx="39" cy="58" r="6" fill="#fde68a" />
    <circle cx="89" cy="58" r="6" fill="#fde68a" />
    <circle cx="39" cy="58" r="3" fill="#f59e0b" />
    <circle cx="89" cy="58" r="3" fill="#f59e0b" />

    {/* Modern Haircut */}
    <path
      d="M38 46C38 30 48 18 64 18C80 18 90 30 90 46C90 49 89 53 87 56C84 46 80 40 73 39C67 38 60 41 53 40C46 39 42 45 41 56C39 53 38 49 38 46Z"
      fill="url(#male-hair-grad)"
    />

    {/* Eyebrows */}
    <path d="M49 46C53 44 57 45 59 47" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M79 46C75 44 71 45 69 47" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />

    {/* Eyes */}
    <circle cx="53" cy="53" r="3" fill="#111827" />
    <circle cx="75" cy="53" r="3" fill="#111827" />
    <circle cx="54" cy="52" r="1" fill="#ffffff" />
    <circle cx="76" cy="52" r="1" fill="#ffffff" />

    {/* Nose */}
    <path d="M64 54V62L61 63" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    {/* Friendly Smile */}
    <path d="M56 68C60 73 68 73 72 68" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const FemaleAvatarSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Female Avatar"
  >
    <defs>
      <linearGradient id="female-bg-grad" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0d9488" />
        <stop offset="1" stopColor="#0f766e" />
      </linearGradient>
      <linearGradient id="female-shirt-grad" x1="24" y1="90" x2="104" y2="128" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7c3aed" />
        <stop offset="1" stopColor="#a855f7" />
      </linearGradient>
      <linearGradient id="female-hair-grad" x1="32" y1="18" x2="96" y2="92" gradientUnits="userSpaceOnUse">
        <stop stopColor="#312e81" />
        <stop offset="0.5" stopColor="#1e1b4b" />
        <stop offset="1" stopColor="#3730a3" />
      </linearGradient>
    </defs>

    {/* Background Circle */}
    <circle cx="64" cy="64" r="64" fill="url(#female-bg-grad)" />

    {/* Hair / Hijab Flow Silhouette */}
    <path
      d="M32 64C32 38 46 22 64 22C82 22 96 38 96 64C96 82 92 102 88 116H40C36 102 32 82 32 64Z"
      fill="url(#female-hair-grad)"
    />

    {/* Shoulders & Collar */}
    <path
      d="M24 128C24 105.909 41.9086 88 64 88C86.0914 88 104 105.909 104 128H24Z"
      fill="url(#female-shirt-grad)"
    />

    {/* Neck */}
    <rect x="55" y="74" width="18" height="18" rx="4" fill="#f59e0b" />

    {/* Face */}
    <ellipse cx="64" cy="58" rx="21" ry="25" fill="#fde68a" />

    {/* Front Hair Arch */}
    <path
      d="M44 52C46 36 54 32 64 32C74 32 82 36 84 52C79 46 72 43 64 43C56 43 49 46 44 52Z"
      fill="#1e1b4b"
    />

    {/* Earrings */}
    <circle cx="43" cy="62" r="3" fill="#fbbf24" />
    <circle cx="85" cy="62" r="3" fill="#fbbf24" />

    {/* Eyebrows */}
    <path d="M50 49C54 47 58 48 59 50" stroke="#312e81" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M78 49C74 47 70 48 69 50" stroke="#312e81" strokeWidth="2.2" strokeLinecap="round" />

    {/* Eyes with Eyelashes */}
    <circle cx="54" cy="55" r="3" fill="#1e1b4b" />
    <circle cx="74" cy="55" r="3" fill="#1e1b4b" />
    <circle cx="55" cy="54" r="1" fill="#ffffff" />
    <circle cx="75" cy="54" r="1" fill="#ffffff" />
    <path d="M51 53L49 51" stroke="#312e81" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M77 53L79 51" stroke="#312e81" strokeWidth="1.5" strokeLinecap="round" />

    {/* Nose */}
    <path d="M64 56V62L62 63" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

    {/* Cheerful Smile */}
    <path d="M56 69C60 74 68 74 72 69" stroke="#be185d" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

interface UserAvatarProps {
  name?: string;
  gender?: 'male' | 'female';
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  gender,
  className = 'w-full h-full',
}) => {
  const isFemale = gender ? gender === 'female' : isFemaleName(name);

  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden shrink-0 ${className}`}>
      {isFemale ? (
        <FemaleAvatarSvg className="w-full h-full" />
      ) : (
        <MaleAvatarSvg className="w-full h-full" />
      )}
    </div>
  );
};
