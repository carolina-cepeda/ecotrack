/**
 * EcoTrack - Button Component
 * Reusable button with multiple variants for consistent UI.
 *
 * Variants:
 *  - primary: Main action button (default)
 *  - secondary: Secondary action
 *  - outline: Outline style
 *  - danger: For destructive actions
 *
 * Props:
 *  - variant: button style variant
 *  - onClick: click handler
 *  - children: button content
 *  - disabled: whether button is disabled
 *  - loading: shows loading spinner
 */
 import { ReactElement } from "react";

 export enum ButtonVariant {
   Primary = "primary",
   Secondary = "secondary",
   Outline = "outline",
   Danger = "danger",
 }

 export interface ButtonProps {
   variant?: ButtonVariant;
   onClick: () => void;
   children: ReactElement;
   disabled?: boolean;
   loading?: boolean;
 }

 export const Button: ReactElement<ButtonProps> = ({
   variant = ButtonVariant.Primary,
   onClick,
   children,
   disabled = false,
   loading = false,
 }) => {
   const variantClasses = {
     primary:
       "bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 focus:outline-none font-medium rounded-lg text-sm px-6 py-3",
     secondary:
       "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 focus:outline-none font-medium rounded-lg text-sm px-6 py-3",
     outline:
       "border-2 border-primary-600 text-primary-600 hover:bg-primary-100 focus:ring-4 focus:ring-primary-300 focus:outline-none font-medium rounded-lg text-sm px-6 py-3",
     danger:
       "bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none font-medium rounded-lg text-sm px-6 py-3",
   };

   const baseClasses = "inline-flex items-center justify-center";

   if (loading) {
     return (
       <button
         onClick={onClick}
         disabled={disabled || loading}
         className={`${baseClasses} ${variantClasses[variant]} animate-spin`}
       >
         <span className="hidden">Procesando...</span>
         <span aria-hidden="true" className="flex-1">
           <svg
             className="h-5 w-5 text-current"
             viewBox="0 0 24 24"
             fill="currentColor"
           >
             <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
             <path
               d="M14 12a2 2 0 100-4 2 2 0 000 4zM5.05 4.95a2 2 0 013.66 0L13 9l-1.6 1.6a2 2 0 11-2.83-2.83L7.34 11H3v2h4.34l-1.1 1.1a2 2 0 11-2.83-2.83L3 13V5.05z"
             />
           </svg>
         </span>
       </button>
     );
   }

   return (
     <button
       onClick={onClick}
       disabled={disabled}
       className={`${baseClasses} ${variantClasses[variant]} transition-colors`}
     >
       {children}
     </button>
   );
 };