'use client';

import {
  forwardRef,
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type FocusEvent,
} from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

const inputVariants = cva(
  'typo-body-11 h-10 w-full rounded-lg border p-2.5 text-black outline-none transition-colors placeholder:text-neutral-800 backdrop-blur-[20px] backdrop-saturate-150 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_4px_16px_rgba(255,255,255,0.28)] disabled:cursor-not-allowed disabled:bg-[#E1E3E6] disabled:text-neutral-800',
  {
    variants: {
      status: {
        default: 'border-white bg-white/50',
        pressed: 'border-white bg-white',
        failed: 'border-[#D53D4A] bg-white/50',
        succeeded: 'border-[#4680FE] bg-primary-300/30',
      },
      hasIcon: {
        true: 'pr-10',
        false: '',
      },
    },
    defaultVariants: {
      status: 'default',
      hasIcon: false,
    },
  },
);

export interface InputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  label?: string;
  status?: 'default' | 'pressed' | 'failed' | 'succeeded';
  message?: string;
  hasPasswordToggle?: boolean;
  containerClassName?: string;
  inputClassName?: string;
}

const EyeIcon = () => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 12C3.44 8.05 7.27 4.87 12 4.87C16.73 4.87 20.56 8.05 22 12C20.56 15.95 16.73 19.13 12 19.13C7.27 19.13 3.44 15.95 2 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const EyeOffIcon = () => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 3L21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10.58 10.58C10.22 10.95 10 11.45 10 12C10 13.1 10.9 14 12 14C12.55 14 13.05 13.78 13.42 13.42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9.88 5.08C10.57 4.94 11.28 4.87 12 4.87C16.73 4.87 20.56 8.05 22 12C21.59 13.13 20.95 14.17 20.12 15.06"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6.53 6.53C4.49 7.71 2.87 9.65 2 12C3.44 15.95 7.27 19.13 12 19.13C13.55 19.13 15.03 18.79 16.34 18.18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      status = 'default',
      message,
      type = 'text',
      hasPasswordToggle,
      containerClassName,
      inputClassName,
      onFocus,
      onBlur,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedInputId = useId();
    const inputId = id ?? generatedInputId;

    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isPasswordInput = type === 'password';
    const shouldShowPasswordToggle = hasPasswordToggle ?? isPasswordInput;

    const inputType =
      shouldShowPasswordToggle && isPasswordVisible ? 'text' : type;

    const currentStatus =
      status === 'default' && isFocused ? 'pressed' : status;

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const handleTogglePasswordVisible = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <div
        className={cn(
          'flex w-full max-w-[353px] flex-col gap-1',
          containerClassName,
        )}
      >
        {label && (
          <label htmlFor={inputId} className="typo-body-5 text-black">
            {label}
          </label>
        )}

        <div className="relative w-full">
          <input
            id={inputId}
            ref={ref}
            type={inputType}
            disabled={disabled}
            aria-invalid={status === 'failed'}
            className={cn(
              inputVariants({
                status: currentStatus,
                hasIcon: shouldShowPasswordToggle,
              }),
              inputClassName,
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {shouldShowPasswordToggle && (
            <button
              type="button"
              className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center justify-center text-[#333333] disabled:cursor-not-allowed"
              onClick={handleTogglePasswordVisible}
              disabled={disabled}
              aria-label={
                isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기'
              }
            >
              {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          )}
        </div>

        {message && (
          <p
            className={cn(
              'typo-caption-3',
              status === 'failed' && 'text-[#D53D4A]',
              status === 'succeeded' && 'text-[#4680FE]',
              (status === 'default' || status === 'pressed') &&
              'text-neutral-800',
            )}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';