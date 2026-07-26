import { BanIcon, ClockIcon, ForkKnifeIcon, NoFoodIcon } from '@/assets';
import { ContraindicatedCombinationType } from '../types/ingredient';
import InfoToggleCard from './InfoToggleCard';

interface IngredientInfoGridSectionProps {
  contraindicatedCombinations: ContraindicatedCombinationType[];
  cautions: string[];
  recommendedIntake: string | null;
  recommendedIntakeTime: string | null;
}

const IngredientInfoGridSection = ({
  contraindicatedCombinations,
  cautions,
  recommendedIntake,
  recommendedIntakeTime,
}: IngredientInfoGridSectionProps) => {
  const cautionCombinations = contraindicatedCombinations.filter((c) => c.type === 'CAUTION');

  return (
    <div className='flex gap-2 mt-2 mb-8'>
      <div className='flex flex-col gap-2 flex-1'>
        <InfoToggleCard
          title={'병용\n금기 조합'}
          icon={<NoFoodIcon />}
          items={
            cautionCombinations.length > 0
              ? cautionCombinations.map((c) =>
                  c.reason ? `${c.targetIngredientName}: ${c.reason}` : c.targetIngredientName,
                )
              : ['정보 없음']
          }
        />

        <InfoToggleCard
          title={'추천\n섭취량'}
          icon={<ForkKnifeIcon />}
          items={[recommendedIntake ?? '정보 없음']}
        />
      </div>

      <div className='flex flex-col gap-2 flex-1'>
        <InfoToggleCard
          title={'부작용\n및\n주의사항'}
          icon={<BanIcon />}
          items={cautions.length > 0 ? cautions : ['정보 없음']}
        />

        <InfoToggleCard
          title={'추천\n섭취 시간대'}
          icon={<ClockIcon />}
          items={[recommendedIntakeTime ?? '정보 없음']}
        />
      </div>
    </div>
  );
};

export default IngredientInfoGridSection;
