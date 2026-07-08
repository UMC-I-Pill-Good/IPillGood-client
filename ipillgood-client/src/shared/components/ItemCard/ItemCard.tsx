import { type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/shared/utils/cn';

export interface ItemCardProps extends ComponentPropsWithoutRef<'div'> {
    imageSrc?: string;
    imageAlt?: string;
    foodName: string;
    amount: string;
    ingredient: string;
    nutrientAmount: string;
}

export const ItemCard = ({
    imageSrc,
    imageAlt = '음식 이미지',
    foodName,
    amount,
    ingredient,
    nutrientAmount,
    className,
    ...props
}: ItemCardProps) => {
    return (
        <div
            className={cn(
                'relative flex h-[114px] w-[71px] flex-col items-center gap-1 overflow-hidden rounded-[10px] bg-secondary-600/25 px-[8.5px] py-2.5 text-center shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] backdrop-blur-[24px] backdrop-saturate-150 before:pointer-events-none before:absolute before:inset-0 before:rounded-[10px] before:bg-[linear-gradient(135deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.1)_45%,rgba(255,255,255,0.05)_100%)]',
                className,
            )}
            {...props}
        >
            <div className="relative z-10 flex h-[38px] w-[38px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D9D9D9] text-[10px] font-medium leading-none text-neutral-800">
                {imageSrc ? (
                    <div
                        className="h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${imageSrc})` }}
                        role="img"
                        aria-label={imageAlt}
                    />
                ) : (
                    <span>음식 그림</span>
                )}
            </div>

            <p className="text-caption-1 relative z-10 w-[54px] truncate text-[#111111]">
                {foodName}
            </p>

            <p className="relative z-10 w-[54px] whitespace-pre-line text-[10px] font-medium leading-none text-neutral-800">
                {amount}
                <br />
                {ingredient}
                <br />
                {nutrientAmount}
            </p>
        </div>
    );
};