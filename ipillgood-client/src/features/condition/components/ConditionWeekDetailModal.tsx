'use client';

import {
    ConditionIntakeIcon,
    ConditionSleepIcon,
    ConditionVitalityIcon,
} from '@/assets';
import { X } from 'lucide-react';
import {
    type MouseEvent,
    type ReactNode,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';

interface ConditionWeekDetailModalProps {
    anchorElement: HTMLElement | null;
    month: number;
    weekLabel: string;
    vitality: number;
    sleepHours: number;
    intakeDays: number;
    totalDays: number;
    onClose: () => void;
}

interface ConditionMetricProps {
    label: string;
    icon: ReactNode;
    value: ReactNode;
}

interface ModalPosition {
    left: number;
    top: number;
}

const ConditionMetric = ({
    label,
    icon,
    value,
}: ConditionMetricProps) => {
    return (
        <div className='flex h-[69px] w-[55px] shrink-0 flex-col items-center gap-1'>
            <div className='flex h-[45px] w-[55px] flex-col items-center gap-1'>
                <p className='typo-caption-2 flex h-[17px] w-full items-center justify-center whitespace-nowrap text-center text-[#111111]'>
                    {label}
                </p>

                <div
                    aria-hidden='true'
                    className='flex size-6 shrink-0 items-center justify-center'
                >
                    {icon}
                </div>
            </div>

            <div className='flex h-5 w-full items-center justify-center whitespace-nowrap text-center text-neutral-800'>
                {value}
            </div>
        </div>
    );
};

const ConditionWeekDetailModal = ({
    anchorElement,
    month,
    weekLabel,
    vitality,
    sleepHours,
    intakeDays,
    totalDays,
    onClose,
}: ConditionWeekDetailModalProps) => {
    const modalTitleId = useId();

    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const previousActiveElementRef = useRef<HTMLElement | null>(
        null,
    );
    const onCloseRef = useRef(onClose);

    const [isMounted, setIsMounted] = useState(false);
    const [modalPosition, setModalPosition] =
        useState<ModalPosition | null>(null);

    const isPositionReady = modalPosition !== null;

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!anchorElement) {
            return;
        }

        const updateModalPosition = () => {
            const anchorRect =
                anchorElement.getBoundingClientRect();

            setModalPosition({
                left: anchorRect.left + anchorRect.width / 2,
                top: anchorRect.top + anchorRect.height / 2,
            });
        };

        updateModalPosition();

        let resizeObserver: ResizeObserver | null = null;

        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(
                updateModalPosition,
            );
            resizeObserver.observe(anchorElement);
        }

        window.addEventListener('resize', updateModalPosition);
        window.addEventListener(
            'scroll',
            updateModalPosition,
            true,
        );

        return () => {
            resizeObserver?.disconnect();

            window.removeEventListener(
                'resize',
                updateModalPosition,
            );
            window.removeEventListener(
                'scroll',
                updateModalPosition,
                true,
            );
        };
    }, [anchorElement]);

    useEffect(() => {
        previousActiveElementRef.current =
            document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null;

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onCloseRef.current();
                return;
            }

            if (event.key === 'Tab') {
                event.preventDefault();
                closeButtonRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);

            previousActiveElementRef.current?.focus();
        };
    }, []);

    useEffect(() => {
        if (!isPositionReady) {
            return;
        }

        closeButtonRef.current?.focus();
    }, [isPositionReady]);

    const handleBackdropClick = () => {
        onClose();
    };

    const handleModalClick = (
        event: MouseEvent<HTMLDivElement>,
    ) => {
        event.stopPropagation();
    };

    if (
        !isMounted ||
        !anchorElement ||
        !modalPosition
    ) {
        return null;
    }

    return createPortal(
        <div
            className='fixed inset-0 z-[100] bg-black/30'
            onClick={handleBackdropClick}
            role='presentation'
        >
            <div
                role='dialog'
                aria-modal='true'
                aria-labelledby={modalTitleId}
                className='fixed z-[101] flex h-[153px] w-[264px] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-[20px] bg-white px-5 py-4 shadow-[4px_4px_40px_0_rgba(126,131,135,0.2)]'
                style={{
                    left: modalPosition.left,
                    top: modalPosition.top,
                }}
                onClick={handleModalClick}
            >
                <div className='flex h-9 w-full shrink-0 items-center justify-between'>
                    <h3
                        id={modalTitleId}
                        className='typo-body-5 whitespace-nowrap text-[#111111]'
                    >
                        {month}월 {weekLabel} 컨디션
                    </h3>

                    <button
                        ref={closeButtonRef}
                        type='button'
                        aria-label='컨디션 상세 모달 닫기'
                        className='flex size-9 shrink-0 items-center justify-center rounded-full border border-white bg-white/50 text-neutral-800 shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600'
                        onClick={onClose}
                    >
                        <X
                            aria-hidden='true'
                            size={24}
                            strokeWidth={2}
                        />
                    </button>
                </div>

                <div className='flex h-[69px] w-full shrink-0 items-start justify-between'>
                    <ConditionMetric
                        label='활력'
                        icon={
                            <ConditionVitalityIcon className='block h-[19.31px] w-4 shrink-0' />
                        }
                        value={
                            <>
                                <span className='typo-caption-2'>
                                    {vitality}
                                </span>

                                <span className='mx-1 text-[13px] font-medium leading-[150%] tracking-[-0.011em]'>
                                    /
                                </span>

                                <span className='typo-caption-7'>
                                    5
                                </span>
                            </>
                        }
                    />

                    <ConditionMetric
                        label='수면'
                        icon={
                            <ConditionSleepIcon className='block h-5 w-[12.93px] shrink-0' />
                        }
                        value={
                            <>
                                <span className='typo-caption-2'>
                                    {sleepHours}
                                </span>

                                <span className='ml-1 font-[var(--font-dm-sans)] typo-caption-7'>
                                    h
                                </span>
                            </>
                        }
                    />

                    <ConditionMetric
                        label='섭취 기록'
                        icon={
                            <ConditionIntakeIcon className='block h-5 w-[18px] shrink-0' />
                        }
                        value={
                            <>
                                <span className='typo-caption-2'>
                                    {intakeDays}
                                </span>

                                <span className='mx-1 text-[13px] font-medium leading-[150%] tracking-[-0.011em]'>
                                    /
                                </span>

                                <span className='typo-caption-7'>
                                    {totalDays}
                                </span>

                                <span className='ml-0.5 typo-caption-7'>
                                    일
                                </span>
                            </>
                        }
                    />
                </div>
            </div>
        </div>,
        document.body,
    );
};

export default ConditionWeekDetailModal;