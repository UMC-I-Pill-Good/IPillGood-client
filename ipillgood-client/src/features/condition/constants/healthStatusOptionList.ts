import {
  NervousIcon,
  EyeHealthIcon,
  DigestiveIcon,
  EndocrineIcon,
  ConditionCardiovascularIcon,
  ImmuneDefenseIcon,
  MuscleIcon,
  ReproductiveIcon,
} from '@/assets';
import type { HealthSystemType } from '../types/healthStatus';

/**
 * 건강 고민 대분류 아이콘 매핑
 */
export const HEALTH_CONCERN_ICON_MAP = {
  NERVOUS_SYSTEM: NervousIcon,
  SENSORY_SYSTEM: EyeHealthIcon,
  DIGESTIVE_METABOLIC: DigestiveIcon,
  ENDOCRINE: EndocrineIcon,
  CARDIOVASCULAR: ConditionCardiovascularIcon,
  IMMUNE_SYSTEM: ImmuneDefenseIcon,
  MUSCULOSKELETAL: MuscleIcon,
  REPRODUCTIVE_URINARY: ReproductiveIcon,
  FALLBACK: NervousIcon,
} as const;

/**
 * 8개 신체 계통 및 세부 신체 부위 정적 객체 데이터
 */
export const HEALTH_SYSTEM_OPTION_LIST: HealthSystemType[] = [
  {
    key: 'NERVOUS_SYSTEM',
    label: '신경계',
    icon: NervousIcon,
    bodyPartList: [
      { key: 'COGNITIVE_MEMORY', label: '인지 기능 / 기억력' },
      { key: 'TENSION', label: '긴장' },
      { key: 'SLEEP_QUALITY', label: '수면의 질' },
      { key: 'FATIGUE', label: '피로' },
    ],
  },
  {
    key: 'SENSORY_SYSTEM',
    label: '감각계',
    icon: EyeHealthIcon,
    bodyPartList: [
      { key: 'TEETH', label: '치아' },
      { key: 'EYES', label: '눈' },
      { key: 'SKIN', label: '피부' },
    ],
  },
  {
    key: 'DIGESTIVE_METABOLIC',
    label: '소화 대사계',
    icon: DigestiveIcon,
    bodyPartList: [
      { key: 'LIVER', label: '간' },
      { key: 'STOMACH', label: '위' },
      { key: 'GUT', label: '장' },
      { key: 'BODY_FAT', label: '체지방' },
      { key: 'CALCIUM_ABSORPTION', label: '칼슘 흡수' },
    ],
  },
  {
    key: 'ENDOCRINE',
    label: '내분비계',
    icon: EndocrineIcon,
    bodyPartList: [
      { key: 'BLOOD_SUGAR', label: '혈당' },
      { key: 'MENOPAUSE_FEMALE', label: '갱년기 여성' },
      { key: 'MENOPAUSE_MALE', label: '갱년기 남성' },
      { key: 'PMS_DISCOMFORT', label: '월경 전 불편한 상태' },
    ],
  },
  {
    key: 'CARDIOVASCULAR',
    label: '심혈관계',
    icon: ConditionCardiovascularIcon,
    bodyPartList: [
      { key: 'TRIGLYCERIDE', label: '혈중 중성지방' },
      { key: 'CHOLESTEROL', label: '콜레스테롤' },
      { key: 'BLOOD_PRESSURE', label: '혈압' },
      { key: 'BLOOD_FLOW', label: '혈행' },
    ],
  },
  {
    key: 'IMMUNE_SYSTEM',
    label: '신체 방어\n및 면역계',
    icon: ImmuneDefenseIcon,
    isTwoLine: true,
    bodyPartList: [
      { key: 'IMMUNITY', label: '면역' },
      { key: 'ANTIOXIDANT', label: '항산화' },
    ],
  },
  {
    key: 'MUSCULOSKELETAL',
    label: '근육계',
    icon: MuscleIcon,
    bodyPartList: [
      { key: 'EXERCISE_PERFORMANCE', label: '운동 수행 능력' },
      { key: 'JOINT', label: '관절' },
      { key: 'BONE', label: '뼈' },
      { key: 'MUSCLE_STRENGTH', label: '근력' },
    ],
  },
  {
    key: 'REPRODUCTIVE_URINARY',
    label: '생식\n및 비뇨계',
    icon: ReproductiveIcon,
    isTwoLine: true,
    bodyPartList: [
      { key: 'PROSTATE', label: '전립선' },
      { key: 'URINATION', label: '배뇨' },
      { key: 'URINARY_TRACT', label: '요로' },
    ],
  },
];
