import {
  AntioxidantIcon,
  BoneJointIcon,
  CardiovascularIcon,
  ExercisePerformanceIcon,
  EyeHealthIcon,
  FatigueIcon,
  GutHealthIcon,
  HairHealthIcon,
  ImmunityIcon,
  SkinHealthIcon,
  SleepIcon,
  StressIcon,
  WeightManagementIcon,
  WomenHealthIcon,
} from '@/assets';

export const healthConcernItems = [
  {
    id: 'FATIGUE',
    label: '피로 개선',
    icon: FatigueIcon,
  },
  {
    id: 'IMMUNITY',
    label: '면역력',
    icon: ImmunityIcon,
  },
  {
    id: 'SLEEP_QUALITY',
    label: '수면 질 개선',
    icon: SleepIcon,
  },
  {
    id: 'GUT_HEALTH',
    label: '장 건강',
    icon: GutHealthIcon,
  },
  {
    id: 'SKIN_HEALTH',
    label: '피부 건강',
    icon: SkinHealthIcon,
  },
  {
    id: 'WEIGHT_MANAGEMENT',
    label: '체중 관리',
    icon: WeightManagementIcon,
  },
  {
    id: 'EYE_HEALTH',
    label: '눈 건강',
    icon: EyeHealthIcon,
  },
  {
    id: 'BONE_JOINT',
    label: '뼈/관절',
    icon: BoneJointIcon,
  },
  {
    id: 'BLOOD_PRESSURE_VESSEL',
    label: '혈압/혈관',
    icon: CardiovascularIcon,
  },
  {
    id: 'STRESS',
    label: '스트레스',
    icon: StressIcon,
  },
  {
    id: 'ANTIOXIDANT',
    label: '항산화',
    icon: AntioxidantIcon,
  },
  {
    id: 'HAIR_HEALTH',
    label: '탈모/모발',
    icon: HairHealthIcon,
  },
  {
    id: 'WOMENS_HEALTH',
    label: '여성 건강',
    icon: WomenHealthIcon,
  },
  {
    id: 'EXERCISE_PERFORMANCE',
    label: '운동 능력',
    icon: ExercisePerformanceIcon,
  },
] as const;

export type HealthConcernCode = (typeof healthConcernItems)[number]['id'];
