'use client';

import { forwardRef, useId, useState, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/utils/cn';
import { EyeIcon, EyeOffIcon } from '@/assets';

interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'className'> {
  label?: string;
  error?: string;
  successMessage?: string;
  hasPasswordToggle?: boolean;
  containerClassName?: string;
  inputClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      error,
      successMessage,
      type = 'text',
      hasPasswordToggle,
      containerClassName,
      inputClassName,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedInputId = useId();
    const inputId = id ?? generatedInputId;
    const errorId = error ? `${inputId}-error` : undefined;
    const successId = successMessage ? `${inputId}-success` : undefined;

    const describedBy = errorId ?? successId;

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isPasswordInput = type === 'password';
    const shouldShowPasswordToggle = hasPasswordToggle ?? isPasswordInput;

    const inputType = shouldShowPasswordToggle && isPasswordVisible ? 'text' : type;

    const handleTogglePasswordVisible = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <div className={cn('flex w-full flex-col gap-1', containerClassName)}>
        {label && (
          <label htmlFor={inputId} className='typo-body-5 text-black'>
            {label}
          </label>
        )}

        <div className='relative w-full'>
          <input
            {...props}
            id={inputId}
            ref={ref}
            type={inputType}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={cn(
              'typo-body-11 h-10 w-full rounded-lg bg-white/50 p-2.5 text-black outline-none transition-colors placeholder:text-neutral-800 backdrop-blur-[20px] backdrop-saturate-150 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_4px_16px_rgba(255,255,255,0.28)] disabled:cursor-not-allowed disabled:bg-[#E1E3E6] disabled:text-neutral-800 glass',
              error && 'border-semantic bg-semantic-200/20',
              !error && successMessage && 'border-primary bg-primary-200',
              !error && !successMessage && 'border-white focus:bg-white',
              shouldShowPasswordToggle && 'pr-10',
              inputClassName,
            )}
          />

          {shouldShowPasswordToggle && (
            <button
              type='button'
              className='absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center justify-center disabled:cursor-not-allowed'
              onClick={handleTogglePasswordVisible}
              disabled={disabled}
              aria-label={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {isPasswordVisible ? (
                <EyeIcon className='text-neutral-800' />
              ) : (
                <EyeOffIcon className='text-neutral-800' />
              )}
            </button>
          )}
        </div>

        <div className='min-h-5'>
          {error ? (
            <p id={errorId} className='typo-caption-6 text-semantic'>
              {error}
            </p>
          ) : successMessage ? (
            <p id={successId} className='typo-caption-7 text-primary-700'>
              {successMessage}
            </p>
          ) : null}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
