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

export const TWO_LINE_HEALTH_SYSTEM_TYPE_SET = new Set(['IMMUNE_SYSTEM', 'REPRODUCTIVE_URINARY']);
