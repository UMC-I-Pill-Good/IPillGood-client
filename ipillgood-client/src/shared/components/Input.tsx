'use client';

import { forwardRef, useId, useState, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/utils/cn';
import { EyeIcon, EyeOffIcon } from '@/assets';

interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'className'> {
  label?: string;
  error?: string;
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
            aria-describedby={errorId}
            className={cn(
              'typo-body-11 h-10 w-full rounded-lg border border-white bg-white/50 p-2.5 text-black outline-none transition-colors placeholder:text-neutral-800 backdrop-blur-[20px] backdrop-saturate-150 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_4px_16px_rgba(255,255,255,0.28)] focus:bg-white disabled:cursor-not-allowed disabled:bg-[#E1E3E6] disabled:text-neutral-800 glass',
              shouldShowPasswordToggle && 'pr-10',
              inputClassName,
            )}
          />

          {shouldShowPasswordToggle && (
            <button
              type='button'
              tabIndex={-1}
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

        {error && (
          <p id={errorId} className='typo-caption-2 text-semantic-500'>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
