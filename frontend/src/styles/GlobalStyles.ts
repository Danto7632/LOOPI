import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    /* LOOPI Brand Colors - 기업용 IT 자산 거래 테마 */
    --primary: #1a1a1a;          /* 메인 다크 */
    --secondary: #2c5aa0;        /* 기업 블루 */
    --accent: #00b4d8;           /* 테크 시안 */
    --success: #06d6a0;          /* 거래 성공 */
    --warning: #ffd60a;          /* 주의/대기 */
    --danger: #ef476f;           /* 오류/취소 */
    
    /* Neutral Colors */
    --white: #ffffff;
    --gray-50: #fafafa;
    --gray-100: #f5f5f5;
    --gray-200: #eeeeee;
    --gray-300: #e0e0e0;
    --gray-400: #bdbdbd;
    --gray-500: #9e9e9e;
    --gray-600: #757575;
    --gray-700: #616161;
    --gray-800: #424242;
    --gray-900: #212121;
    --black: #000000;
    
    /* Business Theme Colors */
    --business-primary: #1e3a8a;    /* 기업 진블루 */
    --business-secondary: #3b82f6;   /* 라이트 블루 */
    --tech-green: #10b981;           /* 기술/혁신 */
    --data-purple: #8b5cf6;          /* 데이터/보안 */
    --enterprise-orange: #f97316;     /* 엔터프라이즈 */
    
    /* Border & Background */
    --border: var(--gray-200);
    --border-light: var(--gray-100);
    --border-dark: var(--gray-300);
    --bg-primary: var(--white);
    --bg-secondary: var(--gray-50);
    --bg-tertiary: var(--gray-100);
    
    /* Typography Scale */
    --font-size-xs: 0.75rem;     /* 12px */
    --font-size-sm: 0.875rem;    /* 14px */
    --font-size-base: 1rem;      /* 16px */
    --font-size-lg: 1.125rem;    /* 18px */
    --font-size-xl: 1.25rem;     /* 20px */
    --font-size-2xl: 1.5rem;     /* 24px */
    --font-size-3xl: 1.875rem;   /* 30px */
    --font-size-4xl: 2.25rem;    /* 36px */
    --font-size-5xl: 3rem;       /* 48px */
    
    /* Font Weights */
    --font-light: 300;
    --font-normal: 400;
    --font-medium: 500;
    --font-semibold: 600;
    --font-bold: 700;
    --font-black: 900;
    
    /* Spacing Scale */
    --spacing-xs: 0.25rem;       /* 4px */
    --spacing-sm: 0.5rem;        /* 8px */
    --spacing-md: 0.75rem;       /* 12px */
    --spacing-lg: 1rem;          /* 16px */
    --spacing-xl: 1.25rem;       /* 20px */
    --spacing-2xl: 1.5rem;       /* 24px */
    --spacing-3xl: 2rem;         /* 32px */
    --spacing-4xl: 2.5rem;       /* 40px */
    --spacing-5xl: 3rem;         /* 48px */
    --spacing-6xl: 4rem;         /* 64px */
    
    /* Responsive Breakpoints */
    --mobile: 480px;
    --tablet: 768px;
    --desktop: 1024px;
    --wide: 1200px;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    
    /* Border Radius */
    --radius-sm: 0.25rem;        /* 4px */
    --radius-md: 0.375rem;       /* 6px */
    --radius-lg: 0.5rem;         /* 8px */
    --radius-xl: 0.75rem;        /* 12px */
    --radius-2xl: 1rem;          /* 16px */
    --radius-full: 9999px;
    
    /* Transitions */
    --transition-fast: 150ms ease;
    --transition-normal: 300ms ease;
    --transition-slow: 500ms ease;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    font-size: var(--font-size-base);
    font-weight: var(--font-normal);
    line-height: 1.6;
    color: var(--gray-900);
    background-color: var(--bg-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Typography Utilities */
  .text-xs { font-size: var(--font-size-xs); }
  .text-sm { font-size: var(--font-size-sm); }
  .text-base { font-size: var(--font-size-base); }
  .text-lg { font-size: var(--font-size-lg); }
  .text-xl { font-size: var(--font-size-xl); }
  .text-2xl { font-size: var(--font-size-2xl); }
  .text-3xl { font-size: var(--font-size-3xl); }
  .text-4xl { font-size: var(--font-size-4xl); }
  .text-5xl { font-size: var(--font-size-5xl); }

  .font-light { font-weight: var(--font-light); }
  .font-normal { font-weight: var(--font-normal); }
  .font-medium { font-weight: var(--font-medium); }
  .font-semibold { font-weight: var(--font-semibold); }
  .font-bold { font-weight: var(--font-bold); }
  .font-black { font-weight: var(--font-black); }

  /* Color Utilities */
  .text-primary { color: var(--primary); }
  .text-secondary { color: var(--secondary); }
  .text-accent { color: var(--accent); }
  .text-success { color: var(--success); }
  .text-warning { color: var(--warning); }
  .text-danger { color: var(--danger); }
  .text-business { color: var(--business-primary); }
  .text-tech { color: var(--tech-green); }

  /* Layout Utilities */
  .container {
    max-width: var(--wide);
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
  }

  .grid {
    display: grid;
    gap: var(--spacing-lg);
  }

  .grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
  .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
  .grid-cols-5 { grid-template-columns: repeat(5, 1fr); }

  @media (min-width: 768px) {
    .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
    .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
    .md\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
  }

  @media (min-width: 1024px) {
    .lg\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
    .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
    .lg\\:grid-cols-5 { grid-template-columns: repeat(5, 1fr); }
  }

  /* Component Base Styles */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-sm);
    font-weight: var(--font-medium);
    text-decoration: none;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    white-space: nowrap;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .btn-primary {
    background-color: var(--business-primary);
    color: var(--white);
    
    &:hover:not(:disabled) {
      background-color: var(--business-secondary);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
  }

  .btn-secondary {
    background-color: var(--white);
    color: var(--business-primary);
    border: 1px solid var(--business-primary);
    
    &:hover:not(:disabled) {
      background-color: var(--business-primary);
      color: var(--white);
    }
  }

  .btn-accent {
    background-color: var(--accent);
    color: var(--white);
    
    &:hover:not(:disabled) {
      background-color: var(--tech-green);
    }
  }

  .btn-success {
    background-color: var(--success);
    color: var(--white);
    
    &:hover:not(:disabled) {
      background-color: var(--tech-green);
    }
  }

  .card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-fast);

    &:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-xs);
    font-weight: var(--font-medium);
    border-radius: var(--radius-full);
    
    &.badge-business { 
      background-color: var(--business-primary); 
      color: var(--white); 
    }
    &.badge-tech { 
      background-color: var(--tech-green); 
      color: var(--white); 
    }
    &.badge-data { 
      background-color: var(--data-purple); 
      color: var(--white); 
    }
    &.badge-enterprise { 
      background-color: var(--enterprise-orange); 
      color: var(--white); 
    }
    &.badge-success { 
      background-color: var(--success); 
      color: var(--white); 
    }
    &.badge-warning { 
      background-color: var(--warning); 
      color: var(--gray-900); 
    }
    &.badge-danger { 
      background-color: var(--danger); 
      color: var(--white); 
    }
  }

  /* Form Elements */
  .input {
    width: 100%;
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background-color: var(--white);
    transition: border-color var(--transition-fast);

    &:focus {
      outline: none;
      border-color: var(--business-primary);
      box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
    }

    &::placeholder {
      color: var(--gray-500);
    }
  }

  /* Responsive Utilities */
  .hidden { display: none; }
  
  @media (max-width: 767px) {
    .mobile\\:hidden { display: none; }
    .mobile\\:block { display: block; }
    .mobile\\:flex { display: flex; }
    .mobile\\:grid { display: grid; }
  }

  @media (min-width: 768px) {
    .tablet\\:hidden { display: none; }
    .tablet\\:block { display: block; }
    .tablet\\:flex { display: flex; }
    .tablet\\:grid { display: grid; }
  }

  @media (min-width: 1024px) {
    .desktop\\:hidden { display: none; }
    .desktop\\:block { display: block; }
    .desktop\\:flex { display: flex; }
    .desktop\\:grid { display: grid; }
  }

  /* Spacing Utilities */
  .m-0 { margin: 0; }
  .mt-1 { margin-top: var(--spacing-xs); }
  .mt-2 { margin-top: var(--spacing-sm); }
  .mt-3 { margin-top: var(--spacing-md); }
  .mt-4 { margin-top: var(--spacing-lg); }
  .mb-1 { margin-bottom: var(--spacing-xs); }
  .mb-2 { margin-bottom: var(--spacing-sm); }
  .mb-3 { margin-bottom: var(--spacing-md); }
  .mb-4 { margin-bottom: var(--spacing-lg); }
  .mb-6 { margin-bottom: var(--spacing-3xl); }
  .mb-8 { margin-bottom: var(--spacing-4xl); }

  .p-1 { padding: var(--spacing-xs); }
  .p-2 { padding: var(--spacing-sm); }
  .p-3 { padding: var(--spacing-md); }
  .p-4 { padding: var(--spacing-lg); }
  .px-4 { padding-left: var(--spacing-lg); padding-right: var(--spacing-lg); }
  .py-2 { padding-top: var(--spacing-sm); padding-bottom: var(--spacing-sm); }
  .py-4 { padding-top: var(--spacing-lg); padding-bottom: var(--spacing-lg); }

  /* Text Alignment */
  .text-left { text-align: left; }
  .text-center { text-align: center; }
  .text-right { text-align: right; }

  /* Flexbox Utilities */
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .flex-row { flex-direction: row; }
  .items-center { align-items: center; }
  .items-start { align-items: flex-start; }
  .items-end { align-items: flex-end; }
  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }
  .justify-start { justify-content: flex-start; }
  .justify-end { justify-content: flex-end; }
  .flex-1 { flex: 1; }
  .flex-wrap { flex-wrap: wrap; }
  .gap-2 { gap: var(--spacing-sm); }
  .gap-4 { gap: var(--spacing-lg); }
  .gap-6 { gap: var(--spacing-3xl); }

  /* Position Utilities */
  .relative { position: relative; }
  .absolute { position: absolute; }
  .fixed { position: fixed; }
  .sticky { position: sticky; }

  /* Width & Height */
  .w-full { width: 100%; }
  .h-full { height: 100%; }
  .min-h-screen { min-height: 100vh; }

  /* Overflow */
  .overflow-hidden { overflow: hidden; }
  .overflow-auto { overflow: auto; }

  /* Z-Index */
  .z-10 { z-index: 10; }
  .z-20 { z-index: 20; }
  .z-30 { z-index: 30; }
  .z-40 { z-index: 40; }
  .z-50 { z-index: 50; }
`;

export default GlobalStyles;